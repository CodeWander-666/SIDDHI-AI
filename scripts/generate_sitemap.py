#!/usr/bin/env python3
import os
import datetime

SITE_URL = "https://kalki.tech"
BLOG_DIR = "content/blog"
OUTPUT = "public/sitemap.xml"

def get_blog_posts():
    posts = []
    if not os.path.exists(BLOG_DIR):
        return posts
    for f in os.listdir(BLOG_DIR):
        if f.endswith(".md") or f.endswith(".html"):
            slug = f.replace(".md", "").replace(".html", "")
            mtime = os.path.getmtime(os.path.join(BLOG_DIR, f))
            lastmod = datetime.datetime.fromtimestamp(mtime).date().isoformat()
            posts.append({"url": f"/blog/{slug}", "lastmod": lastmod})
    return posts

def generate():
    urls = [
        {"url": "/", "priority": "1.0", "changefreq": "weekly"},
        {"url": "/ki-cloud", "priority": "0.9", "changefreq": "weekly"},
        {"url": "/digital-marketing", "priority": "0.9"},
        {"url": "/plans", "priority": "0.8"},
        {"url": "/vision", "priority": "0.7"},
        {"url": "/about", "priority": "0.7"},
        {"url": "/blog", "priority": "0.8", "changefreq": "daily"},
    ]
    for post in get_blog_posts():
        urls.append({"url": post["url"], "lastmod": post["lastmod"], "priority": "0.6", "changefreq": "monthly"})
    
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for u in urls:
        xml += f'<url><loc>{SITE_URL}{u["url"]}</loc>'
        if "lastmod" in u:
            xml += f'<lastmod>{u["lastmod"]}</lastmod>'
        if "priority" in u:
            xml += f'<priority>{u["priority"]}</priority>'
        if "changefreq" in u:
            xml += f'<changefreq>{u["changefreq"]}</changefreq>'
        xml += '</url>\n'
    xml += '</urlset>'
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        f.write(xml)
    print(f"Sitemap written to {OUTPUT} with {len(urls)} URLs")

if __name__ == "__main__":
    generate()
