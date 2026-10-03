'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, ShieldCheck, Radio, Sparkles } from 'lucide-react';

interface AudioVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AudioVisualizerModal({ isOpen, onClose }: AudioVisualizerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'focus' | 'aware' | 'spatial'>('focus');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Web Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Create pink/ambient noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      noiseSourceRef.current = noiseSource;

      // Acoustic filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(mode === 'focus' ? 220 : 12000, ctx.currentTime);
      filterRef.current = filter;

      // Panner for spatial audio simulation
      const panner = ctx.createStereoPanner();
      pannerRef.current = panner;

      // Musical chord oscillators for warm background harmonic texture
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc2.frequency.setValueAtTime(329.63, ctx.currentTime); // E4

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.04, ctx.currentTime);

      osc1.connect(oscGain);
      osc2.connect(oscGain);
      osc1Ref.current = osc1;
      osc2Ref.current = osc2;

      // Analyser for real-time visualizer
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      noiseSource.connect(filter);
      oscGain.connect(filter);
      filter.connect(panner);
      panner.connect(analyser);
      analyser.connect(ctx.destination);

      noiseSource.start();
      osc1.start();
      osc2.start();

      setIsPlaying(true);
      drawVisualizer();
    } catch (err) {
      console.error('Audio initialization failed', err);
    }
  };

  const stopAudio = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsPlaying(false);
  };

  // Update acoustic filter when mode changes
  useEffect(() => {
    if (!filterRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (mode === 'focus') {
      filterRef.current.frequency.setTargetAtTime(240, ctx.currentTime, 0.2);
      if (pannerRef.current) pannerRef.current.pan.setTargetAtTime(0, ctx.currentTime, 0.1);
    } else if (mode === 'aware') {
      filterRef.current.frequency.setTargetAtTime(14000, ctx.currentTime, 0.2);
      if (pannerRef.current) pannerRef.current.pan.setTargetAtTime(0, ctx.currentTime, 0.1);
    } else if (mode === 'spatial') {
      filterRef.current.frequency.setTargetAtTime(8000, ctx.currentTime, 0.2);
    }
  }, [mode]);

  // Spatial audio panning loop
  useEffect(() => {
    if (mode !== 'spatial' || !pannerRef.current || !audioCtxRef.current) return;
    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.05;
      if (pannerRef.current && audioCtxRef.current) {
        pannerRef.current.pan.setValueAtTime(Math.sin(angle), audioCtxRef.current.currentTime);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [mode]);

  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      analyserRef.current!.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.85;

        // Dynamic theme color
        ctx.fillStyle = mode === 'focus' ? '#c9eac0' : mode === 'aware' ? '#b2d7e6' : '#d4b8f0';
        ctx.beginPath();
        ctx.roundRect(x, (canvas.height - barHeight) / 2, barWidth - 3, barHeight, 4);
        ctx.fill();

        x += barWidth;
      }
    };

    render();
  };

  useEffect(() => {
    if (!isOpen) {
      stopAudio();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#14201a] border border-[#3e5345] p-5 sm:p-8 text-[#eef4ec] shadow-2xl relative"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-5 h-5 text-[#c9eac0] shrink-0" />
                <span className="font-semibold text-base sm:text-lg">Interactive Acoustic Simulator</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#a9bca8] mb-6 leading-relaxed">
              Experience the difference between Active Noise Cancellation, Transparency pass-through,
              and 360 Spatial Audio powered by Web Audio synthesis right in your browser.
            </p>

            {/* Mode selection pills */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2 p-1 rounded-xl bg-black/40 border border-[#3e5345] mb-6">
              {[
                { id: 'focus', label: 'Noise Cancellation', icon: ShieldCheck },
                { id: 'aware', label: 'Transparency', icon: Radio },
                { id: 'spatial', label: 'Spatial 3D', icon: Sparkles },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setMode(id as any)}
                  className={`flex-1 min-w-[100px] py-2 px-2 sm:px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                    mode === id
                      ? 'bg-[var(--accent)] text-[#17211f] font-semibold'
                      : 'text-[#cbd6cd] hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              ))}
            </div>

            {/* Visualizer Canvas */}
            <div className="h-28 sm:h-32 w-full rounded-xl bg-black/50 border border-[#2e3e34] flex items-center justify-center p-2 mb-6 relative overflow-hidden">
              <canvas
                ref={canvasRef}
                width={480}
                height={120}
                className="w-full h-full object-contain"
              />
              {!isPlaying && (
                <span className="absolute text-[11px] sm:text-xs text-[#7d9080] font-mono tracking-wider uppercase text-center px-4">
                  Press Play to begin acoustic test
                </span>
              )}
            </div>

            {/* Audio Toggle Action Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-[#9bb09b] font-mono text-center sm:text-left">
                {isPlaying ? `Playing: ${mode.toUpperCase()} MODE` : 'Ready to simulate'}
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isPlaying ? stopAudio : startAudio}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm bg-[var(--accent)] text-[#17211f] shadow-lg hover:bg-[#b8e4ad] transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Audio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Audio Demo</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
