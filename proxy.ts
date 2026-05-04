import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Detect user preferred language if visiting root path
  let locale = defaultLocale;
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || '';
    if (acceptLanguage.includes('ar')) {
      locale = 'ar';
    } else if (acceptLanguage.includes('en')) {
      locale = 'en';
    }
  }

  request.nextUrl.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};