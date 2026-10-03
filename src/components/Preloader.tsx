'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Smooth progress counter increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 400);
          return 100;
        }
        // Organic acceleration: slower at start, faster in middle, smooth settle
        const increment = prev < 30 ? 3 : prev < 70 ? 5 : 4;
        return Math.min(100, prev + increment);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] select-none pointer-events-none"
        >
          {/* Minimalist Headphone Icon with animated SVG stroke */}
          <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
            <motion.svg
              viewBox="0 0 40 40"
              className="w-14 h-14 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
            >
              {/* Headband arch */}
              <motion.path
                d="M8 24v-6a12 12 0 0124 0v6"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              {/* Left ear cup */}
              <motion.rect
                x="6"
                y="22"
                width="5"
                height="11"
                rx="2.5"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              {/* Right ear cup */}
              <motion.rect
                x="29"
                y="22"
                width="5"
                height="11"
                rx="2.5"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
            </motion.svg>

            {/* Subtle acoustic pulse rings */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1.8],
                opacity: [0.35, 0.15, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute inset-0 rounded-full border border-[#8caf7e]"
            />
          </div>

          {/* Minimalist Soundwave Frequency Bars */}
          <div className="flex items-center gap-1 h-6 mb-6" aria-hidden="true">
            {[0.4, 0.8, 1.2, 0.6, 0.9, 0.5, 1.1, 0.7, 0.3].map((delay, idx) => (
              <motion.span
                key={idx}
                animate={{
                  scaleY: [0.3, 1, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: delay * 0.2,
                  ease: 'easeInOut',
                }}
                className="w-[2.5px] h-4 bg-[#8caf7e] rounded-full origin-center"
              />
            ))}
          </div>

          {/* Percentage Counter */}
          <div className="flex flex-col items-center">
            <span className="font-mono text-2xl font-light tracking-tighter text-[var(--text)]">
              {progress}%
            </span>
            <span className="text-[11px] font-mono tracking-[2px] text-[var(--muted)] uppercase mt-2">
              AirPods Max · Sound in Form
            </span>
          </div>

          {/* Bottom subtle progress line */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#8caf7e] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
