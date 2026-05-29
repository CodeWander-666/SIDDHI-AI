cat > setup_contact_luxury.sh << 'EOF'
#!/bin/bash
set -euo pipefail

echo "🏗️ Building luxury contact page with SQLite + file storage..."

# Install SQLite for Node if not already
npm install better-sqlite3
npm install --save-dev @types/better-sqlite3

# Create database and table (if not exists)
mkdir -p data
cat > scripts/init_contact_db.js << 'INITJS'
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(process.cwd(), 'data', 'contacts.db');
const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )
`);

console.log('✅ Contacts database ready at', DB_PATH);
db.close();
INITJS

node scripts/init_contact_db.js

# Create API route to handle contact form submissions
mkdir -p app/api/contact
cat > app/api/contact/route.ts << 'APIEOF'
import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'contacts.db');
const TEXT_STORAGE_DIR = path.join(process.cwd(), 'data', 'contact_messages');

// Ensure text storage directory exists
if (!fs.existsSync(TEXT_STORAGE_DIR)) {
  fs.mkdirSync(TEXT_STORAGE_DIR, { recursive: true });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const now = Date.now();

    // Save to SQLite
    const db = new Database(DB_PATH);
    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, subject, message, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(name, email, subject || null, message, now);
    db.close();

    // Save to text file (backup / easy viewing)
    const filename = `${now}_${name.replace(/[^a-z0-9]/gi, '_')}.txt`;
    const filePath = path.join(TEXT_STORAGE_DIR, filename);
    const fileContent = `
=== Contact Message ===
Time: ${new Date(now).toISOString()}
Name: ${name}
Email: ${email}
Subject: ${subject || '(none)'}
Message:
${message}
----------------------
`;
    fs.writeFileSync(filePath, fileContent.trim());

    return NextResponse.json({ success: true, id: info.lastInsertRowid });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
APIEOF

# Create the luxury contact page
cat > app/contact/page.tsx << 'CONTACTEOF'
'use client';
import { useState } from 'react';
import { AnimatedGradientBackground } from '@/components/AnimatedGradientBackground';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setError(data.error || 'Submission failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatedGradientBackground />
      <div className="relative z-10 pt-28 pb-20 px-4 md:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6 backdrop-blur-sm">
                ✦ CONNECT WITH US ✦
              </div>
              <h1 className="text-5xl md:text-7xl font-serif mb-4">
                Let's <span className="text-gold-400">Talk</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Whether you have a project in mind or just want to say hello – we'd love to hear from you.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card rounded-3xl p-6 md:p-10 border border-gold-400/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 group-focus-within:text-cyan-400 transition">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 rounded-xl px-4 py-3 border border-white/10 focus:border-gold-400 focus:outline-none transition text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 group-focus-within:text-cyan-400 transition">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 rounded-xl px-4 py-3 border border-white/10 focus:border-gold-400 focus:outline-none transition text-white"
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 group-focus-within:text-cyan-400 transition">
                    Subject (optional)
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-black/50 rounded-xl px-4 py-3 border border-white/10 focus:border-gold-400 focus:outline-none transition text-white"
                    placeholder="General inquiry / Partnership / Support"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs uppercase tracking-wider text-gold-400 mb-1 group-focus-within:text-cyan-400 transition">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-black/50 rounded-xl px-4 py-3 border border-white/10 focus:border-gold-400 focus:outline-none transition text-white resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-sm text-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold text-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Additional contact info */}
          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6 mt-12 text-center">
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-3xl mb-2">📞</div>
                <h3 className="text-sm font-semibold text-gold-400">Phone</h3>
                <p className="text-gray-400 text-sm">+91 6261031710</p>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-3xl mb-2">✉️</div>
                <h3 className="text-sm font-semibold text-gold-400">Email</h3>
                <p className="text-gray-400 text-sm">hello@kalki.tech</p>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="text-sm font-semibold text-gold-400">WhatsApp</h3>
                <p className="text-gray-400 text-sm">Available 24/7</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full mx-4 text-center animate-in fade-in zoom-in duration-300">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-serif text-gold-400 mb-2">Message Sent!</h3>
            <p className="text-gray-300 mb-6">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
CONTACTEOF

echo "✅ Luxury contact page created with:"
echo "   • SQLite database (data/contacts.db)"
echo "   • Text file backups (data/contact_messages/*.txt)"
echo "   • Animated gradient background"
echo "   • Glassmorphism form with floating labels"
echo "   • Success modal"
echo "🔄 Restart dev server: npm run dev"
EOF

chmod +x setup_contact_luxury.sh && ./setup_contact_luxury.sh