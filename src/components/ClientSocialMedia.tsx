'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

import TikTokCreatorEmbed from './TikTokCreatorEmbed';
import { usePlaylistVideos } from './youtube/usePlaylistVideos';
import { currentChannelSource } from '../data/youtubeSources';

type SocialPlatform = 'instagram' | 'tiktok' | 'youtube';

type InstagramPost = {
  id: string;
  shortcode: string;
  permalink: string;
  imageUrl: string;
  caption: string;
  isVideo: boolean;
};

const CARD_ORDER: SocialPlatform[] = ['instagram', 'tiktok', 'youtube'];

const cardMeta: Record<
  SocialPlatform,
  {
    label: string;
    handle: string;
    href: string;
    description: string;
    accentClassName: string;
    icon: React.ElementType;
  }
> = {
  instagram: {
    label: 'Instagram',
    handle: '@cryptowaffle',
    href: 'https://www.instagram.com/cryptowaffle/',
    description: 'The latest grid posts, quick market visuals, and show promos from the main Instagram feed.',
    accentClassName: 'from-pink-500/35 via-yellow/10 to-transparent',
    icon: FaInstagram,
  },
  tiktok: {
    label: 'TikTok',
    handle: '@crypto_waffle_',
    href: 'https://www.tiktok.com/@crypto_waffle_',
    description: 'Live creator embed with recent TikToks and a direct route back to the profile.',
    accentClassName: 'from-white/12 via-teal/10 to-transparent',
    icon: SiTiktok,
  },
  youtube: {
    label: 'YouTube',
    handle: '@CryptoWaffleTV',
    href: 'https://www.youtube.com/@CryptoWaffleTV',
    description: 'Fresh long-form episodes from the latest CryptoWaffleTV playlist.',
    accentClassName: 'from-red-500/30 via-yellow/10 to-transparent',
    icon: FaYoutube,
  },
};

const ClientSocialMedia = () => {
  const [activeCard, setActiveCard] = useState<SocialPlatform>('instagram');
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [instagramError, setInstagramError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch('/api/social/instagram?count=3');
        if (!response.ok) {
          throw new Error('Failed to load Instagram posts');
        }

        const data = await response.json();
        setInstagramPosts(Array.isArray(data?.posts) ? data.posts : []);
        setInstagramError(null);
      } catch (error) {
        console.error('Instagram feed error:', error);
        setInstagramError('Unable to load recent Instagram posts right now.');
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <section id="socials" className="border-t border-dark-grey bg-almost-black px-4 py-20 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-teal">
            Follow Crypto Waffle
          </p>
          <h2 className="mb-6 text-3xl font-bold text-yellow md:text-4xl">
            Watch The Feed Unfold
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-light-grey md:text-xl">
            Browse the latest content from Instagram, TikTok, and YouTube. On mobile, tap a channel to switch views.
          </p>
        </motion.div>

        <div className="mb-6 grid grid-cols-3 gap-3 lg:hidden">
          {CARD_ORDER.map((platform) => {
            const meta = cardMeta[platform];
            const Icon = meta.icon;
            const isActive = activeCard === platform;

            return (
              <button
                key={`${platform}-mobile-toggle`}
                type="button"
                onClick={() => setActiveCard(platform)}
                className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-teal bg-dark-grey text-teal'
                    : 'border-white/10 bg-dark-grey/60 text-light-grey'
                }`}
                aria-pressed={isActive}
              >
                <Icon className={platform === 'tiktok' ? 'text-yellow' : ''} />
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 lg:h-[560px] lg:flex-row lg:items-stretch">
          {CARD_ORDER.map((platform) => {
            const meta = cardMeta[platform];
            const Icon = meta.icon;
            const isActive = activeCard === platform;
            const shouldHideExpandedHeader = platform === 'tiktok' && isActive;
            const shouldCenterExpandedHeader = isActive && platform !== 'tiktok';

            return (
              <motion.article
                key={platform}
                layout
                onMouseEnter={() => setActiveCard(platform)}
                onFocusCapture={() => setActiveCard(platform)}
                onClick={() => setActiveCard(platform)}
                className={`group relative overflow-hidden rounded-[32px] border bg-dark-grey/80 shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition-all duration-500 lg:h-full ${
                  isActive ? 'border-teal' : 'hidden border-dark-grey lg:block'
                } ${
                  isActive ? 'lg:flex-[2.35]' : 'lg:flex-[0.78]'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${meta.accentClassName} opacity-90`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_45%)] opacity-60" />

                <div className="relative z-10 flex h-full min-h-[340px] flex-col lg:h-full lg:min-h-0">
                  <div className={`${isActive ? 'hidden' : 'hidden lg:flex'} h-full flex-col items-center justify-center gap-10 px-5 py-6`}>
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-almost-black/70 text-2xl text-teal transition-colors duration-300">
                      <Icon className={platform === 'tiktok' ? 'text-yellow' : ''} />
                    </div>
                    <div className="flex items-center gap-4 [writing-mode:vertical-rl] rotate-180">
                      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-teal">
                        {meta.label}
                      </span>
                    </div>
                  </div>

                  <div className={`${isActive ? 'flex' : 'hidden'} h-full min-h-0 flex-col overflow-hidden p-4 sm:p-6`}>
                    <div className={`${shouldHideExpandedHeader ? 'lg:hidden' : ''} mb-8 ${shouldCenterExpandedHeader ? 'text-center' : ''}`}>
                      <a
                        href={meta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${meta.label}`}
                        className={`mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-almost-black/70 text-2xl text-teal transition-colors hover:text-yellow ${shouldCenterExpandedHeader ? 'mx-auto' : ''}`}
                      >
                        <Icon className={platform === 'tiktok' ? 'text-yellow' : ''} />
                      </a>
                      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-teal">
                        {meta.label}
                      </p>
                      <h3 className="text-3xl font-bold leading-tight text-light-grey">
                        {meta.handle}
                      </h3>
                    </div>

                    <div className="min-h-0 flex-1 overflow-hidden">
                      {platform === 'instagram' && (
                        <InstagramPreview posts={instagramPosts} error={instagramError} profileHref={meta.href} />
                      )}

                      {platform === 'tiktok' && (
                        <div className={`overflow-hidden rounded-[28px] border border-white/10 bg-almost-black/25 ${shouldHideExpandedHeader ? 'h-full p-0' : 'h-full max-h-full p-2 sm:p-3'}`}>
                          <div className={`overflow-hidden bg-white ${shouldHideExpandedHeader ? 'h-full rounded-[28px]' : 'h-full rounded-[22px]'}`}>
                            <TikTokCreatorEmbed
                              profileUrl={meta.href}
                              handle={meta.handle}
                            />
                          </div>
                        </div>
                      )}

                      {platform === 'youtube' && (
                        <YouTubePreview profileHref={meta.href} />
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const InstagramPreview = ({
  posts,
  error,
  profileHref,
}: {
  posts: InstagramPost[];
  error: string | null;
  profileHref: string;
}) => {
  if (error) {
    return (
      <a
        href={profileHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full min-h-[260px] flex-col justify-between rounded-[28px] border border-white/10 bg-almost-black/35 p-5"
      >
        <p className="text-light-grey/90">{error}</p>
        <span className="text-sm font-bold uppercase tracking-[0.25em] text-yellow">Open Instagram</span>
      </a>
    );
  }

  if (!posts.length) {
    return (
      <div className="flex h-full min-h-[260px] items-center justify-center rounded-[28px] border border-white/10 bg-almost-black/35 p-5 text-light-grey/80">
        Loading Instagram posts...
      </div>
    );
  }

  return (
    <div className="grid h-full min-h-[260px] grid-cols-3 gap-3 overflow-hidden">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group/post relative overflow-hidden rounded-[24px] border border-white/10 bg-almost-black/30"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt="Instagram post thumbnail"
            className="h-full w-full object-cover transition-transform duration-500 group-hover/post:scale-105"
          />
          {post.isVideo && (
            <span className="absolute right-3 top-3 rounded-full bg-almost-black/80 px-2 py-1 text-xs font-bold uppercase tracking-[0.2em] text-yellow">
              Reel
            </span>
          )}
        </a>
      ))}
    </div>
  );
};

const YouTubePreview = ({ profileHref }: { profileHref: string }) => {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const { playlistVideos, isLoading, error } = usePlaylistVideos(apiKey, currentChannelSource);
  const videos = playlistVideos.slice(0, 2);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[260px] items-center justify-center rounded-[28px] border border-white/10 bg-almost-black/35 p-5 text-light-grey/80">
        Loading YouTube videos...
      </div>
    );
  }

  if (!videos.length) {
    return (
      <a
        href={profileHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full min-h-[260px] flex-col justify-between rounded-[28px] border border-white/10 bg-almost-black/35 p-5"
      >
        <p className="text-light-grey/90">{error || 'Unable to load recent YouTube content right now.'}</p>
        <span className="text-sm font-bold uppercase tracking-[0.25em] text-yellow">Open YouTube</span>
      </a>
    );
  }

  return (
    <div className="grid h-full min-h-[260px] gap-3 overflow-hidden">
      {videos.map((video, index) => (
        <a
          key={video.id}
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/video relative overflow-hidden rounded-[24px] border border-white/10 bg-almost-black/30 ${
            index === 0 ? 'min-h-[160px]' : 'min-h-[112px]'
          }`}
          onMouseEnter={() => setHoveredVideoId(video.id)}
          onMouseLeave={() => setHoveredVideoId((current) => (current === video.id ? null : current))}
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            setCursorPosition({
              x: event.clientX - bounds.left,
              y: event.clientY - bounds.top,
            });
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover/video:scale-105"
          />
          {hoveredVideoId === video.id && (
            <div
              className="pointer-events-none absolute z-20 hidden max-w-[220px] rounded-full border border-teal/40 bg-almost-black/90 px-4 py-2 text-xs font-semibold text-light-grey shadow-[0_12px_30px_rgba(0,0,0,0.28)] lg:block"
              style={{
                left: Math.min(cursorPosition.x + 16, 180),
                top: Math.max(cursorPosition.y - 18, 12),
              }}
            >
              {video.title}
            </div>
          )}
        </a>
      ))}
    </div>
  );
};

export default ClientSocialMedia;
