'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Compass } from 'lucide-react';

export function ExperienceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
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
      id="experience"
      className="relative min-h-[720px] lg:min-h-[820px] overflow-hidden bg-[#131915] text-white flex items-center"
      aria-label="Spatial audio experience"
    >
      {/* Background Image with GSAP Parallax */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 -top-[15%] h-[130%] w-full will-change-transform pointer-events-none"
      >
        <Image
          src="/assets/experience.jpg"
          alt="A listener wearing blue AirPods Max, eyes closed and immersed in music"
          fill
          sizes="100vw"
          className="object-cover object-[65%_center] sm:object-center"
        />
      </div>

      {/* Atmospheric Vignette & Contrast Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07100e]/95 via-[#09100b]/60 to-[#07100d]/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-[6%] py-24 sm:py-32 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-8">
            <Compass className="w-4 h-4 text-[#cce4c9]" />
            <span className="text-xs font-semibold tracking-[1.6px] uppercase text-[#cce4c9]">
              04 / GO SOMEWHERE ELSE
            </span>
          </div>

          <h2 className="font-display font-medium text-fluid-h2 tracking-tight leading-tight m-0 text-white mb-6">
            Stay here.
            <br />
            <em className="font-serif italic font-normal text-[#cce4c9]">Go everywhere.</em>
          </h2>

          <p className="text-lg sm:text-xl leading-relaxed text-[#dde6df] max-w-xl mb-10 font-normal">
            Let your next listen take you somewhere. Personalised Spatial Audio with dynamic head
            tracking surrounds you in multi-channel acoustic space.
          </p>

          <a
            href="https://www.apple.com/airpods-max/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 text-base font-medium text-white hover:text-[#cce4c9] transition-colors relative py-2"
          >
            <span>Explore the experience</span>
            <span className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-[#cce4c9]">
              <ArrowUpRight className="w-4 h-4" />
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#cce4c9] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
