import os
import random
import datetime
import re
import requests
import logging
import sys
import time
from string import punctuation
from pathlib import Path
from typing import List, Dict, Tuple, Optional

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('blog_generator.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# ---------- CONFIGURATION ----------
SITE_URL = "https://siddhiai-welcome.vercel.app"  # Your live site
BLOG_DIR = "blog"
POSTS_DIR = os.path.join(BLOG_DIR, "posts")
INDEX_FILE = os.path.join(BLOG_DIR, "index.html")

# Core service topics (aligned with your existing keywords)
SERVICES = [
    "Python Training", "Digital Marketing", "SEO Services",
    "Web Development", "AI Solutions", "E-commerce Website",
    "Content Marketing", "Social Media Marketing", "Stock Market Analysis",
    "Mobile App Development", "Cloud Consulting", "3D Web Design"
]

# Global locations (English‑speaking regions)
GLOBAL_LOCATIONS = [
    "United States", "Canada", "United Kingdom", "Australia",
    "New Zealand", "Ireland"
]

COUNTRY = "India"

STATES = {
    "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"]
}

# Specific areas for cities
AREAS = {
    "Indore": ["Vijay Nagar", "New Palasia", "Scheme No. 78", "Rajendra Nagar", "Bholaram"],
    "Bangalore": ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "Jayanagar"]
}

# API endpoints with retry configuration
DATAMUSE_API = "https://api.datamuse.com/words"
REQUEST_TIMEOUT = 10
MAX_RETRIES = 3
RETRY_DELAY = 2

# -----------------------------------

def slugify(text: str) -> str:
    """Convert text to URL-friendly slug."""
    text = text.lower().replace(" ", "-")
    text = re.sub(rf"[{re.escape(punctuation)}]", "", text)
    text = re.sub(r"-+", "-", text)  # Replace multiple hyphens
    return text.strip("-")

def fetch_with_retry(url: str, params: Dict = None, max_retries: int = MAX_RETRIES) -> Optional[requests.Response]:
    """Fetch URL with retry logic and exponential backoff."""
    for attempt in range(max_retries):
        try:
            response = requests.get(url, params=params, timeout=REQUEST_TIMEOUT)
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            logger.warning(f"Request failed (attempt {attempt + 1}/{max_retries}): {e}")
            if attempt < max_retries - 1:
                time.sleep(RETRY_DELAY * (2 ** attempt))
            else:
                logger.error(f"All retries failed for URL: {url}")
                return None

def get_lsi_keywords(phrase: str, max_results: int = 5) -> List[str]:
    """Fetch semantically related keywords from Datamuse API with error handling."""
    try:
        params = {
            'ml': phrase,
            'max': max_results
        }
        response = fetch_with_retry(DATAMUSE_API, params=params)
        
        if response and response.status_code == 200:
            data = response.json()
            keywords = [item['word'] for item in data if 'word' in item]
            logger.info(f"Found {len(keywords)} LSI keywords for '{phrase}'")
            return keywords
    except Exception as e:
        logger.error(f"Error fetching LSI keywords: {e}")
    
    return []

def safe_read_file(filepath: str) -> Optional[str]:
    """Safely read a file with error handling."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        logger.warning(f"File not found: {filepath}")
        return None
    except Exception as e:
        logger.error(f"Error reading file {filepath}: {e}")
        return None

def safe_write_file(filepath: str, content: str) -> bool:
    """Safely write content to a file with directory creation."""
    try:
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        logger.info(f"Successfully wrote file: {filepath}")
        return True
    except Exception as e:
        logger.error(f"Error writing file {filepath}: {e}")
        return False

def generate_article(topic: str, location: str) -> Tuple[str, str, str]:
    """
    Create a complete HTML article with SEO elements matching your design.
    Returns (html_content, title, meta_description)
    """
    year = datetime.datetime.now().year
    current_date = datetime.datetime.now().strftime("%B %d, %Y")
    
    # Generate SEO-friendly title and meta
    title = f"Best {topic} in {location} – {year} Complete Guide"
    meta_description = f"Looking for expert {topic} services in {location}? SIDDHI AI provides top-rated {topic.lower()} solutions in {location}. Free consultation available! ⭐⭐⭐⭐⭐"
    
    # LSI keywords for content enhancement
    lsi_keywords = get_lsi_keywords(f"{topic} {location}")
    lsi_phrase = ", ".join(lsi_keywords[:3]) if lsi_keywords else f"{topic} solutions"
    
    # Main content sections with your brand voice
    intro = f"""<p>Are you searching for professional <strong>{topic} in {location}</strong>? You've come to the right place. At <strong>SIDDHI AI</strong>, we specialize in delivering world-class {topic} services tailored to businesses and individuals in {location}. With our proven track record and cutting-edge technology, we've helped hundreds of clients achieve their digital goals.</p>

<p>In this comprehensive guide, we'll explore everything you need to know about {topic} in {location}, including local trends, pricing, and how SIDDHI AI can help you succeed in {year}.</p>"""

    # Why location section
    location_section = f"""<h2>Why {location} is Perfect for {topic}</h2>
<p>{location} has emerged as a thriving hub for digital innovation and business growth. With a rapidly expanding economy and increasing demand for professional {topic.lower()} services, now is the ideal time to invest in {topic}. Local businesses in {location} are leveraging {lsi_phrase} to gain competitive advantages and reach wider audiences.</p>

<p>SIDDHI AI understands the unique dynamics of the {location} market. Our team combines global expertise with local insights to deliver solutions that resonate with your target audience.</p>"""

    # Benefits section (matching your RGB card style in content)
    benefits = f"""<h2>Key Benefits of Professional {topic} in {location}</h2>
<ul class="space-y-3">
    <li><strong>✓ Local Market Expertise:</strong> We understand {location}'s business landscape and consumer behavior.</li>
    <li><strong>✓ Customized Solutions:</strong> Tailored {topic} strategies for {location}'s unique requirements.</li>
    <li><strong>✓ Proven Results:</strong> Track record of successful projects across {location}.</li>
    <li><strong>✓ Cost-Effective:</strong> Competitive pricing without compromising on quality.</li>
    <li><strong>✓ Ongoing Support:</strong> 24/7 assistance from our {location}-based team.</li>
</ul>"""

    # Services offered
    services = f"""<h2>Our {topic} Services in {location}</h2>
<p>SIDDHI AI offers comprehensive {topic} solutions designed for businesses in {location}:</p>
<ul class="space-y-2">
    <li><strong>🔹 Complete {topic} Packages:</strong> End-to-end solutions for startups and enterprises.</li>
    <li><strong>🔹 Custom Strategy Development:</strong> Tailored approaches for your specific goals.</li>
    <li><strong>🔹 Implementation & Management:</strong> Full-service execution with regular updates.</li>
    <li><strong>🔹 Analytics & Reporting:</strong> Detailed insights into your campaign performance.</li>
    <li><strong>🔹 Training & Workshops:</strong> Hands-on {topic} training for your team in {location}.</li>
</ul>"""

    # FAQ section
    faqs = f"""<h2>Frequently Asked Questions About {topic} in {location}</h2>
<div class="space-y-6">
    <div>
        <h3>❓ How much does {topic} cost in {location}?</h3>
        <p>Prices vary based on project scope and requirements. Contact SIDDHI AI for a free, no-obligation quote tailored to your needs.</p>
    </div>
    <div>
        <h3>❓ Why choose SIDDHI AI for {topic} in {location}?</h3>
        <p>SIDDHI AI combines international standards with local expertise. We're verified (GST & Udyam), have 66+ global clients, and offer 24/7 support from our {location} team.</p>
    </div>
    <div>
        <h3>❓ How quickly can I see results?</h3>
        <p>Timelines depend on the specific service. Typically, clients see initial improvements within 2-3 months of starting our {topic} services.</p>
    </div>
    <div>
        <h3>❓ Do you serve specific areas within {location}?</h3>
        <p>Yes! We serve all areas including {', '.join(AREAS.get(location.split(',')[0], ['all neighborhoods']) if ',' in location else ['all areas'])}.</p>
    </div>
</div>"""

    # Success story
    success = f"""<h2>Success Story: {topic} in {location}</h2>
<p>Recently, we helped a local business in {location} transform their online presence through our {topic} services. Within 6 months, they experienced:</p>
<ul class="space-y-2">
    <li>📈 200% increase in website traffic</li>
    <li>💰 150% growth in qualified leads</li>
    <li>🏆 Top 3 search rankings for key terms in {location}</li>
</ul>"""

    # Call to action with creepy-eye button style
    cta = f"""<div class="text-center my-12">
    <p class="text-lg mb-6">Ready to dominate {topic} in {location}? Let's talk!</p>
    <a href="/#contact" class="btn-creepy inline-flex bg-accent text-obsidian px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-textmain shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)]">
        <span class="btn-text-content">Free Consultation</span>
        <div class="eyes-wrapper">
            <div class="creepy-eye"><div class="creepy-pupil"></div></div>
            <div class="creepy-eye"><div class="creepy-pupil"></div></div>
        </div>
    </a>
</div>"""

    # Combine all sections
    body_sections = [intro, location_section, benefits, services, faqs, success, cta]
    body_content = "\n\n".join(body_sections)

    # Complete HTML with your existing CSS variables and structure
    html = f"""<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{meta_description}">
    <meta name="keywords" content="{topic}, {location}, {', '.join(lsi_keywords[:10]) if lsi_keywords else topic}, SIDDHI AI, digital agency, web development, SEO, Python training">
    
    <!-- Open Graph / Social Media -->
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{meta_description}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="{SITE_URL}/blog/posts/{slugify(topic)}-{slugify(location)}.html">
    <meta property="og:image" content="{SITE_URL}/assets/blog-default.jpg">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="{SITE_URL}/blog/posts/{slugify(topic)}-{slugify(location)}.html">
    
    <!-- Your existing stylesheets and scripts -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    
    <style>
        /* Copy all your existing CSS variables and styles from index.html */
        :root {{
            --bg-rgb: 2, 2, 3;
            --accent-rgb: 229, 183, 105;
            --tech-rgb: 0, 240, 255;
            --text-rgb: 229, 231, 235;
            --text-muted-rgb: 156, 163, 175;
            --card-bg: rgba(8, 8, 10, 0.75);
        }}
        
        [data-theme="rich"] {{
            --bg-rgb: 26, 11, 46;
            --accent-rgb: 212, 175, 55;
            --tech-rgb: 255, 42, 109;
            --text-rgb: 243, 232, 255;
            --text-muted-rgb: 216, 180, 226;
            --card-bg: rgba(26, 11, 46, 0.75);
        }}
        
        [data-theme="sunny"] {{
            --bg-rgb: 224, 242, 254;
            --accent-rgb: 245, 158, 11;
            --tech-rgb: 2, 132, 199;
            --text-rgb: 15, 23, 42;
            --text-muted-rgb: 71, 85, 105;
            --card-bg: rgba(255, 255, 255, 0.6);
        }}
        
        body {{
            background-color: rgb(var(--bg-rgb));
            color: rgb(var(--text-rgb));
            font-family: 'Plus Jakarta Sans', sans-serif;
            transition: background-color 0.5s ease, color 0.5s ease;
        }}
        
        .glass-panel {{
            background: var(--card-bg);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(var(--accent-rgb), 0.3);
        }}
        
        .gold-gradient {{
            background: linear-gradient(135deg, rgb(var(--accent-rgb)) 0%, #FFF8DC 50%, rgb(var(--accent-rgb)) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }}
        
        .rgb-card {{
            position: relative;
            background: rgb(var(--bg-rgb));
            border-radius: 1.5rem;
            overflow: hidden;
        }}
        
        .rgb-card::before {{
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(rgb(var(--tech-rgb)), rgb(var(--accent-rgb)), #FF0055, #9D00FF, rgb(var(--tech-rgb)));
            animation: rgbSpin 4s linear infinite;
            opacity: 0.3;
        }}
        
        .rgb-card:hover::before {{
            opacity: 1;
        }}
        
        .rgb-content {{
            position: absolute;
            inset: 2px;
            background: var(--card-bg);
            border-radius: calc(1.5rem - 2px);
            z-index: 10;
            padding: 1.5rem;
        }}
        
        @keyframes rgbSpin {{
            100% {{ transform: rotate(360deg); }}
        }}
        
        .btn-creepy {{
            position: relative;
            overflow: hidden;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }}
        
        .btn-creepy .eyes-wrapper {{
            position: absolute;
            right: 1.5rem;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            gap: 4px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }}
        
        .btn-creepy:hover .eyes-wrapper {{
            opacity: 1;
        }}
        
        .btn-creepy:hover .btn-text-content {{
            transform: translateX(-15px);
        }}
        
        .creepy-eye {{
            width: 14px;
            height: 14px;
            background: #fff;
            border-radius: 50%;
            position: relative;
        }}
        
        .creepy-pupil {{
            width: 6px;
            height: 6px;
            background: #000;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }}
        
        .blog-content h2 {{
            font-size: 2rem;
            font-family: 'Playfair Display', serif;
            margin: 2.5rem 0 1.5rem;
            color: rgb(var(--text-rgb));
        }}
        
        .blog-content h3 {{
            font-size: 1.25rem;
            font-weight: 700;
            margin: 1.5rem 0 1rem;
            color: rgb(var(--accent-rgb));
        }}
        
        .blog-content p {{
            line-height: 1.8;
            color: rgb(var(--text-muted-rgb));
            margin-bottom: 1.5rem;
        }}
        
        .blog-content ul {{
            list-style: none;
            padding-left: 0;
            margin: 1.5rem 0;
        }}
        
        .blog-content li {{
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(var(--text-muted-rgb), 0.1);
        }}
    </style>
    
    <script>
        function changeTheme(theme) {{
            document.documentElement.setAttribute('data-theme', theme);
        }}
    </script>
</head>
<body class="min-h-screen">
    <!-- Simple nav for blog posts -->
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
            </div>
        </article>
    </main>

    <footer class="py-8 border-t border-textmain/10 bg-obsidian text-center">
        <p class="text-[9px] text-textmuted uppercase tracking-widest">&copy; 2017-{year} SIDDHI AI. All rights reserved.</p>
    </footer>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>"""
    
    return html, title, meta_description

def generate_blog_index() -> str:
    """Generate the main blog listing page with RGB cards for each post."""
    posts = []
    
    # Safely read all post files
    try:
        if not os.path.exists(POSTS_DIR):
            os.makedirs(POSTS_DIR, exist_ok=True)
            logger.info(f"Created posts directory: {POSTS_DIR}")
        
        for fname in sorted(os.listdir(POSTS_DIR), reverse=True):
            if not fname.endswith('.html'):
                continue
            
            filepath = os.path.join(POSTS_DIR, fname)
            content = safe_read_file(filepath)
            if not content:
                continue
            
            # Extract title from <h1>
            title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
            title = title_match.group(1).strip() if title_match else fname.replace('.html', '').replace('-', ' ').title()
            
            # Extract meta description
            desc_match = re.search(r'<meta name="description" content="([^"]+)"', content)
            description = desc_match.group(1) if desc_match else f"Read our guide on {title}"
            
            # Extract date from filename (YYYY-MM-DD prefix)
            date_match = re.match(r'(\d{4}-\d{2}-\d{2})', fname)
            date = date_match.group(1) if date_match else datetime.datetime.now().strftime("%Y-%m-%d")
            
            # Format date for display
            try:
                date_obj = datetime.datetime.strptime(date, "%Y-%m-%d")
                display_date = date_obj.strftime("%B %d, %Y")
            except:
                display_date = date
            
            # Extract location from title (simple heuristic)
            location_match = re.search(r'in ([A-Za-z\s,]+)(?:\s*[–-]\s*\d{4}|$)', title)
            location = location_match.group(1).strip() if location_match else "Global"
            
            posts.append({
                'title': title,
                'description': description[:120] + "..." if len(description) > 120 else description,
                'date': display_date,
                'url': f'posts/{fname}',
                'location': location
            })
    except Exception as e:
        logger.error(f"Error reading posts: {e}")
    
    # Generate RGB cards HTML
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
                    <a href="{post['url']}" class="btn-creepy self-start mt-auto bg-transparent border border-accent text-accent px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-accent hover:text-obsidian transition-all">
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
    
    # Complete blog index HTML matching your site's design
    index_html = f"""<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIDDHI AI Blog - Insights & Articles</title>
    <meta name="description" content="Expert insights on Python training, digital marketing, web development, and AI solutions. SIDDHI AI's official blog with daily updates and industry trends.">
    <meta name="keywords" content="Python training blog, digital marketing tips, web development articles, AI insights, SEO guide, Madhya Pradesh, India">
    
    <!-- Open Graph -->
    <meta property="og:title" content="SIDDHI AI Blog">
    <meta property="og:description" content="Expert insights on Python training, digital marketing, web development, and AI solutions.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{SITE_URL}/blog/">
    
    <!-- Tailwind & Fonts -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    
    <style>
        /* Copy all CSS variables and styles from index.html */
        :root {{
            --bg-rgb: 2, 2, 3;
            --accent-rgb: 229, 183, 105;
            --tech-rgb: 0, 240, 255;
            --text-rgb: 229, 231, 235;
            --text-muted-rgb: 156, 163, 175;
            --card-bg: rgba(8, 8, 10, 0.75);
        }}
        
        [data-theme="rich"] {{
            --bg-rgb: 26, 11, 46;
            --accent-rgb: 212, 175, 55;
            --tech-rgb: 255, 42, 109;
            --text-rgb: 243, 232, 255;
            --text-muted-rgb: 216, 180, 226;
            --card-bg: rgba(26, 11, 46, 0.75);
        }}
        
        [data-theme="sunny"] {{
            --bg-rgb: 224, 242, 254;
            --accent-rgb: 245, 158, 11;
            --tech-rgb: 2, 132, 199;
            --text-rgb: 15, 23, 42;
            --text-muted-rgb: 71, 85, 105;
            --card-bg: rgba(255, 255, 255, 0.6);
        }}
        
        body {{
            background-color: rgb(var(--bg-rgb));
            color: rgb(var(--text-rgb));
            font-family: 'Plus Jakarta Sans', sans-serif;
            transition: background-color 0.5s ease, color 0.5s ease;
        }}
        
        .glass-panel {{
            background: var(--card-bg);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(var(--accent-rgb), 0.3);
        }}
        
        .gold-gradient {{
            background: linear-gradient(135deg, rgb(var(--accent-rgb)) 0%, #FFF8DC 50%, rgb(var(--accent-rgb)) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }}
        
        .tilt-wrapper {{ perspective: 1200px; }}
        
        .rgb-card {{
            position: relative;
            background: rgb(var(--bg-rgb));
            border-radius: 1.5rem;
            overflow: hidden;
            height: 100%;
            min-height: 320px;
        }}
        
        .rgb-card::before {{
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(rgb(var(--tech-rgb)), rgb(var(--accent-rgb)), #FF0055, #9D00FF, rgb(var(--tech-rgb)));
            animation: rgbSpin 4s linear infinite;
            opacity: 0.3;
        }}
        
        .rgb-card:hover::before {{
            opacity: 1;
        }}
        
        .rgb-content {{
            position: absolute;
            inset: 2px;
            background: var(--card-bg);
            border-radius: calc(1.5rem - 2px);
            z-index: 10;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            height: calc(100% - 4px);
        }}
        
        @keyframes rgbSpin {{
            100% {{ transform: rotate(360deg); }}
        }}
        
        .btn-creepy {{
            position: relative;
            overflow: hidden;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }}
        
        .btn-creepy .eyes-wrapper {{
            position: absolute;
            right: 1.5rem;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            gap: 4px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }}
        
        .btn-creepy:hover .eyes-wrapper {{
            opacity: 1;
        }}
        
        .btn-creepy:hover .btn-text-content {{
            transform: translateX(-15px);
        }}
        
        .line-clamp-2 {{
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }}
        
        .line-clamp-3 {{
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }}
        
        /* Mobile menu styles (copied from your index) */
        @media (max-width: 768px) {{
            .mobile-menu-toggle {{ display: block; }}
        }}
    </style>
    
    <script>
        function changeTheme(theme) {{
            document.documentElement.setAttribute('data-theme', theme);
        }}
    </script>
</head>
<body>
    <!-- Navigation (matching your main site) -->
    <nav class="fixed w-full z-50 backdrop-blur-md border-b border-textmain/10 bg-obsidian/40">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="flex justify-between items-center h-20">
                <a href="{SITE_URL}" class="flex items-center gap-3">
                    <i data-lucide="cpu" class="text-accent w-6 h-6"></i>
                    <span class="font-extrabold text-xl tracking-tighter">SIDDHI <span class="text-accent">AI</span></span>
                </a>
                
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
                    <span class="btn-text-content">Start Project</span>
                    <div class="eyes-wrapper">
                        <div class="creepy-eye"><div class="creepy-pupil"></div></div>
                        <div class="creepy-eye"><div class="creepy-pupil"></div></div>
                    </div>
                </a>
            </div>
        </div>
    </nav>

    <main class="pt-32 pb-20">
        <div class="max-w-7xl mx-auto px-6">
            <!-- Header -->
            <div class="text-center max-w-3xl mx-auto mb-16">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-6">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                    <span class="text-[9px] font-bold text-accent uppercase tracking-widest">Knowledge Hub</span>
                </div>
                <h1 class="font-serif text-5xl md:text-6xl text-textmain mb-4">Blog & <span class="gold-gradient italic">Insights</span></h1>
                <p class="text-textmuted text-lg font-light">Expert articles on Python, AI, digital marketing, and web development – updated daily.</p>
            </div>
            
            <!-- Blog Grid with RGB Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards_html if cards_html else '<div class="col-span-full text-center text-textmuted py-20"><p>No articles yet. Check back soon!</p></div>'}
            </div>
        </div>
    </main>

    <footer class="py-12 border-t border-textmain/10 bg-obsidian">
        <div class="max-w-7xl mx-auto px-6 text-center">
            <span class="font-extrabold text-2xl tracking-tighter text-textmain mb-6 block">SIDDHI <span class="text-accent">AI</span></span>
            <div class="flex justify-center gap-6 mb-6">
                <a href="https://github.com/CodeWander-666-github" class="text-textmuted hover:text-accent">
                    <i data-lucide="github" class="w-5 h-5"></i>
                </a>
            </div>
            <p class="text-[9px] text-textmuted uppercase tracking-widest">&copy; 2017-{year} SIDDHI AI. All rights reserved.</p>
        </div>
    </footer>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>"""
    
    return index_html

def select_location() -> Tuple[str, str]:
    """
    Select a random location with weighted probabilities.
    Returns (location_string, location_type)
    """
    levels = ['global', 'country', 'state', 'city', 'area']
    weights = [0.1, 0.2, 0.2, 0.3, 0.2]  # More local focus
    level = random.choices(levels, weights=weights)[0]
    
    if level == 'global':
        location = random.choice(GLOBAL_LOCATIONS)
        return location, "global"
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

def main():
    """Main execution function with comprehensive error handling."""
    logger.info("=" * 50)
    logger.info("Starting blog post generation")
    
    try:
        # Create necessary directories
        os.makedirs(POSTS_DIR, exist_ok=True)
        logger.info(f"Ensured posts directory exists: {POSTS_DIR}")
        
        # Select random topic and location
        topic = random.choice(SERVICES)
        location, location_type = select_location()
        
        logger.info(f"Selected topic: {topic}")
        logger.info(f"Selected location: {location} (type: {location_type})")
        
        # Generate article
        html_content, title, meta_desc = generate_article(topic, location)
        
        # Create filename with date
        date_str = datetime.datetime.now().strftime("%Y-%m-%d")
        base_slug = slugify(f"{topic}-{location}")
        filename = f"{date_str}-{base_slug}.html"
        filepath = os.path.join(POSTS_DIR, filename)
        
        # Avoid overwriting (add counter if needed)
        counter = 1
        while os.path.exists(filepath):
            name, ext = os.path.splitext(filename)
            filepath = os.path.join(POSTS_DIR, f"{name}-{counter}{ext}")
            counter += 1
            logger.info(f"File exists, trying: {os.path.basename(filepath)}")
        
        # Save the article
        if safe_write_file(filepath, html_content):
            logger.info(f"✅ Article saved: {filepath}")
        else:
            logger.error("Failed to save article")
            return
        
        # Generate and save updated blog index
        index_html = generate_blog_index()
        if safe_write_file(INDEX_FILE, index_html):
            logger.info(f"✅ Blog index updated: {INDEX_FILE}")
        else:
            logger.error("Failed to update blog index")
            return
        
        logger.info("🎉 Blog generation completed successfully!")
        
    except Exception as e:
        logger.error(f"Fatal error in main execution: {e}", exc_info=True)
        sys.exit(1)

if __name__ == "__main__":
    main()        logging.StreamHandler(),
        logging.FileHandler(os.path.join(BLOG_DIR, 'blog_generator.log'), mode='a')
    ]
)
logger = logging.getLogger(__name__)

# ---------- FALLBACK LSI KEYWORDS (if Datamuse fails) ----------
FALLBACK_LSI = {
    "Web Development": ["frontend", "backend", "full stack", "HTML", "CSS", "JavaScript", "React", "Node.js", "API", "database"],
    "Digital Marketing": ["SEO", "PPC", "social media", "email marketing", "content marketing", "analytics", "conversion", "lead generation"],
    "SEO Services": ["search engine optimization", "keywords", "backlinks", "ranking", "Google", "local SEO", "on-page", "off-page"],
    "Python Training": ["Python basics", "Django", "Flask", "data science", "machine learning", "pandas", "numpy", "automation"],
    "AI Solutions": ["machine learning", "deep learning", "neural networks", "NLP", "computer vision", "chatbots", "predictive analytics"],
    "E-commerce Website": ["online store", "shopping cart", "payment gateway", "product catalog", "inventory", "WooCommerce", "Shopify"],
    "Content Marketing": ["blog posts", "articles", "white papers", "infographics", "video", "storytelling", "brand awareness"],
    "Social Media Marketing": ["Facebook", "Instagram", "Twitter", "LinkedIn", "engagement", "followers", "posts", "ads"],
    "Mobile App Development": ["iOS", "Android", "React Native", "Flutter", "UI/UX", "app store", "mobile design"],
    "Cloud Consulting": ["AWS", "Azure", "Google Cloud", "migration", "serverless", "scalability", "cost optimization"],
    "Data Analytics": ["data visualization", "business intelligence", "Tableau", "Power BI", "SQL", "big data", "insights"],
    "UI/UX Design": ["user interface", "user experience", "wireframes", "prototyping", "usability", "Figma", "Sketch"],
    "Branding": ["logo design", "brand identity", "style guide", "messaging", "positioning", "visual identity"],
    "PPC Advertising": ["Google Ads", "pay per click", "campaign management", "ad copy", "keywords", "ROI", "conversion tracking"],
    "Email Marketing": ["newsletter", "automation", "subscribers", "open rates", "click through", "Mailchimp", "SendGrid"]
}

# ---------- DATA (expand as needed) ----------
TOPICS = list(FALLBACK_LSI.keys())

GLOBAL = ["United States", "Canada", "United Kingdom", "Australia", "New Zealand"]
COUNTRY = "India"
STATES = {
    "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"]
}
AREAS = {
    "Indore": ["Vijay Nagar", "New Palasia", "Scheme No. 78", "Rajendra Nagar", "Bholaram"],
    "Bangalore": ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "Jayanagar"],
    "Mumbai": ["Andheri East", "Bandra West", "Powai", "Goregaon"]
}

MODIFIERS = [
    "", "best", "top", "affordable", "professional", "services",
    "company", "experts", "agency", "cost", "price", "near me", "review",
    "vs", "alternatives", "guide", "tutorial", "how to", "what is"
]

# Scoring weights
LOCATION_WEIGHT = {"area": 3.0, "city": 2.0, "state": 1.0, "country": 0.5, "global": 0.0}
MODIFIER_BONUS = {
    "best": 2.0, "top": 2.0, "affordable": 1.5, "cheap": 1.5,
    "near me": 2.5, "review": 1.8, "vs": 1.8, "how to": 2.0,
    "guide": 1.5, "tutorial": 1.5
}

# Opportunity scores (adjusted to favor local)
OPPORTUNITY_POP = {
    "global": 300,    # Reduced to encourage local
    "country": 500,   # India
    "state": 400,
    "city": 300,
    "area": 200
}

# ---------- UTILITY FUNCTIONS ----------
def slugify(text: str) -> str:
    """Convert text to URL‑friendly slug."""
    text = text.lower().strip()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(f"[{re.escape(punctuation)}]", "", text)
    return text

def safe_file_write(filepath: str, content: str) -> bool:
    """Atomically write content to file using a temporary file. Returns True on success."""
    dirname = os.path.dirname(filepath)
    try:
        os.makedirs(dirname, exist_ok=True)
        with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', dir=dirname, delete=False) as tmp:
            tmp.write(content)
            tmp_path = tmp.name
        shutil.move(tmp_path, filepath)
        logger.debug(f"Successfully written {filepath}")
        return True
    except Exception as e:
        logger.error(f"Failed to write {filepath}: {e}")
        return False

def fetch_with_retry(url: str, max_retries: int = 3, backoff: float = 1.0) -> Optional[Any]:
    """Fetch URL with exponential backoff retry. Returns parsed JSON or None."""
    for attempt in range(max_retries):
        try:
            resp = requests.get(url, timeout=10)
            resp.raise_for_status()
            return resp.json()
        except requests.exceptions.RequestException as e:
            logger.warning(f"Attempt {attempt+1}/{max_retries} failed for {url}: {e}")
            if attempt < max_retries - 1:
                sleep_time = backoff * (2 ** attempt)
                time.sleep(sleep_time)
            else:
                logger.error(f"All retries failed for {url}")
                return None

def fetch_lsi_keywords(phrase: str, max_results: int = 10) -> List[str]:
    """Fetch semantically related keywords from Datamuse. Falls back to static list on failure."""
    try:
        url = f"https://api.datamuse.com/words?ml={phrase}&max={max_results}"
        data = fetch_with_retry(url)
        if data:
            return [item['word'] for item in data if 'word' in item]
    except Exception as e:
        logger.exception(f"Unexpected error in fetch_lsi_keywords for '{phrase}': {e}")
    # Fallback to static list
    logger.info(f"Using fallback LSI for '{phrase}'")
    return FALLBACK_LSI.get(phrase, ["guide", "tips", "services", "company", "experts"])[:max_results]

def fetch_related_phrases(phrase: str, max_results: int = 5) -> List[str]:
    """Fetch topic‑related phrases from Datamuse. Falls back to static list."""
    try:
        url = f"https://api.datamuse.com/words?topics={phrase}&max={max_results}"
        data = fetch_with_retry(url)
        if data:
            return [item['word'] for item in data if 'word' in item]
    except Exception as e:
        logger.exception(f"Unexpected error in fetch_related_phrases for '{phrase}': {e}")
    return FALLBACK_LSI.get(phrase, ["resources", "solutions", "providers"])[:max_results]

# ---------- KEYWORD GENERATION & SCORING ----------
def generate_keyword_candidates() -> List[Dict]:
    """Generate all possible keyword combinations."""
    candidates = []
    def add(topic: str, location: str, loc_type: str):
        for mod in MODIFIERS:
            if mod:
                kw = f"{mod} {topic} {location}"
            else:
                kw = f"{topic} {location}"
            candidates.append({
                "keyword": re.sub(r'\s+', ' ', kw.strip()),
                "topic": topic,
                "location": location,
                "loc_type": loc_type,
                "modifier": mod if mod else None
            })
    # Global
    for loc in GLOBAL:
        for t in TOPICS:
            add(t, loc, "global")
    # Country
    for t in TOPICS:
        add(t, COUNTRY, "country")
    # States & Cities
    for state, cities in STATES.items():
        for t in TOPICS:
            add(t, state, "state")
            for city in cities:
                add(t, f"{city}, {state}", "city")
                if city in AREAS:
                    for area in AREAS[city]:
                        add(t, f"{area}, {city}", "area")
    # Deduplicate
    seen = set()
    unique = []
    for c in candidates:
        key = c["keyword"]
        if key not in seen:
            seen.add(key)
            unique.append(c)
    logger.info(f"Generated {len(unique)} unique keyword candidates")
    return unique

def score_keyword(kw: Dict) -> float:
    """Calculate difficulty score (lower = easier)."""
    words = kw["keyword"].split()
    score = 1.0
    score += LOCATION_WEIGHT.get(kw["loc_type"], 0.0)
    if kw["modifier"] in MODIFIER_BONUS:
        score += MODIFIER_BONUS[kw["modifier"]]
    # Longer keywords are more specific → lower competition
    if len(words) >= 5:
        score -= 1.0
    elif len(words) >= 4:
        score -= 0.5
    return max(0.1, min(10, score))  # ensure >0

def opportunity_score(kw: Dict) -> float:
    """Estimate traffic potential (higher = better)."""
    base = OPPORTUNITY_POP.get(kw["loc_type"], 50)
    mod_boost = 1.0 if kw["modifier"] else 0.5
    return base * mod_boost

def select_top_keywords(candidates: List[Dict], top_n: int = 200) -> List[Dict]:
    """Score and select top keywords by opportunity/difficulty."""
    for c in candidates:
        c["difficulty"] = score_keyword(c)
        c["opportunity"] = opportunity_score(c)
        c["score"] = c["opportunity"] / (c["difficulty"] + 0.1)
    sorted_cands = sorted(candidates, key=lambda x: x["score"], reverse=True)
    top = sorted_cands[:top_n]
    for t in top:
        t["used"] = False
        t["date_used"] = None
        t["filename"] = None
        t["pillar"] = False
    logger.info(f"Selected top {len(top)} keywords")
    return top

def load_or_generate_keywords() -> List[Dict]:
    """Load existing keyword DB or generate a new one."""
    if os.path.exists(KEYWORDS_DB):
        try:
            with open(KEYWORDS_DB, 'r', encoding='utf-8') as f:
                keywords = json.load(f)
            logger.info(f"Loaded {len(keywords)} keywords from {KEYWORDS_DB}")
            return keywords
        except (json.JSONDecodeError, IOError) as e:
            logger.error(f"Failed to load {KEYWORDS_DB}: {e}. Regenerating.")
    logger.info("Generating new keyword database...")
    candidates = generate_keyword_candidates()
    top = select_top_keywords(candidates, top_n=200)
    safe_file_write(KEYWORDS_DB, json.dumps(top, indent=2))
    return top

def get_next_keyword(keywords: List[Dict]) -> Dict:
    """Return the highest‑scoring unused keyword."""
    unused = [kw for kw in keywords if not kw.get("used", False)]
    if not unused:
        raise RuntimeError("All keywords used. Please refresh the keyword database.")
    unused.sort(key=lambda x: x["score"], reverse=True)
    return unused[0]

def mark_keyword_used(keywords: List[Dict], kw: Dict, filename: str) -> None:
    """Mark a keyword as used and update the JSON file."""
    for item in keywords:
        if item["keyword"] == kw["keyword"] and item["location"] == kw["location"]:
            item["used"] = True
            item["date_used"] = datetime.datetime.now().isoformat()
            item["filename"] = filename
            break
    safe_file_write(KEYWORDS_DB, json.dumps(keywords, indent=2))
    logger.info(f"Marked keyword '{kw['keyword']}' as used.")

def detect_pillars(keywords: List[Dict]) -> None:
    """Mark broad keywords as pillar pages."""
    for kw in keywords:
        if not kw.get("modifier") and kw.get("loc_type") in ("global", "country"):
            kw["pillar"] = True
    safe_file_write(KEYWORDS_DB, json.dumps(keywords, indent=2))
    logger.info("Pillar detection completed.")

# ---------- CONTENT GENERATION ----------
def read_index_template() -> str:
    """Read the existing blog/index.html file. If missing, raise error."""
    if not os.path.exists(INDEX_FILE):
        raise FileNotFoundError(f"{INDEX_FILE} not found. Please create it manually using the template.")
    with open(INDEX_FILE, 'r', encoding='utf-8') as f:
        return f.read()

def generate_article_body(keyword: Dict, lsi_terms: List[str], pillar: Optional[Dict] = None) -> str:
    """Generate the main content of the article."""
    topic = keyword["topic"]
    location = keyword["location"]
    modifier = keyword["modifier"] or ""
    keyword_str = keyword["keyword"]

    intro = f"<p>Are you looking for <strong>{keyword_str}</strong>? You've come to the right place. At SIDDHI AI, we specialise in {topic} and have helped numerous clients in {location} achieve outstanding results. In this {'comprehensive guide' if keyword.get('pillar') else 'article'}, we'll cover everything you need to know about {topic} in {location} and why SIDDHI AI is your ideal partner.</p>"

    sections = []

    if keyword.get("pillar"):
        sections.append(f"<h2>Introduction to {topic} in {location}</h2>")
        sections.append(f"<p>{location} has become a thriving hub for {topic}. This guide will walk you through the key aspects, benefits, and strategies for {topic} in {location}.</p>")
        sections.append(f"<h2>Why {location} is Ideal for {topic}</h2>")
        sections.append(f"<p>The business ecosystem in {location} is rapidly evolving, making it a fertile ground for {topic}.</p>")
        sections.append(f"<h2>Key Benefits of {topic}</h2>")
        sections.append("<ul>" + "".join(f"<li>{b}</li>" for b in [
            f"Increased brand visibility in {location}",
            f"Higher conversion rates through targeted strategies",
            f"Cost‑effective solutions tailored to {location}'s market",
            f"Expert support from SIDDHI AI"
        ]) + "</ul>")
        sections.append(f"<h2>Types of {topic} Services We Offer</h2>")
        sections.append("<ul>" + "".join(f"<li>{s}</li>" for s in [
            f"Custom {topic} strategies for {location} businesses",
            f"End‑to‑end implementation and ongoing support",
            f"Affordable packages for startups and SMEs",
            f"Advanced analytics and reporting"
        ]) + "</ul>")
    else:
        if pillar and pillar.get("filename"):
            pillar_url = f"posts/{pillar['filename']}"
            sections.append(f"<p><em>This article is part of our series on <a href='{pillar_url}' class='text-accent underline'>{pillar['keyword']}</a>. For a complete overview, check out our comprehensive guide.</em></p>")
        sections.append(f"<h2>What You Need to Know About {keyword_str}</h2>")
        sections.append(f"<p>{location} businesses are increasingly adopting {topic}. This post focuses specifically on {keyword_str} – a critical aspect of {topic} that can drive significant growth.</p>")
        sections.append(f"<h2>Key Advantages of {keyword_str}</h2>")
        sections.append("<ul>" + "".join(f"<li>{b}</li>" for b in [
            f"Hyper‑targeted approach for {location}",
            f"Maximise ROI with specialised {modifier} strategies",
            f"Quick implementation and measurable results"
        ]) + "</ul>")

    if lsi_terms:
        sections.append(f"<h2>Related Concepts: {', '.join(lsi_terms[:6])}</h2>")
        sections.append(f"<p>When exploring {topic} in {location}, you'll encounter related terms like {', '.join(lsi_terms[:6])}. Understanding these can deepen your knowledge.</p>")

    sections.append(f"<h2>Frequently Asked Questions About {topic} in {location}</h2>")
    faqs = [
        (f"What is the typical cost of {topic} services in {location}?",
         f"Prices vary based on scope. Contact SIDDHI AI for a free quote."),
        (f"How long does it take to see results?",
         f"Most clients see initial improvements within 3‑6 months."),
        (f"Why choose SIDDHI AI?",
         f"SIDDHI AI combines local expertise with global standards, offering tailored strategies and ongoing support.")
    ]
    for q, a in faqs:
        sections.append(f"<h3>{q}</h3><p>{a}</p>")

    cta = f'<p class="mt-8">Ready to leverage <strong>{keyword_str}</strong> for your business? <a href="../../index.html#contact" class="text-accent underline">Contact SIDDHI AI today</a> for a free consultation.</p>'

    return intro + "\n".join(sections) + "\n" + cta

def generate_blog_post(keyword: Dict, all_keywords: List[Dict]) -> str:
    """Generate full HTML for a blog post."""
    # Fetch LSI terms (with fallback)
    lsi = []
    try:
        lsi = fetch_lsi_keywords(keyword["topic"], max_results=10) + fetch_related_phrases(keyword["topic"], max_results=5)
        lsi = list(set(lsi))
        logger.info(f"Fetched {len(lsi)} LSI terms for '{keyword['topic']}'")
    except Exception as e:
        logger.exception(f"LSI fetch failed, continuing without: {e}")

    # Find related pillar
    pillar = next((k for k in all_keywords if k.get("pillar") and k["topic"] == keyword["topic"]), None)

    # Generate body
    body = generate_article_body(keyword, lsi, pillar)

    # Prepare metadata
    title = keyword["keyword"].title()
    meta_desc = f"Looking for {keyword['keyword']}? Our expert guide covers everything about {keyword['topic']} in {keyword['location']}. Trust SIDDHI AI."
    keywords_meta = f"{keyword['topic'].lower()}, {keyword['location'].lower()}, {', '.join(lsi[:8])}"
    canonical = f"{SITE_URL}/blog/posts/{slugify(title)}.html"
    date = datetime.datetime.now()

    # Read the blog index template (full design)
    template = read_index_template()

    # Replace the main content area with the article.
    # We'll replace the entire <main> tag content with our article.
    main_pattern = r'<main[^>]*>.*?</main>'
    article_main = f"""
    <main class="pt-32 pb-20 interactive-ui max-w-4xl mx-auto px-6">
        <article class="glass-panel p-8 md:p-12 rounded-3xl">
            <h1 class="font-serif text-4xl md:text-5xl text-textmain mb-4">{title}</h1>
            <div class="text-textmuted text-sm mb-8">Published on {date.strftime("%B %d, %Y")}</div>
            {body}
        </article>
    </main>
    """
    post_html = re.sub(main_pattern, article_main, template, flags=re.DOTALL)

    # Replace meta tags
    post_html = re.sub(r'<title>.*?</title>', f'<title>{title} | SIDDHI AI Blog</title>', post_html)
    post_html = re.sub(r'<meta name="description" content="[^"]*"', f'<meta name="description" content="{meta_desc}"', post_html)
    post_html = re.sub(r'<meta name="keywords" content="[^"]*"', f'<meta name="keywords" content="{keywords_meta}"', post_html)
    post_html = re.sub(r'<link rel="canonical" href="[^"]*"', f'<link rel="canonical" href="{canonical}"', post_html)

    return post_html

# ---------- BLOG INDEX UPDATE ----------
def update_blog_index() -> None:
    """Scan posts directory and regenerate blog/index.html with all post cards."""
    if not os.path.exists(INDEX_FILE):
        logger.error(f"{INDEX_FILE} not found. Cannot update index. Please create it manually.")
        return

    posts = []
    for fname in sorted(os.listdir(POSTS_DIR), reverse=True):
        if not fname.endswith('.html'):
            continue
        filepath = os.path.join(POSTS_DIR, fname)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                # Extract title from <h1>
                title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE)
                title = title_match.group(1).strip() if title_match else fname.replace('.html', '').replace('-', ' ').title()
                # Extract excerpt (first 150 chars of body text)
                body_text = re.sub(r'<[^>]+>', '', content)
                excerpt = body_text[:150] + "…" if len(body_text) > 150 else body_text
                # Get tags from meta keywords
                keywords_match = re.search(r'<meta name="keywords" content="([^"]+)"', content, re.IGNORECASE)
                tags = keywords_match.group(1).split(', ')[:3] if keywords_match else []
                date_str = fname[:10]  # YYYY-MM-DD
                posts.append({
                    'filename': fname,
                    'title': title,
                    'excerpt': excerpt,
                    'category': 'Blog',
                    'tags': tags,
                    'date': date_str
                })
        except Exception as e:
            logger.error(f"Error reading {filepath}: {e}")
            continue

    # Generate card HTML safely
    cards_html = ""
    for p in posts:
        # Build tags string without using complex f‑string generators
        tag_spans = []
        for tag in p['tags']:
            tag_spans.append(f'<span class="text-[7px] bg-accent/10 text-accent px-2 py-0.5 rounded-full uppercase tracking-wider">#{tag}</span>')
        tags_html = ''.join(tag_spans)

        # Build the card HTML
        card = f"""
        <div class="tilt-wrapper blog-card gsap-reveal">
            <div class="rgb-card">
                <a href="posts/{p['filename']}" class="rgb-content block">
                    <div class="flex justify-between items-start mb-3">
                        <span class="text-[8px] font-bold text-tech uppercase tracking-widest">{p['category']}</span>
                        <span class="text-[8px] text-textmuted">{p['date']}</span>
                    </div>
                    <h3 class="text-lg font-bold text-textmain mb-2 leading-tight">{p['title']}</h3>
                    <p class="text-xs text-textmuted font-light flex-1">{p['excerpt']}</p>
                    <div class="mt-4 flex flex-wrap gap-1">
                        {tags_html}
                    </div>
                    <span class="mt-4 text-[9px] text-tech hover:text-accent transition-colors self-start uppercase tracking-widest font-bold">Read more →</span>
                </a>
            </div>
        </div>
        """
        cards_html += card

    # Read existing index
    with open(INDEX_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Count how many posts containers exist – should be 1
    container_count = len(re.findall(r'<div id="postsContainer"', content))
    if container_count != 1:
        logger.warning(f"Found {container_count} postsContainer divs. Expected 1. Check your template.")

    # Replace posts container
    pattern = r'(<div id="postsContainer"[^>]*>).*?(</div>)'
    replacement = r'\1' + cards_html + r'\2'
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    # Update JSON‑LD
    schema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "SIDDHI AI Blog",
        "description": "Expert articles on Python, digital marketing, web development, and AI solutions.",
        "url": f"{SITE_URL}/blog/",
        "blogPost": [
            {"@type": "BlogPosting", "headline": p['title'], "datePublished": p['date'], "url": f"{SITE_URL}/blog/posts/{p['filename']}"}
            for p in posts[:10]
        ]
    }
    schema_str = json.dumps(schema, indent=2, ensure_ascii=False)
    new_content = re.sub(r'<script type="application/ld\+json" id="blogSchema">.*?</script>',
                         f'<script type="application/ld+json" id="blogSchema">{schema_str}</script>',
                         new_content, flags=re.DOTALL)

    # Write back atomically
    safe_file_write(INDEX_FILE, new_content)
    logger.info(f"Blog index updated with {len(posts)} posts.")

# ---------- MAIN ----------
def main() -> None:
    """Main execution – generates exactly ONE blog post per run."""
    try:
        os.makedirs(POSTS_DIR, exist_ok=True)

        # Load or generate keyword database
        keywords = load_or_generate_keywords()

        # Run pillar detection (only once in a while; here we run it always for simplicity)
        detect_pillars(keywords)

        # Get next keyword
        kw = get_next_keyword(keywords)
        logger.info(f"Selected keyword: {kw['keyword']} (difficulty={kw['difficulty']:.2f}, opportunity={kw['opportunity']:.2f})")

        # Generate post HTML
        html = generate_blog_post(kw, keywords)

        # Create filename
        date_str = datetime.datetime.now().strftime("%Y-%m-%d")
        base_filename = f"{date_str}-{slugify(kw['keyword'])}.html"
        filepath = os.path.join(POSTS_DIR, base_filename)

        # Avoid overwriting
        counter = 1
        while os.path.exists(filepath):
            name, ext = os.path.splitext(base_filename)
            filepath = os.path.join(POSTS_DIR, f"{name}-{counter}{ext}")
            counter += 1

        # Write post
        if safe_file_write(filepath, html):
            logger.info(f"Article saved to {filepath}")
            # Mark keyword as used
            mark_keyword_used(keywords, kw, os.path.basename(filepath))
            # Update blog index
            update_blog_index()
        else:
            logger.error("Failed to write article. Exiting.")
            return

    except Exception as e:
        logger.exception("Fatal error in main execution")
        raise

if __name__ == "__main__":
    main()        logging.StreamHandler(),
        logging.FileHandler(os.path.join(BLOG_DIR, 'blog_generator.log'), mode='a')
    ]
)
logger = logging.getLogger(__name__)

# ---------- FALLBACK LSI KEYWORDS (if Datamuse fails) ----------
FALLBACK_LSI = {
    "Web Development": ["frontend", "backend", "full stack", "HTML", "CSS", "JavaScript", "React", "Node.js", "API", "database"],
    "Digital Marketing": ["SEO", "PPC", "social media", "email marketing", "content marketing", "analytics", "conversion", "lead generation"],
    "SEO Services": ["search engine optimization", "keywords", "backlinks", "ranking", "Google", "local SEO", "on-page", "off-page"],
    "Python Training": ["Python basics", "Django", "Flask", "data science", "machine learning", "pandas", "numpy", "automation"],
    "AI Solutions": ["machine learning", "deep learning", "neural networks", "NLP", "computer vision", "chatbots", "predictive analytics"],
    "E-commerce Website": ["online store", "shopping cart", "payment gateway", "product catalog", "inventory", "WooCommerce", "Shopify"],
    "Content Marketing": ["blog posts", "articles", "white papers", "infographics", "video", "storytelling", "brand awareness"],
    "Social Media Marketing": ["Facebook", "Instagram", "Twitter", "LinkedIn", "engagement", "followers", "posts", "ads"],
    "Mobile App Development": ["iOS", "Android", "React Native", "Flutter", "UI/UX", "app store", "mobile design"],
    "Cloud Consulting": ["AWS", "Azure", "Google Cloud", "migration", "serverless", "scalability", "cost optimization"],
    "Data Analytics": ["data visualization", "business intelligence", "Tableau", "Power BI", "SQL", "big data", "insights"],
    "UI/UX Design": ["user interface", "user experience", "wireframes", "prototyping", "usability", "Figma", "Sketch"],
    "Branding": ["logo design", "brand identity", "style guide", "messaging", "positioning", "visual identity"],
    "PPC Advertising": ["Google Ads", "pay per click", "campaign management", "ad copy", "keywords", "ROI", "conversion tracking"],
    "Email Marketing": ["newsletter", "automation", "subscribers", "open rates", "click through", "Mailchimp", "SendGrid"]
}

# ---------- DATA (expand as needed) ----------
TOPICS = list(FALLBACK_LSI.keys())

GLOBAL = ["United States", "Canada", "United Kingdom", "Australia", "New Zealand"]
COUNTRY = "India"
STATES = {
    "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"]
}
AREAS = {
    "Indore": ["Vijay Nagar", "New Palasia", "Scheme No. 78", "Rajendra Nagar", "Bholaram"],
    "Bangalore": ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "Jayanagar"],
    "Mumbai": ["Andheri East", "Bandra West", "Powai", "Goregaon"]
}

MODIFIERS = [
    "", "best", "top", "affordable", "professional", "services",
    "company", "experts", "agency", "cost", "price", "near me", "review",
    "vs", "alternatives", "guide", "tutorial", "how to", "what is"
]

# Scoring weights
LOCATION_WEIGHT = {"area": 3.0, "city": 2.0, "state": 1.0, "country": 0.5, "global": 0.0}
MODIFIER_BONUS = {
    "best": 2.0, "top": 2.0, "affordable": 1.5, "cheap": 1.5,
    "near me": 2.5, "review": 1.8, "vs": 1.8, "how to": 2.0,
    "guide": 1.5, "tutorial": 1.5
}

# Opportunity scores (adjusted to favor local)
OPPORTUNITY_POP = {
    "global": 300,    # Reduced to encourage local
    "country": 500,   # India
    "state": 400,
    "city": 300,
    "area": 200
}

# ---------- UTILITY FUNCTIONS ----------
def slugify(text: str) -> str:
    """Convert text to URL‑friendly slug."""
    text = text.lower().strip()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(f"[{re.escape(punctuation)}]", "", text)
    return text

def safe_file_write(filepath: str, content: str) -> bool:
    """Atomically write content to file using a temporary file. Returns True on success."""
    dirname = os.path.dirname(filepath)
    try:
        os.makedirs(dirname, exist_ok=True)
        with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', dir=dirname, delete=False) as tmp:
            tmp.write(content)
            tmp_path = tmp.name
        shutil.move(tmp_path, filepath)
        logger.debug(f"Successfully written {filepath}")
        return True
    except Exception as e:
        logger.error(f"Failed to write {filepath}: {e}")
        return False

def fetch_with_retry(url: str, max_retries: int = 3, backoff: float = 1.0) -> Optional[Any]:
    """Fetch URL with exponential backoff retry. Returns parsed JSON or None."""
    for attempt in range(max_retries):
        try:
            resp = requests.get(url, timeout=10)
            resp.raise_for_status()
            return resp.json()
        except requests.exceptions.RequestException as e:
            logger.warning(f"Attempt {attempt+1}/{max_retries} failed for {url}: {e}")
            if attempt < max_retries - 1:
                sleep_time = backoff * (2 ** attempt)
                time.sleep(sleep_time)
            else:
                logger.error(f"All retries failed for {url}")
                return None

def fetch_lsi_keywords(phrase: str, max_results: int = 10) -> List[str]:
    """Fetch semantically related keywords from Datamuse. Falls back to static list on failure."""
    try:
        url = f"https://api.datamuse.com/words?ml={phrase}&max={max_results}"
        data = fetch_with_retry(url)
        if data:
            return [item['word'] for item in data if 'word' in item]
    except Exception as e:
        logger.exception(f"Unexpected error in fetch_lsi_keywords for '{phrase}': {e}")
    # Fallback to static list
    logger.info(f"Using fallback LSI for '{phrase}'")
    return FALLBACK_LSI.get(phrase, ["guide", "tips", "services", "company", "experts"])[:max_results]

def fetch_related_phrases(phrase: str, max_results: int = 5) -> List[str]:
    """Fetch topic‑related phrases from Datamuse. Falls back to static list."""
    try:
        url = f"https://api.datamuse.com/words?topics={phrase}&max={max_results}"
        data = fetch_with_retry(url)
        if data:
            return [item['word'] for item in data if 'word' in item]
    except Exception as e:
        logger.exception(f"Unexpected error in fetch_related_phrases for '{phrase}': {e}")
    return FALLBACK_LSI.get(phrase, ["resources", "solutions", "providers"])[:max_results]

# ---------- KEYWORD GENERATION & SCORING ----------
def generate_keyword_candidates() -> List[Dict]:
    """Generate all possible keyword combinations."""
    candidates = []
    def add(topic: str, location: str, loc_type: str):
        for mod in MODIFIERS:
            if mod:
                kw = f"{mod} {topic} {location}"
            else:
                kw = f"{topic} {location}"
            candidates.append({
                "keyword": re.sub(r'\s+', ' ', kw.strip()),
                "topic": topic,
                "location": location,
                "loc_type": loc_type,
                "modifier": mod if mod else None
            })
    # Global
    for loc in GLOBAL:
        for t in TOPICS:
            add(t, loc, "global")
    # Country
    for t in TOPICS:
        add(t, COUNTRY, "country")
    # States & Cities
    for state, cities in STATES.items():
        for t in TOPICS:
            add(t, state, "state")
            for city in cities:
                add(t, f"{city}, {state}", "city")
                if city in AREAS:
                    for area in AREAS[city]:
                        add(t, f"{area}, {city}", "area")
    # Deduplicate
    seen = set()
    unique = []
    for c in candidates:
        key = c["keyword"]
        if key not in seen:
            seen.add(key)
            unique.append(c)
    logger.info(f"Generated {len(unique)} unique keyword candidates")
    return unique

def score_keyword(kw: Dict) -> float:
    """Calculate difficulty score (lower = easier)."""
    words = kw["keyword"].split()
    score = 1.0
    score += LOCATION_WEIGHT.get(kw["loc_type"], 0.0)
    if kw["modifier"] in MODIFIER_BONUS:
        score += MODIFIER_BONUS[kw["modifier"]]
    # Longer keywords are more specific → lower competition
    if len(words) >= 5:
        score -= 1.0
    elif len(words) >= 4:
        score -= 0.5
    return max(0.1, min(10, score))  # ensure >0

def opportunity_score(kw: Dict) -> float:
    """Estimate traffic potential (higher = better)."""
    base = OPPORTUNITY_POP.get(kw["loc_type"], 50)
    mod_boost = 1.0 if kw["modifier"] else 0.5
    return base * mod_boost

def select_top_keywords(candidates: List[Dict], top_n: int = 200) -> List[Dict]:
    """Score and select top keywords by opportunity/difficulty."""
    for c in candidates:
        c["difficulty"] = score_keyword(c)
        c["opportunity"] = opportunity_score(c)
        c["score"] = c["opportunity"] / (c["difficulty"] + 0.1)
    sorted_cands = sorted(candidates, key=lambda x: x["score"], reverse=True)
    top = sorted_cands[:top_n]
    for t in top:
        t["used"] = False
        t["date_used"] = None
        t["filename"] = None
        t["pillar"] = False
    logger.info(f"Selected top {len(top)} keywords")
    return top

def load_or_generate_keywords() -> List[Dict]:
    """Load existing keyword DB or generate a new one."""
    if os.path.exists(KEYWORDS_DB):
        try:
            with open(KEYWORDS_DB, 'r', encoding='utf-8') as f:
                keywords = json.load(f)
            logger.info(f"Loaded {len(keywords)} keywords from {KEYWORDS_DB}")
            return keywords
        except (json.JSONDecodeError, IOError) as e:
            logger.error(f"Failed to load {KEYWORDS_DB}: {e}. Regenerating.")
    logger.info("Generating new keyword database...")
    candidates = generate_keyword_candidates()
    top = select_top_keywords(candidates, top_n=200)
    safe_file_write(KEYWORDS_DB, json.dumps(top, indent=2))
    return top

def get_next_keyword(keywords: List[Dict]) -> Dict:
    """Return the highest‑scoring unused keyword."""
    unused = [kw for kw in keywords if not kw.get("used", False)]
    if not unused:
        raise RuntimeError("All keywords used. Please refresh the keyword database.")
    unused.sort(key=lambda x: x["score"], reverse=True)
    return unused[0]

def mark_keyword_used(keywords: List[Dict], kw: Dict, filename: str) -> None:
    """Mark a keyword as used and update the JSON file."""
    for item in keywords:
        if item["keyword"] == kw["keyword"] and item["location"] == kw["location"]:
            item["used"] = True
            item["date_used"] = datetime.datetime.now().isoformat()
            item["filename"] = filename
            break
    safe_file_write(KEYWORDS_DB, json.dumps(keywords, indent=2))
    logger.info(f"Marked keyword '{kw['keyword']}' as used.")

def detect_pillars(keywords: List[Dict]) -> None:
    """Mark broad keywords as pillar pages."""
    for kw in keywords:
        if not kw.get("modifier") and kw.get("loc_type") in ("global", "country"):
            kw["pillar"] = True
    safe_file_write(KEYWORDS_DB, json.dumps(keywords, indent=2))
    logger.info("Pillar detection completed.")

# ---------- CONTENT GENERATION ----------
def read_index_template() -> str:
    """Read the existing blog/index.html file. If missing, raise error."""
    if not os.path.exists(INDEX_FILE):
        raise FileNotFoundError(f"{INDEX_FILE} not found. Please create it manually using the template.")
    with open(INDEX_FILE, 'r', encoding='utf-8') as f:
        return f.read()

def generate_article_body(keyword: Dict, lsi_terms: List[str], pillar: Optional[Dict] = None) -> str:
    """Generate the main content of the article."""
    topic = keyword["topic"]
    location = keyword["location"]
    modifier = keyword["modifier"] or ""
    keyword_str = keyword["keyword"]

    intro = f"<p>Are you looking for <strong>{keyword_str}</strong>? You've come to the right place. At SIDDHI AI, we specialise in {topic} and have helped numerous clients in {location} achieve outstanding results. In this {'comprehensive guide' if keyword.get('pillar') else 'article'}, we'll cover everything you need to know about {topic} in {location} and why SIDDHI AI is your ideal partner.</p>"

    sections = []

    if keyword.get("pillar"):
        sections.append(f"<h2>Introduction to {topic} in {location}</h2>")
        sections.append(f"<p>{location} has become a thriving hub for {topic}. This guide will walk you through the key aspects, benefits, and strategies for {topic} in {location}.</p>")
        sections.append(f"<h2>Why {location} is Ideal for {topic}</h2>")
        sections.append(f"<p>The business ecosystem in {location} is rapidly evolving, making it a fertile ground for {topic}.</p>")
        sections.append(f"<h2>Key Benefits of {topic}</h2>")
        sections.append("<ul>" + "".join(f"<li>{b}</li>" for b in [
            f"Increased brand visibility in {location}",
            f"Higher conversion rates through targeted strategies",
            f"Cost‑effective solutions tailored to {location}'s market",
            f"Expert support from SIDDHI AI"
        ]) + "</ul>")
        sections.append(f"<h2>Types of {topic} Services We Offer</h2>")
        sections.append("<ul>" + "".join(f"<li>{s}</li>" for s in [
            f"Custom {topic} strategies for {location} businesses",
            f"End‑to‑end implementation and ongoing support",
            f"Affordable packages for startups and SMEs",
            f"Advanced analytics and reporting"
        ]) + "</ul>")
    else:
        if pillar and pillar.get("filename"):
            pillar_url = f"posts/{pillar['filename']}"
            sections.append(f"<p><em>This article is part of our series on <a href='{pillar_url}' class='text-accent underline'>{pillar['keyword']}</a>. For a complete overview, check out our comprehensive guide.</em></p>")
        sections.append(f"<h2>What You Need to Know About {keyword_str}</h2>")
        sections.append(f"<p>{location} businesses are increasingly adopting {topic}. This post focuses specifically on {keyword_str} – a critical aspect of {topic} that can drive significant growth.</p>")
        sections.append(f"<h2>Key Advantages of {keyword_str}</h2>")
        sections.append("<ul>" + "".join(f"<li>{b}</li>" for b in [
            f"Hyper‑targeted approach for {location}",
            f"Maximise ROI with specialised {modifier} strategies",
            f"Quick implementation and measurable results"
        ]) + "</ul>")

    if lsi_terms:
        sections.append(f"<h2>Related Concepts: {', '.join(lsi_terms[:6])}</h2>")
        sections.append(f"<p>When exploring {topic} in {location}, you'll encounter related terms like {', '.join(lsi_terms[:6])}. Understanding these can deepen your knowledge.</p>")

    sections.append(f"<h2>Frequently Asked Questions About {topic} in {location}</h2>")
    faqs = [
        (f"What is the typical cost of {topic} services in {location}?",
         f"Prices vary based on scope. Contact SIDDHI AI for a free quote."),
        (f"How long does it take to see results?",
         f"Most clients see initial improvements within 3‑6 months."),
        (f"Why choose SIDDHI AI?",
         f"SIDDHI AI combines local expertise with global standards, offering tailored strategies and ongoing support.")
    ]
    for q, a in faqs:
        sections.append(f"<h3>{q}</h3><p>{a}</p>")

    cta = f'<p class="mt-8">Ready to leverage <strong>{keyword_str}</strong> for your business? <a href="../../index.html#contact" class="text-accent underline">Contact SIDDHI AI today</a> for a free consultation.</p>'

    return intro + "\n".join(sections) + "\n" + cta

def generate_blog_post(keyword: Dict, all_keywords: List[Dict]) -> str:
    """Generate full HTML for a blog post."""
    # Fetch LSI terms (with fallback)
    lsi = []
    try:
        lsi = fetch_lsi_keywords(keyword["topic"], max_results=10) + fetch_related_phrases(keyword["topic"], max_results=5)
        lsi = list(set(lsi))
        logger.info(f"Fetched {len(lsi)} LSI terms for '{keyword['topic']}'")
    except Exception as e:
        logger.exception(f"LSI fetch failed, continuing without: {e}")

    # Find related pillar
    pillar = next((k for k in all_keywords if k.get("pillar") and k["topic"] == keyword["topic"]), None)

    # Generate body
    body = generate_article_body(keyword, lsi, pillar)

    # Prepare metadata
    title = keyword["keyword"].title()
    meta_desc = f"Looking for {keyword['keyword']}? Our expert guide covers everything about {keyword['topic']} in {keyword['location']}. Trust SIDDHI AI."
    keywords_meta = f"{keyword['topic'].lower()}, {keyword['location'].lower()}, {', '.join(lsi[:8])}"
    canonical = f"{SITE_URL}/blog/posts/{slugify(title)}.html"
    date = datetime.datetime.now()

    # Read the blog index template (full design)
    template = read_index_template()

    # Replace the main content area with the article.
    main_pattern = r'<main[^>]*>.*?</main>'
    article_main = f"""
    <main class="pt-32 pb-20 interactive-ui max-w-4xl mx-auto px-6">
        <article class="glass-panel p-8 md:p-12 rounded-3xl">
            <h1 class="font-serif text-4xl md:text-5xl text-textmain mb-4">{title}</h1>
            <div class="text-textmuted text-sm mb-8">Published on {date.strftime("%B %d, %Y")}</div>
            {body}
        </article>
    </main>
    """
    post_html = re.sub(main_pattern, article_main, template, flags=re.DOTALL)

    # Replace meta tags
    post_html = re.sub(r'<title>.*?</title>', f'<title>{title} | SIDDHI AI Blog</title>', post_html)
    post_html = re.sub(r'<meta name="description" content="[^"]*"', f'<meta name="description" content="{meta_desc}"', post_html)
    post_html = re.sub(r'<meta name="keywords" content="[^"]*"', f'<meta name="keywords" content="{keywords_meta}"', post_html)
    post_html = re.sub(r'<link rel="canonical" href="[^"]*"', f'<link rel="canonical" href="{canonical}"', post_html)

    return post_html

# ---------- BLOG INDEX UPDATE ----------
def update_blog_index() -> None:
    """Scan posts directory and regenerate blog/index.html with all post cards."""
    if not os.path.exists(INDEX_FILE):
        logger.error(f"{INDEX_FILE} not found. Cannot update index. Please create it manually.")
        return

    posts = []
    for fname in sorted(os.listdir(POSTS_DIR), reverse=True):
        if not fname.endswith('.html'):
            continue
        filepath = os.path.join(POSTS_DIR, fname)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                # Extract title from <h1>
                title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE)
                title = title_match.group(1).strip() if title_match else fname.replace('.html', '').replace('-', ' ').title()
                # Extract excerpt (first 150 chars of body text)
                body_text = re.sub(r'<[^>]+>', '', content)
                excerpt = body_text[:150] + "…" if len(body_text) > 150 else body_text
                # Get tags from meta keywords
                keywords_match = re.search(r'<meta name="keywords" content="([^"]+)"', content, re.IGNORECASE)
                tags = keywords_match.group(1).split(', ')[:3] if keywords_match else []
                date_str = fname[:10]  # YYYY-MM-DD
                posts.append({
                    'filename': fname,
                    'title': title,
                    'excerpt': excerpt,
                    'category': 'Blog',
                    'tags': tags,
                    'date': date_str
                })
        except Exception as e:
            logger.error(f"Error reading {filepath}: {e}")
            continue

    # Generate card HTML safely
    cards_html = ""
    for p in posts:
        # Build tags string without using complex f‑string generators
        tag_spans = []
        for tag in p['tags']:
            tag_spans.append(f'<span class="text-[7px] bg-accent/10 text-accent px-2 py-0.5 rounded-full uppercase tracking-wider">#{tag}</span>')
        tags_html = ''.join(tag_spans)

        # Build the card HTML
        card = f"""
        <div class="tilt-wrapper blog-card gsap-reveal">
            <div class="rgb-card">
                <a href="posts/{p['filename']}" class="rgb-content block">
                    <div class="flex justify-between items-start mb-3">
                        <span class="text-[8px] font-bold text-tech uppercase tracking-widest">{p['category']}</span>
                        <span class="text-[8px] text-textmuted">{p['date']}</span>
                    </div>
                    <h3 class="text-lg font-bold text-textmain mb-2 leading-tight">{p['title']}</h3>
                    <p class="text-xs text-textmuted font-light flex-1">{p['excerpt']}</p>
                    <div class="mt-4 flex flex-wrap gap-1">
                        {tags_html}
                    </div>
                    <span class="mt-4 text-[9px] text-tech hover:text-accent transition-colors self-start uppercase tracking-widest font-bold">Read more →</span>
                </a>
            </div>
        </div>
        """
        cards_html += card

    # Read existing index
    with open(INDEX_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Count how many posts containers exist – should be 1
    container_count = len(re.findall(r'<div id="postsContainer"', content))
    if container_count != 1:
        logger.warning(f"Found {container_count} postsContainer divs. Expected 1. Check your template.")

    # Replace posts container
    pattern = r'(<div id="postsContainer"[^>]*>).*?(</div>)'
    replacement = r'\1' + cards_html + r'\2'
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    # Update JSON‑LD
    schema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "SIDDHI AI Blog",
        "description": "Expert articles on Python, digital marketing, web development, and AI solutions.",
        "url": f"{SITE_URL}/blog/",
        "blogPost": [
            {"@type": "BlogPosting", "headline": p['title'], "datePublished": p['date'], "url": f"{SITE_URL}/blog/posts/{p['filename']}"}
            for p in posts[:10]
        ]
    }
    schema_str = json.dumps(schema, indent=2, ensure_ascii=False)
    new_content = re.sub(r'<script type="application/ld\+json" id="blogSchema">.*?</script>',
                         f'<script type="application/ld+json" id="blogSchema">{schema_str}</script>',
                         new_content, flags=re.DOTALL)

    # Write back atomically
    safe_file_write(INDEX_FILE, new_content)
    logger.info(f"Blog index updated with {len(posts)} posts.")

# ---------- MAIN ----------
def main() -> None:
    """Main execution – generates exactly ONE blog post per run."""
    try:
        os.makedirs(POSTS_DIR, exist_ok=True)

        # Load or generate keyword database
        keywords = load_or_generate_keywords()

        # Run pillar detection (only once in a while; here we run it always for simplicity)
        detect_pillars(keywords)

        # Get next keyword
        kw = get_next_keyword(keywords)
        logger.info(f"Selected keyword: {kw['keyword']} (difficulty={kw['difficulty']:.2f}, opportunity={kw['opportunity']:.2f})")

        # Generate post HTML
        html = generate_blog_post(kw, keywords)

        # Create filename
        date_str = datetime.datetime.now().strftime("%Y-%m-%d")
        base_filename = f"{date_str}-{slugify(kw['keyword'])}.html"
        filepath = os.path.join(POSTS_DIR, base_filename)

        # Avoid overwriting
        counter = 1
        while os.path.exists(filepath):
            name, ext = os.path.splitext(base_filename)
            filepath = os.path.join(POSTS_DIR, f"{name}-{counter}{ext}")
            counter += 1

        # Write post
        if safe_file_write(filepath, html):
            logger.info(f"Article saved to {filepath}")
            # Mark keyword as used
            mark_keyword_used(keywords, kw, os.path.basename(filepath))
            # Update blog index
            update_blog_index()
        else:
            logger.error("Failed to write article. Exiting.")
            return

    except Exception as e:
        logger.exception("Fatal error in main execution")
        raise

if __name__ == "__main__":
    main()
