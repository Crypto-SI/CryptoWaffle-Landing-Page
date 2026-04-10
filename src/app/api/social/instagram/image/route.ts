const INSTAGRAM_HEADERS = {
  accept: '*/*',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  origin: 'https://www.instagram.com',
  referer: 'https://www.instagram.com/cryptowaffle/',
  'sec-fetch-dest': 'image',
  'sec-fetch-mode': 'no-cors',
  'sec-fetch-site': 'cross-site',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('src');

  if (!source) {
    return new Response('Missing src', { status: 400 });
  }

  try {
    const imageResponse = await fetch(source, {
      headers: INSTAGRAM_HEADERS,
      next: { revalidate: 1800 },
    });

    if (!imageResponse.ok) {
      throw new Error(`Instagram image request failed with ${imageResponse.status}`);
    }

    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await imageResponse.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'content-type': contentType,
        'cache-control': 'public, s-maxage=1800, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Instagram image proxy error:', error);
    return new Response('Unable to load image', { status: 500 });
  }
}
