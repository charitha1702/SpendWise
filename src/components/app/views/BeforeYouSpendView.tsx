import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';

export const BeforeYouSpendView: React.FC = () => {
  const { stats } = useFinance();
  const [itemName, setItemName] = useState('Sony WH-1000XM5 Headphones');
  const [itemPrice, setItemPrice] = useState<number>(3000);
  const [itemCategory, setItemCategory] = useState('Shopping');

  const currentBalance = stats.balance;
  const overallLimit = 25000;
  const currentSpent = stats.totalExpenses;

  const afterBalance = Math.max(0, currentBalance - itemPrice);
  const afterSpent = currentSpent + itemPrice;
  const currentBudgetUsage = Math.round((currentSpent / overallLimit) * 100);
  const afterBudgetUsage = Math.round((afterSpent / overallLimit) * 100);
  const balanceSharePercent = currentBalance > 0 ? Math.round((itemPrice / currentBalance) * 100) : 0;

  const presets = [
    { name: 'Sony Headphones', price: 3000, category: 'Shopping' },
    { name: 'Weekend Gateway Trip', price: 6500, category: 'Entertainment' },
    { name: 'Team Dinner', price: 1800, category: 'Food & Dining' },
    { name: 'Smartwatch', price: 4500, category: 'Shopping' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Before You Spend
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Simulate a planned purchase to test balance impact and budget runway before tapping pay.
        </p>
      </div>

      {/* Calculator Card */}
      <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-10 shadow-xl shadow-sky-950/5 max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              What are you planning to purchase?
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Mechanical Keyboard"
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Estimated Price (₹)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">
                ₹
              </span>
              <input
                type="number"
                value={itemPrice}
                onChange={(e) => setItemPrice(Number(e.target.value) || 0)}
                placeholder="3000"
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl pl-8 pr-4 py-3 text-base font-black text-slate-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Quick Presets:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setItemName(p.name);
                setItemPrice(p.price);
                setItemCategory(p.category);
              }}
              className="text-xs bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-800 border border-slate-200 hover:border-sky-300 px-3 py-1 rounded-lg font-medium transition-all"
            >
              {p.name} (₹{p.price.toLocaleString('en-IN')})
            </button>
          ))}
        </div>

        {/* Analysis Output Section */}
        <div className="pt-6 border-t border-slate-100 space-y-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Simulated Portfolio Impact
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                Current Available Balance
              </span>
              <p className="text-2xl font-black text-slate-900 mt-1">
                ₹{currentBalance.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-slate-500">Before purchase</span>
            </div>

            <div className="bg-sky-50 p-5 rounded-2xl border border-sky-200">
              <span className="text-[11px] font-bold text-sky-700 uppercase">
                Projected Balance After
              </span>
              <p className="text-2xl font-black text-sky-800 mt-1">
                ₹{afterBalance.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-sky-600 font-semibold">
                Uses {balanceSharePercent}% of active funds
              </span>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                Monthly Budget Shift
              </span>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {afterBudgetUsage}% <span className="text-xs font-normal text-slate-400">(was {currentBudgetUsage}%)</span>
              </p>
              <span className="text-[10px] text-slate-500 font-medium">of ₹{overallLimit.toLocaleString('en-IN')} limit</span>
            </div>
          </div>

          {/* SpendWise Contextual Insight */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50 to-sky-100/60 border border-sky-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-800">
              <h5 className="font-bold text-sky-950 uppercase tracking-wide text-xs">
                SpendWise Objective Observation
              </h5>
              <p className="leading-relaxed">
                Purchasing <strong className="text-slate-900 font-bold">{itemName}</strong> for <strong className="text-slate-900 font-bold">₹{itemPrice.toLocaleString('en-IN')}</strong> consumes approximately <strong className="text-sky-700 font-bold">{balanceSharePercent}%</strong> of your available liquidity and elevates your total monthly budget consumption to <strong className="text-slate-900 font-bold">{afterBudgetUsage}%</strong>.
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                You will retain ₹{afterBalance.toLocaleString('en-IN')} in reserves after this transaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
