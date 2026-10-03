'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Volume2, ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenSoundDemo?: () => void;
}

export function Header({ onOpenSoundDemo }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('am-theme') as 'light' | 'dark' | null;
      const initial = saved || 'light';
      setTheme(initial);
      document.documentElement.dataset.theme = initial;
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('am-theme', next);
    } catch {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', next === 'dark' ? '#111815' : '#edf0ef');
    }
  };

  const navItems = [
    { label: 'Sound', href: '#sound' },
    { label: 'Design', href: '#design' },
    { label: 'Experience', href: '#experience' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <>
      {/* Top scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#8caf7e] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      <header className="sticky top-0 z-40 h-[76px] sm:h-[86px] px-[4.5%] flex items-center justify-between border-b border-[var(--border)] bg-[var(--header)] backdrop-blur-xl transition-colors duration-400">
        <a
          href="#"
          className="flex items-center gap-2 text-lg sm:text-[22px] tracking-tight text-[var(--text)] group focus:outline-none"
          aria-label="AirPods Max home"
        >
          <svg
            viewBox="0 0 28 28"
            className="w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none stroke-[2.3] stroke-linecap-round transition-transform duration-300 group-hover:scale-105"
            aria-hidden="true"
          >
            <path d="M5 16v-3a9 9 0 0118 0v3M5 15v8m18-8v8" />
          </svg>
          <span className="font-normal whitespace-nowrap">
            AirPods <b className="font-bold">Max</b>
          </span>
        </a>

        {/* Desktop Navigation links */}
        <nav
          className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[var(--text)]"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative py-2 text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 group"
            >
              {item.label}
              <span className="absolute bottom-1 left-0 w-full h-[1px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Sound Demo Trigger (desktop) */}
          {onOpenSoundDemo && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSoundDemo}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-[#17211f] transition-all"
              title="Acoustic Demo"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#5f8f53]" />
              <span>Listen Demo</span>
            </motion.button>
          )}

          {/* Light / Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 18 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            id="theme-toggle"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text)] hover:bg-[var(--panel)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#70ac61]"
            aria-label={mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` : 'Toggle theme'}
            title={mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` : 'Toggle theme'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#c9eac0]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--text)]" />
            )}
          </motion.button>

          {/* Apple Store CTA */}
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="https://www.apple.com/airpods-max/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium bg-[var(--text)] text-[var(--bg)] shadow-sm hover:opacity-90 transition-all whitespace-nowrap"
          >
            <span className="hidden sm:inline">Explore at Apple</span>
            <span className="sm:hidden">Apple</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </motion.a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text)] hover:bg-[var(--panel)] transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed top-[76px] left-0 right-0 z-30 bg-[var(--bg)] border-b border-[var(--border)] shadow-xl overflow-hidden px-6 py-6"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-[var(--text)] hover:text-[#4d7242] py-1 border-b border-[var(--border)]/50 transition-colors"
                >
                  {item.label}
                </a>
              ))}

              {onOpenSoundDemo && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSoundDemo();
                  }}
                  className="mt-2 w-full py-3 rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] flex items-center justify-center gap-2 font-medium text-sm"
                >
                  <Volume2 className="w-4 h-4 text-[#5f8f53]" />
                  <span>Listen Acoustic Demo</span>
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
