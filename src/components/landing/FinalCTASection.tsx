import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, LogIn } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const FinalCTASection: React.FC = () => {
  const { setCurrentView, setAuthMode } = useFinance();

  const handleAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setCurrentView('auth');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-sky-50/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Light-Blue Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-sky-50 border border-sky-200/90 p-8 sm:p-14 text-center shadow-xl shadow-sky-600/5 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Ready to understand your money better?
            </h2>

            <p className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed">
              Start organizing your finances with SpendWise.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => handleAuth('signup')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base shadow-lg shadow-sky-600/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleAuth('login')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base border border-sky-200 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-sky-600" />
                Log In
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
