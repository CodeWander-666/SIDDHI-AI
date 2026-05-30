#!/bin/bash
set -euo pipefail

echo "📦 Checking git status..."
git status

echo "➕ Adding all changes..."
git add -A

echo "💾 Committing changes..."
git commit -m "Final SEO and build fixes: dynamic robots.txt, sitemap.ts, fixed layout metadata, service pages with video schema, Google verification"

echo "🌐 Pushing to origin/main..."
git push origin main || git push --set-upstream origin main

echo "✅ Push completed successfully!"
