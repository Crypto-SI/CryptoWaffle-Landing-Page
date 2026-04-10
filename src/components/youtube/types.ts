export interface VideoItem {
  id: string;
  videoId: string;
  title: string;
  thumbnailUrl: string;
}

export type YouTubeSource =
  | {
      type: 'playlist';
      title: string;
      description: string;
      playlistId: string;
      browseUrl: string;
      browseLabel: string;
      primaryCtaUrl: string;
      primaryCtaLabel: string;
    }
  | {
      type: 'channel';
      title: string;
      description: string;
      channelHandle: string;
      channelUrl: string;
      browseUrl: string;
      browseLabel: string;
      primaryCtaUrl: string;
      primaryCtaLabel: string;
    };
