import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RentKSA - Premium Car Rental in Saudi Arabia',
  description: 'Transparent per-kilometer car rental across Saudi Arabia. Browse premium cars, estimate your trip cost instantly, and book in minutes.',
  verification: {
    google: 'o_n3k5RSTdI1lD5b3b1i877d8e4j2fD89g49h709aQk', // Google Search Console verification
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
