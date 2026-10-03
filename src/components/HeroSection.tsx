'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import { ProductData } from '@/types';

interface HeroSectionProps {
  data?: ProductData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal headline text
      gsap.fromTo(
        '.hero-line-anim',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          stagger: 0.18,
          ease: 'power3.out',
        }
      );

      // Hero image reveal
      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          { y: 60, scale: 0.92, opacity: 0, rotate: -4 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 1.6,
            ease: 'power3.out',
            delay: 0.1,
          }
        );
      }
    }, containerRef);

    // Subtle 3D mouse parallax on hero image
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageWrapRef.current) return;
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX / innerWidth - 0.5) * 24;
      const yOffset = (e.clientY / innerHeight - 0.5) * 20;

      gsap.to(imageWrapRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset * 0.4,
        rotationX: -yOffset * 0.4,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative px-[4.5%] pt-8 pb-7 min-h-[calc(100svh-86px)] flex flex-col justify-between overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Hero Top Eyebrow Bar */}
      <div className="flex items-center justify-between gap-5 text-xs font-semibold tracking-[1.6px] uppercase text-[var(--text)]">
        <span className="text-[var(--text)]">
          {data?.heroEyebrow || 'APPLE AIRPODS MAX'}
        </span>
        <span className="hidden sm:inline-block font-normal tracking-[0.4px] text-[var(--muted)]">
          {data?.heroEdition || 'A study in sound & form / 01'}
        </span>
      </div>

      {/* Main Hero Stage */}
      <div className="relative min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] flex-1 flex items-center justify-center my-4">
        {/* Massive Typographic Backdrop */}
        <h1
          ref={headlineRef}
          id="hero-title"
          className="w-full font-display font-semibold select-none text-fluid-hero relative z-10 pointer-events-none"
        >
          <span className="block hero-line-anim overflow-hidden">
            {data?.heroTitle.line1 || 'Sound.'}
          </span>
          <span className="block text-right hero-line-anim text-[var(--text)]">
            {data?.heroTitle.line2 || 'Beyond.'}
          </span>
        </h1>

        {/* Ambient Acoustic Sound Glow behind AirPods Max */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[650px] aspect-square pointer-events-none z-10 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full rounded-full bg-gradient-to-tr from-[#c9eac0]/25 via-transparent to-[#b2d7e6]/20 blur-3xl"
          />
        </div>

        {/* Central Floating AirPods Max Asset */}
        <div
          ref={imageWrapRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[85vw] max-w-[580px] sm:w-[55vw] sm:max-w-[660px] aspect-square pointer-events-none will-change-transform"
        >
          <div className="relative w-full h-full filter drop-shadow-[0_32px_45px_rgba(20,34,27,0.25)]">
            <Image
              src="/assets/hero.png"
              alt="AirPods Max showing sculpted ear cups and breathable mesh canopy"
              fill
              priority
              sizes="(max-width: 768px) 85vw, 660px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Hero poetic note */}
        <div className="hidden md:flex absolute right-[2%] top-[6%] text-[var(--muted)] items-start gap-4 text-sm leading-relaxed z-20">
          <span className="w-8 h-[1px] bg-[var(--muted)] mt-2.5" />
          <p className="font-normal">
            Every detail.
            <br />
            Every dimension.
            <br />
            Entirely immersive.
          </p>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="border-t border-[var(--border)] pt-5 flex flex-wrap justify-between items-center gap-4 relative z-30 text-sm">
        <p className="m-0 leading-relaxed text-[var(--text)]">
          {data?.heroPunchline.lead || 'Beautifully considered.'}
          <br />
          <span className="text-[var(--muted)]">
            {data?.heroPunchline.sub || 'Extraordinarily heard.'}
          </span>
        </p>

        <a
          href="#sound"
          className="group flex items-center gap-4 text-[var(--text)] hover:text-[#325227] transition-colors"
        >
          <span className="font-medium text-xs sm:text-sm">Discover the difference</span>
          <span className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:translate-y-1">
            <ArrowDown className="w-4 h-4 text-current" />
          </span>
        </a>

        <span className="hidden lg:inline-block text-[11px] font-semibold tracking-wider text-[var(--muted)]">
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}
