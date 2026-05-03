import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RentKSA - Premium Car Rental in Saudi Arabia',
  description: 'Transparent per-kilometer car rental across Saudi Arabia. Browse premium cars, estimate your trip cost instantly, and book in minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
