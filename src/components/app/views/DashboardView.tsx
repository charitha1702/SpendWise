import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  ChevronRight,
  FileSpreadsheet,
  Calculator,
  Bot,
  Plus,
  Filter,
} from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';
import { AppTab } from '../../../types';

export const DashboardView: React.FC = () => {
  const { user, stats, transactions, setActiveTab } = useFinance();
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const greetingTime = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const recentTransactions = (transactions || []).slice(0, 6);

  // Category summary top 4
  const categoryBreakdown = stats?.categoryBreakdown || stats?.categoryTotals || {};
  const categoryKeys = Object.keys(categoryBreakdown);
  const topCategories = categoryKeys
    .map((cat) => ({
      name: cat,
      amount: categoryBreakdown[cat] || 0,
      percent: stats.totalExpenses > 0 ? Math.round(((categoryBreakdown[cat] || 0) / stats.totalExpenses) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Greeting & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {greetingTime()}, <span className="text-sky-600">{user.name.split(' ')[0]}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Here is your financial pulse and spending clarity for August 2026.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('import')}
            className="px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200/80 transition-all flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Import Statement
          </button>
          <button
            onClick={() => setActiveTab('copilot')}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Ask Copilot
          </button>
        </div>
      </div>

      {/* 4 Core Financial KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Balance Card */}
        <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Balance</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{stats.balance.toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              Healthy liquidity buffer
            </span>
          </div>
        </div>

        {/* Monthly Income */}
        <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Income</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{stats.totalIncome.toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              Salary & freelancing deposits
            </span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Outflow</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{stats.totalExpenses.toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] font-semibold text-sky-700 mt-1 block">
              {stats.burnRateDaily ? `~₹${stats.burnRateDaily}/day burn velocity` : 'Tracked outflow'}
            </span>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Savings Rate</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {stats.savingsRate}%
            </h3>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
              Target: {user.targetSavingsRate}% (On Track)
            </span>
          </div>
        </div>
      </div>

      {/* Main Row: Spending Velocity Chart & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Overview Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-sky-100 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Spending Overview</h3>
              <p className="text-xs text-slate-500">Daily and weekly outflow trajectory</p>
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              {(['daily', 'weekly', 'monthly'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                    timeframe === t
                      ? 'bg-white text-sky-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic SVG Visual Chart */}
          <div className="h-60 w-full relative pt-4">
            <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
              <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="#f1f5f9" strokeWidth="1" />

              {/* Bars for Weekly */}
              {timeframe === 'weekly' ? (
                <>
                  <rect x="40" y="70" width="36" height="80" rx="6" fill="#0284c7" />
                  <rect x="120" y="45" width="36" height="105" rx="6" fill="#38bdf8" />
                  <rect x="200" y="90" width="36" height="60" rx="6" fill="#0284c7" />
                  <rect x="280" y="30" width="36" height="120" rx="6" fill="#0284c7" />
                  <rect x="360" y="85" width="36" height="65" rx="6" fill="#bae6fd" />
                  <rect x="440" y="110" width="36" height="40" rx="6" fill="#e0f2fe" />

                  <text x="58" y="165" fontSize="10" fill="#64748b" textAnchor="middle">W1</text>
                  <text x="138" y="165" fontSize="10" fill="#64748b" textAnchor="middle">W2</text>
                  <text x="218" y="165" fontSize="10" fill="#64748b" textAnchor="middle">W3</text>
                  <text x="298" y="165" fontSize="10" fill="#0284c7" textAnchor="middle" fontWeight="bold">W4 (Now)</text>
                  <text x="378" y="165" fontSize="10" fill="#94a3b8" textAnchor="middle">W5 (Est)</text>
                </>
              ) : timeframe === 'daily' ? (
                <>
                  <rect x="30" y="110" width="20" height="40" rx="4" fill="#0284c7" />
                  <rect x="70" y="90" width="20" height="60" rx="4" fill="#0284c7" />
                  <rect x="110" y="40" width="20" height="110" rx="4" fill="#0284c7" />
                  <rect x="150" y="120" width="20" height="30" rx="4" fill="#0284c7" />
                  <rect x="190" y="80" width="20" height="70" rx="4" fill="#0284c7" />
                  <rect x="230" y="60" width="20" height="90" rx="4" fill="#0284c7" />
                  <rect x="270" y="95" width="20" height="55" rx="4" fill="#0284c7" />
                  <rect x="310" y="130" width="20" height="20" rx="4" fill="#0284c7" />
                  <rect x="350" y="85" width="20" height="65" rx="4" fill="#0284c7" />
                  <rect x="390" y="50" width="20" height="100" rx="4" fill="#38bdf8" />
                  <rect x="430" y="105" width="20" height="45" rx="4" fill="#0284c7" />

                  <text x="120" y="165" fontSize="10" fill="#64748b" textAnchor="middle">Aug 15</text>
                  <text x="280" y="165" fontSize="10" fill="#64748b" textAnchor="middle">Aug 22</text>
                  <text x="400" y="165" fontSize="10" fill="#0284c7" textAnchor="middle" fontWeight="bold">Today</text>
                </>
              ) : (
                <>
                  <rect x="80" y="80" width="60" height="70" rx="8" fill="#94a3b8" />
                  <rect x="220" y="60" width="60" height="90" rx="8" fill="#38bdf8" />
                  <rect x="360" y="40" width="60" height="110" rx="8" fill="#0284c7" />

                  <text x="110" y="165" fontSize="11" fill="#64748b" textAnchor="middle">June</text>
                  <text x="250" y="165" fontSize="11" fill="#64748b" textAnchor="middle">July</text>
                  <text x="390" y="165" fontSize="11" fill="#0284c7" textAnchor="middle" fontWeight="bold">August</text>
                </>
              )}
            </svg>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Average weekly burn: ₹2,625</span>
            <button
              onClick={() => setActiveTab('analytics')}
              className="text-sky-600 font-bold hover:underline"
            >
              Detailed Analytics →
            </button>
          </div>
        </div>

        {/* Top Categories Card */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Top Categories</h3>
              <button
                onClick={() => setActiveTab('budgets')}
                className="text-xs text-sky-600 font-bold hover:underline"
              >
                Budgets
              </button>
            </div>

            <div className="space-y-4">
              {topCategories.map((c, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800">{c.name}</span>
                    <span className="text-slate-900 font-bold">
                      ₹{c.amount.toLocaleString('en-IN')}{' '}
                      <span className="text-slate-400 font-normal">({c.percent}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-600 rounded-full"
                      style={{ width: `${Math.min(100, c.percent)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick AI Observation widget */}
          <div className="mt-6 p-3.5 rounded-xl bg-sky-50 border border-sky-200/80 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p className="text-xs text-sky-950 leading-relaxed font-normal">
              Bills & Utilities took the highest share this month (₹4,500), but your Food spending dropped 12%.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table Preview */}
      <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Transactions</h3>
            <p className="text-xs text-slate-500">Live categorized statement records</p>
          </div>

          <button
            onClick={() => setActiveTab('transactions')}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            View All ({transactions.length})
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                <th className="pb-3 font-semibold">Merchant / Payee</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Payment</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-sky-50/40 transition-colors">
                  <td className="py-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                        tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'
                      }`}
                    >
                      {tx.type === 'income' ? '+' : '-'}
                    </div>
                    <span>{tx.merchant}</span>
                  </td>
                  <td className="py-3.5 text-slate-600">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-500">{tx.paymentMethod}</td>
                  <td className="py-3.5 text-slate-500">{tx.date}</td>
                  <td className="py-3.5 text-right font-black">
                    <span className={tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}>
                      {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
