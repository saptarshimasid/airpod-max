'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CraftFeature } from '@/types';

interface CraftSectionProps {
  features?: CraftFeature[];
}

const defaultCraft: CraftFeature[] = [
  {
    index: '01',
    title: 'A softer landing.',
    description: 'Memory foam ear cushions surround your ears for a comfortable, acoustically sealed, immersive fit.',
    highlight: 'Acoustic Memory Foam',
  },
  {
    index: '02',
    title: 'A lighter touch.',
    description: 'The breathable knit-mesh canopy spans the headband to distribute weight evenly, reducing on-head pressure.',
    highlight: 'Knit-Mesh Canopy',
  },
  {
    index: '03',
    title: 'A little more control.',
    description: 'Turn the Digital Crown to adjust volume with micro precision. Press to control playback and summon Siri.',
    highlight: 'Tactile Digital Crown',
  },
];

export function CraftSection({ features = defaultCraft }: CraftSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (parallaxImgRef.current && imageFrameRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: imageFrameRef.current,
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
      id="design"
      className="px-[6%] py-24 sm:py-32"
      aria-labelledby="craft-title"
    >
      {/* Section Heading */}
      <div className="flex items-center justify-between gap-5 mb-14 text-xs font-semibold tracking-[1.6px] uppercase">
        <span className="text-[var(--text)]">03 / THE CRAFT</span>
        <span className="hidden sm:inline-block text-[11px] text-[var(--muted)]">
          NOTHING BY ACCIDENT.
        </span>
      </div>

      {/* Head Statement */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 sm:mb-16">
        <h2
          id="craft-title"
          className="font-display font-medium text-fluid-h2 tracking-tight leading-tight m-0 text-[var(--text)]"
        >
          Considered.
          <br />
          Down to the feel.
        </h2>
        <p className="max-w-sm text-base sm:text-lg leading-relaxed text-[var(--muted)] m-0">
          Sculpted metal. Soft ear cushions. A breathable knit-mesh canopy. An unmistakable silhouette,
          made for the simple pleasure of listening.
        </p>
      </div>

      {/* Parallax Hero Image Frame */}
      <div
        ref={imageFrameRef}
        className="relative h-[380px] sm:h-[500px] lg:h-[580px] rounded-lg overflow-hidden bg-[var(--panel)] shadow-sm"
      >
        <div
          ref={parallaxImgRef}
          className="absolute inset-0 -top-[15%] h-[130%] w-full will-change-transform"
        >
          <Image
            src="/assets/detail-new.jpg"
            alt="Macro detail of Apple AirPods Max machined aluminum and ear cup construction"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Floating Label */}
        <div className="absolute bottom-6 left-6 z-10 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold tracking-[1.5px] uppercase border border-white/10 shadow-lg">
          THE BEAUTY IS IN THE DETAILS.
        </div>
      </div>

      {/* 3-Column Craft Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mt-12 sm:mt-16">
        {features.map((item, idx) => (
          <motion.article
            key={item.index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="border-t border-[var(--border)] pt-6 group cursor-default transition-all duration-300 rounded-xl hover:bg-[var(--panel)]/40 p-3 sm:p-4 -mx-3 sm:-mx-4"
          >
            <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-4">
              <span className="font-mono">{item.index}</span>
              <span className="font-mono text-[10px] tracking-wider uppercase opacity-80 px-2 py-0.5 rounded bg-[var(--panel)] border border-[var(--border)]">
                {item.highlight}
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-[var(--text)] mb-3 group-hover:text-[#466e3b] transition-colors">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)] m-0">
              {item.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
