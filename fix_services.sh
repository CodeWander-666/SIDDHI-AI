#!/bin/bash
set -e

create_page() {
  ID=$1
  TITLE=$2
  ICON=$3
  TAGLINE=$4
  PRICE=$5
  DESC_HTML=$6
  BULLETS=("${@:7}")

  mkdir -p "app/services/$ID"
  cat > "app/services/$ID/page.tsx" << EOF
'use client';
import { AnimatedGradientBackground } from '@/components/AnimatedGradientBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function ${ID//-/}Page() {
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
              <div className="text-7xl mb-4">${ICON}</div>
              <h1 className="text-5xl md:text-6xl font-serif mb-3">${TITLE}</h1>
              <p className="text-cyan-400 text-sm uppercase tracking-wider">${TAGLINE}</p>
              <div className="inline-block mt-4 px-4 py-1 rounded-full bg-gold-400/10 text-gold-400 text-sm font-semibold">${PRICE}</div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-8">
              <div dangerouslySetInnerHTML={{ __html: \`${DESC_HTML}\` }} />
              <ul className="space-y-3 mt-6">
EOF

  for bullet in "${BULLETS[@]}"; do
    echo "                <li className=\"flex items-start gap-3\"><CheckCircle className=\"w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5\" /><span className=\"text-gray-300\">${bullet}</span></li>" >> "app/services/$ID/page.tsx"
  done

  cat >> "app/services/$ID/page.tsx" << 'EOF'
              </ul>
              <div className="bg-cyan-400/10 p-5 rounded-xl mt-8 border-l-4 border-cyan-400">
                <p className="text-sm italic text-gray-300">
                  <span className="font-bold text-cyan-400">Why we’re different:</span> Our AI runs entirely in your browser – no data centre, total privacy. We're the only agency that guarantees ROI or works for free.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">
                  Get Started →
                </Link>
                <Link href="/support" className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-gold-400 transition">
                  Get Support
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
EOF

  # metadata
  cat > "app/services/$ID/metadata.ts" << EOF
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${TITLE} | Kalki Technologies',
  description: '${TAGLINE}. Guaranteed ROI. Free consultation.',
};
EOF
}

# Create each page with correct data
create_page "for-startups" "For Startups" "🚀" "From MVP to Market Leader" "From ₹25,000/month" \
  "<p class='text-gray-300 leading-relaxed'>Launch your startup with AI‑powered marketing and development. We help you validate ideas, acquire first users, and scale efficiently.</p>" \
  "MVP development in 2 weeks" "Pitch deck & investor outreach automation" "Growth hacking with KI insights" "Free AI audit + 30 days support" "Access to KI Cloud developer tools" "Equity‑friendly pricing"

create_page "for-developers" "For Developers" "💻" "Tools, APIs, and Community" "Free to join, earn up to 70% revenue share" \
  "<p class='text-gray-300 leading-relaxed'>Access open‑source AI tools, contribute to KI Cloud, and monetise your skills.</p>" \
  "KI Cloud SDK – integrate private AI into your apps" "Submit your own bots to KI Marketplace" "Earn revenue per API call or service" "Open source contributions – get recognised" "Access to quantum‑inspired WebLLM" "Priority support for marketplace creators"

create_page "for-small-businesses" "For Small Businesses" "🏢" "Local Dominance, National Reach" "Starting at ₹8,999/month" \
  "<p class='text-gray-300 leading-relaxed'>Complete digital presence – website, local SEO, social media, reputation management.</p>" \
  "Google Maps #1 ranking guarantee" "5‑page static website from ₹7,999" "Social media automation + viral posts" "Review management & AI responses" "Local citation building (100+ directories)" "Monthly reports with ROI tracking"

create_page "for-social-creators" "For Social Creators" "🎨" "Build Your Personal Brand" "₹9,999/month" \
  "<p class='text-gray-300 leading-relaxed'>Turn followers into fans. KI‑powered content, viral optimisation, audience analytics.</p>" \
  "Free blue tick verification (Instagram/Facebook)" "Daily AI‑generated posts tailored to your niche" "Predict viral trends before they happen" "LinkedIn optimisation + free Premium account" "Audience sentiment analysis" "Competitor content gap analysis"

create_page "web-development" "Web Development" "🌐" "Ultra‑fast, Secure, Scalable" "₹7,999 – ₹12,999" \
  "<p class='text-gray-300 leading-relaxed'>Modern Next.js websites that load instantly, rank high on Google, and convert visitors.</p>" \
  "Static (5 pages) – ₹7,999 one‑time" "Dynamic Next.js (15+ pages) – ₹12,999 one‑time" "100% responsive, SEO‑optimised" "Free SSL, hosting, 1 month support" "Custom admin dashboard (dynamic plan)" "E‑commerce ready with payment gateway"

create_page "seo" "SEO Dominant" "📈" "Rank #1, Stay #1" "₹9,999/month" \
  "<p class='text-gray-300 leading-relaxed'>Programmatic SEO, technical audits, backlinks, and local optimisation.</p>" \
  "50+ keywords targeted per month" "Programmatic AI landing pages at scale" "Competitor gap analysis & backlink acquisition" "Monthly white‑label reports with ROI tracking" "Technical SEO audit & Core Web Vitals fix" "Featured snippet & rich result optimisation"

create_page "social-media" "Social Media Automation" "📱" "Go Viral, Guaranteed" "₹9,999/month" \
  "<p class='text-gray-300 leading-relaxed'>Automated posting, engagement boosting, and viral prediction – 2 viral posts guaranteed.</p>" \
  "2 viral posts guaranteed per month" "Free blue tick verification (Instagram/Facebook)" "Daily content scheduling (AI‑generated)" "Engagement boosting – real comments, shares, saves" "Full analytics dashboard" "Competitor trend hijacking"

create_page "linkedin" "LinkedIn Growth Engine" "🔗" "B2B Leads on Autopilot" "₹9,999/month" \
  "<p class='text-gray-300 leading-relaxed'>Turn your LinkedIn profile into a lead generation machine – includes free Premium account.</p>" \
  "Free LinkedIn Premium included" "Profile optimisation for #1 search ranking" "Daily content + engagement automation" "Lead generation forms + CRM integration" "Personal branding – turn employees into influencers" "Automated connection & follow‑up campaigns"

create_page "ai-automation" "AI Automation Suite" "⚙️" "Workflows That Think" "Custom pricing" \
  "<p class='text-gray-300 leading-relaxed'>Custom AI agents for sales, support, and internal processes – your data never leaves your infrastructure.</p>" \
  "WhatsApp chatbot for lead qualification" "Email drip campaigns with AI copy" "AI calling agent for appointment setting" "Retargeting ads with predictive LTV models" "Full CRM integration (HubSpot, Salesforce, Pipedrive)" "Custom workflow automation (Zapier alternative)"

echo "✅ All service sub‑pages regenerated correctly."
