'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ShieldCheck, Radio, Sparkles } from 'lucide-react';
import { SoundMode } from '@/types';

const defaultModes: Record<string, SoundMode> = {
  focus: {
    id: 'focus',
    name: 'Noise Cancellation',
    shortName: 'ANC',
    title: 'Let the outside fade.',
    text: 'Active Noise Cancellation reduces unwanted background sound with inverse anti-noise, so your music can take centre stage.',
    caption: 'JUST YOU. AND THE MUSIC.',
    activeDecibels: '-32dB ambient attenuation',
    color: '#c9eac0',
    orbitScale: 1.0,
    accentGlow: 'rgba(201, 234, 192, 0.25)',
  },
  aware: {
    id: 'aware',
    name: 'Transparency',
    shortName: 'Transparency',
    title: 'Keep a little world in.',
    text: 'Transparency mode lets outside sound through naturally, so you can hear what’s around you while listening without removing your headphones.',
    caption: 'YOUR MUSIC. YOUR SURROUNDINGS.',
    activeDecibels: 'Natural acoustic pass-through',
    color: '#b2d7e6',
    orbitScale: 1.25,
    accentGlow: 'rgba(178, 215, 230, 0.3)',
  },
  spatial: {
    id: 'spatial',
    name: 'Spatial Audio',
    shortName: 'Spatial 3D',
    title: 'Sound that moves with you.',
    text: 'Personalised Spatial Audio with dynamic head tracking transforms stereo into a theatre-grade soundstage all around you.',
    caption: '360-DEGREE SOUNDFIELD.',
    activeDecibels: 'Dynamic Head Tracking',
    color: '#d4b8f0',
    orbitScale: 1.4,
    accentGlow: 'rgba(212, 184, 240, 0.3)',
  },
};

interface ListeningSpaceSectionProps {
  modes?: Record<string, SoundMode>;
}

export function ListeningSpaceSection({ modes = defaultModes }: ListeningSpaceSectionProps) {
  const [activeMode, setActiveMode] = useState<'focus' | 'aware' | 'spatial'>('focus');
  const current = modes[activeMode] || defaultModes.focus;

  // Generate 48 waveform bars with varying harmonic heights
  const bars = Array.from({ length: 48 }, (_, i) => {
    const focusHeight = 22 + Math.pow(Math.sin(i * 0.67), 2) * 85 + Math.pow(Math.cos(i * 0.23), 2) * 25;
    const awareHeight = 35 + Math.pow(Math.sin(i * 0.45), 2) * 95 + Math.pow(Math.cos(i * 0.8), 2) * 35;
    const spatialHeight = 28 + Math.pow(Math.sin(i * 0.85), 2) * 110 + Math.pow(Math.sin(i * 0.15), 2) * 45;

    const height =
      activeMode === 'focus' ? focusHeight : activeMode === 'aware' ? awareHeight : spatialHeight;

    const delay = (i % 8) * 0.1;
    return { id: i, height, delay };
  });

  return (
    <section
      id="listening"
      className="bg-[var(--dark)] text-[#f1f5ef] px-[6%] py-24 sm:py-32 overflow-hidden transition-colors duration-500"
      aria-labelledby="listening-title"
    >
      {/* Section Heading */}
      <div className="flex items-center justify-between gap-5 border-b border-[#3c4941] pb-6 mb-14 text-xs font-semibold tracking-[1.6px] uppercase">
        <span className="text-[#c9eac0]">02 / YOUR LISTENING SPACE</span>
        <span className="hidden sm:inline-block text-[11px] text-[#a9b7aa]">
          TUNE IN. ON YOUR TERMS.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Copy & Controls */}
        <div className="flex flex-col justify-center">
          <h2
            id="listening-title"
            className="font-display font-medium text-fluid-h2 tracking-tight leading-tight m-0 text-white"
          >
            Your world.
            <br />
            Your volume.
          </h2>

          {/* Interactive Mode Control Buttons */}
          <div
            className="flex flex-wrap gap-1.5 sm:gap-2 p-1.5 mt-8 sm:mt-10 rounded-full border border-[#49564b] bg-[#1a2520] w-full sm:w-max max-w-full justify-center sm:justify-start"
            role="group"
            aria-label="Explore listening modes"
          >
            {(['focus', 'aware', 'spatial'] as const).map((modeKey) => {
              const mode = modes[modeKey] || defaultModes[modeKey];
              const isSelected = activeMode === modeKey;
              return (
                <button
                  key={modeKey}
                  onClick={() => setActiveMode(modeKey)}
                  aria-pressed={isSelected}
                  className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isSelected
                      ? 'text-[#17211f] font-semibold'
                      : 'text-[#cbd6cd] hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-[var(--accent)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {modeKey === 'focus' && <ShieldCheck className="w-3.5 h-3.5" />}
                    {modeKey === 'aware' && <Radio className="w-3.5 h-3.5" />}
                    {modeKey === 'spatial' && <Sparkles className="w-3.5 h-3.5" />}
                    {mode.shortName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mode Descriptions (Animated) */}
          <div className="min-h-[160px] pt-8 max-w-lg" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-[#2a382f] text-[#c9eac0] border border-[#3e5345]">
                    {current.activeDecibels}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-medium m-0 text-white mb-3">
                  {current.title}
                </h3>
                <p className="text-[#b0bcb2] leading-relaxed text-base sm:text-lg m-0">
                  {current.text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <span className="text-xs text-[#7d9080] mt-4 tracking-wide">
            A visual acoustic interpretation of computational listening modes
          </span>
        </div>

        {/* Right Interactive Sound Art */}
        <div className="relative aspect-square w-full max-w-[480px] justify-self-center flex items-center justify-center">
          {/* Animated Concentric Orbits */}
          <motion.div
            animate={{
              scale: current.orbitScale,
              borderColor:
                activeMode === 'focus'
                  ? 'rgba(201, 234, 192, 0.4)'
                  : activeMode === 'aware'
                  ? 'rgba(178, 215, 230, 0.4)'
                  : 'rgba(212, 184, 240, 0.4)',
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full border border-dashed pointer-events-none"
          />

          <motion.div
            animate={{
              scale: current.orbitScale * 0.78,
              borderColor:
                activeMode === 'focus'
                  ? 'rgba(201, 234, 192, 0.6)'
                  : activeMode === 'aware'
                  ? 'rgba(178, 215, 230, 0.6)'
                  : 'rgba(212, 184, 240, 0.6)',
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute w-[78%] h-[78%] rounded-full border pointer-events-none"
          />

          <motion.div
            animate={{
              scale: current.orbitScale * 0.54,
              borderColor:
                activeMode === 'focus'
                  ? 'rgba(201, 234, 192, 0.75)'
                  : activeMode === 'aware'
                  ? 'rgba(178, 215, 230, 0.75)'
                  : 'rgba(212, 184, 240, 0.75)',
              boxShadow: `0 0 50px ${current.accentGlow}`,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute w-[54%] h-[54%] rounded-full border pointer-events-none"
          />

          {/* Dynamic Waveform Visualizer */}
          <div className="w-[92%] sm:w-[85%] h-[140px] flex items-center justify-center gap-[2px] sm:gap-1.5 relative z-10 overflow-hidden">
            {bars.map((bar) => (
              <motion.i
                key={bar.id}
                layout
                animate={{
                  height: `${bar.height}px`,
                  backgroundColor: current.color,
                }}
                transition={{
                  height: { duration: 0.5, ease: 'easeOut' },
                  backgroundColor: { duration: 0.6 },
                }}
                className="waveform-bar block w-[2px] sm:w-[3.5px] md:w-[4px] shrink-0 rounded-full"
                style={{
                  ['--delay' as any]: `${bar.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Sound Caption */}
          <motion.span
            key={current.caption}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-[10%] text-[11px] font-mono tracking-[2px] text-[#c2d4be] text-center"
          >
            {current.caption}
          </motion.span>
        </div>
      </div>
    </section>
  );
}
