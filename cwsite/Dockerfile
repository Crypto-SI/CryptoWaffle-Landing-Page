FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables must be present at build time
# Next.js collects anonymous telemetry data about general usage
ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred output
RUN npm run build

# Use nginx for serving static files
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default nginx static resources
RUN rm -rf ./*

# Copy static files from builder stage
COPY --from=builder /app/out .

# Ensure the images directory exists and has proper permissions
RUN mkdir -p /usr/share/nginx/html/images
RUN chmod -R 755 /usr/share/nginx/html/images

# Explicitly copy public images to ensure they're included
COPY --from=builder /app/public/images /usr/share/nginx/html/images

# Copy custom nginx config if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
