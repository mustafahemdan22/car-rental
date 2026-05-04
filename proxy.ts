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

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

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

  const targetPath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(new URL(targetPath, request.url));
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
