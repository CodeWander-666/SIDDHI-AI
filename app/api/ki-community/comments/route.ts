import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/ki/sqlite';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const postId = url.searchParams.get('postId');
  if (!postId) return NextResponse.json([]);
  const db = getDb();
  const comments = db.prepare('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC').all(postId);
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  try {
    const { id, postId, author, content } = await req.json();
    const db = getDb();
    db.prepare(`
      INSERT INTO comments (id, post_id, author, content, upvotes, downvotes, created_at)
      VALUES (?, ?, ?, ?, 0, 0, ?)
    `).run(id, postId, author, content, Date.now());
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
