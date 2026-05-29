'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { useKI } from '@/context/KIContext';
import { NodeTracker } from '@/components/NodeTracker';
import { GradientBackground } from '@/components/GradientBackground';
import Link from 'next/link';

interface Conversation {
  id: string;
  title: string;
  messages: { role: 'user' | 'assistant'; content: string }[];
  createdAt: Date;
  updatedAt: Date;
}

function ChatContent() {
  const searchParams = useSearchParams();
  const currentId = searchParams.get('id');
  const { engine } = useKI();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // Load conversations from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('ki_conversations');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const convs = parsed.map((c: any) => ({
          ...c,
          messages: c.messages || [],
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt)
        }));
        setConversations(convs);
      } catch (e) {
        console.error('Failed to parse conversations', e);
        initDefaultConversation();
      }
    } else {
      initDefaultConversation();
    }
  }, []);

  const initDefaultConversation = () => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations([newConv]);
    localStorage.setItem('ki_conversations', JSON.stringify([newConv]));
  };

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('ki_conversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  const getCurrentConversation = (): Conversation | undefined => {
    if (!currentId) return conversations[0];
    return conversations.find(c => c.id === currentId) || conversations[0];
  };

  const updateConversation = (id: string, updates: Partial<Conversation>) => {
    setConversations(prev => prev.map(c => c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c));
  };

  const addMessage = (id: string, message: { role: 'user' | 'assistant'; content: string }) => {
    setConversations(prev => prev.map(c => {
      if (c.id !== id) return c;
      const messages = c.messages || [];
      return { ...c, messages: [...messages, message], updatedAt: new Date() };
    }));
  };

  const newChat = () => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations(prev => [newConv, ...prev]);
    window.history.pushState({}, '', `/chat?id=${newConv.id}`);
  };

  const renameChat = (id: string, newTitle: string) => {
    if (newTitle.trim()) {
      updateConversation(id, { title: newTitle.trim() });
    }
    setDropdownOpen(null);
  };

  const deleteChat = (id: string) => {
    if (confirm('Delete this conversation permanently?')) {
      const newConversations = conversations.filter(c => c.id !== id);
      setConversations(newConversations);
      if (newConversations.length === 0) {
        initDefaultConversation();
      }
      if (currentId === id && newConversations.length > 0) {
        window.history.pushState({}, '', `/chat?id=${newConversations[0].id}`);
      }
    }
    setDropdownOpen(null);
  };

  const handleSendMessage = async (prompt: string): Promise<string> => {
    if (!engine) return 'Engine not ready';
    const currentConv = getCurrentConversation();
    if (!currentConv) return 'No conversation found';
    try {
      const trainingPrompt = `You are KI, the official AI assistant of Kalki Technologies.
Answer questions about web development, digital marketing, AI automation, SEO, social media, pricing, and company info. Be concise, friendly, and use markdown.`;
      const response = await engine.chat.completions.create({
        messages: [
          { role: 'system', content: trainingPrompt },
          ...(currentConv.messages || []),
          { role: 'user', content: prompt }
        ],
        max_tokens: 512,
        stream: false,
      });
      return response.choices[0].message.content;
    } catch (err) {
      console.error(err);
      return 'Sorry, I encountered an error. Please try again.';
    }
  };

  const currentConv = getCurrentConversation();
  if (!currentConv) return null;

  return (
    <div className="fixed inset-0 flex overflow-hidden z-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-black/80 backdrop-blur-xl border-r border-white/10 flex flex-col h-full overflow-hidden z-20`}>
        {sidebarOpen && (
          <>
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs uppercase tracking-wider text-gold-400">KI Network</h3>
                <NodeTracker />
              </div>
              <div className="text-xs text-center text-cyan-400">{conversations.length} conversations</div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {conversations.map(conv => (
                <div key={conv.id} className="group relative">
                  <Link
                    href={`/chat?id=${conv.id}`}
                    className={`block px-3 py-2 rounded-lg text-sm truncate ${currentConv?.id === conv.id ? 'bg-white/10 text-gold-400' : 'text-gray-300 hover:bg-white/5'}`}
                  >
                    {conv.title}
                  </Link>
                  <button
                    onClick={(e) => { e.preventDefault(); setDropdownOpen(dropdownOpen === conv.id ? null : conv.id); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white"
                  >
                    ⋮
                  </button>
                  {dropdownOpen === conv.id && (
                    <div className="absolute right-2 top-full mt-1 bg-black/90 backdrop-blur-md rounded-lg shadow-lg border border-white/10 z-30 min-w-[120px]">
                      <button onClick={() => { const newTitle = prompt('Enter new title:', conv.title); if (newTitle) renameChat(conv.id, newTitle); }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10">Rename</button>
                      <button onClick={() => deleteChat(conv.id)} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10">Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/10">
              <button onClick={newChat} className="w-full py-2 rounded-full bg-gradient-to-r from-cyan-600 to-gold-600 text-white font-semibold hover:scale-105 transition">+ New Chat</button>
            </div>
          </>
        )}
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40 backdrop-blur-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">{sidebarOpen ? '◀' : '▶'}</button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gold-400">Kalki Intelligency</span>
            <Link href="/" className="text-xs text-gray-400 hover:text-white">← Back to Home</Link>
          </div>
          <div className="w-8" />
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <ChatInterface
            conversationId={currentConv.id}
            messages={currentConv.messages || []}
            onSendMessage={handleSendMessage}
            onNewMessage={(msg) => {
              addMessage(currentConv.id, msg);
              if ((currentConv.messages?.length || 0) === 0 && msg.role === 'user') {
                const newTitle = msg.content.slice(0, 30) + (msg.content.length > 30 ? '…' : '');
                updateConversation(currentConv.id, { title: newTitle });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gold-400 bg-black">Loading conversation...</div>}>
      <ChatContent />
    </Suspense>
  );
}
