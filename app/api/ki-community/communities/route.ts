import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/ki/sqlite';

export async function GET() {
  const db = getDb();
  const communities = db.prepare('SELECT * FROM communities ORDER BY name').all();
  return NextResponse.json(communities);
}

export async function POST(req: NextRequest) {
  try {
    const { id, name, description } = await req.json();
    const db = getDb();
    db.prepare('INSERT INTO communities (id, name, description, created_at) VALUES (?, ?, ?, ?)')
      .run(id, name, description, Date.now());
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
