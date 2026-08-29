import React from 'react';
import { motion } from 'motion/react';
import { Target, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const BudgetingHeroSection: React.FC = () => {
  const { setCurrentView, setActiveTab } = useFinance();

  const budgets = [
    { category: 'Food & Dining', spent: 3400, limit: 5000, color: 'bg-amber-500', percent: 68 },
    { category: 'Shopping & Gear', spent: 2800, limit: 4000, color: 'bg-sky-500', percent: 70 },
    { category: 'Transport & Rides', spent: 1200, limit: 2000, color: 'bg-emerald-500', percent: 60 },
  ];

  return (
    <section className="py-24 bg-sky-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-sky-100 shadow-xs">
            Dynamic Limits
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Budgets that adapt to you.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Set flexible category limits with automatic pacing so you never get surprised at month end.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-sky-100 shadow-xl p-6 sm:p-9">
          {/* Overall Budget Card */}
          <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-2xl p-6 mb-8 shadow-md shadow-sky-600/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                  Overall Monthly Budget
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  ₹18,000 <span className="text-lg font-medium text-sky-200">/ ₹25,000</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-white">72%</span>
                <p className="text-xs text-sky-200">₹7,000 remaining</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '72%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-white h-full rounded-full"
              />
            </div>
          </div>

          {/* Category Budgets */}
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            Category Breakdown & Pacing
          </h4>

          <div className="space-y-5">
            {budgets.map((b, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-800">{b.category}</span>
                  <span className="text-xs font-semibold text-slate-600">
                    ₹{b.spent.toLocaleString('en-IN')}{' '}
                    <span className="text-slate-400 font-normal">/ ₹{b.limit.toLocaleString('en-IN')}</span>
                    <span className="ml-2 font-bold text-slate-900">({b.percent}%)</span>
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`h-full rounded-full ${b.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* CTA Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Get notified when a category approaches 80% usage
            </span>
            <button
              onClick={() => { setActiveTab('budgets'); setCurrentView('app'); }}
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              Open Budget Planner →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
