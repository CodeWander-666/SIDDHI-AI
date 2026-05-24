#!/usr/bin/env python3
"""
Kalki Technologies – Advanced Blog Generator
Produces long‑form, SEO‑optimised markdown articles with frontmatter.
"""

import os
import random
import datetime
import re
import sys
import time
from typing import List, Tuple

try:
    from zai import ZhipuAiClient
except ImportError:
    print("Please install zai-sdk: pip install zai-sdk")
    sys.exit(1)

# ==================== CONFIG ====================
SITE_URL = "https://kalki.tech"
BLOG_DIR = "content/blog"
LOG_FILE = "blog_generator.log"
INDEX_HTML_PATH = "app/page.tsx"   # not used, but kept for compatibility

ZHIPU_MODEL = "glm-5"
MAX_TOKENS = 8192
TEMPERATURE = 0.75
MAX_RETRIES = 3
RETRY_DELAY = 2

# Expanded topic pool (high‑volume keywords)
TOPICS = [
    "Quantum Machine Learning", "Open Source AI", "WebLLM Performance",
    "Privacy First AI", "Distributed Intelligence Networks", "AI Marketing Automation",
    "Generative Engine Optimization", "Next.js Performance", "Local SEO India",
    "AI Chatbots for Business", "Zero‑Cost Digital Marketing", "AI Content Generation"
]

# Locations (weighted)
GLOBAL_LOC = ["United States", "United Kingdom", "Australia", "Canada", "Germany", "Singapore"]
COUNTRY = "India"
STATES = {"Maharashtra": ["Mumbai", "Pune"], "Karnataka": ["Bangalore", "Mysore"], "Delhi": ["New Delhi"], "Tamil Nadu": ["Chennai"], "Telangana": ["Hyderabad"]}
CITIES = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"]

# ==================== HELPERS ====================
def slugify(text: str) -> str:
    text = text.lower().replace(" ", "-")
    text = re.sub(r"[^\w\-]", "", text)
    return text.strip("-")

def select_location() -> Tuple[str, str]:
    level = random.choices(["global", "country", "state", "city"], weights=[0.1, 0.3, 0.3, 0.3])[0]
    if level == "global": return random.choice(GLOBAL_LOC), "global"
    if level == "country": return COUNTRY, "country"
    if level == "state":
        state = random.choice(list(STATES.keys()))
        return f"{state}, {COUNTRY}", "state"
    return random.choice(CITIES), "city"

# ==================== ZHIPU CLIENT ====================
def init_client():
    api_key = os.environ.get("ZHIPU_API_KEY")
    if not api_key:
        raise ValueError("ZHIPU_API_KEY not set")
    return ZhipuAiClient(api_key=api_key)

def generate_article(topic: str, location: str) -> str:
    client = init_client()
    prompt = f"""You are a senior content strategist for Kalki Technologies, a premium AI and digital marketing agency.
Write a long‑form, SEO‑optimised blog post (1200‑1600 words) on the topic: **{topic}** with a focus on **{location}**.

The article must be written in Markdown, include:
- A compelling H1 (# Title) with primary keyword.
- An introductory paragraph that hooks the reader.
- At least 3 H2 sections (## Subheadings) with detailed, actionable insights.
- Bullet points or numbered lists where appropriate.
- A concluding paragraph with a call‑to‑action linking to Kalki's services (e.g., "Explore KI Cloud").
- Naturally include keywords like "Kalki Technologies", "KI Cloud", "open‑source AI", "privacy‑first", "quantum‑inspired".
- Do NOT mention Siddhi AI or any other company. Only Kalki.
- Write in a professional, yet engaging tone – as if a human expert wrote it.
- Ensure the content is unique, valuable, and reflects the latest trends (2026).

Output only the Markdown content, no extra commentary."""

    for attempt in range(MAX_RETRIES):
        try:
            response = client.chat.completions.create(
                model=ZHIPU_MODEL,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=MAX_TOKENS,
                temperature=TEMPERATURE
            )
            content = response.choices[0].message.content
            # Basic validation
            if len(content) < 500:
                raise ValueError("Content too short")
            return content
        except Exception as e:
            print(f"Attempt {attempt+1} failed: {e}")
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY * (2 ** attempt))
    raise RuntimeError("Failed to generate article after retries")

def create_frontmatter(title: str, date: str, location: str, topic: str) -> str:
    return f"""---
title: "{title}"
date: {date}
location: {location}
category: AI & Marketing
---
"""

def add_internal_links(content: str) -> str:
    # Simple internal linking – can be expanded
    links = {
        "KI Cloud": "/ki-cloud",
        "pricing": "/plans",
        "digital marketing": "/digital-marketing",
        "support": "/support"
    }
    for text, url in links.items():
        if text.lower() in content.lower():
            content = content.replace(text, f"[{text}]({url})", 1)
    return content

# ==================== MAIN ====================
def main():
    os.makedirs(BLOG_DIR, exist_ok=True)
    topic = random.choice(TOPICS)
    location, loc_type = select_location()
    print(f"Generating post on '{topic}' for {location}...")

    raw_content = generate_article(topic, location)
    # Extract title from first H1
    title_match = re.search(r"^#\s+(.*)$", raw_content, re.MULTILINE)
    title = title_match.group(1) if title_match else f"{topic} in {location}"

    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    frontmatter = create_frontmatter(title, date_str, location, topic)
    full_content = frontmatter + "\n" + raw_content
    full_content = add_internal_links(full_content)

    slug = slugify(title)
    filename = f"{date_str}-{slug}.md"
    filepath = os.path.join(BLOG_DIR, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(full_content)

    print(f"✅ Blog post written to {filepath}")
    print(f"Title: {title}")

if __name__ == "__main__":
    main()
