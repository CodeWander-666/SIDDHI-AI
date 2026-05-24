#!/usr/bin/env python3
"""
SIDDHI AI - Automated Blog Generator (zai-sdk)
Generates unique, SEO-optimized articles daily on diverse topics.
"""

import os
import random
import datetime
import re
import requests
import logging
import sys
import time
from string import punctuation
from typing import List, Tuple, Optional

# Correct SDK for Zhipu
try:
    from zai import ZhipuAiClient
except ImportError:
    print("Please install zai-sdk: pip install zai-sdk")
    sys.exit(1)

# -------------------- CONFIGURATION --------------------
SITE_URL = "https://siddhiai-welcome.vercel.app"
BLOG_DIR = "blog"
POSTS_DIR = os.path.join(BLOG_DIR, "posts")
INDEX_FILE = os.path.join(BLOG_DIR, "index.html")
LOG_FILE = "blog_generator.log"
INDEX_HTML_PATH = "index.html"          # to extract hidden keywords

# Zhipu API settings
ZHIPU_MODEL = "glm-5"                    # or "glm-4" if needed
MAX_TOKENS = 65536
TEMPERATURE = 0.7
REQUEST_TIMEOUT = 30
MAX_RETRIES = 3
RETRY_DELAY = 2

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE, encoding='utf-8'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# -------------------- EXPANDED TOPIC CATEGORIES --------------------
# These are the services/keywords you want to cover.
# The script will pick one at random each day.
TOPICS = [
    # Core services
    "Python Training", "Digital Marketing", "SEO Services", "Web Development",
    "AI Solutions", "E-commerce Website", "Content Marketing", "Social Media Marketing",
    "Stock Market Analysis", "Mobile App Development", "Cloud Consulting", "3D Web Design",
    # Local business
    "Local SEO", "Small Business Websites", "Google My Business Optimization",
    # Technology trends
    "AI in Business", "Machine Learning Applications", "Cybersecurity Basics",
    "DevOps Practices", "Web Performance Optimization", "Progressive Web Apps",
    # Career & learning
    "Python Career Guide", "Data Science with Python", "Freelancing Tips",
    "Remote Work Tools", "Tech Certifications",
    # Corporate & news
    "TCS Hiring Updates", "ISL 2026 News", "Gemini AI Features", "Stock Market Trends",
    # How‑to
    "How to Build a Website", "How to Start a Blog", "How to Use Google Colab"
]

# -------------------- LOCATION DATA --------------------
GLOBAL_LOCATIONS = ["United States", "Canada", "United Kingdom", "Australia", "New Zealand", "Ireland"]
COUNTRY = "India"
STATES = {
    "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"]
}
AREAS = {
    "Indore": ["Vijay Nagar", "New Palasia", "Scheme No. 78", "Rajendra Nagar", "Bholaram"],
    "Bangalore": ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "Jayanagar"]
}

# -------------------- UTILITY FUNCTIONS --------------------
def slugify(text: str) -> str:
    text = text.lower().replace(" ", "-")
    text = re.sub(rf"[{re.escape(punctuation)}]", "", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")

def safe_read_file(filepath: str) -> Optional[str]:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        logger.warning(f"File not found: {filepath}")
        return None
    except Exception as e:
        logger.error(f"Error reading {filepath}: {e}")
        return None

def safe_write_file(filepath: str, content: str) -> bool:
    try:
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        logger.info(f"✅ Wrote {filepath}")
        return True
    except Exception as e:
        logger.error(f"Error writing {filepath}: {e}")
        return False

# -------------------- KEYWORD EXTRACTION (from index.html) --------------------
def extract_keywords_from_index() -> List[str]:
    content = safe_read_file(INDEX_HTML_PATH)
    if not content:
        logger.warning("index.html not found; using default keywords.")
        return []
    pattern = r'<div style="display:none;">(.*?)</div>'
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return []
    keywords_text = match.group(1)
    keywords = [kw.strip() for kw in keywords_text.split(',') if kw.strip()]
    seen = set()
    unique = []
    for kw in keywords:
        if kw not in seen:
            seen.add(kw)
            unique.append(kw)
    logger.info(f"Extracted {len(unique)} keywords from index.html")
    return unique

# These are used to enrich content, not as primary topics.
MASTER_KEYWORDS = extract_keywords_from_index() or [
    "learn python", "digital marketing", "web development", "SEO", "AI"
]

# -------------------- LOCATION SELECTION --------------------
def select_location() -> Tuple[str, str]:
    levels = ['global', 'country', 'state', 'city', 'area']
    weights = [0.1, 0.2, 0.2, 0.3, 0.2]
    level = random.choices(levels, weights=weights)[0]
    if level == 'global':
        return random.choice(GLOBAL_LOCATIONS), "global"
    elif level == 'country':
        return COUNTRY, "country"
    elif level == 'state':
        state = random.choice(list(STATES.keys()))
        return state, "state"
    elif level == 'city':
        state = random.choice(list(STATES.keys()))
        city = random.choice(STATES[state])
        return f"{city}, {state}", "city"
    else:  # area
        city = random.choice(list(AREAS.keys()))
        area = random.choice(AREAS[city])
        return f"{area}, {city}", "area"

# -------------------- ZHIPU AI CLIENT --------------------
def init_zhipu_client() -> Optional[ZhipuAiClient]:
    api_key = os.environ.get("ZHIPU_API_KEY")
    if not api_key:
        logger.error("ZHIPU_API_KEY environment variable not set")
        return None
    try:
        client = ZhipuAiClient(api_key=api_key)
        logger.info("✅ ZhipuAiClient initialized")
        return client
    except Exception as e:
        logger.error(f"Client init failed: {e}")
        return None

def generate_content_with_zhipu(prompt: str, max_tokens: int = MAX_TOKENS) -> Optional[str]:
    client = init_zhipu_client()
    if not client:
        return None

    for attempt in range(MAX_RETRIES):
        try:
            logger.info(f"Generating content (attempt {attempt+1})...")
            response = client.chat.completions.create(
                model=ZHIPU_MODEL,
                messages=[
                    {"role": "system", "content": "You are an expert SEO content writer for SIDDHI AI, a premier digital marketing and web development agency. Write in a professional, informative, and engaging style. Use proper HTML formatting with h2, h3, p, ul, li tags. Include relevant keywords naturally. Make content unique, valuable, and actionable."},
                    {"role": "user", "content": prompt}
                ],
                thinking={"type": "enabled"},
                max_tokens=max_tokens,
                temperature=TEMPERATURE
            )
            content = response.choices[0].message.content
            logger.info(f"✅ Generated {len(content)} chars")
            return content
        except Exception as e:
            logger.error(f"Zhipu API error: {e}")
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY * (2 ** attempt))
    return None

def generate_fallback_content(primary_kw: str, location: str) -> str:
    """Fallback template in case API fails."""
    year = datetime.datetime.now().year
    return f"""
<h2>Introduction to {primary_kw} in {location}</h2>
<p>Are you looking for professional <strong>{primary_kw} services in {location}</strong>? SIDDHI AI is your trusted partner for high-quality {primary_kw} solutions tailored to the {location} market. With our expertise and proven track record, we help businesses achieve their digital goals efficiently.</p>

<h2>Why Choose SIDDHI AI for {primary_kw} in {location}</h2>
<ul>
    <li><strong>Local Expertise:</strong> Deep understanding of {location}'s business landscape</li>
    <li><strong>Customized Solutions:</strong> Tailored strategies for your specific needs</li>
    <li><strong>Proven Results:</strong> Track record of successful projects in {location}</li>
    <li><strong>Competitive Pricing:</strong> Affordable packages without compromising quality</li>
    <li><strong>24/7 Support:</strong> Dedicated assistance from our expert team</li>
</ul>

<h2>Our {primary_kw} Services in {location}</h2>
<p>SIDDHI AI offers comprehensive {primary_kw} solutions designed for businesses in {location}. From strategy development to implementation and ongoing support, we provide end-to-end services that drive real results.</p>

<h2>Success Stories in {location}</h2>
<p>We've helped numerous clients in {location} transform their digital presence through our {primary_kw} expertise. Contact us to learn how we can help your business succeed.</p>

<div class="text-center my-12">
    <a href="/#contact" class="btn-creepy inline-flex bg-accent text-obsidian px-8 py-4 rounded-full">Get Free Consultation</a>
</div>
"""

# -------------------- ARTICLE GENERATION --------------------
def generate_article(primary_kw: str, location: str) -> Tuple[str, str, str]:
    year = datetime.datetime.now().year
    current_date = datetime.datetime.now().strftime("%B %d, %Y")

    # Title variations
    titles = [
        f"Best {primary_kw} in {location} – {year} Complete Guide",
        f"Top {primary_kw} Services in {location}: {year} Review",
        f"How to Choose the Right {primary_kw} in {location} ({year})",
        f"{primary_kw} in {location}: Expert Tips & Strategies for {year}",
        f"The Ultimate Guide to {primary_kw} in {location} ({year})"
    ]
    title = random.choice(titles)
    meta_description = f"Looking for expert {primary_kw} in {location}? SIDDHI AI provides top-rated {primary_kw.lower()} solutions. Free consultation! ⭐⭐⭐⭐⭐"

    # Build a highly explicit prompt
    prompt = f"""
You are an expert SEO content writer for SIDDHI AI, a premier digital marketing and web development agency headquartered in Madhya Pradesh, India.

Your task: Write a comprehensive, 1200‑1500 word blog article about **{primary_kw} in {location}** for the SIDDHI AI website.

The article must be factual, helpful, and focused on the specific location: **{location}**. Do not confuse this location with any other place.

## Article Structure (use HTML tags exactly as shown):
<h2>Introduction to {primary_kw} in {location}</h2>
<p>... (2-3 paragraphs introducing the topic and SIDDHI AI's expertise in this location) ...</p>

<h2>Why {location} is a Prime Destination for {primary_kw}</h2>
<p>... (discuss local market trends, business growth, demand for {primary_kw} in {location}) ...</p>

<h2>Key Benefits of Professional {primary_kw} in {location}</h2>
<ul>
    <li><strong>Local Market Expertise:</strong> ... (explain) </li>
    <li><strong>Customized Solutions:</strong> ... </li>
    <li><strong>Proven Results:</strong> ... </li>
    <li><strong>Cost-Effective:</strong> ... </li>
    <li><strong>24/7 Support:</strong> ... </li>
</ul>

<h2>SIDDHI AI's {primary_kw} Services in {location}</h2>
<ul>
    <li><strong>Complete {primary_kw} Packages:</strong> ... </li>
    <li><strong>Custom Strategy Development:</strong> ... </li>
    <li><strong>Implementation & Management:</strong> ... </li>
    <li><strong>Analytics & Reporting:</strong> ... </li>
    <li><strong>Training & Workshops:</strong> ... </li>
</ul>

<h2>Success Stories in {location}</h2>
<p>... (describe how SIDDHI AI helped a local business in {location} achieve great results) ...</p>

<h2>Frequently Asked Questions About {primary_kw} in {location}</h2>
<div>
    <h3>❓ How much does {primary_kw} cost in {location}?</h3>
    <p>...</p>
    <h3>❓ Why choose SIDDHI AI for {primary_kw} in {location}?</h3>
    <p>...</p>
    <h3>❓ How quickly can I see results?</h3>
    <p>...</p>
    <h3>❓ Do you serve specific areas within {location}?</h3>
    <p>...</p>
    <h3>❓ What industries do you specialize in?</h3>
    <p>...</p>
</div>

<h2>Get Started with SIDDHI AI in {location}</h2>
<p>Ready to grow your business with expert {primary_kw} in {location}? Contact us today for a free consultation.</p>

## Important Guidelines:
- Use natural, engaging language.
- Include relevant local landmarks, neighborhoods, or business districts in {location} where appropriate.
- The primary keyword is "{primary_kw} in {location}". Use it naturally 3-4 times.
- Ensure all information is accurate for {location}. Do not mix in details from other cities.
- The tone should be professional yet approachable, reflecting SIDDHI AI's brand.

Generate the complete article content with proper HTML formatting.
"""

    # Try AI generation
    body_content = generate_content_with_zhipu(prompt, max_tokens=MAX_TOKENS)
    if not body_content:
        logger.warning("Using fallback content")
        body_content = generate_fallback_content(primary_kw, location)

    # Add related posts section
    related = generate_related_posts(f"{slugify(primary_kw)}-{slugify(location)}.html")

    # Complete HTML template with your existing design
    html = f"""<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{meta_description}">
    <meta name="keywords" content="{primary_kw}, {location}, SIDDHI AI, digital agency, web development, SEO, Python training">
    <!-- Open Graph -->
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{meta_description}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="{SITE_URL}/blog/posts/{slugify(primary_kw)}-{slugify(location)}.html">
    <meta property="og:image" content="{SITE_URL}/assets/blog-default.jpg">
    <link rel="canonical" href="{SITE_URL}/blog/posts/{slugify(primary_kw)}-{slugify(location)}.html">
    <!-- Tailwind & Lucide -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <style>
        :root {{--bg-rgb: 2,2,3;--accent-rgb:229,183,105;--tech-rgb:0,240,255;--text-rgb:229,231,235;--text-muted-rgb:156,163,175;--card-bg:rgba(8,8,10,0.75);}}
        [data-theme="rich"] {{--bg-rgb:26,11,46;--accent-rgb:212,175,55;--tech-rgb:255,42,109;--text-rgb:243,232,255;--text-muted-rgb:216,180,226;--card-bg:rgba(26,11,46,0.75);}}
        [data-theme="sunny"] {{--bg-rgb:224,242,254;--accent-rgb:245,158,11;--tech-rgb:2,132,199;--text-rgb:15,23,42;--text-muted-rgb:71,85,105;--card-bg:rgba(255,255,255,0.6);}}
        body {{background-color: rgb(var(--bg-rgb)); color: rgb(var(--text-rgb)); font-family: 'Plus Jakarta Sans', sans-serif; transition: background-color 0.5s ease, color 0.5s ease;}}
        .glass-panel {{background: var(--card-bg); backdrop-filter: blur(16px); border: 1px solid rgba(var(--accent-rgb), 0.3);}}
        .gold-gradient {{background: linear-gradient(135deg, rgb(var(--accent-rgb)) 0%, #FFF8DC 50%, rgb(var(--accent-rgb)) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}}
        .rgb-card {{position: relative; background: rgb(var(--bg-rgb)); border-radius: 1.5rem; overflow: hidden;}}
        .rgb-card::before {{content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: conic-gradient(rgb(var(--tech-rgb)), rgb(var(--accent-rgb)), #FF0055, #9D00FF, rgb(var(--tech-rgb))); animation: rgbSpin 4s linear infinite; opacity: 0.3;}}
        .rgb-card:hover::before {{opacity: 1;}}
        .rgb-content {{position: absolute; inset: 2px; background: var(--card-bg); border-radius: calc(1.5rem - 2px); z-index: 10; padding: 1.5rem;}}
        @keyframes rgbSpin {{100% {{ transform: rotate(360deg); }}}}
        .btn-creepy {{position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center;}}
        .btn-creepy .eyes-wrapper {{position: absolute; right: 1.5rem; top: 50%; transform: translateY(-50%); display: flex; gap: 4px; opacity: 0; transition: opacity 0.3s ease; pointer-events: none;}}
        .btn-creepy:hover .eyes-wrapper {{opacity: 1;}}
        .btn-creepy:hover .btn-text-content {{transform: translateX(-15px);}}
        .creepy-eye {{width: 14px; height: 14px; background: #fff; border-radius: 50%; position: relative;}}
        .creepy-pupil {{width: 6px; height: 6px; background: #000; border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}}
        .blog-content h2 {{font-size: 2rem; font-family: 'Playfair Display', serif; margin: 2.5rem 0 1.5rem; color: rgb(var(--text-rgb));}}
        .blog-content h3 {{font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 1rem; color: rgb(var(--accent-rgb));}}
        .blog-content p {{line-height: 1.8; color: rgb(var(--text-muted-rgb)); margin-bottom: 1.5rem;}}
        .blog-content ul {{list-style: none; padding-left: 0; margin: 1.5rem 0;}}
        .blog-content li {{padding: 0.5rem 0; border-bottom: 1px solid rgba(var(--text-muted-rgb), 0.1);}}
    </style>
    <script>function changeTheme(theme){{document.documentElement.setAttribute('data-theme', theme);}}</script>
</head>
<body class="min-h-screen">
    <nav class="fixed w-full z-50 backdrop-blur-md border-b border-textmain/10 bg-obsidian/40">
        <div class="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="{SITE_URL}" class="font-extrabold text-xl">SIDDHI <span class="text-accent">AI</span></a>
            <div class="flex items-center gap-4">
                <a href="{SITE_URL}/blog" class="text-[10px] uppercase tracking-widest hover:text-accent">← Back to Blog</a>
                <div class="flex gap-2">
                    <button onclick="changeTheme('dark')" class="w-4 h-4 rounded-full bg-[#020203] border border-gray-500"></button>
                    <button onclick="changeTheme('rich')" class="w-4 h-4 rounded-full bg-[#1a0b2e] border border-[#d4af37]"></button>
                    <button onclick="changeTheme('sunny')" class="w-4 h-4 rounded-full bg-[#e0f2fe] border border-[#f59e0b]"></button>
                </div>
            </div>
        </div>
    </nav>
    <main class="pt-24 pb-16">
        <article class="max-w-4xl mx-auto px-6">
            <header class="text-center mb-12">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-6">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                    <span class="text-[9px] font-bold text-accent uppercase tracking-widest">{location}</span>
                </div>
                <h1 class="font-serif text-5xl md:text-6xl text-textmain mb-4">{title}</h1>
                <div class="flex items-center justify-center gap-4 text-textmuted text-sm">
                    <span>Published on {current_date}</span>
                    <span>•</span>
                    <span>By SIDDHI AI Team</span>
                </div>
            </header>
            <div class="blog-content glass-panel rounded-[2rem] p-8 md:p-12">
                {body_content}
                {related}
            </div>
        </article>
    </main>
    <footer class="py-8 border-t border-textmain/10 bg-obsidian text-center">
        <p class="text-[9px] text-textmuted uppercase tracking-widest">&copy; 2017-{year} SIDDHI AI. All rights reserved.</p>
    </footer>
    <script>lucide.createIcons();</script>
</body>
</html>"""
    return html, title, meta_description

def generate_related_posts(current_post_filename: str) -> str:
    posts = []
    if os.path.exists(POSTS_DIR):
        all_posts = [f for f in os.listdir(POSTS_DIR) if f.endswith('.html') and f != current_post_filename]
        selected = random.sample(all_posts, min(3, len(all_posts))) if all_posts else []
        for fname in selected:
            content = safe_read_file(os.path.join(POSTS_DIR, fname))
            if content:
                title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
                title = title_match.group(1).strip() if title_match else fname.replace('.html', '').replace('-', ' ').title()
                posts.append((title, f"/blog/posts/{fname}"))
    if not posts:
        return ""
    links = "".join(f'<li><a href="{url}" class="hover:text-accent transition-colors">{title}</a></li>' for title, url in posts)
    return f"""
<div class="mt-16 pt-8 border-t border-textmain/10">
    <h3 class="text-2xl font-serif mb-6">Related Articles</h3>
    <ul class="space-y-2">{links}</ul>
</div>"""

# -------------------- BLOG INDEX GENERATION --------------------
def generate_blog_index() -> str:
    posts = []
    if not os.path.exists(POSTS_DIR):
        os.makedirs(POSTS_DIR, exist_ok=True)
    for fname in sorted(os.listdir(POSTS_DIR), reverse=True):
        if not fname.endswith('.html'):
            continue
        content = safe_read_file(os.path.join(POSTS_DIR, fname))
        if not content:
            continue
        title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
        title = title_match.group(1).strip() if title_match else fname.replace('.html', '').replace('-', ' ').title()
        desc_match = re.search(r'<meta name="description" content="([^"]+)"', content)
        description = desc_match.group(1) if desc_match else f"Read our guide on {title}"
        date_match = re.match(r'(\d{4}-\d{2}-\d{2})', fname)
        date = date_match.group(1) if date_match else datetime.datetime.now().strftime("%Y-%m-%d")
        try:
            date_obj = datetime.datetime.strptime(date, "%Y-%m-%d")
            display_date = date_obj.strftime("%B %d, %Y")
        except:
            display_date = date
        location_match = re.search(r'in ([A-Za-z\s,]+)(?:\s*[–-]\s*\d{4}|$)', title)
        location = location_match.group(1).strip() if location_match else "Global"
        posts.append({
            'title': title,
            'description': description[:120] + "..." if len(description) > 120 else description,
            'date': display_date,
            'filename': fname,
            'location': location
        })
    cards_html = ""
    for post in posts:
        cards_html += f"""
        <div class="tilt-wrapper h-full">
            <div class="rgb-card h-full">
                <div class="rgb-content flex flex-col">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="text-[9px] font-bold text-accent uppercase tracking-widest">{post['location']}</span>
                        <span class="text-[9px] text-textmuted">•</span>
                        <span class="text-[9px] text-textmuted">{post['date']}</span>
                    </div>
                    <h3 class="text-xl font-bold text-textmain mb-3 line-clamp-2">{post['title']}</h3>
                    <p class="text-textmuted text-sm font-light mb-4 flex-1 line-clamp-3">{post['description']}</p>
                    <a href="/blog/posts/{post['filename']}" class="btn-creepy self-start mt-auto bg-transparent border border-accent text-accent px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-accent hover:text-obsidian transition-all">
                        <span class="btn-text-content">Read More</span>
                        <div class="eyes-wrapper">
                            <div class="creepy-eye"><div class="creepy-pupil"></div></div>
                            <div class="creepy-eye"><div class="creepy-pupil"></div></div>
                        </div>
                    </a>
                </div>
            </div>
        </div>"""
    year = datetime.datetime.now().year
    index_html = f"""<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIDDHI AI Blog - Insights & Articles</title>
    <meta name="description" content="Expert insights on Python training, digital marketing, web development, and AI solutions. SIDDHI AI's official blog with daily updates and industry trends.">
    <meta property="og:title" content="SIDDHI AI Blog">
    <meta property="og:description" content="Expert insights and daily articles from SIDDHI AI.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{SITE_URL}/blog/">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <style>
        :root {{--bg-rgb: 2,2,3;--accent-rgb:229,183,105;--tech-rgb:0,240,255;--text-rgb:229,231,235;--text-muted-rgb:156,163,175;--card-bg:rgba(8,8,10,0.75);}}
        [data-theme="rich"] {{--bg-rgb:26,11,46;--accent-rgb:212,175,55;--tech-rgb:255,42,109;--text-rgb:243,232,255;--text-muted-rgb:216,180,226;--card-bg:rgba(26,11,46,0.75);}}
        [data-theme="sunny"] {{--bg-rgb:224,242,254;--accent-rgb:245,158,11;--tech-rgb:2,132,199;--text-rgb:15,23,42;--text-muted-rgb:71,85,105;--card-bg:rgba(255,255,255,0.6);}}
        body {{background-color: rgb(var(--bg-rgb)); color: rgb(var(--text-rgb)); font-family: 'Plus Jakarta Sans', sans-serif;}}
        .glass-panel {{background: var(--card-bg); backdrop-filter: blur(16px);}}
        .gold-gradient {{background: linear-gradient(135deg, rgb(var(--accent-rgb)) 0%, #FFF8DC 50%, rgb(var(--accent-rgb)) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}}
        .tilt-wrapper {{ perspective: 1200px; }}
        .rgb-card {{position: relative; background: rgb(var(--bg-rgb)); border-radius: 1.5rem; overflow: hidden; height: 100%; min-height: 320px;}}
        .rgb-card::before {{content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: conic-gradient(rgb(var(--tech-rgb)), rgb(var(--accent-rgb)), #FF0055, #9D00FF, rgb(var(--tech-rgb))); animation: rgbSpin 4s linear infinite; opacity: 0.3;}}
        .rgb-card:hover::before {{opacity: 1;}}
        .rgb-content {{position: absolute; inset: 2px; background: var(--card-bg); border-radius: calc(1.5rem - 2px); z-index: 10; padding: 1.5rem; display: flex; flex-direction: column; height: calc(100% - 4px);}}
        @keyframes rgbSpin {{100% {{ transform: rotate(360deg); }}}}
        .btn-creepy {{position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center;}}
        .btn-creepy .eyes-wrapper {{position: absolute; right: 1.5rem; top: 50%; transform: translateY(-50%); display: flex; gap: 4px; opacity: 0; transition: opacity 0.3s ease; pointer-events: none;}}
        .btn-creepy:hover .eyes-wrapper {{opacity: 1;}}
        .btn-creepy:hover .btn-text-content {{transform: translateX(-15px);}}
        .line-clamp-2 {{display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;}}
        .line-clamp-3 {{display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;}}
    </style>
    <script>function changeTheme(theme){{document.documentElement.setAttribute('data-theme', theme);}}</script>
</head>
<body>
    <nav class="fixed w-full z-50 backdrop-blur-md border-b border-textmain/10 bg-obsidian/40">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="flex justify-between items-center h-20">
                <a href="{SITE_URL}" class="flex items-center gap-3"><i data-lucide="cpu" class="text-accent w-6 h-6"></i><span class="font-extrabold text-xl tracking-tighter">SIDDHI <span class="text-accent">AI</span></span></a>
                <div class="hidden md:flex items-center space-x-6">
                    <a href="{SITE_URL}/#benefits" class="text-[10px] uppercase tracking-[0.2em] font-bold text-textmuted hover:text-accent">Why Us</a>
                    <a href="{SITE_URL}/#architectures" class="text-[10px] uppercase tracking-[0.2em] font-bold text-textmuted hover:text-accent">Services</a>
                    <a href="{SITE_URL}/#global-reach" class="text-[10px] uppercase tracking-[0.2em] font-bold text-textmuted hover:text-accent">Global Reach</a>
                    <a href="/blog" class="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">Blog</a>
                    <div class="flex items-center gap-2 ml-4 border-l border-textmuted/30 pl-6">
                        <button onclick="changeTheme('dark')" class="w-4 h-4 rounded-full bg-[#020203] border-2 border-gray-500"></button>
                        <button onclick="changeTheme('rich')" class="w-4 h-4 rounded-full bg-[#1a0b2e] border-2 border-[#d4af37]"></button>
                        <button onclick="changeTheme('sunny')" class="w-4 h-4 rounded-full bg-[#e0f2fe] border-2 border-[#f59e0b]"></button>
                    </div>
                </div>
                <a href="{SITE_URL}/#contact" class="hidden md:flex bg-accent text-obsidian px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] btn-creepy">
                    <span class="btn-text-content">Start Project</span><div class="eyes-wrapper"><div class="creepy-eye"><div class="creepy-pupil"></div></div><div class="creepy-eye"><div class="creepy-pupil"></div></div></div>
                </a>
            </div>
        </div>
    </nav>
    <main class="pt-32 pb-20">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-6">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                    <span class="text-[9px] font-bold text-accent uppercase tracking-widest">Knowledge Hub</span>
                </div>
                <h1 class="font-serif text-5xl md:text-6xl text-textmain mb-4">Blog & <span class="gold-gradient italic">Insights</span></h1>
                <p class="text-textmuted text-lg font-light">Expert articles on Python, AI, digital marketing, and web development – updated daily.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards_html if cards_html else '<div class="col-span-full text-center text-textmuted py-20"><p>No articles yet. Check back soon!</p></div>'}
            </div>
        </div>
    </main>
    <footer class="py-12 border-t border-textmain/10 bg-obsidian">
        <div class="max-w-7xl mx-auto px-6 text-center">
            <span class="font-extrabold text-2xl tracking-tighter text-textmain mb-6 block">SIDDHI <span class="text-accent">AI</span></span>
            <p class="text-[9px] text-textmuted uppercase tracking-widest">&copy; 2017-{year} SIDDHI AI. All rights reserved.</p>
        </div>
    </footer>
    <script>lucide.createIcons();</script>
</body>
</html>"""
    return index_html

# -------------------- MAIN --------------------
def main():
    logger.info("=" * 60)
    logger.info("🚀 Starting SIDDHI AI Blog Generator (zai-sdk)")
    logger.info("=" * 60)

    try:
        os.makedirs(POSTS_DIR, exist_ok=True)

        # Pick a random topic from the expanded list
        primary_kw = random.choice(TOPICS)
        location, loc_type = select_location()
        logger.info(f"📝 Topic: {primary_kw}")
        logger.info(f"📍 Location: {location} ({loc_type})")

        html, title, meta = generate_article(primary_kw, location)

        date_str = datetime.datetime.now().strftime("%Y-%m-%d")
        base_slug = slugify(f"{primary_kw}-{location}")
        filename = f"{date_str}-{base_slug}.html"
        filepath = os.path.join(POSTS_DIR, filename)
        counter = 1
        while os.path.exists(filepath):
            name, ext = os.path.splitext(filename)
            filepath = os.path.join(POSTS_DIR, f"{name}-{counter}{ext}")
            counter += 1

        if safe_write_file(filepath, html):
            logger.info(f"✅ Article saved: {filepath}")
        else:
            logger.error("❌ Failed to save article")
            return

        index_html = generate_blog_index()
        if safe_write_file(INDEX_FILE, index_html):
            logger.info(f"✅ Blog index updated: {INDEX_FILE}")
        else:
            logger.error("❌ Failed to update blog index")
            return

        logger.info("🎉 Blog generation completed successfully!")

    except Exception as e:
        logger.error(f"💥 Fatal error: {e}", exc_info=True)
        sys.exit(1)

if __name__ == "__main__":
    main()
