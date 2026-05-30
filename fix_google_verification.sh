#!/bin/bash
set -euo pipefail

LAYOUT="app/layout.tsx"
META='<meta name="google-site-verification" content="mXzGHeQy9yGNuw8JTuzgXdDUn-gUcj4C65Jt83rcK9A" />'

echo "🔧 Ensuring Google verification meta tag is in layout.tsx..."

# Backup
cp "$LAYOUT" "$LAYOUT.bak"

# Remove any existing google-site-verification line to avoid duplicates
sed -i '/google-site-verification/d' "$LAYOUT"

# Insert the meta tag right after the opening <head> tag
sed -i "/<head>/a \\  ${META}" "$LAYOUT"

echo "✅ Meta tag added."

# Verify it's there (optional)
if grep -q "google-site-verification" "$LAYOUT"; then
    echo "✅ Verification meta tag is present in $LAYOUT"
else
    echo "❌ Failed to add meta tag. Please check manually."
    exit 1
fi

# Clean build cache and rebuild
echo "🧹 Cleaning .next..."
rm -rf .next

echo "🏗️ Rebuilding project..."
npm run build

echo ""
echo "📌 Next steps:"
echo "   1. Deploy the new build to Vercel (git push or redeploy)."
echo "   2. Wait 2–3 minutes for the change to propagate."
echo "   3. Go to Google Search Console and click 'Verify' again."
echo "   4. If still failing, check that your domain in GSC is exactly 'https://kalkicore.vercel.app' (no www)."
echo "   5. Alternatively, use the HTML file upload method in GSC."
