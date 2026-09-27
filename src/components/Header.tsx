'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Our Work' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const solid = !isHome || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid
            ? 'bg-tf-charcoal shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 bg-tf-bronze flex items-center justify-center flex-shrink-0">
              <span className="font-display font-black text-white text-sm tracking-wider">TF</span>
            </div>
            <div>
              <span className="font-display font-700 text-white text-lg tracking-widest uppercase leading-none">
                Terraforge
              </span>
              <p className="text-tf-mid text-[9px] tracking-[0.2em] uppercase font-medium leading-none mt-0.5">Engineering</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                href={to}
                className={`text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-200 ${
                  (to === '/' ? pathname === '/' : pathname.startsWith(to))
                    ? 'text-tf-bronze' : 'text-tf-offwhite hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-2 bg-tf-bronze hover:bg-tf-bronze-light text-white text-[11px] tracking-[0.18em] uppercase font-medium px-6 py-3 transition-colors duration-200"
          >
            Let's Talk
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-tf-black transition-opacity duration-300 lg:hidden flex flex-col ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex-1 flex flex-col justify-center px-10 pb-10 pt-24 gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              href={to}
              className={`font-display text-5xl font-700 tracking-wider uppercase transition-colors duration-200 ${
                (to === '/' ? pathname === '/' : pathname.startsWith(to))
                  ? 'text-tf-bronze' : 'text-tf-offwhite hover:text-tf-bronze-light'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 bg-tf-bronze text-white text-center text-[11px] tracking-[0.2em] uppercase font-medium py-4"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </>
  );
}
