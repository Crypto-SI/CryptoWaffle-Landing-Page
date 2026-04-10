import { YouTubeSource } from '../components/youtube/types';

const latestEpisodesPlaylistId =
  process.env.NEXT_PUBLIC_YOUTUBE_LATEST_PLAYLIST_ID || 'PLc4y9S--8U3OSZg90ZUAOf0rm9uhhnS3X';

const legacyPlaylistId =
  process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID || 'PLmFN-F-XHywZZLYh95RFY0utC2TeYRZMm';

export const currentChannelSource: YouTubeSource = {
  type: 'playlist',
  title: 'CryptoWaffleTV',
  description:
    'Catch up with the latest full Crypto Waffle episodes from the curated CryptoWaffleTV playlist without pulling in Shorts.',
  playlistId: latestEpisodesPlaylistId,
  browseUrl: `https://www.youtube.com/playlist?list=${latestEpisodesPlaylistId}`,
  browseLabel: 'Browse the latest episodes playlist',
  primaryCtaUrl: 'https://www.youtube.com/@CryptoWaffleTV?sub_confirmation=1',
  primaryCtaLabel: 'Subscribe on YouTube'
};

export const legacyArchiveSources: YouTubeSource[] = [
  {
    type: 'playlist',
    title: 'Legacy Episodes',
    description:
      'Earlier Crypto Waffle episodes from the original playlist stay available here as part of the archive.',
    playlistId: legacyPlaylistId,
    browseUrl: `https://www.youtube.com/playlist?list=${legacyPlaylistId}`,
    browseLabel: 'Open the legacy playlist on YouTube',
    primaryCtaUrl: `https://www.youtube.com/playlist?list=${legacyPlaylistId}`,
    primaryCtaLabel: 'Open legacy playlist'
  }
];
