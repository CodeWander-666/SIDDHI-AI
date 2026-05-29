'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'KI Cloud', href: '/ki-cloud' },
    { name: 'Digital Marketing', href: '/digital-marketing' },
    { name: 'Plans', href: '/plans' },
    { name: 'About', href: '/about' },
    { name: 'Vision', href: '/vision' },
    { name: 'Blog', href: '/blog' },
    { name: 'Hiring', href: '/hiring' },
    { name: 'Support', href: '/support' },
  ];

  const serviceLinks = [
    { name: 'For Startups', href: '/services/for-startups' },
    { name: 'For Developers', href: '/services/for-developers' },
    { name: 'For Small Business', href: '/services/for-small-businesses' },
    { name: 'For Social Creators', href: '/services/for-social-creators' },
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'SEO Dominant', href: '/services/seo' },
    { name: 'Social Media Automation', href: '/services/social-media' },
    { name: 'LinkedIn Growth', href: '/services/linkedin' },
    { name: 'AI Automation', href: '/services/ai-automation' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl py-3 shadow-2xl'
            : 'bg-black/50 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo / Brand – animated gradient text */}
          <Link href="/" className="relative z-50">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-bold tracking-wider bg-gradient-to-r from-cyan-400 via-gold-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto] whitespace-nowrap">
              KALKI TECHNOLOGIES
            </div>
          </Link>

          {/* 3D Menu Button (Hamburger) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="relative z-50 flex flex-col items-end justify-center gap-1.5 w-8 h-8 group focus:outline-none"
            aria-label="Open menu"
          >
            <span className="w-6 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-gold-400 group-hover:w-7" />
            <span className="w-5 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-gold-400 group-hover:w-6" />
            <span className="w-4 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-gold-400 group-hover:w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay – glassmorphism, slides from right */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ease-out ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`relative z-10 h-full w-full max-w-sm ml-auto bg-black/90 backdrop-blur-xl shadow-2xl flex flex-col transform transition-all duration-500 delay-100 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl hover:text-gold-400 transition"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Scrollable navigation */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/90 hover:text-gold-400 text-lg font-medium transition py-1 border-b border-white/10"
                >
                  {link.name}
                </Link>
              ))}

              {/* Services dropdown */}
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex justify-between items-center w-full text-white/90 hover:text-gold-400 text-lg font-medium transition py-1 border-b border-white/10"
                >
                  Services
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`mt-2 ml-4 space-y-2 overflow-hidden transition-all duration-300 ${
                    servicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-gray-300 hover:text-gold-400 text-sm py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          {/* Bottom action buttons */}
          <div className="p-6 border-t border-white/10">
            <a
              href="https://wa.me/916261031710"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>

      {/* Add keyframes for gradient animation (if not already in globals.css) */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% auto;
        }
      `}</style>
    </>
  );
}
