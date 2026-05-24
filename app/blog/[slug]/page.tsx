import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir);
  return files.map(file => ({ slug: file.replace(/\.(md|html)$/, '') }));
}

function renderHtmlContent(content: string): string {
  return `<div class="prose prose-invert prose-cyan max-w-none">${content}</div>`;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const mdPath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
  const htmlPath = path.join(process.cwd(), 'content/blog', `${slug}.html`);
  let isHtml = false;
  let content = '';
  if (fs.existsSync(mdPath)) {
    content = fs.readFileSync(mdPath, 'utf-8');
  } else if (fs.existsSync(htmlPath)) {
    isHtml = true;
    content = fs.readFileSync(htmlPath, 'utf-8');
  } else {
    notFound();
  }
  if (isHtml) {
    content = renderHtmlContent(content);
  }
  return (
    <div className="pt-24 max-w-4xl mx-auto px-6">
      <article className="prose prose-invert prose-cyan max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
      <div className="mt-12 text-center">
        <Link href="/blog" className="inline-block px-6 py-3 rounded-full bg-gold-600 text-black font-semibold hover:scale-105 transition">
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
