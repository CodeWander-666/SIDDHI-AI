import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/ki/sqlite';

export async function PUT(req: NextRequest) {
  try {
    const { postId, type } = await req.json();
    const db = getDb();
    if (type === 'up') {
      db.prepare('UPDATE posts SET upvotes = upvotes + 1 WHERE id = ?').run(postId);
    } else {
      db.prepare('UPDATE posts SET downvotes = downvotes + 1 WHERE id = ?').run(postId);
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
