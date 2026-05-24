import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get('name');
    const file = formData.get('zipFile');
    if (!name || !file) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    // Here you would save the file, validate, and store metadata.
    // For demo, we just return success.
    return NextResponse.json({ success: true, message: 'Bot submitted for review' });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
