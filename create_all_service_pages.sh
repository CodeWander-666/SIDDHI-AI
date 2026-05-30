#!/bin/bash
set -euo pipefail

echo "📄 Creating SEO‑optimised service sub‑pages with video..."

# Create videos directory
mkdir -p public/videos

# Helper: create a minimal WebM placeholder if missing
create_video() {
  local name="$1"
  local file="public/videos/${name}.webm"
  if [ ! -f "$file" ]; then
    echo "Creating placeholder video: $file"
    # Base64 of a minimal 1‑second black WebM (works as placeholder)
    echo -n "GkXfo0JQomFCUF9tYWdSS0SBl4KChWVwZWFyQmluZEluZm8Cg2NvbnRhaW5lckRhdGUNbmRrZWZhdWx0AgAPY29udHJhaW5lcklEVmNvbnRhaW5lcklkBmRlZmF1bHQBC3RyYWNrVHlwZRJLaW5lZGVmYXVsdENvbnRhaW5lckNvbmZpZwRrZXlJRFNTaW1wbGVBdWRpbwZBcHBOYW1lCk1hdHJvc2thIEFBSUQJYWxwaGFPcmRlcgRJbnB1dAVjb2RlYwhhYy00LWFjagNhYzQAeG1sOg==" | base64 -d > "$file" 2>/dev/null || touch "$file"
  fi
}

# Create all needed video placeholders
for vid in ai-seo social-media-automation gmb-seo linkedin-growth web-development ai-automation; do
  create_video "$vid"
done

# ----------------------------------------------------------------------
# 1. SEO page
# ----------------------------------------------------------------------
mkdir -p app/services/seo
cat > app/services/seo/page.tsx << 'SEO_PAGE'
'use client';
import { AnimatedGradientBackground } from '@/components/AnimatedGradientBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SEOPage() {
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
              <h1 className="text-5xl md:text-6xl font-serif mb-3">AI‑Driven SEO</h1>
              <p className="text-cyan-400 text-sm uppercase tracking-wider">Programmatic SEO, on‑page & off‑page optimisation, local dominance</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-4 mb-12">
              <video src="/videos/ai-seo.webm" autoPlay loop muted playsInline className="w-full rounded-2xl border border-gold-400/30" />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-8">
              <p className="text-gray-300 leading-relaxed">Rank #1 on Google with our AI‑powered SEO suite. We combine programmatic landing pages, technical audits, and backlink strategies that actually work.</p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">50+ high‑intent keywords targeted monthly</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Programmatic AI landing pages at scale</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Technical SEO audit & Core Web Vitals fix</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Competitor gap analysis & backlink acquisition</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Monthly white‑label reports with ROI tracking</span></li>
              </ul>
              <div className="bg-cyan-400/10 p-5 rounded-xl mt-8 border-l-4 border-cyan-400">
                <p className="text-sm italic text-gray-300"><span className="font-bold text-cyan-400">Why we’re different:</span> We combine open‑source AI (KI) with human expertise – you see every change, no black‑box tricks.</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Get a Free Consultation →</Link>
                <Link href="/support" className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-gold-400 transition">Chat with Support</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
SEO_PAGE

cat > app/services/seo/metadata.ts << 'SEO_META'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'AI‑Driven SEO | Kalki Technologies',
  description: 'Programmatic SEO, on‑page & off‑page optimisation, local dominance. Guaranteed ROI. Free consultation.',
};
SEO_META

# ----------------------------------------------------------------------
# 2. Social Media Automation page
# ----------------------------------------------------------------------
mkdir -p app/services/social-media
cat > app/services/social-media/page.tsx << 'SOCIAL_PAGE'
'use client';
import { AnimatedGradientBackground } from '@/components/AnimatedGradientBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SocialMediaPage() {
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
              <h1 className="text-5xl md:text-6xl font-serif mb-3">Social Media Automation</h1>
              <p className="text-cyan-400 text-sm uppercase tracking-wider">Facebook + Instagram – 2 viral posts/month + free blue tick</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-4 mb-12">
              <video src="/videos/social-media-automation.webm" autoPlay loop muted playsInline className="w-full rounded-2xl border border-gold-400/30" />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-8">
              <p className="text-gray-300 leading-relaxed">Stop guessing. Our AI predicts viral trends, automates daily posting, and guarantees engagement.</p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">2 viral posts guaranteed per month</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Free blue tick verification (Instagram/Facebook)</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Daily content scheduling (AI‑generated)</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Engagement boosting – real comments, shares, saves</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Full analytics dashboard</span></li>
              </ul>
              <div className="bg-cyan-400/10 p-5 rounded-xl mt-8 border-l-4 border-cyan-400">
                <p className="text-sm italic text-gray-300"><span className="font-bold text-cyan-400">Why we’re different:</span> Our KI predicts trends before they go viral – your brand becomes the trend, not a follower.</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Get a Free Consultation →</Link>
                <Link href="/support" className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-gold-400 transition">Chat with Support</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
SOCIAL_PAGE

cat > app/services/social-media/metadata.ts << 'SOCIAL_META'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Social Media Automation | Kalki Technologies',
  description: 'Facebook + Instagram automation – 2 viral posts/month guaranteed + free blue tick verification.',
};
SOCIAL_META

# ----------------------------------------------------------------------
# 3. GMB SEO page
# ----------------------------------------------------------------------
mkdir -p app/services/gmb-seo
cat > app/services/gmb-seo/page.tsx << 'GMB_PAGE'
'use client';
import { AnimatedGradientBackground } from '@/components/AnimatedGradientBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GMBPage() {
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
              <h1 className="text-5xl md:text-6xl font-serif mb-3">Google Business Profile SEO</h1>
              <p className="text-cyan-400 text-sm uppercase tracking-wider">Rank #1 on Google Maps and local pack – complete GMB optimisation</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-4 mb-12">
              <video src="/videos/gmb-seo.webm" autoPlay loop muted playsInline className="w-full rounded-2xl border border-gold-400/30" />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-8">
              <p className="text-gray-300 leading-relaxed">Dominate your local market. We optimise your Google Business Profile to rank #1 on Maps, manage reviews, and drive real foot traffic.</p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Google Maps #1 ranking guarantee</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Complete GBP optimisation</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Review management & auto‑reply</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Local citation building (100+ directories)</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Q&A optimisation with AI</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Monthly performance reports</span></li>
              </ul>
              <div className="bg-cyan-400/10 p-5 rounded-xl mt-8 border-l-4 border-cyan-400">
                <p className="text-sm italic text-gray-300"><span className="font-bold text-cyan-400">Why we’re different:</span> Our distributed node network tests local ranking factors in real time – no other agency does this.</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Get a Free Consultation →</Link>
                <Link href="/support" className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-gold-400 transition">Chat with Support</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
GMB_PAGE

cat > app/services/gmb-seo/metadata.ts << 'GMB_META'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Google Business Profile SEO | Kalki Technologies',
  description: 'Rank #1 on Google Maps, complete GMB optimisation, review management – guaranteed local dominance.',
};
GMB_META

# ----------------------------------------------------------------------
# 4. LinkedIn page
# ----------------------------------------------------------------------
mkdir -p app/services/linkedin
cat > app/services/linkedin/page.tsx << 'LINKEDIN_PAGE'
'use client';
import { AnimatedGradientBackground } from '@/components/AnimatedGradientBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LinkedInPage() {
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
              <h1 className="text-5xl md:text-6xl font-serif mb-3">LinkedIn Optimisation</h1>
              <p className="text-cyan-400 text-sm uppercase tracking-wider">Personal branding, lead generation, and free LinkedIn Premium</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-4 mb-12">
              <video src="/videos/linkedin-growth.webm" autoPlay loop muted playsInline className="w-full rounded-2xl border border-gold-400/30" />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-8">
              <p className="text-gray-300 leading-relaxed">Turn your LinkedIn profile into a lead generation machine. We optimise your personal brand, automate outreach, and include a free Premium account.</p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Free LinkedIn Premium included</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Profile optimisation for #1 search ranking</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Daily content + engagement automation</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Lead generation forms + CRM integration</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Personal branding – turn employees into influencers</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Automated connection & follow‑up campaigns</span></li>
              </ul>
              <div className="bg-cyan-400/10 p-5 rounded-xl mt-8 border-l-4 border-cyan-400">
                <p className="text-sm italic text-gray-300"><span className="font-bold text-cyan-400">Why we’re different:</span> We don't just optimise – we automate the entire sales funnel. Our AI writes personalised connection requests that get 40%+ acceptance rates.</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Get a Free Consultation →</Link>
                <Link href="/support" className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-gold-400 transition">Chat with Support</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
LINKEDIN_PAGE

cat > app/services/linkedin/metadata.ts << 'LINKEDIN_META'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'LinkedIn Optimisation | Kalki Technologies',
  description: 'Personal branding, lead generation, and free LinkedIn Premium included. B2B leads on autopilot.',
};
LINKEDIN_META

# ----------------------------------------------------------------------
# 5. Web Development page
# ----------------------------------------------------------------------
mkdir -p app/services/web-development
cat > app/services/web-development/page.tsx << 'WEBDEV_PAGE'
'use client';
import { AnimatedGradientBackground } from '@/components/AnimatedGradientBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function WebDevPage() {
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
              <h1 className="text-5xl md:text-6xl font-serif mb-3">Website Development</h1>
              <p className="text-cyan-400 text-sm uppercase tracking-wider">Static (₹7,999) or Dynamic Next.js (₹12,999) – ultra‑fast, secure, SEO‑ready</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-4 mb-12">
              <video src="/videos/web-development.webm" autoPlay loop muted playsInline className="w-full rounded-2xl border border-gold-400/30" />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-8">
              <p className="text-gray-300 leading-relaxed">Modern Next.js websites that load instantly, rank high on Google, and convert visitors into customers. Built with Core Web Vitals in mind.</p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Static (5 pages) – ₹7,999 one‑time</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Dynamic Next.js (15+ pages) – ₹12,999 one‑time</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">100% responsive, SEO‑optimised</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Free SSL, hosting, 1 month support</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Custom admin dashboard (dynamic plan)</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">E‑commerce ready with payment gateway</span></li>
              </ul>
              <div className="bg-cyan-400/10 p-5 rounded-xl mt-8 border-l-4 border-cyan-400">
                <p className="text-sm italic text-gray-300"><span className="font-bold text-cyan-400">Why we’re different:</span> We build with Lighthouse 90+ scores out of the box. Your website will be 2x faster than industry average.</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Get a Free Consultation →</Link>
                <Link href="/support" className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-gold-400 transition">Chat with Support</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
WEBDEV_PAGE

cat > app/services/web-development/metadata.ts << 'WEBDEV_META'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Website Development | Kalki Technologies',
  description: 'Static (₹7,999) or Dynamic Next.js (₹12,999) – ultra‑fast, secure, SEO‑ready websites.',
};
WEBDEV_META

# ----------------------------------------------------------------------
# 6. AI Automation page
# ----------------------------------------------------------------------
mkdir -p app/services/ai-automation
cat > app/services/ai-automation/page.tsx << 'AIAUTO_PAGE'
'use client';
import { AnimatedGradientBackground } from '@/components/AnimatedGradientBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AIAutomationPage() {
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
              <h1 className="text-5xl md:text-6xl font-serif mb-3">AI Automation Suite</h1>
              <p className="text-cyan-400 text-sm uppercase tracking-wider">WhatsApp bots, booking dashboards, AI sales agents – guaranteed ROI</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-4 mb-12">
              <video src="/videos/ai-automation.webm" autoPlay loop muted playsInline className="w-full rounded-2xl border border-gold-400/30" />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-8">
              <p className="text-gray-300 leading-relaxed">Custom AI agents for sales, support, and internal processes – all powered by your private KI instance. Your data never leaves your infrastructure.</p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">WhatsApp chatbot for lead qualification</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Email drip campaigns with AI copy</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">AI calling agent for appointment setting</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Retargeting ads with predictive LTV models</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Full CRM integration (HubSpot, Salesforce, Pipedrive)</span></li>
                <li className="flex items-start gap-3"><span className="text-gold-400">✦</span> <span className="text-gray-300">Custom workflow automation (Zapier alternative)</span></li>
              </ul>
              <div className="bg-cyan-400/10 p-5 rounded-xl mt-8 border-l-4 border-cyan-400">
                <p className="text-sm italic text-gray-300"><span className="font-bold text-cyan-400">Why we’re different:</span> Our AI runs entirely on your infrastructure – zero data leakage, total control. We build, you own the intellectual property.</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Get a Free Consultation →</Link>
                <Link href="/support" className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-gold-400 transition">Chat with Support</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
AIAUTO_PAGE

cat > app/services/ai-automation/metadata.ts << 'AIAUTO_META'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'AI Automation Suite | Kalki Technologies',
  description: 'WhatsApp bots, booking dashboards, AI sales agents – guaranteed ROI. Custom workflows, zero data leakage.',
};
AIAUTO_META

echo ""
echo "✅ All six service sub‑pages created successfully:"
echo "   • /services/seo"
echo "   • /services/social-media"
echo "   • /services/gmb-seo"
echo "   • /services/linkedin"
echo "   • /services/web-development"
echo "   • /services/ai-automation"
echo ""
echo "📹 Placeholder WebM videos created in /public/videos/"
echo "🌐 Each page includes hero text, video, detailed sections, and metadata."
echo "🔄 Next: npm run build && npm run dev"
