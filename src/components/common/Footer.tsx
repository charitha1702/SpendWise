import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setAuthMode } = useFinance();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setCurrentView('auth');
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col - Clean typography, no symbol */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-2xl font-black text-white tracking-tighter uppercase block">
              SPEND<span className="text-sky-400">WISE</span>
            </span>
            <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-sm">
              SpendWise is a personal finance platform that automatically organizes your statements, reveals spending patterns, and helps you make smarter financial decisions.
            </p>
            <p className="text-xs text-sky-400 font-bold tracking-wide uppercase pt-1">
              Understand. Plan. Spend Smarter.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#smart-import" className="hover:text-white transition-colors">Smart Import</a>
              </li>
              <li>
                <a href="#ai-copilot" className="hover:text-white transition-colors">AI Money Copilot</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">Problem & Solution</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              </li>
            </ul>
          </div>

          {/* Trust & Privacy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Trust & Privacy</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#security" className="hover:text-white transition-colors">Privacy Principles</a>
              </li>
              <li>
                <span className="text-slate-500">No Banking Passwords</span>
              </li>
              <li>
                <span className="text-slate-500">No UPI PINs</span>
              </li>
              <li>
                <span className="text-slate-500">User-Controlled Data</span>
              </li>
            </ul>
          </div>

          {/* Quick Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Get Started</h4>
            <div className="space-y-2">
              <button
                onClick={() => handleAuth('signup')}
                className="w-full text-left text-sm text-sky-400 hover:text-sky-300 font-semibold"
              >
                Create Account →
              </button>
              <button
                onClick={() => handleAuth('login')}
                className="w-full text-left text-sm text-slate-300 hover:text-white"
              >
                Log In to Dashboard →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SPENDWISE. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
