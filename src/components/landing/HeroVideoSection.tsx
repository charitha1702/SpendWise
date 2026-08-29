import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, LogIn } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

const HERO_VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4";

export const HeroVideoSection: React.FC = () => {
  const { setCurrentView, setAuthMode } = useFinance();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may need fallback or user gesture
      });
    }
  }, []);

  const handleGetStarted = () => {
    setAuthMode('signup');
    setCurrentView('auth');
  };

  const handleLogIn = () => {
    setAuthMode('login');
    setCurrentView('auth');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-95 contrast-[1.02]"
        />
        {/* Subtle, soft overlay for crisp readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-sky-50/85 backdrop-blur-[1.5px]" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-sky-100/20 to-sky-200/40" />
      </div>

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center flex flex-col items-center">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]"
        >
          Your money.{' '}
          <span className="bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent">
            Your clarity.
          </span>
        </motion.h1>

        {/* Core Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-4 text-xl sm:text-2xl font-bold text-sky-950 tracking-tight"
        >
          Understand. Plan. Spend Smarter.
        </motion.p>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-5 text-base sm:text-lg text-slate-700 max-w-2xl font-normal leading-relaxed"
        >
          SpendWise automatically organizes your financial data, reveals spending patterns and helps you make smarter financial decisions.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-bold text-base shadow-lg shadow-sky-600/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleLogIn}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base border border-sky-200/90 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4 text-sky-600" />
            Log In
          </button>
        </motion.div>
      </div>

      {/* Soft Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};
