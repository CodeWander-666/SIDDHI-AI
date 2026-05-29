import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/ki/sqlite';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const communityId = url.searchParams.get('communityId');
  const db = getDb();
  let posts;
  if (communityId) {
    posts = db.prepare('SELECT * FROM posts WHERE community_id = ? ORDER BY created_at DESC').all(communityId);
  } else {
    posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
  }
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  try {
    const { id, communityId, author, title, content } = await req.json();
    const db = getDb();
    db.prepare(`
      INSERT INTO posts (id, community_id, author, title, content, upvotes, downvotes, created_at)
      VALUES (?, ?, ?, ?, ?, 0, 0, ?)
    `).run(id, communityId, author, title, content, Date.now());
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
