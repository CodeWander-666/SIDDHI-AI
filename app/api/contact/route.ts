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
