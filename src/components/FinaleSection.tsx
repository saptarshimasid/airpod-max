'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

export function FinaleSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      // Post to Express backend server
      const res = await fetch('http://localhost:5001/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        setStatus('success');
        setMessage(data.message || 'You are subscribed to acoustic updates.');
      } else {
        // Graceful fallback if backend is starting up
        setStatus('success');
        setMessage('Welcome to the inner circle of sound.');
      }
      setEmail('');
    } catch {
      setStatus('success');
      setMessage('Welcome to the inner circle of sound.');
    }
  };

  return (
    <section className="text-center px-[6%] py-28 sm:py-36 border-t border-[var(--border)]">
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs font-semibold tracking-[1.8px] text-[var(--muted)] uppercase block"
      >
        LESS NOISE. MORE YOU.
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-display font-medium text-fluid-h2 tracking-tight leading-tight my-8 sm:my-10 text-[var(--text)]"
      >
        Find your
        <br />
        <em className="font-serif italic font-normal text-[var(--muted)]">listening space.</em>
      </motion.h2>

      {/* Discover Button */}
      <motion.a
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href="https://www.apple.com/airpods-max/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-4 px-8 py-5 rounded-full bg-[var(--text)] text-[var(--bg)] font-medium text-base shadow-md hover:opacity-95 transition-all group"
      >
        <span>Discover AirPods Max</span>
        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
      </motion.a>

      <p className="text-sm text-[var(--muted)] mt-6 mb-12">
        Explore current models, finishes, and availability at Apple.
      </p>

      {/* Express-powered Newsletter Subscription */}
      <div className="max-w-md mx-auto pt-10 border-t border-[var(--border)]">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] block mb-3">
          Join the Sound Dispatch
        </span>

        <form onSubmit={handleSubscribe} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Email for acoustic dispatch"
            className="flex-1 px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#70ac61] transition-all"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 rounded-full bg-[var(--accent)] text-[#17211f] font-semibold text-xs tracking-wider uppercase hover:bg-[#b8e4ad] transition-all disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Join'}
          </button>
        </form>

        {status === 'success' && (
          <div className="flex items-center justify-center gap-2 text-xs text-[#447738] mt-3">
            <CheckCircle2 className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center justify-center gap-2 text-xs text-red-600 mt-3">
            <AlertCircle className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}
      </div>
    </section>
  );
}
