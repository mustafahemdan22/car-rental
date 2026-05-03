import { NextRequest, NextResponse } from 'next/server';

const defaultLocale = 'en';
const locales = ['en', 'ar'];

function isValidLocale(value: string): boolean {
  return locales.includes(value);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a valid locale prefix
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  if (firstSegment && isValidLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Detect preferred locale from cookie or Accept-Language header
  const cookieLocale = request.cookies.get('locale')?.value;
  let detectedLocale = defaultLocale;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    detectedLocale = cookieLocale;
  } else {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferred = acceptLanguage.split(',').map((l) => l.split(';')[0].trim().substring(0, 2));
    const match = preferred.find((l) => locales.includes(l));
    if (match) detectedLocale = match;
  }

  // Redirect to the localized path
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
