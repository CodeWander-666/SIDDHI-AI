import { NextRequest, NextResponse } from 'next/server';
import { broadcastInference } from '../ws/route';

export async function POST(req: NextRequest) {
  const { prompt, requestId } = await req.json();
  const responses = await broadcastInference(prompt, requestId);
  
  if (responses.length === 0) {
    return NextResponse.json({ error: 'No active nodes available' }, { status: 503 });
  }
  
  // Majority vote
  const frequency: Record<string, number> = {};
  for (const resp of responses) {
    frequency[resp] = (frequency[resp] || 0) + 1;
  }
  let bestAnswer = '';
  let bestCount = 0;
  for (const [answer, count] of Object.entries(frequency)) {
    if (count > bestCount) {
      bestCount = count;
      bestAnswer = answer;
    }
  }
  return NextResponse.json({ answer: bestAnswer, votes: responses.length });
}
