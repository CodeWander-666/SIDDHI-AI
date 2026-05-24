import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const NODES_FILE = path.join(process.cwd(), 'nodes.json');

async function readNodes() {
  try {
    const data = await fs.readFile(NODES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch { return {}; }
}

async function writeNodes(nodes: any) {
  await fs.writeFile(NODES_FILE, JSON.stringify(nodes, null, 2));
}

export async function POST(req: Request) {
  try {
    const { nodeId } = await req.json();
    const nodes = await readNodes();
    nodes[nodeId] = Date.now();
    await writeNodes(nodes);
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
