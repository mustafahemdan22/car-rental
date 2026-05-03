import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { getMessages, getDirection, isValidLocale, defaultLocale } from '@/lib/i18n';
import { ThemeProvider } from '@/lib/theme';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { Locale } from '@/types';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dir = getDirection(locale);
  const messages = getMessages(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${ibmPlexArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent FOUC for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('rentksa-theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e){}
            `,
          }}
        />
      </head>
      <body className={`min-h-screen ${locale === 'ar' ? 'font-[var(--font-ibm-arabic)]' : 'font-[var(--font-inter)]'} antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar locale={locale} messages={messages} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} messages={messages} />
          </div>
          <Toaster
            position={dir === 'rtl' ? 'top-left' : 'top-right'}
            toastOptions={{
              className: '!bg-warm-900 !text-warm-50 dark:!bg-warm-100 dark:!text-warm-900 !text-sm !rounded-lg',
              duration: 3000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
