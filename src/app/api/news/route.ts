import { NextResponse } from 'next/server';

// WordPress-specific HTML parser focusing only on headlines (titles)
function extractContent(html: string): { title: string; excerpt: string; imageUrl: string; articleLink: string } {
  let title = '';
  let excerpt = '';
  let imageUrl = ''; // No longer pulling images
  let articleLink = 'https://news.cryptowaffle.fun';

  // Clean HTML by removing script and style tags and decode all HTML entities
  const cleanHtml = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                       .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                       .replace(/&nbsp;/g, ' ')
                       .replace(/</g, '<')
                       .replace(/>/g, '>')
                       .replace(/&/g, '&')
                       .replace(/&#13;/g, ' ')
                       .replace(/&#8211;/g, '-')     // Convert en dash
                       .replace(/&#8212;/g, '—')     // Convert em dash
                       .replace(/&#8230;/g, '...')   // Convert ellipsis
                       .replace(/&#8220;/g, '"')     // Convert left double quote
                       .replace(/&#8221;/g, '"')     // Convert right double quote
                       .replace(/&#8216;/g, "'")     // Convert left single quote
                       .replace(/&#8217;/g, "'")     // Convert right single quote
                       .replace(/&#82.../g, '')      // Remove truncated entities like &#82...
                       .replace(/&mdash;/g, '—')     // Convert em dash
                       .replace(/&ndash;/g, '-')     // Convert en dash
                       .replace(/&hellip;/g, '...')  // Convert ellipsis
                       .replace(/"/g, '"')     // Convert quotes
                       .replace(/'/g, "'")     // Convert apostrophes
                       .replace(/\s+/g, ' ')
                       .trim();

  // WordPress-specific title patterns based on official documentation
  // Focus only on main post titles, avoid meta titles, navigation titles, etc.
  const titlePatterns = [
    // Main post title in article header (highest priority)
    /<article[^>]*>[\s\S]*?<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>(.*?)<\/h1>/gi,
    /<article[^>]*>[\s\S]*?<h2[^>]*class="[^"]*entry-title[^"]*"[^>]*>(.*?)<\/h2>/gi,
    /<article[^>]*>[\s\S]*?<h1[^>]*class="[^"]*post-title[^"]*"[^>]*>(.*?)<\/h1>/gi,
    /<article[^>]*>[\s\S]*?<h2[^>]*class="[^"]*post-title[^"]*"[^>]*>(.*?)<\/h2>/gi,
    // Entry header titles
    /<header[^>]*class="[^"]*entry-header[^"]*"[^>]*>[\s\S]*?<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>(.*?)<\/h1>/gi,
    /<header[^>]*class="[^"]*entry-header[^"]*"[^>]*>[\s\S]*?<h2[^>]*class="[^"]*entry-title[^"]*"[^>]*>(.*?)<\/h2>/gi,
    // General entry titles (fallback)
    /<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>(.*?)<\/h1>/gi,
    /<h2[^>]*class="[^"]*entry-title[^"]*"[^>]*>(.*?)<\/h2>/gi,
    /<h1[^>]*class="[^"]*post-title[^"]*"[^>]*>(.*?)<\/h1>/gi,
    /<h2[^>]*class="[^"]*post-title[^"]*"[^>]*>(.*?)<\/h2>/gi,
    // Last resort - any h1 or h2 in article
    /<article[^>]*>[\s\S]*?<h1[^>]*>(.*?)<\/h1>/gi,
    /<article[^>]*>[\s\S]*?<h2[^>]*>(.*?)<\/h2>/gi
  ];

  for (const pattern of titlePatterns) {
    const match = cleanHtml.match(pattern);
    if (match && match[1]) {
      let extractedTitle = match[1].replace(/<[^>]*>/g, '').trim();
      
      // Filter out common non-article titles based on WordPress patterns
      if (extractedTitle.length > 10 && // Reasonable title length
          !extractedTitle.includes('Home') &&
          !extractedTitle.includes('About') &&
          !extractedTitle.includes('Contact') &&
          !extractedTitle.includes('Privacy') &&
          !extractedTitle.includes('Terms') &&
          !extractedTitle.includes('Menu') &&
          !extractedTitle.includes('Search') &&
          !extractedTitle.includes('Navigation') &&
          !extractedTitle.includes('Footer') &&
          !extractedTitle.includes('Header') &&
          !extractedTitle.includes('Sidebar') &&
          !extractedTitle.toLowerCase().includes('cryptowaffle') && // Avoid site name
          !extractedTitle.match(/^[\d\s\-\–\—]+$/)) { // Avoid numbers-only titles
        title = extractedTitle;
        break;
      }
    }
  }

  // Extract excerpt - only if we have a valid title
  if (title) {
    const excerptPatterns = [
      // First paragraph after title (most likely to be actual content)
      /<article[^>]*>[\s\S]*?<h[1-2][^>]*>[\s\S]*?<\/h[1-2]>[\s\S]*?<p[^>]*>(.*?)<\/p>/gi,
      /<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>[\s\S]*?<p[^>]*>(.*?)<\/p>/gi,
      /<div[^>]*class="[^"]*post-content[^"]*"[^>]*>[\s\S]*?<p[^>]*>(.*?)<\/p>/gi,
      // Any paragraph in article
      /<article[^>]*>[\s\S]*?<p[^>]*>(.*?)<\/p>/gi
    ];

    for (const pattern of excerptPatterns) {
      const match = cleanHtml.match(pattern);
      if (match && match[1]) {
        let extractedText = match[1].replace(/<[^>]*>/g, '').trim();
        
        // Remove author and date info commonly found in first paragraph
        extractedText = extractedText.replace(/By\s+[A-Za-z\s]+/gi, '');
        extractedText = extractedText.replace(/[A-Za-z]{3,9}\s+\d{1,2},\s+\d{4}/gi, '');
        extractedText = extractedText.replace(/\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)/gi, '');
        extractedText = extractedText.replace(/\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}/gi, '');
        
        // Only use if it looks like real content (not metadata)
        if (extractedText.length > 20 &&
            !extractedText.includes('Read more') &&
            !extractedText.includes('Continue reading') &&
            !extractedText.toLowerCase().includes('cryptowaffle')) {
          excerpt = extractedText.length > 150 ? extractedText.substring(0, 150) + '...' : extractedText;
          break;
        }
      }
    }
  }

  // WordPress post link patterns - only if we have a valid title
  if (title) {
    const linkPatterns = [
      // Permalink in WordPress post header (most reliable)
      /<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>[\s\S]*?<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gi,
      /<h2[^>]*class="[^"]*entry-title[^"]*"[^>]*>[\s\S]*?<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gi,
      // Read more links
      /<a[^>]+href="([^"]+)"[^>]*class="[^"]*more-link[^"]*"[^>]*>(.*?)<\/a>/gi,
      /<a[^>]+href="([^"]+)"[^>]*class="[^"]*read-more[^"]*"[^>]*>(.*?)<\/a>/gi,
      // Article links
      /<article[^>]*>[\s\S]*?<a[^>]+href="([^"]+)"[^>]*>/gi
    ];

    for (const pattern of linkPatterns) {
      const match = cleanHtml.match(pattern);
      if (match && match[1]) {
        let linkHref = match[1];
        // Convert relative URL to absolute
        if (linkHref.startsWith('/')) {
          linkHref = `https://news.cryptowaffle.fun${linkHref}`;
        } else if (!linkHref.startsWith('http')) {
          linkHref = `https://news.cryptowaffle.fun/${linkHref}`;
        }
        // Skip links that are clearly not article links
        if (!linkHref.includes('javascript:') &&
            !linkHref.includes('#') &&
            !linkHref.includes('wp-admin') &&
            !linkHref.includes('upload.php') &&
            !linkHref.includes('search') &&
            !linkHref.includes('category') &&
            !linkHref.includes('tag')) {
          articleLink = linkHref;
          break;
        }
      }
    }
  }

  return { title, excerpt, imageUrl: '', articleLink };
}

export async function GET() {
  try {
    // Fetch the news site HTML
    const response = await fetch('https://news.cryptowaffle.fun');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch news site: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Extract content using improved string parsing
    const extractedContent = extractContent(html);
    
    // Use extracted content or fallback to defaults
    const title = extractedContent.title || 'Latest Crypto News';
    const excerpt = extractedContent.excerpt ||
      (extractedContent.title ? 'Visit our news site to read the full article.' : 'Visit our news site for the latest cryptocurrency updates and market insights.');
    
    return NextResponse.json({
      title: title,
      excerpt: excerpt,
      link: extractedContent.articleLink,
      imageUrl: extractedContent.imageUrl,
      publishedAt: new Date().toISOString(),
      error: false,
      scraped: true
    });
    
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Return fallback news data if fetch fails
    return NextResponse.json({
      title: 'Latest Crypto News',
      excerpt: 'Unable to fetch latest news. Please visit our news site directly for the latest cryptocurrency updates.',
      link: 'https://news.cryptowaffle.fun',
      imageUrl: '',
      publishedAt: new Date().toISOString(),
      error: true
    });
  }
}