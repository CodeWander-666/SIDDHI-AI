import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/ki/sqlite';

export async function GET() {
  const db = getDb();
  const services = db.prepare('SELECT * FROM services ORDER BY created_at DESC').all();
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  try {
    const service = await req.json();
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO services (id, title, description, price, image_base64, dev_name, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      service.id,
      service.title,
      service.description,
      service.price,
      service.imageBase64,
      service.devName,
      Date.now()
    );
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
