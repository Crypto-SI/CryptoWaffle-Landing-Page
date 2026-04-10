import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type InstagramEdge = {
  node?: {
    id?: string;
    shortcode?: string;
    display_url?: string;
    thumbnail_src?: string;
    is_video?: boolean;
    edge_media_to_caption?: {
      edges?: Array<{ node?: { text?: string } }>;
    };
  };
};

const INSTAGRAM_REQUEST_HEADERS = {
  accept: '*/*',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  origin: 'https://www.instagram.com',
  referer: 'https://www.instagram.com/cryptowaffle/',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
  'x-ig-app-id': '936619743392459',
  'x-requested-with': 'XMLHttpRequest',
};

const INSTAGRAM_IMAGE_HEADERS = {
  accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  referer: 'https://www.instagram.com/',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = Math.min(Number(searchParams.get('count') || '3'), 6);

  try {
    const response = await fetch(
      'https://www.instagram.com/api/v1/users/web_profile_info/?username=cryptowaffle',
      {
        headers: INSTAGRAM_REQUEST_HEADERS,
        next: { revalidate: 1800 },
      }
    );

    if (!response.ok) {
      throw new Error(`Instagram request failed with ${response.status}`);
    }

    const data = await response.json();
    const edges: InstagramEdge[] = data?.data?.user?.edge_owner_to_timeline_media?.edges || [];

    const posts = await Promise.all(
      edges.slice(0, count).map(async ({ node }) => {
        const imageSource = node?.thumbnail_src || node?.display_url || '';
        let imageUrl = '';

        if (imageSource) {
          try {
            const imageResponse = await fetch(imageSource, {
              headers: INSTAGRAM_IMAGE_HEADERS,
              next: { revalidate: 1800 },
            });

            if (imageResponse.ok) {
              const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
              const arrayBuffer = await imageResponse.arrayBuffer();
              const base64 = Buffer.from(arrayBuffer).toString('base64');
              imageUrl = `data:${contentType};base64,${base64}`;
            }
          } catch (imageError) {
            console.error('Instagram inline image error:', imageError);
          }
        }

        return {
          id: node?.id || '',
          shortcode: node?.shortcode || '',
          permalink: `https://www.instagram.com/p/${node?.shortcode || ''}/`,
          imageUrl,
          caption: node?.edge_media_to_caption?.edges?.[0]?.node?.text || '',
          isVideo: Boolean(node?.is_video),
        };
      })
    );

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Instagram social feed error:', error);
    return NextResponse.json(
      { posts: [], error: 'Unable to load Instagram posts.' },
      { status: 500 }
    );
  }
}
