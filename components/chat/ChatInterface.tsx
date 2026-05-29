'use client';
import { useState, useRef, useEffect } from 'react';
import { useKI } from '@/context/KIContext';
import { getTrainingPrompt } from '@/lib/training';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  conversationId: string;
  messages: Message[];
  onSendMessage: (message: string) => Promise<string>;
  onNewMessage?: (message: Message) => void;
}

export function ChatInterface({ conversationId, messages, onSendMessage, onNewMessage }: ChatInterfaceProps) {
  const { engine, loading, activeNodes } = useKI();
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!engine || !input.trim() || isGenerating) return;
    const userMsg: Message = { role: 'user', content: input };
    if (onNewMessage) onNewMessage(userMsg);
    setInput('');
    setIsGenerating(true);
    
    try {
      const response = await onSendMessage(input);
      const assistantMsg: Message = { role: 'assistant', content: response };
      if (onNewMessage) onNewMessage(assistantMsg);
    } catch (err) {
      console.error(err);
      if (onNewMessage) onNewMessage({ role: 'assistant', content: 'Sorry, an error occurred.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Chat area with animated border – only when generating */}
      <div 
        ref={chatAreaRef}
        className={`flex-1 overflow-hidden rounded-2xl transition-all duration-500 ${
          isGenerating 
            ? 'animate-border-pulse shadow-[0_0_30px_rgba(0,255,255,0.6),0_0_30px_rgba(255,20,147,0.6)] border-2 border-transparent' 
            : 'border border-white/10'
        }`}
        style={isGenerating ? {
          background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, cyan, hotpink, cyan) border-box',
          backgroundClip: 'padding-box, border-box',
        } : {}}
      >
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-sm rounded-2xl">
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                <p className="text-4xl mb-4">🤖</p>
                <p>Send a message to start chatting with KI.</p>
                <p className="text-xs mt-2">Your data never leaves this browser.</p>
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
                onClick={handleSend}
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
      </div>
    </div>
  );
}
