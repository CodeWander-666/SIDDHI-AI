import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/ki/sqlite';

export async function PUT(req: NextRequest) {
  try {
    const { commentId, type } = await req.json();
    const db = getDb();
    if (type === 'up') {
      db.prepare('UPDATE comments SET upvotes = upvotes + 1 WHERE id = ?').run(commentId);
    } else {
      db.prepare('UPDATE comments SET downvotes = downvotes + 1 WHERE id = ?').run(commentId);
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
