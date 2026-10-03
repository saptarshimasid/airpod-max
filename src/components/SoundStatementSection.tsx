'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SoundStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const headline = headlineRef.current;
    if (!headline) return;

    // Wrap words for scroll-driven text lighting
    const words = headline.querySelectorAll('.statement-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sound"
      className="px-[6%] py-24 sm:py-32 border-t border-[var(--border)]"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between gap-5 mb-16 sm:mb-20 text-xs font-semibold tracking-[1.6px] uppercase">
        <span className="text-[var(--text)]">01 / THE SOUND</span>
        <span className="hidden sm:inline-block text-[11px] text-[var(--muted)]">
          LESS DISTRACTION. MORE FEELING.
        </span>
      </div>

      {/* Word Reveal Statement */}
      <h2
        ref={headlineRef}
        className="font-display font-medium text-fluid-h2 tracking-tight text-[var(--text)] max-w-5xl leading-tight"
      >
        <span className="statement-word">There’s</span>{' '}
        <span className="statement-word">hearing</span>{' '}
        <span className="statement-word">music.</span>{' '}
        <span className="statement-word block sm:inline">And</span>{' '}
        <span className="statement-word">then</span>{' '}
        <span className="statement-word">there’s</span>{' '}
        <span className="statement-word italic text-[var(--muted)] block">being inside it.</span>
      </h2>

      {/* Statement Bottom */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-10 mt-14 sm:mt-20">
        <span
          className="text-7xl sm:text-8xl leading-none text-[#7b9381] animate-spin-slow select-none origin-center"
          aria-hidden="true"
        >
          ✳
        </span>

        <p className="max-w-md text-base sm:text-lg leading-relaxed text-[var(--muted)] m-0">
          Rediscover the layers in a familiar song. The space between instruments. The detail that
          makes you stop and listen. AirPods Max brings you closer to it all.
        </p>
      </div>
    </section>
  );
}
