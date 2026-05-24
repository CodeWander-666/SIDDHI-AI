import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { nodeId } = await req.json();
    const nodesFile = path.join(process.cwd(), 'nodes.json');
    let nodes = {};
    try {
      const data = await fs.readFile(nodesFile, 'utf-8');
      nodes = JSON.parse(data);
    } catch {}
    delete nodes[nodeId];
    await fs.writeFile(nodesFile, JSON.stringify(nodes, null, 2));
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
