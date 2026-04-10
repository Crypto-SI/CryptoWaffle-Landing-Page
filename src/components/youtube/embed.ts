export const buildEmbedSrc = (videoId: string | null, playlistId?: string | null) =>
  videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    : playlistId
      ? `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=0&rel=0&modestbranding=1`
      : 'about:blank';
