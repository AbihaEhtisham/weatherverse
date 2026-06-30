import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css' ;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WeatherVerse — Full Stack Weather Intelligence Platform',
  description:
    'WeatherVerse provides real-time weather data, 5-day forecasts, trip planning, activity recommendations, and more. Built for the PM Accelerator Technical Assessment.',
  openGraph: {
    title: 'WeatherVerse — Weather Intelligence Platform',
    description: 'Real-time weather, forecasts, trip planning, and smart recommendations.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
