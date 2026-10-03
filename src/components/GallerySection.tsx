'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryItem } from '@/types';

interface GallerySectionProps {
  items?: GalleryItem[];
}

const newGalleryItems: GalleryItem[] = [
  {
    id: 'gallery-1',
    index: '01 / ARCHITECTURAL SILHOUETTE',
    title: 'Form meets acoustic stillness.',
    image: '/assets/gallery-new-1.jpg',
    width: 2800,
    height: 1575,
    isWide: true,
    aspect: 'aspect-[2.1/1]',
  },
  {
    id: 'gallery-2',
    index: '02 / THE TENSIONED CANOPY',
    title: 'Breathable knit-mesh engineering.',
    image: '/assets/gallery-new-2.jpg',
    width: 1660,
    height: 1245,
    isWide: false,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'gallery-3',
    index: '03 / ACOUSTIC MEMORY FOAM',
    title: 'Calculated contouring & plush seal.',
    image: '/assets/gallery-new-3.jpg',
    width: 1660,
    height: 1245,
    isWide: false,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'gallery-4',
    index: '04 / PRECISION DIGITAL CROWN',
    title: 'Tactile micro-ridges & haptic mastery.',
    image: '/assets/gallery-new-4.jpg',
    width: 2800,
    height: 1575,
    isWide: true,
    aspect: 'aspect-[2.1/1]',
  },
];

export function GallerySection({ items = newGalleryItems }: GallerySectionProps) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'form' | 'details'>('all');

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === 'Escape') setActiveItem(null);
      if (e.key === 'ArrowRight') {
        const currIdx = items.findIndex((i) => i.id === activeItem.id);
        const nextIdx = (currIdx + 1) % items.length;
        setActiveItem(items[nextIdx]);
      }
      if (e.key === 'ArrowLeft') {
        const currIdx = items.findIndex((i) => i.id === activeItem.id);
        const prevIdx = (currIdx - 1 + items.length) % items.length;
        setActiveItem(items[prevIdx]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, items]);

  const filteredItems = items.filter((item) => {
    if (filter === 'form') return item.isWide;
    if (filter === 'details') return !item.isWide;
    return true;
  });

  return (
    <section id="gallery" className="px-[6%] py-24 sm:py-32 border-b border-[var(--border)]">
      {/* Section Heading */}
      <div className="flex items-center justify-between gap-5 mb-14 text-xs font-semibold tracking-[1.6px] uppercase">
        <span className="text-[var(--text)]">08 / EVERY ANGLE</span>
        <span className="hidden sm:inline-block text-[11px] text-[var(--muted)]">
          FORM YOU CAN FEEL.
        </span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="font-display font-medium text-fluid-h2 tracking-tight leading-tight m-0 text-[var(--text)]">
            A closer
            <br />
            <em className="font-serif italic font-normal text-[var(--muted)]">kind of look.</em>
          </h2>
          <p className="max-w-xs text-base sm:text-lg leading-relaxed text-[var(--muted)] mt-4 m-0">
            The silhouette. The texture. The details. Beautiful, whichever way you look at it.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 p-1 rounded-full border border-[var(--border)] bg-[var(--panel)] text-xs">
          {[
            { id: 'all', label: 'All Angles' },
            { id: 'form', label: 'Silhouettes' },
            { id: 'details', label: 'Macro Craft' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`relative px-4 py-2 rounded-full font-medium transition-all ${
                filter === tab.id
                  ? 'text-[#17211f] font-semibold'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {filter === tab.id && (
                <motion.div
                  layoutId="galleryTabPill"
                  className="absolute inset-0 rounded-full bg-[var(--accent)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.figure
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className={`m-0 group cursor-pointer ${
                item.isWide ? 'sm:col-span-2 lg:col-span-3' : 'col-span-1'
              }`}
              onClick={() => setActiveItem(item)}
            >
              <div
                className={`relative overflow-hidden rounded-xl bg-[var(--panel)] transition-all shadow-sm group-hover:shadow-xl ${
                  item.isWide ? 'aspect-[1.8/1] sm:aspect-[2.1/1]' : 'aspect-[4/3] sm:aspect-[1/1.12]'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={item.isWide ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />

                {/* Subtle Glass Lighting Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                  <span className="text-white text-xs font-mono tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#c9eac0]" />
                    Click to view full dimension
                  </span>
                  <span className="p-2.5 rounded-full bg-white/90 text-black backdrop-blur-md shadow-lg transition-transform group-hover:scale-110">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <figcaption className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline pt-4 gap-1 sm:gap-4 text-[var(--text)]">
                <span className="text-[11px] font-mono tracking-wider text-[var(--muted)] uppercase">
                  {item.index}
                </span>
                <span className="text-sm sm:text-base font-medium tracking-tight group-hover:text-[#4d7242] transition-colors">
                  {item.title}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[85vh] aspect-[16/10] overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="object-contain"
                priority
              />

              {/* Controls */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors z-20 backdrop-blur-md border border-white/20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currIdx = items.findIndex((i) => i.id === activeItem.id);
                  const prevIdx = (currIdx - 1 + items.length) % items.length;
                  setActiveItem(items[prevIdx]);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md border border-white/10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currIdx = items.findIndex((i) => i.id === activeItem.id);
                  const nextIdx = (currIdx + 1) % items.length;
                  setActiveItem(items[nextIdx]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md border border-white/10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end px-5 py-3 rounded-xl bg-black/70 text-white backdrop-blur-md border border-white/10">
                <div>
                  <span className="text-xs font-mono text-[#c9eac0] block mb-0.5">{activeItem.index}</span>
                  <span className="text-sm sm:text-base font-medium">{activeItem.title}</span>
                </div>
                <span className="text-xs text-white/60 font-mono hidden sm:inline">Use ← → arrow keys</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
