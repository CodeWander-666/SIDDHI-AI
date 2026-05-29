'use client';
import { useState, useRef, useEffect } from 'react';
import { useKI } from '@/context/KIContext';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SYSTEM_PROMPT = `You are KI, the open‑source intelligence engine of Kalki Technologies.
You are helpful, concise, and proud to run entirely inside the user's browser.
Answer questions about web development, digital marketing, AI automation, and privacy.
Keep responses under 500 words. Use markdown for formatting.`;

export function WebLLMChat({ 
  embedded = false, 
  showHeader = true, 
  onNewMessage,  // optional callback for parent
}: any) {
  const { engine, loading, activeNodes } = useKI();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll only when new message arrives and user is near bottom
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!engine || !input.trim() || isGenerating) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsGenerating(true);

    try {
      const conversation = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages, userMsg];
      const stream = await engine.chat.completions.create({
        messages: conversation,
        stream: true,
        max_tokens: 512,  // Fix truncated responses
      });
      let full = '';
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
      if (onNewMessage) onNewMessage({ role: 'assistant', content: full });
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 border-4 border-gold-400/30 rounded-full" />
          <div className="absolute inset-0 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-gold-400">KI is warming up in background...</p>
        <p className="text-xs text-gray-500 mt-2">Your private node will be ready in a moment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black/30 rounded-xl overflow-hidden">
      {showHeader && (
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm">KI node active</span>
          </div>
          <span className="text-xs text-gray-400">{activeNodes} node{activeNodes !== 1 && 's'} online</span>
        </div>
      )}

      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold-400/30"
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p className="text-4xl mb-4">🤖</p>
            <p>Ask me anything – I'm KI, your private AI assistant.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-gold-600/20 border border-gold-400/30'
                  : 'glass-card border border-white/10'
              }`}
            >
              {msg.role === 'assistant' ? (
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex justify-start">
            <div className="glass-card p-3 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask KI anything..."
            rows={1}
            className="flex-1 bg-black/50 rounded-2xl px-4 py-3 border border-gold-400/30 focus:outline-none focus:border-gold-400 resize-none"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isGenerating}
            className="px-5 py-3 rounded-full bg-gold-600 text-white font-semibold disabled:opacity-50 hover:scale-105 transition"
          >
            Send
          </button>
        </div>
        <p className="text-[10px] text-gray-500 text-center mt-2">
          🔒 100% local – {activeNodes} active node{activeNodes !== 1 && 's'} in distributed network
        </p>
      </div>
    </div>
  );
}
