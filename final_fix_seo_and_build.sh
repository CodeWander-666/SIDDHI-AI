#!/bin/bash
set -euo pipefail

echo "🔥 Final SEO fix – rebuilding layout, fixing 'use client', correcting robots/sitemap"

# 1. Rewrite layout.tsx completely with all meta tags inside <head>
cat > app/layout.tsx << 'LAYOUT_EOF'
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
LAYOUT_EOF

echo "✅ layout.tsx rewritten with proper metadata and meta tags."

# 2. Fix all service pages – move 'use client' to top
for service in seo social-media gmb-seo linkedin web-development ai-automation; do
  PAGE_FILE="app/services/$service/page.tsx"
  if [ -f "$PAGE_FILE" ]; then
    # Extract the content, ensure 'use client' is first line
    {
      echo "'use client';"
      # Remove existing 'use client' lines and VideoSchema import, then add back
      sed -e '/^'\''use client'\''/d' -e '/^import VideoSchema/d' "$PAGE_FILE" | cat
    } > "${PAGE_FILE}.tmp"
    # Add VideoSchema import after 'use client'
    sed -i "1a import VideoSchema from './video-schema';" "${PAGE_FILE}.tmp"
    mv "${PAGE_FILE}.tmp" "$PAGE_FILE"
    echo "✅ Fixed $PAGE_FILE"
  fi
done

# 3. Recreate robots.ts (dynamic route)
cat > app/robots.ts << 'ROBOTS_EOF'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kalkicore.vercel.app'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/ki_cloud.db', '/data/', '/public/ki-market/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
ROBOTS_EOF
echo "✅ app/robots.ts created."

# 4. Recreate sitemap.ts (dynamic route)
cat > app/sitemap.ts << 'SITEMAP_EOF'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kalkicore.vercel.app'
  const now = new Date()

  const staticPages = [
    { path: '', priority: 1.0, freq: 'weekly' },
    { path: 'ki-cloud', priority: 0.9, freq: 'weekly' },
    { path: 'digital-marketing', priority: 0.9, freq: 'weekly' },
    { path: 'plans', priority: 0.8, freq: 'weekly' },
    { path: 'services', priority: 0.8, freq: 'weekly' },
    { path: 'about', priority: 0.7, freq: 'monthly' },
    { path: 'vision', priority: 0.7, freq: 'monthly' },
    { path: 'hiring', priority: 0.6, freq: 'monthly' },
    { path: 'support', priority: 0.6, freq: 'monthly' },
    { path: 'contact', priority: 0.7, freq: 'weekly' },
    { path: 'chat', priority: 0.8, freq: 'weekly' },
  ]

  const services = [
    'seo', 'social-media', 'gmb-seo', 'linkedin', 'web-development', 'ai-automation'
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const page of staticPages) {
    entries.push({
      url: `${baseUrl}/${page.path}`,
      lastModified: now,
      changeFrequency: page.freq as any,
      priority: page.priority,
    })
  }

  for (const svc of services) {
    entries.push({
      url: `${baseUrl}/services/${svc}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}
SITEMAP_EOF
echo "✅ app/sitemap.ts created."

# 5. Ensure all video-schema components are correct (no 'use client' errors)
for service in seo social-media gmb-seo linkedin web-development ai-automation; do
  SCHEMA_FILE="app/services/$service/video-schema.tsx"
  if [ -f "$SCHEMA_FILE" ]; then
    # Ensure the schema component has 'use client' as first line
    {
      echo "'use client';"
      grep -v '^'\''use client'\''$' "$SCHEMA_FILE"
    } > "${SCHEMA_FILE}.tmp"
    mv "${SCHEMA_FILE}.tmp" "$SCHEMA_FILE"
  fi
done
echo "✅ Fixed video-schema components."

# 6. Clean and rebuild
rm -rf .next
echo "🧹 Cleaned .next cache."

# 7. Build
npm run build

echo ""
echo "🎉 Build successful! All SEO files and service pages are fixed."
echo "   • robots.txt available at /robots.txt"
echo "   • sitemap.xml available at /sitemap.xml"
echo "   • Google verification meta tag is in layout"
echo "   • All service pages have proper 'use client' order"
echo ""
echo "🚀 Deploy to Vercel and submit sitemap in Google Search Console."
