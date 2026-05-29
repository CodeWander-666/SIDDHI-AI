import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import WebSocket from 'ws';

// Store active nodes with their WebSocket connections and model readiness
let nodes: Map<string, { ws: WebSocket; ready: boolean }> = new Map();
let pendingResults: Map<string, string[]> = new Map();

export async function GET(req: NextRequest) {
  // This is a simplified WebSocket upgrade for Next.js App Router.
  // In production, you may need a custom server, but for development this works.
  if (!(req as any).server) {
    return NextResponse.json({ error: 'WebSocket not supported in this environment' }, { status: 500 });
  }
  
  // @ts-ignore - WebSocket upgrade handling
  const { socket, response } = (req as any).server.upgrade(req);
  const ws = new WebSocket(socket);
  const nodeId = crypto.randomUUID();

  ws.on('message', async (data) => {
    const message = JSON.parse(data.toString());
    switch (message.type) {
      case 'ready':
        nodes.set(nodeId, { ws, ready: true });
        broadcastNodeCount();
        break;
      case 'inference_result':
        const existing = pendingResults.get(message.requestId) || [];
        existing.push(message.result);
        pendingResults.set(message.requestId, existing);
        break;
      case 'ping':
        ws.send(JSON.stringify({ type: 'pong' }));
        break;
    }
  });

  ws.on('close', () => {
    nodes.delete(nodeId);
    broadcastNodeCount();
  });

  ws.send(JSON.stringify({ type: 'welcome', nodeId }));
  return response;
}

function broadcastNodeCount() {
  const count = Array.from(nodes.values()).filter(n => n.ready).length;
  for (const { ws } of nodes.values()) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'node_count', count }));
    }
  }
}

// Called from ensemble API to broadcast inference to all nodes
export async function broadcastInference(prompt: string, requestId: string): Promise<string[]> {
  const activeNodes = Array.from(nodes.values()).filter(n => n.ready);
  if (activeNodes.length === 0) return [];
  
  for (const { ws } of activeNodes) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'inference', prompt, requestId }));
    }
  }
  
  // Wait up to 10 seconds for responses
  const start = Date.now();
  while (pendingResults.get(requestId)?.length !== activeNodes.length && Date.now() - start < 10000) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  const results = pendingResults.get(requestId) || [];
  pendingResults.delete(requestId);
  return results;
}
