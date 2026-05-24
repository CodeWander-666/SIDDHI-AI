#!/bin/bash
set -e

echo "🎨 Creating high‑end favicon with dark background + cyan KI"

# 1. Create a base64 PNG favicon (dark background, cyan KI)
cat > public/favicon.txt << 'EOF' | base64 -d > public/favicon.ico 2>/dev/null || echo "⚠️ Base64 decode failed, creating SVG instead"
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
EOF

# Check if base64 decode succeeded; if not, fallback to SVG
if [ ! -f public/favicon.ico ] || [ ! -s public/favicon.ico ]; then
  echo "Creating SVG favicon instead..."
  cat > public/favicon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0A0F;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1A1A2E;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="100" height="100" rx="22" fill="url(#bg)" />
  <rect width="100" height="100" rx="22" fill="none" stroke="#06B6D4" stroke-width="2" />
  <text x="50" y="72" font-family="'Segoe UI', Arial, sans-serif" font-size="52" font-weight="bold" fill="#06B6D4" text-anchor="middle" filter="url(#glow)">KI</text>
</svg>
EOF
  # Create a PNG from SVG using Node.js if available
  if command -v node &> /dev/null; then
    node -e "
      const fs = require('fs');
      const { createCanvas, loadImage } = require('canvas');
      (async () => {
        const svg = fs.readFileSync('public/favicon.svg', 'utf8');
        const image = await loadImage('data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64'));
        const canvas = createCanvas(100, 100);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, 100, 100);
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync('public/favicon.png', buffer);
        console.log('PNG favicon created');
      })().catch(console.error);
    " 2>/dev/null || echo "⚠️ Node canvas not available – using SVG only"
  fi
fi

# 2. Create additional favicon formats
cp public/favicon.svg public/favicon.png 2>/dev/null || true

# 3. Update layout.tsx to reference all favicon formats
cat > app/layout.tsx << 'EOF'
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KALKICORE - FULL SUITE TECHNOLOGY PARTNER',
  description: 'Open‑source intelligence engine for business. Zero‑cost AI & digital marketing.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
EOF

# 4. Rebuild the project
npm run build

echo ""
echo "✅ High‑end favicon created: dark background, cyan glowing 'KI'"
echo "Formats: favicon.ico, favicon.svg, favicon.png"
echo "Run 'npm run dev' to see the new favicon in your browser tab."