import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { ScrollReveal } from '@/components/ScrollReveal';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  isHtml: boolean;
}

function extractTitleFromHtml(html: string): string {
  const match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (match) return match[1];
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  if (titleMatch) return titleMatch[1].replace(/\s*\|\s*.*$/, '');
  return 'Untitled';
}

function extractDateFromHtml(html: string): string {
  const match = html.match(/(\d{4}-\d{2}-\d{2})/);
  if (match) return match[1];
  return new Date().toISOString().split('T')[0];
}

function extractExcerptFromHtml(html: string): string {
  const match = html.match(/<p>(.*?)<\/p>/i);
  if (match) return match[1].slice(0, 120) + '…';
  return 'Read this insightful article from KALKICORE.';
}

function extractTitleFromMd(content: string): string {
  const match = content.match(/^# (.*)$/m);
  if (match) return match[1];
  const fmMatch = content.match(/^title:\s*"(.*)"/m);
  if (fmMatch) return fmMatch[1];
  return 'Untitled';
}

function extractDateFromMd(content: string): string {
  const fmMatch = content.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m);
  if (fmMatch) return fmMatch[1];
  const dateMatch = content.match(/(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) return dateMatch[1];
  return new Date().toISOString().split('T')[0];
}

function extractExcerptFromMd(content: string): string {
  // Simple: take first paragraph after removing frontmatter
  const withoutFrontmatter = content.replace(/---[\s\S]*?---/, '');
  const match = withoutFrontmatter.match(/\n\n([^\n]+)/);
  if (match) return match[1].trim().slice(0, 120) + '…';
  return content.slice(0, 120) + '…';
}

export default async function BlogIndex() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  let posts: BlogPost[] = [];

  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const isHtml = file.endsWith('.html');
      const slug = file.replace(/\.(md|html)$/, '');

      let title, date, excerpt;
      if (isHtml) {
        title = extractTitleFromHtml(content);
        date = extractDateFromHtml(content);
        excerpt = extractExcerptFromHtml(content);
      } else {
        title = extractTitleFromMd(content);
        date = extractDateFromMd(content);
        excerpt = extractExcerptFromMd(content);
      }

      posts.push({
        slug,
        title,
        date,
        excerpt,
        category: isHtml ? 'Insights' : 'AI & Marketing',
        isHtml,
      });
    }
    posts.sort((a, b) => b.date.localeCompare(a.date));
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-4">✦ KNOWLEDGE HUB ✦</span>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">Insights from <span className="text-gold-400">KI</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto">Deep dives into AI, quantum‑inspired computing, and the future of open‑source marketing.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <ScrollReveal key={post.slug} delay={idx * 0.05}>
              <Link href={`/blog/${post.slug}`} className="group block glass-card rounded-2xl overflow-hidden hover:border-gold-400/50 transition-all duration-300 hover:scale-[1.02]">
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-cyan-400 mb-3">
                    <span>{post.category}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-500">{new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <h2 className="text-2xl font-serif text-white mb-3 group-hover:text-gold-400 transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-gold-400 text-sm font-semibold group-hover:gap-3 transition-all">
                    Read More <span>→</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
