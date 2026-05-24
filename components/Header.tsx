'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'KI Cloud', href: '/ki-cloud' },
    { name: 'Digital Marketing', href: '/digital-marketing' },
    { name: 'Plans', href: '/plans' },
    { name: 'About', href: '/about' },
    { name: 'Vision', href: '/vision' },
    { name: 'Blog', href: '/blog' },
    { name: 'Hiring', href: '/hiring' },
    { name: 'Support', href: '/support' }
  ];

  const serviceDropdown = [
    { name: 'For Startups', href: '/services/for-startups' },
    { name: 'For Developers', href: '/services/for-developers' },
    { name: 'For Small Business', href: '/services/for-small-businesses' },
    { name: 'For Social Creators', href: '/services/for-social-creators' }
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl py-3 shadow-2xl' : 'bg-black/50 backdrop-blur-md py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="w-12"></div>
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <div className="text-xl md:text-2xl font-serif tracking-wider bg-gradient-to-r from-cyan-400 via-gold-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              KALKI TECHNOLOGIES
            </div>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="relative z-50 flex flex-col items-end justify-center gap-1.5 w-8 h-8"
          >
            <span className="w-6 h-0.5 bg-white rounded-full transition-all" />
            <span className="w-5 h-0.5 bg-white rounded-full transition-all" />
            <span className="w-4 h-0.5 bg-white rounded-full transition-all" />
          </button>
        </div>
      </header>

      {/* Compact, scrollable glass menu overlay */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ease-out ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <div className={`relative z-10 h-full flex flex-col justify-start pt-24 pb-8 px-8 overflow-y-auto transform transition-all duration-500 delay-100 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-2xl hover:text-gold-400 transition"
          >
            ✕
          </button>
          <nav className="flex flex-col items-end gap-4 text-lg md:text-xl font-serif">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-gold-400 transition-all duration-300 py-1 border-b border-transparent hover:border-gold-400"
              >
                {item.name}
              </Link>
            ))}
            {/* Services dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'services' ? null : 'services')}
                className="text-white/80 hover:text-gold-400 transition-all duration-300 flex items-center gap-2 py-1"
              >
                Services
                <svg className={`w-4 h-4 transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'services' && (
                <div className="mt-2 flex flex-col gap-2 text-sm text-right">
                  {serviceDropdown.map(service => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-300 hover:text-gold-400 transition"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <div className="mt-8 flex gap-4 justify-end">
            <a
              href="https://wa.me/916261031710"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white text-sm font-semibold hover:scale-105 transition"
            >
              Contact Sales
            </a>
            <a
              href="https://wa.me/916261031710"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border border-white/30 text-white text-sm hover:border-gold-400 hover:text-gold-400 transition"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
