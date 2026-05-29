import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/ki/sqlite';

export async function GET() {
  const db = getDb();
  const posts = db.prepare('SELECT * FROM social_posts ORDER BY created_at DESC').all();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  try {
    const post = await req.json();
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO social_posts (id, author, image_base64, caption, upvotes, downvotes, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(post.id, post.author, post.imageBase64, post.caption, 0, 0, Date.now());
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, type } = await req.json(); // type: 'up' or 'down'
    const db = getDb();
    if (type === 'up') {
      db.prepare('UPDATE social_posts SET upvotes = upvotes + 1 WHERE id = ?').run(id);
    } else {
      db.prepare('UPDATE social_posts SET downvotes = downvotes + 1 WHERE id = ?').run(id);
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
