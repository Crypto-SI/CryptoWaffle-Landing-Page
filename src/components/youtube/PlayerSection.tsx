import React from 'react';
import { motion } from 'framer-motion';

import { buildEmbedSrc } from './embed';
import { VideoItem } from './types';

type PlayerSectionProps = {
  playlistVideos: VideoItem[];
  playlistId: string;
  currentVideoId: string | null;
  currentVideoIndex: number;
  isFullscreen: boolean;
  playerVisible: boolean;
  shouldLoadEmbed: boolean;
  setShouldLoadEmbed: (value: boolean) => void;
  onBackToPlaylist: () => void;
  onToggleFullscreen: () => void;
  onPrevious: () => void;
  onNext: () => void;
  playerContainerRef: React.RefObject<HTMLDivElement>;
  iframeRef: React.RefObject<HTMLIFrameElement>;
};

export const PlayerSection = ({
  playlistVideos,
  playlistId,
  currentVideoId,
  currentVideoIndex,
  isFullscreen,
  playerVisible,
  shouldLoadEmbed,
  setShouldLoadEmbed,
  onBackToPlaylist,
  onToggleFullscreen,
  onPrevious,
  onNext,
  playerContainerRef,
  iframeRef
}: PlayerSectionProps) => {
  if (!playerVisible || playlistVideos.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-almost-black p-4' : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-yellow font-medium md:text-lg">
          {currentVideoId && currentVideoIndex >= 0 && currentVideoIndex < playlistVideos.length
            ? 'Now Playing: ' + playlistVideos[currentVideoIndex].title
            : 'Crypto Waffle Episodes'}
        </div>
        <div className="flex space-x-2">
          {currentVideoId && (
            <button
              onClick={onBackToPlaylist}
              className="bg-dark-grey hover:bg-teal hover:text-almost-black text-light-grey px-3 py-2 rounded transition-colors text-sm"
            >
              Back to Playlist
            </button>
          )}
          <button
            onClick={onToggleFullscreen}
            className="bg-dark-grey hover:bg-teal hover:text-almost-black text-light-grey p-2 rounded transition-colors"
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="relative">
        {currentVideoId && !isFullscreen && playlistVideos.length > 1 && (
          <button
            onClick={onPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-dark-grey bg-opacity-70 hover:bg-teal text-light-grey hover:text-almost-black h-12 w-12 rounded-full flex items-center justify-center transition-all"
            aria-label="Previous Video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div
          ref={playerContainerRef}
          className={`relative overflow-hidden rounded-lg shadow-2xl ${isFullscreen ? 'h-full' : 'aspect-video'}`}
        >
          {shouldLoadEmbed ? (
            <iframe
              ref={iframeRef}
              src={buildEmbedSrc(currentVideoId, playlistId)}
              title="Crypto Waffle YouTube Playlist"
              className="absolute top-0 left-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <button
              type="button"
              onClick={() => setShouldLoadEmbed(true)}
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-almost-black via-dark-grey to-almost-black text-light-grey flex flex-col items-center justify-center gap-3 hover:text-yellow transition-colors"
            >
              <span className="text-lg font-semibold">Click to load the YouTube playlist</span>
              <span className="text-sm text-mid-grey">Lazy-loaded to keep the page fast</span>
            </button>
          )}
        </div>

        {currentVideoId && !isFullscreen && playlistVideos.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-dark-grey bg-opacity-70 hover:bg-teal text-light-grey hover:text-almost-black h-12 w-12 rounded-full flex items-center justify-center transition-all"
            aria-label="Next Video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {currentVideoId && !isFullscreen && (
        <div className="mt-4 text-center">
          <p className="text-light-grey">
            Episode {currentVideoIndex + 1} of {playlistVideos.length}:{' '}
            <span className="text-teal">{playlistVideos[currentVideoIndex].title}</span>
          </p>
        </div>
      )}

      {isFullscreen && (
        <button
          onClick={onToggleFullscreen}
          className="absolute top-4 right-4 bg-almost-black text-light-grey p-2 rounded-full hover:bg-teal hover:text-almost-black transition-colors"
          aria-label="Close Fullscreen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </motion.div>
  );
};
