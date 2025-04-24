# Stage 1: Base image for building the application
FROM node:18-alpine AS base
WORKDIR /app

# Stage 2: Installing dependencies
FROM base AS deps
# Copy package files
COPY package.json ./
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
# Set YouTube API key and playlist ID from .env.local
ENV NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyAGfX-XxkEu8KCdYXcXYIFv75uCCfjckBc
ENV NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=PLmFN-F-XHywZZLYh95RFY0utC2TeYRZMm
# Build the application
RUN npm run build

# Stage 4: Production image with Nginx
FROM nginx:alpine AS runner
# Set YouTube API key and playlist ID in the final image
ENV NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyAGfX-XxkEu8KCdYXcXYIFv75uCCfjckBc
ENV NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=PLmFN-F-XHywZZLYh95RFY0utC2TeYRZMm
# Copy the built static files
COPY --from=builder /app/out /usr/share/nginx/html
# Explicitly copy images directory
COPY --from=builder /app/public/images /usr/share/nginx/html/images
# Configure nginx
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
