'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SoundStatementSection } from '@/components/SoundStatementSection';
import { ListeningSpaceSection } from '@/components/ListeningSpaceSection';
import { CraftSection } from '@/components/CraftSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { EnduranceSection } from '@/components/EnduranceSection';
import { ControlsSection } from '@/components/ControlsSection';
import { PricingFinishesSection } from '@/components/PricingFinishesSection';
import { GallerySection } from '@/components/GallerySection';
import { FinaleSection } from '@/components/FinaleSection';
import { CreativeFooter } from '@/components/CreativeFooter';
import { AudioVisualizerModal } from '@/components/AudioVisualizerModal';
import { Preloader } from '@/components/Preloader';

export default function Home() {
  const [isSoundDemoOpen, setIsSoundDemoOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-400">
      {/* Minimalist Modern Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Skip to Content for A11y */}
      <a
        href="#main"
        className="fixed -top-20 left-5 px-4 py-2.5 bg-[var(--text)] text-[var(--bg)] z-50 focus:top-4 transition-all rounded shadow-md"
      >
        Skip to content
      </a>

      {/* Header */}
      <Header onOpenSoundDemo={() => setIsSoundDemoOpen(true)} />

      {/* Main Content with subtle page entrance transition */}
      <motion.main
        id="main"
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <HeroSection />
        <SoundStatementSection />
        <ListeningSpaceSection />
        <CraftSection />
        <ExperienceSection />
        <EnduranceSection />
        <ControlsSection />
        <PricingFinishesSection />
        <GallerySection />
        <FinaleSection />
      </motion.main>

      {/* Outro Footer */}
      <CreativeFooter />

      {/* Interactive Web Audio Simulator Modal */}
      <AudioVisualizerModal
        isOpen={isSoundDemoOpen}
        onClose={() => setIsSoundDemoOpen(false)}
      />
    </div>
  );
}
