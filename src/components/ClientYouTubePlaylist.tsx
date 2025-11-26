'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoItem {
  id: string;
  videoId: string;
  title: string;
  thumbnailUrl: string;
}

const ClientYouTubePlaylist = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [playlistVideos, setPlaylistVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 4;
  
  const playlistId = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID || 'PLmFN-F-XHywZZLYh95RFY0utC2TeYRZMm';
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Fallback demo videos in case API doesn't work
  const demoVideos = [
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

  // Fetch playlist videos from YouTube API
  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      if (!apiKey) {
        console.warn('YouTube API key not found, using demo videos instead');
        setPlaylistVideos(demoVideos);
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
        
        const videos = data.items.map((item: any, index: number) => ({
          id: `video-${index}`,
          videoId: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url
        }));
        
        setPlaylistVideos(videos);
        setError(null);
      } catch (err) {
        console.error('Error fetching playlist:', err);
        setError('Failed to load videos. Using demo videos instead.');
        setPlaylistVideos(demoVideos);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylistVideos();
  }, [apiKey, playlistId]);

  // Function to play a specific video when thumbnail is clicked
  const playVideo = (videoId: string, index: number) => {
    setCurrentVideoId(videoId);
    setCurrentVideoIndex(index);
    
    // Update the iframe source to play the selected video
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    }
  };

  // Function to navigate to the previous video
  const playPreviousVideo = () => {
    if (playlistVideos.length === 0) return;
    const newIndex = currentVideoIndex > 0 ? currentVideoIndex - 1 : playlistVideos.length - 1;
    playVideo(playlistVideos[newIndex].videoId, newIndex);
  };

  // Function to navigate to the next video
  const playNextVideo = () => {
    if (playlistVideos.length === 0) return;
    const newIndex = currentVideoIndex < playlistVideos.length - 1 ? currentVideoIndex + 1 : 0;
    playVideo(playlistVideos[newIndex].videoId, newIndex);
  };

  // Function to go to the next page of videos
  const nextPage = () => {
    const totalPages = Math.ceil(playlistVideos.length / videosPerPage);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  // Function to go to the previous page of videos
  const prevPage = () => {
    const totalPages = Math.ceil(playlistVideos.length / videosPerPage);
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  // Calculate the current videos to display
  const currentVideos = playlistVideos.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );

  const [isPastEpisodesHovered, setIsPastEpisodesHovered] = useState(false);
  const [isSubscribeHovered, setIsSubscribeHovered] = useState(false);

  // Define brand colors for the animation
  const brandColors = ["#43C4CC", "#FFD878"]; // teal and yellow

  // Animation variants for the letters
  const letterVariants = {
    initial: { y: 0, color: "#FFD878" },
    hover: (i: number) => ({
      y: [0, -10, 0],
      color: [brandColors[0], brandColors[1], brandColors[0]],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 0.5,
          delay: i * 0.05
        },
        color: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 1,
          delay: i * 0.05
        }
      }
    })
  };

  return (
    <section id="episodes" className="py-20 px-4 md:px-8 bg-almost-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div 
            className="inline-block"
            onMouseEnter={() => setIsPastEpisodesHovered(true)}
            onMouseLeave={() => setIsPastEpisodesHovered(false)}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-flex">
              {"Past Episodes".split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  animate={isPastEpisodesHovered ? "hover" : "initial"}
                  style={{ display: 'inline-block' }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h2>
          </div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Missed a livestream? No worries! Watch all our past episodes at your own pace.
            Each episode is packed with <span className="text-teal">actionable insights</span> and <span className="text-yellow">expert analysis</span>.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-yellow text-center mb-6">
            {error}
          </div>
        )}

        {/* YouTube Player Section with Navigation Arrows */}
        {!isLoading && playlistVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-almost-black p-4' : ''}`}
          >
            {/* Player Controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-yellow font-medium md:text-lg">
                {currentVideoId && currentVideoIndex >= 0 && currentVideoIndex < playlistVideos.length
                  ? 'Now Playing: ' + playlistVideos[currentVideoIndex].title 
                  : 'Crypto Waffle Episodes'}
              </div>
              <div className="flex space-x-2">
                {currentVideoId && (
                  <button 
                    onClick={() => {
                      setCurrentVideoId(null);
                      setCurrentVideoIndex(0);
                      if (iframeRef.current) {
                        iframeRef.current.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=0&rel=0&modestbranding=1`;
                      }
                    }}
                    className="bg-dark-grey hover:bg-teal hover:text-almost-black text-light-grey px-3 py-2 rounded transition-colors text-sm"
                  >
                    Back to Playlist
                  </button>
                )}
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="bg-dark-grey hover:bg-teal hover:text-almost-black text-light-grey p-2 rounded transition-colors"
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Video Navigation Arrows and Player */}
            <div className="relative">
              {/* Left Navigation Arrow */}
              {currentVideoId && !isFullscreen && playlistVideos.length > 1 && (
                <button 
                  onClick={playPreviousVideo}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-dark-grey bg-opacity-70 hover:bg-teal text-light-grey hover:text-almost-black h-12 w-12 rounded-full flex items-center justify-center transition-all"
                  aria-label="Previous Video"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Responsive YouTube Embed */}
              <div className={`relative overflow-hidden rounded-lg shadow-2xl ${isFullscreen ? 'h-full' : 'aspect-video'}`}>
                <iframe
                  ref={iframeRef}
                  src={currentVideoId 
                    ? `https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1` 
                    : `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=0&rel=0&modestbranding=1`
                  }
                  title="Crypto Waffle YouTube Playlist"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Right Navigation Arrow */}
              {currentVideoId && !isFullscreen && playlistVideos.length > 1 && (
                <button 
                  onClick={playNextVideo}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-dark-grey bg-opacity-70 hover:bg-teal text-light-grey hover:text-almost-black h-12 w-12 rounded-full flex items-center justify-center transition-all"
                  aria-label="Next Video"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Current Episode Indicator */}
            {currentVideoId && !isFullscreen && (
              <div className="mt-4 text-center">
                <p className="text-light-grey">
                  Episode {currentVideoIndex + 1} of {playlistVideos.length}: <span className="text-teal">{playlistVideos[currentVideoIndex].title}</span>
                </p>
              </div>
            )}
            
            {/* Fullscreen Close Button */}
            {isFullscreen && (
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 bg-almost-black text-light-grey p-2 rounded-full hover:bg-teal hover:text-almost-black transition-colors"
                aria-label="Close Fullscreen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </motion.div>
        )}

        {/* Initial Video Selection (when no video is playing) */}
        {!isLoading && !currentVideoId && !isFullscreen && playlistVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-teal">Select an Episode</h3>
              <div className="text-light-grey">
                Page {currentPage + 1} of {Math.ceil(playlistVideos.length / videosPerPage)}
              </div>
            </div>
            <p className="text-light-grey mb-6">Click any thumbnail below to start watching</p>
            
            {/* Video Grid Navigation */}
            <div className="relative">
              {playlistVideos.length > videosPerPage && (
                <>
                  <button 
                    onClick={prevPage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-dark-grey bg-opacity-70 hover:bg-teal text-light-grey hover:text-almost-black h-10 w-10 rounded-full flex items-center justify-center transition-all"
                    aria-label="Previous Page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={nextPage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-dark-grey bg-opacity-70 hover:bg-teal text-light-grey hover:text-almost-black h-10 w-10 rounded-full flex items-center justify-center transition-all"
                    aria-label="Next Page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {currentVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                    onClick={() => playVideo(video.videoId, currentPage * videosPerPage + index)}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg mb-3 group-hover:shadow-xl transition-all">
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-almost-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-0 transition-all">
                        <div className="w-12 h-12 rounded-full bg-teal bg-opacity-90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-almost-black" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-light-grey group-hover:text-yellow transition-colors line-clamp-2">{video.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Pagination Indicators */}
            {playlistVideos.length > videosPerPage && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(playlistVideos.length / videosPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`h-3 w-3 rounded-full transition-all ${
                      currentPage === index ? 'bg-teal scale-125' : 'bg-dark-grey hover:bg-light-grey'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Call to Action */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-dark-grey rounded-lg p-8 shadow-xl">
              <div 
                className="inline-block"
                onMouseEnter={() => setIsSubscribeHovered(true)}
                onMouseLeave={() => setIsSubscribeHovered(false)}
              >
                <h3 className="text-2xl font-bold mb-4 inline-flex">
                  {"Subscribe to Our Channel".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={letterVariants}
                      animate={isSubscribeHovered ? "hover" : "initial"}
                      style={{ display: 'inline-block' }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </h3>
              </div>
              <p className="text-light-grey mb-6 max-w-3xl mx-auto">
                Never miss an episode! Subscribe to our YouTube channel and turn on notifications 
                to stay updated with our latest crypto insights and analysis.
              </p>
              <a 
                href={`https://www.youtube.com/playlist?list=${playlistId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#FF0000] text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all inline-flex items-center"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe on YouTube
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ClientYouTubePlaylist; 