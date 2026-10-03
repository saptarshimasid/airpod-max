'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { BatteryCharging, Zap, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function EnduranceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (fillRef.current && trackRef.current) {
        gsap.fromTo(
          fillRef.current,
          { scaleX: 0.15 },
          {
            scaleX: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 85%',
              end: 'bottom 50%',
              scrub: 1.2,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="endurance"
      className="bg-[var(--panel)] px-[6%] py-24 sm:py-32 transition-colors duration-400"
    >
      {/* Section Heading */}
      <div className="flex items-center justify-between gap-5 mb-14 text-xs font-semibold tracking-[1.6px] uppercase">
        <span className="text-[var(--text)]">05 / THE LONG PLAY</span>
        <span className="hidden sm:inline-block text-[11px] text-[var(--muted)]">
          ONE MORE TRACK.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left Column */}
        <div>
          <h2 className="font-display font-medium text-fluid-h2 tracking-tight leading-tight m-0 text-[var(--text)]">
            Stay in
            <br />
            <em className="font-serif italic font-normal text-[var(--muted)]">your rhythm.</em>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[var(--muted)] max-w-md mt-6 sm:mt-8 m-0">
            From the first track to the final encore. More time for the music, podcasts, films, and
            moments you love.
          </p>
        </div>

        {/* Right Column: 20 Hours Stat Card */}
        <div className="lg:pl-12 lg:border-l border-[var(--border)]">
          <span className="text-xs font-semibold tracking-[1.8px] text-[var(--muted)] uppercase block mb-2">
            UP TO
          </span>

          <div className="flex items-baseline gap-3">
            <strong className="font-display font-medium text-fluid-number tracking-tighter text-[var(--text)]">
              20
            </strong>
            <span className="text-2xl sm:text-4xl font-normal text-[var(--muted)]">hrs</span>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)] mt-2">
            Listening time on a single charge with Active Noise Cancellation or Spatial Audio
            enabled.
          </p>

          {/* Interactive Charging Track */}
          <div
            ref={trackRef}
            className="w-full h-2 sm:h-2.5 rounded-full bg-[var(--border)] overflow-hidden mt-8 relative"
            aria-hidden="true"
          >
            <div
              ref={fillRef}
              className="h-full bg-[var(--text)] origin-left rounded-full transition-transform will-change-transform shadow-[0_0_12px_rgba(23,33,31,0.3)]"
            />
          </div>
        </div>
      </div>

      {/* Feature Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-16 pt-10 border-t border-[var(--border)]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4 items-start"
        >
          <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--text)]">
            <Zap className="w-5 h-5 text-[#5c8a51]" />
          </div>
          <div>
            <b className="font-medium text-lg text-[var(--text)] block mb-1.5">USB-C charging</b>
            <span className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              One familiar connection to power your next listen. 5 minutes of charge provides
              around 1.5 hours of listening.
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex gap-4 items-start"
        >
          <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--text)]">
            <Shield className="w-5 h-5 text-[#5c8a51]" />
          </div>
          <div>
            <b className="font-medium text-lg text-[var(--text)] block mb-1.5">Smart Case</b>
            <span className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              Stores in an ultra-low-power state that preserves battery life when the music takes a
              break.
            </span>
          </div>
        </motion.div>
      </div>

      {/* Source footnote */}
      <p className="text-xs text-[var(--muted)] mt-12 mb-0">
        AirPods Max 2. Battery life varies by use and settings.{' '}
        <a
          href="https://www.apple.com/in/airpods-max/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--text)] transition-colors underline-offset-4"
        >
          See Apple’s battery testing details ↗
        </a>
      </p>
    </section>
  );
}
