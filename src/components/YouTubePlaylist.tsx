import React from 'react';
import { motion } from 'framer-motion';

const YouTubePlaylist = () => {
  const playlistId = 'PLmFN-F-XHywZZLYh95RFY0utC2TeYRZMm';
  
  return (
    <section id="videos" className="py-20 px-4 md:px-8 bg-gradient-to-b from-dark-grey to-almost-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Watch Previous Episodes</h2>
          <p className="text-lg max-w-3xl mx-auto">
            Catch up on our previous episodes discussing crypto trends, market analysis, 
            and technical insights. Don't miss out on valuable knowledge shared by our experts!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl"
        >
          <iframe
            src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
            title="Crypto Waffle YouTube Playlist"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
        
        <div className="text-center mt-8">
          <a 
            href={`https://www.youtube.com/playlist?list=${playlistId}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-teal hover:text-yellow transition-colors font-medium"
          >
            Open full playlist on YouTube →
          </a>
        </div>
      </div>
    </section>
  );
};

export default YouTubePlaylist; 