'use client';
import { useEffect, useState, useRef } from 'react';
import { CreateMLCEngine } from '@mlc-ai/web-llm';

const MODEL_ID = 'SmolLM2-135M-Instruct-q0f16-MLC';
const SYSTEM_PROMPT = `You are KI, the intelligence engine of Kalki Technologies.
You are helpful, concise, and proud to be part of the open‑source, private AI revolution.
Answer about web development, digital marketing, AI automation, and quantum‑inspired computing.
Keep responses under 3 sentences.`;

export function UltraFastWebLLM() {
  const [engine, setEngine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const eng = await CreateMLCEngine(MODEL_ID, {
          initProgressCallback: (p: any) => { if (mounted) setProgress(p.progress * 100); }
        });
        if (mounted) setEngine(eng);
      } catch (err) { console.error(err); }
      finally { if (mounted) setLoading(false); }
    };
    load();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!engine || !input.trim() || isLoading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    const conversation = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages, userMsg];
    try {
      let full = '';
      const stream = await engine.chat.completions.create({ messages: conversation, stream: true });
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content;
        if (delta) full += delta;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            const updated = [...prev];
            updated[updated.length - 1] = { ...last, content: full };
            return updated;
          } else {
            return [...prev, { role: 'assistant', content: full }];
          }
        });
      }
    } catch (err) { console.error(err); }
    finally { setIsLoading(false); }
  };

  if (loading) {
    return <div className="p-8 text-center text-gold-400">🚀 Loading KI engine… {Math.round(progress)}%</div>;
  }

  return (
    <div className="flex flex-col h-[500px] glass-card rounded-3xl overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-black/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400">KI active – ultra‑fast inference ready</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-gold-600/20' : 'glass-card'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="flex gap-1"><span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce"/><span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce delay-150"/><span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce delay-300"/></div>}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-4 border-t flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask KI..." className="flex-1 bg-black/50 rounded-full px-4 py-2 border border-gold-400/30" />
        <button type="submit" className="px-4 py-2 rounded-full bg-gold-600 text-white font-semibold">Send</button>
      </form>
    </div>
  );
}
