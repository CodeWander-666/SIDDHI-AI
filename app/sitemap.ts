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
