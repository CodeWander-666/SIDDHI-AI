#!/bin/bash
set -euo pipefail

echo "🚀 Creating detailed SEO‑proven service pages with video..."

# Create videos directory
mkdir -p public/videos

# Function to create a minimal WebM placeholder
create_video() {
  local name="$1"
  local output="public/videos/${name}.webm"
  if [ ! -f "$output" ]; then
    # Minimal 1‑second black WebM (base64 encoded)
    echo -n "GkXfo0JQomFCUF9tYWdSS0SBl4KChWVwZWFyQmluZEluZm8Cg2NvbnRhaW5lckRhdGUNbmRrZWZhdWx0AgAPY29udHJhaW5lcklEVmNvbnRhaW5lcklkBmRlZmF1bHQBC3RyYWNrVHlwZRJLaW5lZGVmYXVsdENvbnRhaW5lckNvbmZpZwRrZXlJRFNTaW1wbGVBdWRpbwZBcHBOYW1lCk1hdHJvc2thIEFBSUQJYWxwaGFPcmRlcgRJbnB1dAVjb2RlYwhhYy00LWFjagNhYzQAeG1sOg==" | base64 -d > "$output" 2>/dev/null || touch "$output"
    echo "✅ Created video: $output"
  else
    echo "⏭️ Video already exists: $output"
  fi
}

# Create videos for each service
create_video "ai-seo"
create_video "social-media-automation"
create_video "gmb-seo"
create_video "linkedin-growth"
create_video "web-development"
create_video "ai-automation"

# Function to update a service page (creates if missing)
update_service_page() {
  local id="$1"
  local title="$2"
  local tagline="$3"
  local video_name="$4"
  local long_desc="$5"
  local bullet_points=("${@:6}")
  
  local page_dir="app/services/${id}"
  mkdir -p "$page_dir"
  
  # Build bullet points HTML
  local bullets_html=""
  for point in "${bullet_points[@]}"; do
    bullets_html+="                <li class=\"flex items-start gap-3\"><div class=\"text-gold-400 mt-0.5\">✦</div><span class=\"text-gray-300\">${point}</span></li>\n"
  done
  
  cat > "${page_dir}/page.tsx" << EOF
'use client';
import { AnimatedGradientBackground } from '@/components/AnimatedGradientBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function ${id//-/}Page() {
  return (
    <>
      <AnimatedGradientBackground />
      <div className="relative z-10 pt-28 pb-20 px-4 md:px-8 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <Link href="/services" className="inline-flex items-center gap-1 text-gold-400 text-sm mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to all services
          </Link>
          
          <ScrollReveal>
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-serif mb-3">${title}</h1>
              <p className="text-cyan-400 text-sm uppercase tracking-wider">${tagline}</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-4 mb-12">
              <video
                src="/videos/${video_name}.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-2xl border border-gold-400/30"
              >
                <source src="/videos/${video_name}.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-8">
              <div dangerouslySetInnerHTML={{ __html: \`${long_desc}\` }} />
              <ul className="space-y-3 mt-6">
                ${bullets_html}
              </ul>
              <div className="bg-cyan-400/10 p-5 rounded-xl mt-8 border-l-4 border-cyan-400">
                <p className="text-sm italic text-gray-300">
                  <span className="font-bold text-cyan-400">Why we’re different:</span> We combine open‑source AI (KI) with human expertise – you see every change, no black‑box tricks. Guaranteed ROI or we work for free.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">
                  Get a Free Consultation →
                </Link>
                <Link href="/support" className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-gold-400 transition">
                  Chat with Support
                </Link>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="text-center text-gray-400 text-sm">
              <p>Have questions? <Link href="/contact" className="text-gold-400 hover:underline">Talk to our team</Link> or <Link href="/ki-cloud" className="text-cyan-400 hover:underline">explore KI Cloud</Link>.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
