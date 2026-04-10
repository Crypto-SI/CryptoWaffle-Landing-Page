import { useEffect, useState } from 'react';

import { VideoItem, YouTubeSource } from './types';

const DEMO_VIDEOS: VideoItem[] = [
  {
    id: 'video-1',
    videoId: 'LcXTG0oEUcM',
    title: 'Crypto Waffle AMA: Open Discussion on Crypto Markets',
    thumbnailUrl: 'https://i.ytimg.com/vi/LcXTG0oEUcM/mqdefault.jpg'
  },
  {
    id: 'video-2',
    videoId: 'nSGmzXA5JDs',
    title: 'Crypto Market Analysis and Live Discussion',
    thumbnailUrl: 'https://i.ytimg.com/vi/nSGmzXA5JDs/mqdefault.jpg'
  },
  {
    id: 'video-3',
    videoId: 'EB9m4CnG9lg',
    title: 'Cross-chain DeFi & DEX Aggregators',
    thumbnailUrl: 'https://i.ytimg.com/vi/EB9m4CnG9lg/mqdefault.jpg'
  }
];

const fetchJson = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch YouTube data');
  }

  return response.json();
};

const mapItemsToVideos = (items: any[]) =>
  items.map((item: any, index: number) => ({
    id: `video-${index}`,
    videoId: item.snippet.resourceId?.videoId || item.id?.videoId,
    title: item.snippet.title,
    thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url
  }));

const getUploadsPlaylistId = async (apiKey: string, channelHandle: string) => {
  const directMatch = await fetchJson(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${encodeURIComponent(channelHandle)}&key=${apiKey}`
  );

  const directChannel = directMatch.items?.[0];
  if (directChannel?.contentDetails?.relatedPlaylists?.uploads) {
    return directChannel.contentDetails.relatedPlaylists.uploads as string;
  }

  const searchMatch = await fetchJson(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${encodeURIComponent(
      channelHandle.replace(/^@/, '')
    )}&key=${apiKey}`
  );

  const channelId = searchMatch.items?.[0]?.snippet?.channelId;
  if (!channelId) {
    throw new Error('Channel not found');
  }

  const channelDetails = await fetchJson(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
  );

  const uploadsPlaylistId = channelDetails.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) {
    throw new Error('Uploads playlist not found');
  }

  return uploadsPlaylistId as string;
};

export const usePlaylistVideos = (apiKey: string | undefined, source: YouTubeSource) => {
  const [playlistVideos, setPlaylistVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvedPlaylistId, setResolvedPlaylistId] = useState<string | null>(
    source.type === 'playlist' ? source.playlistId : null
  );

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      if (!apiKey) {
        console.warn('YouTube API key not found, using demo videos instead');
        setPlaylistVideos(DEMO_VIDEOS);
        setResolvedPlaylistId(source.type === 'playlist' ? source.playlistId : null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const playlistId =
          source.type === 'playlist'
            ? source.playlistId
            : await getUploadsPlaylistId(apiKey, source.channelHandle);
        const data = await fetchJson(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
        );
        const items = Array.isArray(data?.items) ? data.items : [];

        if (!items.length) {
          throw new Error('Playlist empty');
        }

        setResolvedPlaylistId(playlistId);
        setPlaylistVideos(mapItemsToVideos(items).filter((video) => Boolean(video.videoId)));
        setError(null);
      } catch (err) {
        console.error('Error fetching playlist:', err);
        setError('Failed to load videos. Showing demo episodes instead.');
        setPlaylistVideos(DEMO_VIDEOS);
        setResolvedPlaylistId(source.type === 'playlist' ? source.playlistId : null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylistVideos();
  }, [apiKey, source]);

  return { playlistVideos, isLoading, error, resolvedPlaylistId };
};
