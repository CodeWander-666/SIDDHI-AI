#!/usr/bin/env python3
"""
Generate sitemap.xml for SIDDHI AI.
Includes homepage, policy page, blog index, and all blog posts.
"""

import os
import datetime
import xml.etree.ElementTree as ET
from typing import List, Dict

SITE_URL = "https://siddhiai-welcome.vercel.app"
BLOG_POSTS_DIR = "blog/posts"
OUTPUT_FILE = "sitemap.xml"

STATIC_PAGES = [
    {"url": "/", "priority": "1.0", "changefreq": "weekly"},
    {"url": "/policy.html", "priority": "0.3", "changefreq": "monthly"},
    {"url": "/blog/", "priority": "0.8", "changefreq": "daily"},
]

def get_blog_post_urls() -> List[Dict]:
    urls = []
    if not os.path.exists(BLOG_POSTS_DIR):
        return urls
    for fname in os.listdir(BLOG_POSTS_DIR):
        if fname.endswith(".html"):
            filepath = os.path.join(BLOG_POSTS_DIR, fname)
            mtime = os.path.getmtime(filepath)
            lastmod = datetime.datetime.fromtimestamp(mtime).date().isoformat()
            urls.append({
                "url": f"/blog/posts/{fname}",
                "lastmod": lastmod,
                "priority": "0.6",
                "changefreq": "monthly"
            })
    return urls

def generate_sitemap():
    root = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    for page in STATIC_PAGES:
        url_elem = ET.SubElement(root, "url")
        loc = ET.SubElement(url_elem, "loc")
        loc.text = SITE_URL + page["url"]
        priority = ET.SubElement(url_elem, "priority")
        priority.text = page["priority"]
        changefreq = ET.SubElement(url_elem, "changefreq")
        changefreq.text = page["changefreq"]
        if page["url"] in ["/", "/blog/"]:
            today = datetime.date.today().isoformat()
            lastmod = ET.SubElement(url_elem, "lastmod")
            lastmod.text = today

    for post in get_blog_post_urls():
        url_elem = ET.SubElement(root, "url")
        loc = ET.SubElement(url_elem, "loc")
        loc.text = SITE_URL + post["url"]
        lastmod = ET.SubElement(url_elem, "lastmod")
        lastmod.text = post["lastmod"]
        priority = ET.SubElement(url_elem, "priority")
        priority.text = post["priority"]
        changefreq = ET.SubElement(url_elem, "changefreq")
        changefreq.text = post["changefreq"]

    tree = ET.ElementTree(root)
    tree.write(OUTPUT_FILE, encoding="utf-8", xml_declaration=True)
    print(f"✅ Sitemap generated with {len(STATIC_PAGES) + len(get_blog_post_urls())} URLs.")

if __name__ == "__main__":
    generate_sitemap()
