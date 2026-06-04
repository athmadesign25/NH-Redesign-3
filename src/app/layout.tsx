import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import QueryProvider from '@/providers/QueryProvider';
import AIAssistant from '@/components/ai/AIAssistant';
import FloatingActionButton from '@/components/ui/FloatingActionButton';

export const metadata: Metadata = {
  title: {
    default: 'Narayana Health — Trusted Care, Every Day',
    template: '%s | Narayana Health',
  },
  description: 'Narayana Health is India\'s leading hospital network with 24+ hospitals, 30+ specialities, and 2.5M+ patients treated. Book appointments, find doctors, and access world-class healthcare.',
  keywords: ['Narayana Health', 'hospitals India', 'cardiac surgery', 'cancer care', 'book doctor appointment', 'best hospital Bangalore', 'NH hospitals'],
  authors: [{ name: 'Narayana Health' }],
  creator: 'Narayana Health',
  publisher: 'Narayana Hrudayalaya Ltd.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.narayanahealth.org',
    siteName: 'Narayana Health',
    title: 'Narayana Health — Trusted Care, Every Day',
    description: '24+ hospitals. 30+ specialities. 2.5M+ patients. World-class healthcare made affordable.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Narayana Health' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Narayana Health — Trusted Care, Every Day',
    description: '24+ hospitals. 30+ specialities. World-class healthcare made affordable.',
    creator: '@narayanahealth',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#034EA2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <QueryProvider>
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <AIAssistant />
          <FloatingActionButton />
        </QueryProvider>
      </body>
    </html>
  );
}
