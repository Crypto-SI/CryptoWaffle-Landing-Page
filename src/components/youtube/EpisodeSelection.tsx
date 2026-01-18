import React from 'react';
import { motion } from 'framer-motion';

import { VIDEOS_PER_PAGE } from './constants';
import { VideoItem } from './types';

type EpisodeSelectionProps = {
  playlistVideos: VideoItem[];
  currentVideos: VideoItem[];
  currentPage: number;
  onSelect: (videoId: string, index: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onSetPage: (page: number) => void;
};

export const EpisodeSelection = ({
  playlistVideos,
  currentVideos,
  currentPage,
  onSelect,
  onPreviousPage,
  onNextPage,
  onSetPage
}: EpisodeSelectionProps) => (
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
        Page {currentPage + 1} of {Math.ceil(playlistVideos.length / VIDEOS_PER_PAGE)}
      </div>
    </div>
    <p className="text-light-grey mb-6">Click any thumbnail below to start watching</p>

    <div className="relative">
      {playlistVideos.length > VIDEOS_PER_PAGE && (
        <>
          <button
            onClick={onPreviousPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-dark-grey bg-opacity-70 hover:bg-teal text-light-grey hover:text-almost-black h-10 w-10 rounded-full flex items-center justify-center transition-all"
            aria-label="Previous Page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={onNextPage}
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
            onClick={() => onSelect(video.videoId, currentPage * VIDEOS_PER_PAGE + index)}
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
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <h4 className="font-bold text-light-grey group-hover:text-yellow transition-colors line-clamp-2">
              {video.title}
            </h4>
          </motion.div>
        ))}
      </div>
    </div>

    {playlistVideos.length > VIDEOS_PER_PAGE && (
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.ceil(playlistVideos.length / VIDEOS_PER_PAGE) }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSetPage(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              currentPage === index ? 'bg-teal scale-125' : 'bg-dark-grey hover:bg-light-grey'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    )}
  </motion.div>
);
