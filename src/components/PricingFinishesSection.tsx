'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { FinishColor, ProductData } from '@/types';

interface PricingFinishesSectionProps {
  product?: ProductData;
  finishes?: FinishColor[];
}

const defaultFinishes: FinishColor[] = [
  {
    id: 'midnight',
    name: 'Midnight',
    hex: '#343b44',
    accent: '#64748b',
    tagline: 'Deep, celestial darkness with subtle obsidian undertones.',
    textColor: '#ffffff',
  },
  {
    id: 'starlight',
    name: 'Starlight',
    hex: '#d9d1bf',
    accent: '#e2ded2',
    tagline: 'Warm, lustrous metallic champagne inspired by ambient glow.',
    textColor: '#17211f',
  },
  {
    id: 'blue',
    name: 'Blue',
    hex: '#8ea9c2',
    accent: '#b0c6db',
    tagline: 'Ethereal, calming sky mist with anodised aluminum lustre.',
    textColor: '#17211f',
  },
  {
    id: 'purple',
    name: 'Purple',
    hex: '#b7a4cb',
    accent: '#cfc1de',
    tagline: 'Soft lavender hue designed to catch architectural light.',
    textColor: '#17211f',
  },
  {
    id: 'orange',
    name: 'Orange',
    hex: '#ed9674',
    accent: '#f4b7a1',
    tagline: 'Vibrant coral warmth reminiscent of golden hour dusk.',
    textColor: '#17211f',
  },
];

export function PricingFinishesSection({
  product,
  finishes = defaultFinishes,
}: PricingFinishesSectionProps) {
  const [selectedFinish, setSelectedFinish] = useState<FinishColor>(finishes[0]);

  return (
    <section
      id="pricing"
      className="bg-[var(--dark)] text-[#eef4ec] px-[6%] py-24 sm:py-32 overflow-hidden transition-colors duration-500"
    >
      {/* Section Heading */}
      <div className="flex items-center justify-between gap-5 border-b border-[#35433a] pb-6 mb-14 text-xs font-semibold tracking-[1.6px] uppercase">
        <span className="text-[#c9eac0]">07 / MAKE IT YOURS</span>
        <span className="hidden sm:inline-block text-[11px] text-[#b2c0b4]">
          A LITTLE SPACE. JUST FOR YOU.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Finishes Selector */}
        <div>
          <h2 className="font-display font-medium text-fluid-h2 tracking-tight leading-tight m-0 text-white">
            Great sound.
            <br />
            <em className="font-serif italic font-normal text-[#b2c0b4]">One choice.</em>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-[#b2c0b4] max-w-md mt-6 sm:mt-8 m-0">
            AirPods Max 2. Five finishes. Your kind of expression.
          </p>

          {/* Interactive Finishes Palette */}
          <div className="flex flex-wrap gap-5 sm:gap-6 mt-10" aria-label="Available finishes">
            {finishes.map((f) => {
              const isSelected = selectedFinish.id === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFinish(f)}
                  className="flex flex-col items-center gap-3 text-xs text-[#bdc8be] group focus:outline-none"
                  aria-pressed={isSelected}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ backgroundColor: f.hex }}
                    className={`w-9 h-9 rounded-full border border-white/30 shadow-md relative transition-shadow ${
                      isSelected ? 'ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[#17221e]' : ''
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                      </span>
                    )}
                  </motion.div>
                  <span
                    className={`transition-colors ${
                      isSelected ? 'text-[var(--accent)] font-semibold' : 'group-hover:text-white'
                    }`}
                  >
                    {f.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Finish Preview Card */}
          <motion.div
            key={selectedFinish.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 p-4 rounded-xl border border-[#35433a] bg-[#1a2520]/80 max-w-md backdrop-blur-md"
          >
            <div className="flex items-center gap-3 mb-1.5">
              <span
                className="w-3.5 h-3.5 rounded-full inline-block"
                style={{ backgroundColor: selectedFinish.hex }}
              />
              <span className="font-semibold text-sm text-white">{selectedFinish.name} Edition</span>
            </div>
            <p className="text-xs sm:text-sm text-[#a3b3a5] m-0 leading-relaxed">
              {selectedFinish.tagline}
            </p>
          </motion.div>
        </div>

        {/* Right Column: Apple India Price Card */}
        <div className="bg-[#e1eddc] text-[#17221e] p-6 sm:p-10 lg:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Finish Glow */}
          <div
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: selectedFinish.accent }}
          />

          <div className="flex justify-between items-center gap-4 relative z-10">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#3e5345]">
              {product?.name || 'AIRPODS MAX 2'}
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase border border-[#a9bba4] px-2.5 py-1 rounded-full text-[#3e5345]">
              {product?.price.market || 'APPLE INDIA'}
            </span>
          </div>

          <p className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl tracking-tighter my-6 sm:my-10 text-[#17221e] relative z-10">
            {product?.price.formatted || '₹74,900'}
          </p>

          <p className="text-sm text-[#4f6151] m-0 relative z-10">
            {product?.price.caption || 'Listed price · INR'}
          </p>

          <ul className="list-none m-0 p-0 pt-6 my-6 border-t border-[#b6c8af] space-y-3 relative z-10">
            {(product?.price.included || ['AirPods Max 2', 'Smart Case', 'USB-C Charge Cable']).map(
              (item) => (
                <li key={item} className="flex items-center gap-3 text-sm sm:text-base text-[#17221e]">
                  <span className="w-5 h-5 rounded-full bg-[#c3d9bd] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#30482d]" />
                  </span>
                  <span>{item}</span>
                </li>
              )
            )}
          </ul>

          <motion.a
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            href={product?.price.officialUrl || 'https://www.apple.com/in/shop/buy-airpods/airpods-max-2'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-6 py-4 rounded-full bg-[#17221e] text-[#e8f1e4] font-medium text-sm sm:text-base shadow-lg hover:bg-[#23332d] transition-all relative z-10 mt-2"
          >
            <span>Choose yours at Apple</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>

          <p className="text-xs leading-relaxed text-[#4f6151] mt-5 mb-2 relative z-10">
            {product?.price.fineprint ||
              'Price checked September 2026. Final price, payment options, and availability are confirmed by Apple.'}
          </p>

          <a
            href={product?.price.officialUrl || 'https://www.apple.com/in/shop/buy-airpods/airpods-max-2'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#30482d] font-semibold underline underline-offset-4 hover:text-black transition-colors relative z-10"
          >
            View official pricing ↗
          </a>
        </div>
      </div>
    </section>
  );
}
