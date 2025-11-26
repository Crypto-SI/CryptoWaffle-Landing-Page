# Stage 1: Base image for building the application
FROM node:18-alpine AS base
WORKDIR /app

# Stage 2: Installing dependencies
FROM base AS deps
# Copy package files
COPY package.json package-lock.json ./
# Install dependencies (using --force to bypass platform checks)
RUN npm install --force

# Stage 3: Building the application
FROM base AS builder
WORKDIR /app
# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all project files
COPY . .
# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1
# Build the application
RUN npm run build

# Stage 4: Production image with Nginx
FROM nginx:alpine AS runner
# Copy the built static files
COPY --from=builder /app/out /usr/share/nginx/html
# Explicitly copy images directory
COPY --from=builder /app/public/images /usr/share/nginx/html/images
# Configure nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
