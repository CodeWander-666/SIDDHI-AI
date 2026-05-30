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
