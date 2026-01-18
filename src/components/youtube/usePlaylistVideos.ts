import { useEffect, useState } from 'react';

import { VideoItem } from './types';

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

export const usePlaylistVideos = (apiKey: string | undefined, playlistId: string) => {
  const [playlistVideos, setPlaylistVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      if (!apiKey) {
        console.warn('YouTube API key not found, using demo videos instead');
        setPlaylistVideos(DEMO_VIDEOS);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch playlist data');
        }

        const data = await response.json();
        const items = Array.isArray(data?.items) ? data.items : [];

        if (!items.length) {
          throw new Error('Playlist empty');
        }

        const videos = items.map((item: any, index: number) => ({
          id: `video-${index}`,
          videoId: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url
        }));

        setPlaylistVideos(videos);
        setError(null);
      } catch (err) {
        console.error('Error fetching playlist:', err);
        setError('Failed to load videos. Showing demo episodes instead.');
        setPlaylistVideos(DEMO_VIDEOS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylistVideos();
  }, [apiKey, playlistId]);

  return { playlistVideos, isLoading, error };
};
