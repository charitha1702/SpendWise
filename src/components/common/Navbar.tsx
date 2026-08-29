import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const Navbar: React.FC = () => {
  const { setCurrentView, setAuthMode } = useFinance();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setCurrentView('auth');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-sky-100/90 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Wordmark - Clean typography with NO symbol */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-left cursor-pointer focus:outline-none group"
        >
          <span
            className={`text-2xl font-black tracking-tighter uppercase transition-colors ${
              scrolled ? 'text-slate-900' : 'text-slate-900'
            }`}
          >
            SPEND<span className="text-sky-600">WISE</span>
          </span>
        </button>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('features')}
            className={`text-sm font-semibold transition-colors hover:text-sky-600 ${
              scrolled ? 'text-slate-600' : 'text-slate-800'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className={`text-sm font-semibold transition-colors hover:text-sky-600 ${
              scrolled ? 'text-slate-600' : 'text-slate-800'
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('ai-copilot')}
            className={`text-sm font-semibold transition-colors hover:text-sky-600 ${
              scrolled ? 'text-slate-600' : 'text-slate-800'
            }`}
          >
            AI
          </button>
          <button
            onClick={() => handleNavClick('security')}
            className={`text-sm font-semibold transition-colors hover:text-sky-600 ${
              scrolled ? 'text-slate-600' : 'text-slate-800'
            }`}
          >
            Security
          </button>
        </nav>

        {/* Right CTA Group */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => openAuth('login')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors ${
              scrolled
                ? 'text-slate-700 hover:text-sky-600 hover:bg-sky-50'
                : 'text-slate-900 hover:text-sky-600 hover:bg-white/60'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => openAuth('signup')}
            className="px-5 py-2.5 text-sm font-bold rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white shadow-md shadow-sky-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => openAuth('signup')}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-sky-600 text-white"
          >
            Get Started
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 hover:text-sky-600 rounded-lg focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-sky-100 px-6 py-5 space-y-3 shadow-xl">
          <button
            onClick={() => handleNavClick('features')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-sky-600"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-sky-600"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('ai-copilot')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-sky-600"
          >
            AI
          </button>
          <button
            onClick={() => handleNavClick('security')}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-sky-600"
          >
            Security
          </button>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => openAuth('login')}
              className="w-full text-center py-2.5 text-sm font-bold text-slate-700 bg-slate-50 rounded-xl"
            >
              Log In
            </button>
            <button
              onClick={() => openAuth('signup')}
              className="w-full text-center py-2.5 text-sm font-bold text-white bg-sky-600 rounded-xl shadow-md shadow-sky-600/20"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
