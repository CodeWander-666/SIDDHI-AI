import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { KIProvider } from '@/context/KIContext';
import StructuredData from '@/components/StructuredData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalki Technologies | Private AI · Digital Marketing · Cloud',
  description: 'Kalki Intelligency (KI) – open‑source AI that runs in your browser. Zero data centre, total privacy.',
  keywords: 'AI digital marketing, Kalki Intelligency, open source AI, SEO India, social media automation, Google Maps SEO, LinkedIn growth, website development India, AI automation',
  authors: [{ name: 'Kalki Technologies' }],
  openGraph: {
    title: 'Kalki Technologies – AI That Respects Your Privacy',
    description: 'Run powerful AI entirely inside your browser. No data leaves your device.',
    url: 'https://kalkicore.vercel.app',
    siteName: 'Kalkicore',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://kalkicore.vercel.app/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalki Technologies – AI That Respects Your Privacy',
    description: 'Run powerful AI entirely inside your browser. No data leaves your device.',
    images: ['https://kalkicore.vercel.app/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://kalkicore.vercel.app',
    languages: {
      en: 'https://kalkicore.vercel.app',
      hi: 'https://kalkicore.vercel.app/hi',
    },
  },
  verification: {
    google: 'mXzGHeQy9yGNuw8JTuzgXdDUn-gUcj4C65Jt83rcK9A',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="mXzGHeQy9yGNuw8JTuzgXdDUn-gUcj4C65Jt83rcK9A" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="revisit-after" content="7 days" />
      </head>
      <body>
        <KIProvider>
          <Header />
          <main className="relative z-10">{children}</main>
          <Footer />
          <StructuredData />
        </KIProvider>
      </body>
    </html>
  );
}
