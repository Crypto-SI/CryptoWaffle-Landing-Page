'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { AnimatedHeading } from './youtube/AnimatedHeading';
import { buildEmbedSrc } from './youtube/embed';
import { VIDEOS_PER_PAGE } from './youtube/constants';
import { EpisodeSelection } from './youtube/EpisodeSelection';
import { FeaturedEpisode } from './youtube/FeaturedEpisode';
import { PlayerSection } from './youtube/PlayerSection';
import { ErrorMessage, LoadingState } from './youtube/StatusMessages';
import { SubscribeCTA } from './youtube/SubscribeCTA';
import { usePlaylistVideos } from './youtube/usePlaylistVideos';
import { YouTubeSource } from './youtube/types';
import { currentChannelSource } from '../data/youtubeSources';

type ClientYouTubePlaylistProps = {
  source?: YouTubeSource;
  heading?: string;
  description?: string;
  sectionId?: string;
  supportingLink?: {
    href: string;
    label: string;
    description: string;
  };
};

const ClientYouTubePlaylist = ({
  source = currentChannelSource,
  heading = 'Latest Episodes',
  description,
  sectionId = 'episodes',
  supportingLink
}: ClientYouTubePlaylistProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [shouldLoadEmbed, setShouldLoadEmbed] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [isPastEpisodesHovered, setIsPastEpisodesHovered] = useState(false);
  const [isSubscribeHovered, setIsSubscribeHovered] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const sectionDescription =
    description ||
    'Catch up on the newest CryptoWaffleTV episodes, then jump into the archive whenever you want the older catalog.';

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { playlistVideos, isLoading, error, resolvedPlaylistId } = usePlaylistVideos(apiKey, source);

  useEffect(() => {
    if (shouldLoadEmbed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadEmbed(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );

    if (playerContainerRef.current) {
      observer.observe(playerContainerRef.current);
    }

    return () => observer.disconnect();
  }, [shouldLoadEmbed]);

  const playVideo = (videoId: string, index: number) => {
    setShouldLoadEmbed(true);
    setPlayerVisible(true);
    setCurrentVideoId(videoId);
    setCurrentVideoIndex(index);

    if (iframeRef.current) {
      iframeRef.current.src = buildEmbedSrc(videoId, resolvedPlaylistId);
    }
  };

  const playPreviousVideo = () => {
    if (playlistVideos.length === 0) return;
    const newIndex = currentVideoIndex > 0 ? currentVideoIndex - 1 : playlistVideos.length - 1;
    playVideo(playlistVideos[newIndex].videoId, newIndex);
  };

  const playNextVideo = () => {
    if (playlistVideos.length === 0) return;
    const newIndex = currentVideoIndex < playlistVideos.length - 1 ? currentVideoIndex + 1 : 0;
    playVideo(playlistVideos[newIndex].videoId, newIndex);
  };

  const nextPage = () => {
    const totalPages = Math.ceil(playlistVideos.length / VIDEOS_PER_PAGE);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    const totalPages = Math.ceil(playlistVideos.length / VIDEOS_PER_PAGE);
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const currentVideos = playlistVideos.slice(
    currentPage * VIDEOS_PER_PAGE,
    (currentPage + 1) * VIDEOS_PER_PAGE
  );
  const featuredVideo = playlistVideos[0];

  return (
    <section id={sectionId} className="py-20 px-4 md:px-8 bg-almost-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <AnimatedHeading
            text={heading}
            className="text-3xl md:text-4xl font-bold mb-6 inline-flex"
            isHovered={isPastEpisodesHovered}
            onHoverChange={setIsPastEpisodesHovered}
          />
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            {sectionDescription}
          </p>
          <p className="text-sm md:text-base text-mid-grey mt-4 uppercase tracking-[0.2em]">{source.title}</p>
        </motion.div>

        {isLoading && <LoadingState />}
        <ErrorMessage message={error} />

        {!isLoading && featuredVideo && !isFullscreen && (
          <FeaturedEpisode video={featuredVideo} onPlay={(videoId) => playVideo(videoId, 0)} />
        )}

        {!isLoading && playlistVideos.length > 0 && (
          <PlayerSection
            playlistVideos={playlistVideos}
            playlistId={resolvedPlaylistId}
            currentVideoId={currentVideoId}
            currentVideoIndex={currentVideoIndex}
            isFullscreen={isFullscreen}
            playerVisible={playerVisible}
            shouldLoadEmbed={shouldLoadEmbed}
            setShouldLoadEmbed={setShouldLoadEmbed}
            onBackToPlaylist={() => {
              setCurrentVideoId(null);
              setCurrentVideoIndex(0);
              setPlayerVisible(false);
              setIsFullscreen(false);
              if (iframeRef.current) {
                iframeRef.current.src = buildEmbedSrc(null, resolvedPlaylistId);
              }
            }}
            onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
            onPrevious={playPreviousVideo}
            onNext={playNextVideo}
            playerContainerRef={playerContainerRef}
            iframeRef={iframeRef}
          />
        )}

        {!isLoading && !currentVideoId && !isFullscreen && playlistVideos.length > 0 && !playerVisible && (
          <EpisodeSelection
            playlistVideos={playlistVideos}
            currentVideos={currentVideos}
            currentPage={currentPage}
            onSelect={playVideo}
            onPreviousPage={prevPage}
            onNextPage={nextPage}
            onSetPage={setCurrentPage}
          />
        )}

        {supportingLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            viewport={{ once: true }}
            className="mt-12 rounded-xl border border-mid-grey/30 bg-dark-grey p-6 text-center"
          >
            <p className="text-light-grey mb-4">{supportingLink.description}</p>
            <Link
              href={supportingLink.href}
              className="inline-flex items-center rounded-md border border-teal px-5 py-3 font-bold text-teal transition-all hover:bg-teal hover:text-almost-black"
            >
              {supportingLink.label}
            </Link>
          </motion.div>
        )}

        {!isFullscreen && (
          <SubscribeCTA
            href={source.primaryCtaUrl}
            label={source.primaryCtaLabel}
            description={source.description}
            isHovered={isSubscribeHovered}
            onHoverChange={setIsSubscribeHovered}
          />
        )}
      </div>
    </section>
  );
};

export default ClientYouTubePlaylist;
