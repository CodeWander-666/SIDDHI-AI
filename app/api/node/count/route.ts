import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const nodesFile = path.join(process.cwd(), 'nodes.json');
    let nodes = {};
    try {
      const data = await fs.readFile(nodesFile, 'utf-8');
      nodes = JSON.parse(data);
    } catch {}
    const now = Date.now();
    const active = Object.values(nodes).filter((ts: number) => now - ts < 120000).length;
    return NextResponse.json({ count: active });
  } catch { return NextResponse.json({ count: 0 }); }
}
