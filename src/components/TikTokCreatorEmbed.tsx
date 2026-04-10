'use client';

import React, { useEffect, useState } from 'react';

type TikTokCreatorEmbedProps = {
  profileUrl: string;
  handle: string;
};

declare global {
  interface Window {
    TikTokEmbedLoaded?: boolean;
  }
}

const TikTokCreatorEmbed = ({ profileUrl, handle }: TikTokCreatorEmbedProps) => {
  const [embedKey, setEmbedKey] = useState(0);

  useEffect(() => {
    const existingScript = document.querySelector('script[data-tiktok-embed-script="true"]');

    const script = document.createElement('script');
    script.src = `https://www.tiktok.com/embed.js?ts=${Date.now()}`;
    script.async = true;
    script.setAttribute('data-tiktok-embed-script', 'true');
    script.onload = () => {
      window.TikTokEmbedLoaded = true;
    };

    if (existingScript?.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }

    document.body.appendChild(script);
    setEmbedKey((current) => current + 1);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <blockquote
      key={embedKey}
      className="tiktok-embed"
      cite={profileUrl}
      data-unique-id={handle.replace('@', '')}
      data-embed-type="creator"
      style={{ maxWidth: '100%', minWidth: '100%' }}
    >
      <section>
        <a
          target="_blank"
          href={`${profileUrl}?refer=creator_embed`}
          rel="noopener noreferrer"
        >
          {handle}
        </a>
      </section>
    </blockquote>
  );
};

export default TikTokCreatorEmbed;
