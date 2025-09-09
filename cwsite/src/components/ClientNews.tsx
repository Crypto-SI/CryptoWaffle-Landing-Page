'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NewsArticle {
  title: string;
  excerpt: string;
  link: string;
  imageUrl: string;
  publishedAt: string;
  error?: boolean;
  scraped?: boolean;
}

const ClientNews = () => {
  const [news, setNews] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
        setError(data.error || false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(true);
        setNews({
          title: 'Latest Crypto News',
          excerpt: 'Unable to fetch latest news. Please check back later.',
          link: 'https://news.cryptowaffle.fun',
          imageUrl: '',
          publishedAt: new Date().toISOString(),
          error: true
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    
    // Refresh news every 30 minutes
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="news" className="py-20 px-4 md:px-8 bg-gradient-to-b from-almost-black to-dark-grey">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-teal bg-opacity-20 rounded mx-auto mb-4 w-48"></div>
              <div className="h-4 bg-dark-grey rounded mx-auto mb-2 w-64"></div>
              <div className="h-4 bg-dark-grey rounded mx-auto w-56"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-20 px-4 md:px-8 bg-gradient-to-b from-almost-black to-dark-grey">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Latest Crypto News</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Stay updated with the latest cryptocurrency news and market insights from our news platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`bg-dark-grey rounded-lg overflow-hidden shadow-lg ${
            error ? 'border border-yellow border-opacity-30' : ''
          }`}
        >
          <div className="p-8">
            {news && (
              <>
                {/* No longer showing images - just headlines and content */}
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-yellow mb-4 md:mb-0">
                    {news.title}
                  </h3>
                  <div className="flex items-center text-teal text-sm md:text-base">
                    <span className="mr-2">📅</span>
                    {formatDate(news.publishedAt)}
                  </div>
                </div>
                
                <p className="text-lg text-light-grey mb-8 leading-relaxed">
                  {news.excerpt}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal text-almost-black font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 inline-flex items-center"
                  >
                    <span className="mr-2">📰</span>
                    Read Full Article
                  </a>
                  
                  {error && (
                    <div className="text-yellow text-sm flex items-center">
                      <span className="mr-2">⚠️</span>
                      Showing fallback content
                    </div>
                  )}
                  
                  {news.scraped && !error && (
                    <div className="text-teal text-sm flex items-center">
                      <span className="mr-2">🔄</span>
                      Auto-updated from news site
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <a 
            href="https://news.cryptowaffle.fun" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-teal hover:text-yellow transition-colors font-medium"
          >
            Visit News Site →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientNews;