'use client';
import { useState, useEffect, useRef } from 'react';
import { useKI } from '@/context/KIContext';

const quickReplies = [
  { id: 'pricing', text: '💰 Pricing & Plans', response: 'Our plans start at ₹7,999 for static websites. Which service are you interested in? (Website / SEO / Social Media / LinkedIn)' },
  { id: 'services', text: '⚙️ Our Services', response: 'We offer AI automation, digital marketing (SEO, social, GMB, LinkedIn), website development, and KI Cloud private AI. What would you like to know more about?' },
  { id: 'ki_cloud', text: '☁️ What is KI Cloud?', response: 'KI Cloud is a private AI that runs entirely in your browser – no data centre, total privacy. It uses WebLLM and a distributed node network. Would you like to try it?' },
  { id: 'support', text: '🎧 Talk to Human', response: 'You can reach our team on WhatsApp: +91 6261031710. We typically respond within 15 minutes.' },
];

const followUpOptions = [
  { id: 'website', parent: 'pricing', text: '💻 Website Development', response: 'Static website ₹7,999 (one‑time), Dynamic Next.js ₹12,999 (one‑time). Both include SEO structure, responsive design, and 1 month support.' },
  { id: 'seo', parent: 'pricing', text: '📈 SEO Packages', response: 'GMB SEO ₹8,999/month, SEO Dominant ₹9,999/month. Both include monthly reports and guaranteed keyword improvements.' },
  { id: 'social', parent: 'pricing', text: '📱 Social Media', response: 'Facebook+Instagram automation ₹9,999/month – includes 2 viral posts guaranteed + free blue tick verification.' },
  { id: 'linkedin', parent: 'pricing', text: '🔗 LinkedIn Growth', response: '₹9,999/month – includes free LinkedIn Premium, lead generation campaigns, and daily content.' },
  { id: 'try_cloud', parent: 'ki_cloud', text: '🚀 Try KI Cloud', response: 'Great! Visit /ki-cloud to explore the community, marketplace, and social feed. All data is private and runs locally.' },
  { id: 'contact_human', parent: 'support', text: '📞 Contact Now', response: 'Our team will reach out soon. Please share your phone number.' },
];

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function SupportChatInterface() {
  const { engine, loading } = useKI();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!loading && engine && messages.length === 0) {
      const welcomeMsg: Message = {
        id: crypto.randomUUID(),
        text: "👋 Hi there! I'm KI, your support assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
    }
  }, [loading, engine, messages.length]);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMsg: Message = {
      id: crypto.randomUUID(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const handleQuickReply = async (reply: typeof quickReplies[0]) => {
    addMessage(reply.text, 'user');
    setShowQuickReplies(false);
    setIsTyping(true);

    setTimeout(() => {
      addMessage(reply.response, 'bot');
      setIsTyping(false);
      const relatedOptions = followUpOptions.filter(opt => opt.parent === reply.id);
      if (relatedOptions.length > 0) {
        const followUpText = relatedOptions.map(opt => `• ${opt.text}`).join('\n');
        addMessage(`You can also ask about:\n${followUpText}`, 'bot');
      }
    }, 800);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !engine) return;
    addMessage(input, 'user');
    setInput('');
    setIsTyping(true);
    setShowQuickReplies(false);

    try {
      const conversation = messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));
      conversation.push({ role: 'user', content: input });
      const response = await engine.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are KI Support, a helpful assistant for Kalki Technologies. Answer questions about pricing, services, KI Cloud, and support. Be concise and friendly.' },
          ...conversation,
        ],
        max_tokens: 200,
        stream: false,
      });
      const reply = response.choices[0].message.content;
      addMessage(reply, 'bot');
    } catch (err) {
      addMessage('Sorry, I encountered an issue. Please try again or contact us on WhatsApp.', 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 border-4 border-gold-400/30 rounded-full" />
          <div className="absolute inset-0 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-gold-400">Loading KI support agent...</p>
        <p className="text-xs text-gray-500 mt-2">This runs entirely in your browser – private & secure.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black/30 backdrop-blur-sm">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 flex items-center justify-center text-white font-bold">KI</div>
          <div>
            <h3 className="font-semibold">Kalki Support</h3>
            <p className="text-xs text-gray-400">Usually replies in seconds (AI)</p>
          </div>
        </div>
      </div>

      {/* Scrollable messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] p-3 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-gold-600/20 border border-gold-400/30'
                  : 'glass-card border border-white/10'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
              <p className="text-[10px] text-gray-500 mt-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
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

      {/* Quick replies (horizontal scroll on mobile) */}
      {showQuickReplies && messages.length > 0 && (
        <div className="flex-shrink-0 p-3 border-t border-white/10 bg-black/20 overflow-x-auto">
          <div className="flex flex-nowrap gap-2 pb-1">
            {quickReplies.map(reply => (
              <button
                key={reply.id}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1.5 rounded-full bg-white/10 text-xs whitespace-nowrap hover:bg-gold-600/30 transition"
              >
                {reply.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="flex-shrink-0 p-4 border-t border-white/10 bg-black/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-black/50 rounded-full px-4 py-2 text-sm border border-white/10 focus:outline-none focus:border-gold-400"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="px-4 py-2 rounded-full bg-gold-600 text-white text-sm font-semibold disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <p className="text-[10px] text-gray-500 text-center mt-2">
          🔒 Powered by KI – your conversation stays private.
        </p>
      </div>
    </div>
  );
}
