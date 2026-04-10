import React from 'react';
import { motion } from 'framer-motion';

import { VideoItem } from './types';

type FeaturedEpisodeProps = {
  video: VideoItem;
  onPlay: (videoId: string) => void;
};

export const FeaturedEpisode = ({ video, onPlay }: FeaturedEpisodeProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="mb-10 bg-dark-grey rounded-xl overflow-hidden shadow-2xl border border-almost-black"
  >
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="relative aspect-video lg:aspect-auto lg:h-full">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
      </div>
      <div className="lg:col-span-2 p-6 flex flex-col gap-4">
        <div className="text-sm text-mid-grey uppercase tracking-wide">Latest Episode</div>
        <h3 className="text-2xl font-bold text-yellow leading-tight">{video.title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-mid-grey">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-almost-black">
            🎥 On-demand
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-almost-black">
            🔔 Stay updated
          </span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            onClick={() => onPlay(video.videoId)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-teal px-5 py-3 font-bold text-almost-black transition-all hover:bg-opacity-90 sm:w-auto"
          >
            ▶️ Play Latest
          </button>
          <a
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-teal bg-dark-grey px-5 py-3 font-bold text-teal transition-all hover:bg-teal hover:text-almost-black sm:w-auto"
          >
            Open on YouTube
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);
