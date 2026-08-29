import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Calculator, Target, ArrowRight } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const SmarterMoneySection: React.FC = () => {
  const { setCurrentView, setAuthMode } = useFinance();

  const handleCTA = () => {
    setAuthMode('signup');
    setCurrentView('auth');
  };

  const cards = [
    {
      icon: <TrendingUp className="w-6 h-6 text-sky-600" />,
      title: 'Forecast',
      description: 'See where your balance is heading with automated month-end cash flow projections.',
      preview: 'Current: ₹24,500 → Projected: ₹18,420',
    },
    {
      icon: <Calculator className="w-6 h-6 text-sky-600" />,
      title: 'Before You Spend',
      description: 'Understand the exact financial impact of a planned purchase before checking out.',
      preview: 'Sony Headphones (₹3,000) = 12% of liquid balance',
    },
    {
      icon: <Target className="w-6 h-6 text-sky-600" />,
      title: 'Smart Budgets',
      description: 'Stay aware of your category spending limits with real-time progress indicators.',
      preview: 'Overall budget: ₹18,000 / ₹25,000 (72%)',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-sky-50/30 via-white to-sky-50/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-sky-100 shadow-xs">
            Smarter Money
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tools designed for proactive financial control.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            SpendWise goes beyond passive history to give you forward-looking clarity.
          </p>
        </div>

        {/* 3 Compact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white border border-sky-100 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-5">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 font-normal leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100/80 text-[11px] font-bold text-sky-900">
                  {card.preview}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
