import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'nonce-" + nonce + "' https://chimpstatic.com https://www.youtube.com https://www.gstatic.com",
    "style-src 'self' 'nonce-" + nonce + "' https://fonts.googleapis.com 'unsafe-inline'",
    "img-src 'self' data: https://i.ytimg.com",
    "font-src 'self' https://fonts.gstatic.com",
    "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
    "connect-src 'self' https://www.googleapis.com https://chimpstatic.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', csp);
  return response;
}

export const config = {
  matcher: '/:path*',
};
