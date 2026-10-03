'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Play, Pause } from 'lucide-react';

export function CreativeFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [motionActive, setMotionActive] = useState(true);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!footerRef.current || !motionActive) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 32 Equalizer bars
  const equalizerBars = Array.from({ length: 32 }, (_, i) => {
    const height = 20 + Math.pow(Math.sin(i * 0.51), 2) * 75;
    const delay = (i % 7) * 0.12;
    return { id: i, height, delay };
  });

  return (
    <footer
      ref={footerRef}
      id="footer"
      onPointerMove={handlePointerMove}
      className="relative bg-[#14201a] text-[#e2eddc] px-[4.5%] pt-14 pb-8 overflow-hidden transition-all select-none"
    >
      {/* Interactive Cursor Reactive Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 opacity-70"
        style={{
          background: `radial-gradient(ellipse at ${glowPos.x}% ${glowPos.y}%, rgba(138, 183, 118, 0.22), transparent 55%)`,
        }}
        aria-hidden="true"
      />

      {/* Footer Top Header */}
      <div className="relative z-10 flex items-center justify-between gap-3 pb-8 border-b border-[#2d3d33]">
        <a href="#" className="text-lg sm:text-2xl tracking-tight text-white focus:outline-none">
          AirPods <b className="font-bold">Max</b>
        </a>

        <div className="flex items-center gap-2 sm:gap-6">
          <button
            onClick={() => setMotionActive(!motionActive)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#4d6647] bg-[#1a2921] text-xs text-[#c1d0bc] hover:bg-[#25382e] transition-colors"
            aria-pressed={!motionActive}
          >
            {motionActive ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span className="hidden xs:inline">Pause motion</span>
                <span className="xs:hidden">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span className="hidden xs:inline">Play motion</span>
                <span className="xs:hidden">Play</span>
              </>
            )}
          </button>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#c1d0bc] hover:text-white transition-colors group"
          >
            <span className="hidden xs:inline">Back to top</span>
            <span className="xs:hidden">Top</span>
            <span className="w-7 h-7 rounded-full border border-[#4d6647] flex items-center justify-center transition-transform group-hover:-translate-y-1">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>

      {/* Typographic Hero Stage */}
      <div className="relative z-10 py-12 sm:py-24">
        {/* Equalizer animation - hidden on small mobile to avoid text collision */}
        <div
          className="hidden sm:flex absolute right-0 top-8 sm:top-12 h-16 sm:h-24 w-1/4 max-w-[240px] items-end justify-end gap-1 opacity-70 pointer-events-none"
          aria-hidden="true"
        >
          {equalizerBars.map((bar) => (
            <i
              key={bar.id}
              className={`block flex-1 max-w-[4px] rounded-full bg-[#b9d7a9] ${
                motionActive ? 'equalizer-bar' : ''
              }`}
              style={
                {
                  height: `${bar.height}%`,
                  '--bar-delay': `${bar.delay}s`,
                } as any
              }
            />
          ))}
        </div>

        <p className="text-[10px] sm:text-xs font-mono tracking-[2px] text-[#b2c4ab] uppercase m-0">
          THE LAST WORD. THE NEXT TRACK.
        </p>

        <div className="font-display font-medium text-[clamp(44px,13vw,220px)] leading-[0.92] tracking-tighter mt-6 sm:mt-10 select-none">
          <span className="block text-white">Keep</span>
          <span className="block pl-[8%] sm:pl-[12%] text-[#c9eac0]">
            listening
            <span
              className={`inline-block text-[#c9eac0] ${
                motionActive ? 'animate-period-pulse' : ''
              }`}
            >
              .
            </span>
          </span>
        </div>
      </div>

      {/* Infinite Marquee Ribbon */}
      <div
        className="relative z-10 border-y border-[#3a523a] -mx-[4.5%] py-4 sm:py-6 overflow-hidden select-none"
        aria-hidden="true"
      >
        <div className={`flex whitespace-nowrap ${motionActive ? 'animate-marquee' : ''}`}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <span
              key={idx}
              className="flex items-center gap-8 px-6 text-sm sm:text-lg font-light tracking-[3px] text-[#e2eddc]"
            >
              LESS NOISE <i className="not-italic text-[#aec99f] text-2xl">✳</i> MORE FEELING{' '}
              <i className="not-italic text-[#aec99f] text-2xl">✳</i> SOUND IN FORM{' '}
              <i className="not-italic text-[#aec99f] text-2xl">✳</i>
            </span>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <nav
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-10 sm:py-14 border-b border-[#2d3d33]"
        aria-label="Footer navigation"
      >
        {[
          { label: 'The sound', index: '01', href: '#sound' },
          { label: 'The design', index: '02', href: '#design' },
          { label: 'Make it yours', index: '03', href: '#pricing' },
          { label: 'Every angle', index: '04', href: '#gallery' },
        ].map((link) => (
          <a
            key={link.index}
            href={link.href}
            className="flex items-center justify-between pb-3 border-b border-[#3e5641] text-sm sm:text-base text-[#e2eddc] hover:text-[#b6e09f] transition-all group"
          >
            <span>{link.label}</span>
            <span className="font-mono text-xs text-[#a9bea0] group-hover:text-white transition-colors">
              {link.index}
            </span>
          </a>
        ))}
      </nav>

      {/* Footer Bottom Disclaimers */}
      <div className="relative z-10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-xs text-[#a3b69f] leading-relaxed">
        <div>
          <p className="m-0">Independent concept study. Not affiliated with Apple Inc.</p>
          <p className="m-0 mt-1">Product imagery and trademarks belong to Apple.</p>
        </div>

        <div>
          <p className="m-0">Features vary by model and compatible device.</p>
          <a
            href="https://www.apple.com/airpods-max/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white transition-colors"
          >
            Product details & requirements ↗
          </a>
        </div>

        <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-[#81997d]">
          MADE FOR LISTENING.
        </span>
      </div>
    </footer>
  );
}
