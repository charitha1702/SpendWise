import React from 'react';
import { motion } from 'motion/react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  PiggyBank,
  Utensils,
  Car,
  ShoppingBag,
  Briefcase,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const SpendWisePreviewSection: React.FC = () => {
  const { setCurrentView, setAuthMode } = useFinance();

  const handleCTA = () => {
    setAuthMode('signup');
    setCurrentView('auth');
  };

  const recentTxs = [
    { merchant: 'Swiggy', category: 'Food & Dining', amount: -420, date: 'Today, 1:30 PM', icon: <Utensils className="w-3.5 h-3.5 text-orange-500" /> },
    { merchant: 'Uber', category: 'Transport', amount: -180, date: 'Yesterday, 8:45 PM', icon: <Car className="w-3.5 h-3.5 text-blue-500" /> },
    { merchant: 'Amazon', category: 'Shopping', amount: -850, date: '26 Aug, 3:15 PM', icon: <ShoppingBag className="w-3.5 h-3.5 text-purple-500" /> },
    { merchant: 'Salary Credit', category: 'Income', amount: 30000, date: '25 Aug, 9:00 AM', icon: <Briefcase className="w-3.5 h-3.5 text-emerald-500" /> },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Product Preview
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            A clear view of your financial life.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            Here is a glimpse of how SpendWise transforms raw transaction data into clean, actionable intelligence.
          </p>
        </div>

        {/* Dashboard Preview Mockup Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-50/70 border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-950/5"
        >
          {/* Top 4 Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-sky-100/90 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Current Balance</span>
                <Wallet className="w-4 h-4 text-sky-600" />
              </div>
              <p className="text-2xl font-black text-slate-900">₹24,500</p>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">● Healthy liquidity</p>
            </div>

            <div className="bg-white border border-sky-100/90 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Monthly Income</span>
                <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-emerald-600">₹35,000</p>
              <p className="text-[11px] text-slate-500 font-normal mt-1">Salary & Freelance</p>
            </div>

            <div className="bg-white border border-sky-100/90 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Total Expenses</span>
                <ArrowUpRight className="w-4 h-4 text-rose-600" />
              </div>
              <p className="text-2xl font-black text-rose-600">₹10,500</p>
              <p className="text-[11px] text-slate-500 font-normal mt-1">30% of total income</p>
            </div>

            <div className="bg-white border border-sky-100/90 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>Net Savings</span>
                <PiggyBank className="w-4 h-4 text-sky-600" />
              </div>
              <p className="text-2xl font-black text-sky-700">₹24,500</p>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">70% Savings rate</p>
            </div>
          </div>

          {/* Center Content: Spending Trend & Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Spending Chart & Categories */}
            <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Spending Overview</h4>
                    <p className="text-xs text-slate-500">Monthly expense trajectory</p>
                  </div>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> -8.4% vs last month
                  </span>
                </div>

                {/* Visual Chart Bars */}
                <div className="h-36 flex items-end gap-3 pt-4 px-2 border-b border-slate-100 pb-2">
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-sky-100 rounded-t-md h-20" />
                    <span className="text-[10px] text-slate-400">Week 1</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-sky-200 rounded-t-md h-28" />
                    <span className="text-[10px] text-slate-400">Week 2</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-sky-600 rounded-t-md h-16" />
                    <span className="text-[10px] text-sky-700 font-bold">Week 3</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-slate-100 rounded-t-md h-10" />
                    <span className="text-[10px] text-slate-400">Week 4</span>
                  </div>
                </div>
              </div>

              {/* Quick Categories list */}
              <div className="pt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-50">
                  <p className="text-slate-500 font-medium text-[11px]">Food & Dining</p>
                  <p className="font-bold text-slate-900">₹3,420</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <p className="text-slate-500 font-medium text-[11px]">Bills & Utilities</p>
                  <p className="font-bold text-slate-900">₹3,800</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <p className="text-slate-500 font-medium text-[11px]">Shopping</p>
                  <p className="font-bold text-slate-900">₹1,950</p>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-900">Recent Transactions</h4>
                <span className="text-xs text-sky-600 font-semibold">Live Preview</span>
              </div>

              <div className="space-y-3">
                {recentTxs.map((tx, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        {tx.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{tx.merchant}</p>
                        <p className="text-[10px] text-slate-500">{tx.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {tx.amount > 0 ? `+₹${tx.amount.toLocaleString('en-IN')}` : `-₹${Math.abs(tx.amount).toLocaleString('en-IN')}`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={handleCTA}
                  className="w-full py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  Enter Full Application
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
