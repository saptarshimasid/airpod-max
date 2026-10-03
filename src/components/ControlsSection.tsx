'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { GestureItem } from '@/types';

interface ControlsSectionProps {
  gestures?: GestureItem[];
}

const defaultGestures: GestureItem[] = [
  {
    number: '01',
    label: 'Turn it up.',
    tag: 'TURN THE DIGITAL CROWN',
    description:
      'Rotate the Digital Crown with micro-click precision to make continuous volume adjustments, from quiet ambient acoustic background to your favourite chorus crescendo.',
  },
  {
    number: '02',
    label: 'Press pause.',
    tag: 'PRESS ONCE',
    description:
      'Press the Digital Crown once to pause audio or accept and end telephone calls. Press it again when you are ready to pick up where you left off.',
  },
  {
    number: '03',
    label: 'Find the next track.',
    tag: 'PRESS TWICE / THRICE',
    description:
      'Double-press the Digital Crown to skip forward to the next song. Triple-press to skip backwards. A new mood is just a micro-gesture away.',
  },
  {
    number: '04',
    label: 'Let the world in.',
    tag: 'NOISE CONTROL BUTTON',
    description:
      'Switch listening modes instantly with the dedicated button on the ear cup. Choose Transparency when you want to interact with your surroundings naturally.',
  },
];

export function ControlsSection({ gestures = defaultGestures }: ControlsSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="controls" className="px-[6%] py-24 sm:py-32">
      {/* Section Heading */}
      <div className="flex items-center justify-between gap-5 mb-14 text-xs font-semibold tracking-[1.6px] uppercase">
        <span className="text-[var(--text)]">06 / INTUITIVELY YOURS</span>
        <span className="hidden sm:inline-block text-[11px] text-[var(--muted)]">
          SMALL GESTURES. BIG DIFFERENCE.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
        {/* Title */}
        <div>
          <h2 className="font-display font-medium text-fluid-h2 tracking-tight leading-tight m-0 text-[var(--text)]">
            A touch.
            <br />
            A turn.
            <br />
            <em className="font-serif italic font-normal text-[var(--muted)]">Your tune.</em>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[var(--muted)] max-w-sm mt-6 sm:mt-8 m-0">
            Keep your phone in your pocket. The essentials are engineered directly into the tactile
            surfaces at your fingertips.
          </p>
        </div>

        {/* Accordion Gestures List with Framer Motion */}
        <div className="border-t border-[var(--border)]">
          {gestures.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.number} className="border-b border-[var(--border)]">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-6 sm:py-7 flex items-center justify-between gap-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#70ac61]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-5 sm:gap-6">
                    <span className="text-xs font-mono text-[var(--muted)] min-w-[20px]">
                      {item.number}
                    </span>
                    <span className="font-display text-xl sm:text-2xl font-medium tracking-tight text-[var(--text)] group-hover:text-[#4d7242] transition-colors">
                      {item.label}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 text-[var(--muted)] group-hover:text-[var(--text)]"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.75, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-10 sm:pl-12 pr-4">
                        <span className="text-[11px] font-mono tracking-[1.5px] uppercase text-[var(--muted)] block mb-2">
                          {item.tag}
                        </span>
                        <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)] m-0 max-w-xl">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
