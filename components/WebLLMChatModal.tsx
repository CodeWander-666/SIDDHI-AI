'use client';
import { useEffect, useState, useRef } from 'react';
import { CreateMLCEngine } from '@mlc-ai/web-llm';
import { motion, AnimatePresence } from 'framer-motion';

const MODEL_ID = 'SmolLM2-135M-Instruct-q0f16-MLC';

export function WebLLMChatModal({ title, icon, systemPrompt, onClose }: any) {
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
    const conversation = [{ role: 'system', content: systemPrompt }, ...messages, userMsg];
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-3xl glass-card rounded-3xl overflow-hidden border border-gold-400/30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-white/10 bg-black/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{icon}</span>
              <h2 className="text-2xl font-serif text-gold-400">{title} Assistant</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">✕</button>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gold-400">Loading KI engine… {Math.round(progress)}%</p>
            </div>
          ) : (
            <>
              <div className="h-[400px] overflow-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <p>Ask me anything about {title.toLowerCase()} – I'm here to help!</p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-gold-600/20 border border-gold-400/30' : 'glass-card'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && <div className="flex gap-1"><span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce"/><span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce delay-150"/><span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce delay-300"/></div>}
                <div ref={bottomRef} />
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-4 border-t border-white/10 flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={`Ask ${title}...`}
                  className="flex-1 bg-black/50 rounded-full px-4 py-2 border border-gold-400/30 focus:outline-none focus:border-gold-400"
                />
                <button type="submit" className="px-4 py-2 rounded-full bg-gold-600 text-white font-semibold">Send</button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
