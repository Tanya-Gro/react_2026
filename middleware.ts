import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

const proxyHandler = createMiddleware({ ...routing, localeDetection: false });

export default function proxy(request: any) {
  return proxyHandler(request);
}

export const config = {
  matcher: ['/', '/(ru|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
