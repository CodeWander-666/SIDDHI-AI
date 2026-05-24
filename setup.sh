#!/bin/bash
set -e

echo "🔧 KALKI CORE – Security & Dependency Fix"

# 1. Update Next.js to the latest secure version
npm install next@latest --legacy-peer-deps

# 2. Replace deprecated WebLLM package
npm uninstall @built-in-ai/web-llm
npm install @browser-ai/web-llm --legacy-peer-deps

# 3. Update any imports in components (if needed)
find components -name "*.tsx" -exec sed -i 's|@built-in-ai/web-llm|@browser-ai/web-llm|g' {} \;

# 4. Update baseline-browser-mapping
npm install -D baseline-browser-mapping@latest

# 5. Rebuild and test locally
npm run build

echo ""
echo "✅ Security fixes applied. Now commit and push:"
echo "git add . && git commit -m 'fix: upgrade Next.js and WebLLM dependencies' && git push origin main"
echo ""
echo "Then Vercel will automatically redeploy with secure versions."