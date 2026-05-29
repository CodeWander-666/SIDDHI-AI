'use client';
import { useEffect } from 'react';
import { AnimatedGradientBackground } from '@/components/AnimatedGradientBackground';
import { SupportChatInterface } from '@/components/support/SupportChatInterface';
import Link from 'next/link';

export default function SupportPage() {
  useEffect(() => {
    document.body.classList.add('support-page');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.classList.remove('support-page');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <AnimatedGradientBackground />
      <div className="fixed inset-0 flex flex-col z-10">
        {/* Top bar */}
        <div className="flex-shrink-0 pt-12 sm:pt-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto w-full">
            <Link href="/" className="text-gold-400 text-sm hover:underline inline-flex items-center gap-1">
              ← Back to Home
            </Link>
          </div>
        </div>
        {/* Chat container - takes remaining space */}
        <div className="flex-1 min-h-0 px-3 sm:px-6 pb-4 sm:pb-6 mt-2">
          <div className="max-w-4xl mx-auto w-full h-full glass-card rounded-2xl sm:rounded-3xl overflow-hidden border border-gold-400/20 shadow-2xl">
            <SupportChatInterface />
          </div>
        </div>
        {/* Disclaimer */}
        <div className="flex-shrink-0 pb-4 text-center">
          <p className="text-[10px] text-gray-500 px-2">
            KI support is an AI assistant – it may make mistakes. For urgent issues, please WhatsApp us.
          </p>
        </div>
      </div>

      <style jsx global>{`
        body.support-page header,
        body.support-page footer {
          display: none !important;
        }
        body.support-page {
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}
