import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const BeforeYouSpendHeroSection: React.FC = () => {
  const { setCurrentView, setActiveTab } = useFinance();
  const [purchaseItem, setPurchaseItem] = useState('Sony Wireless Headphones');
  const [purchasePrice, setPurchasePrice] = useState(3000);
  const [isAnalyzed, setIsAnalyzed] = useState(true);

  const currentBalance = 24500;
  const currentBudgetLimit = 25000;
  const currentBudgetSpent = 18000;

  const afterBalance = Math.max(0, currentBalance - purchasePrice);
  const afterBudgetSpent = currentBudgetSpent + purchasePrice;
  const budgetUsagePercent = Math.round((afterBudgetSpent / currentBudgetLimit) * 100);
  const balanceUsagePercent = Math.round((purchasePrice / currentBalance) * 100);

  const presets = [
    { name: 'Sony Headphones', price: 3000 },
    { name: 'Weekend Trip', price: 6500 },
    { name: 'Dinner at Bistro', price: 1400 },
    { name: 'Smartwatch', price: 4200 },
  ];

  return (
    <section id="before-you-spend" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Pre-Purchase Intelligence
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Think before you spend.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Understand how a planned purchase could affect your available money and monthly budget runway.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-sky-50/60 to-white rounded-3xl border border-sky-100 shadow-xl p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                What are you planning to buy?
              </label>
              <input
                type="text"
                value={purchaseItem}
                onChange={(e) => setPurchaseItem(e.target.value)}
                placeholder="e.g. Sony headphones"
                className="w-full bg-white border border-slate-200 focus:border-sky-500 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium focus:outline-none shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Estimated Price (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
                  placeholder="3000"
                  className="w-full bg-white border border-slate-200 focus:border-sky-500 rounded-xl pl-8 pr-4 py-3 text-sm text-slate-800 font-bold focus:outline-none shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Quick presets */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400">Presets:</span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPurchaseItem(p.name);
                  setPurchasePrice(p.price);
                  setIsAnalyzed(true);
                }}
                className="text-xs bg-white hover:bg-sky-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-sky-300 transition-all font-medium"
              >
                {p.name} (₹{p.price.toLocaleString('en-IN')})
              </button>
            ))}
          </div>

          {/* Analysis output block */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-8 border-t border-sky-100"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-2xl border border-sky-100/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Current Balance
                </span>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  ₹{currentBalance.toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-emerald-600 font-medium">Before Purchase</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-sky-100/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  After Purchase
                </span>
                <p className="text-xl font-extrabold text-sky-600 mt-1">
                  ₹{afterBalance.toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-slate-500 font-medium">Remaining funds</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-sky-100/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Budget Usage
                </span>
                <p className="text-xl font-extrabold text-slate-900 mt-1">
                  {budgetUsagePercent}%
                </p>
                <span className="text-[10px] text-amber-600 font-medium">of ₹{currentBudgetLimit.toLocaleString('en-IN')} limit</span>
              </div>
            </div>

            {/* SpendWise Contextual Insight */}
            <div className="bg-sky-50/80 border border-sky-200/80 rounded-2xl p-5 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-sky-950 uppercase tracking-wide flex items-center gap-1.5">
                  SpendWise Contextual Observation
                </h5>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  "This purchase of <strong className="text-slate-900 font-semibold">{purchaseItem}</strong> (₹{purchasePrice.toLocaleString('en-IN')}) would use around <strong className="text-sky-700 font-semibold">{balanceUsagePercent}%</strong> of your current available balance and shift your monthly budget usage to <strong className="text-slate-900 font-semibold">{budgetUsagePercent}%</strong>."
                </p>
                <p className="text-[11px] text-slate-500 pt-1 italic">
                  SpendWise does not dictate purchases; we provide financial context so you can make informed decisions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
