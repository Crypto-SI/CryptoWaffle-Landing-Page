# CryptoWaffle Docker Setup

This README provides instructions for building and running the CryptoWaffle landing page using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

## Environment Variables

Before building the Docker image, create a `.env` file in the root directory with the following variables:

```
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=your_youtube_playlist_id_here
NEXT_TELEMETRY_DISABLED=1
```

Replace the placeholder values with your actual YouTube API key and playlist ID.

## Building and Running with Docker Compose

To build and start the container:

```bash
cd cwsite
docker-compose up -d
```

This will:
1. Build the Docker image according to the Dockerfile
2. Start a container named "cryptowaffle_site"
3. Expose the website on port 80

## Accessing the Website

Once the container is running, you can access the website at:

```
http://localhost
```

## Stopping the Container

To stop the container:

```bash
docker-compose down
```

## Building Without Docker Compose

If you prefer to build and run the container manually:

```bash
# Build the image
docker build -t cryptowaffle .

# Run the container
docker run -d -p 80:80 --name cryptowaffle_site --env-file .env cryptowaffle
```

## Troubleshooting

If you encounter any issues:

1. Check logs: `docker logs cryptowaffle_site`
2. Verify environment variables: `docker exec cryptowaffle_site env`
3. Ensure port 80 is not already in use by another service 