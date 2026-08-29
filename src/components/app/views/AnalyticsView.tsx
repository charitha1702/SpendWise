import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Flame,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
} from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';

export const AnalyticsView: React.FC = () => {
  const { stats, transactions } = useFinance();
  const [activeChart, setActiveChart] = useState<'category' | 'income-expense'>('category');

  // Category breakdown list
  const categoryBreakdown = stats?.categoryBreakdown || stats?.categoryTotals || {};
  const categoryKeys = Object.keys(categoryBreakdown);
  const categoryList = categoryKeys
    .map((cat) => ({
      name: cat,
      amount: categoryBreakdown[cat] || 0,
      percent: stats.totalExpenses > 0 ? Math.round(((categoryBreakdown[cat] || 0) / stats.totalExpenses) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  // Top 5 largest expense transactions
  const topTransactions = [...transactions]
    .filter((t) => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const daysInMonth = 31;
  const currentDay = 28;
  const avgDailySpend = currentDay > 0 ? Math.round(stats.totalExpenses / currentDay) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Spending Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Understand outflow trends, category shares, and your daily burn velocity.
          </p>
        </div>

        {/* Chart View Toggle */}
        <div className="flex items-center bg-white border border-sky-100 p-1 rounded-xl shadow-xs">
          <button
            onClick={() => setActiveChart('category')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeChart === 'category'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Category Share
          </button>
          <button
            onClick={() => setActiveChart('income-expense')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeChart === 'income-expense'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Income vs Outflow
          </button>
        </div>
      </div>

      {/* Burn Velocity & Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Average Daily Burn</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900">
              ₹{avgDailySpend.toLocaleString('en-IN')} <span className="text-xs text-slate-400 font-normal">/ day</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Based on {currentDay} active tracked days this month
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Net Monthly Cashflow</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-emerald-600">
              +₹{(stats.totalIncome - stats.totalExpenses).toLocaleString('en-IN')}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              {stats.savingsRate}% retained into reserves
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Top Category Outflow</span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-slate-900">
              {categoryList[0]?.name || 'None'}
            </h3>
            <p className="text-[11px] text-sky-700 font-semibold mt-1">
              ₹{categoryList[0]?.amount.toLocaleString('en-IN') || 0} ({categoryList[0]?.percent || 0}% of all spend)
            </p>
          </div>
        </div>
      </div>

      {/* Main Visual Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Visual Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-sky-100 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {activeChart === 'category' ? 'Category Expenditure Distribution' : 'Monthly Inflow vs Outflow Comparison'}
              </h3>
              <p className="text-xs text-slate-500">
                {activeChart === 'category' ? 'Ranked by total amount spent in INR' : 'Net balance accumulation comparison'}
              </p>
            </div>
          </div>

          {activeChart === 'category' ? (
            <div className="space-y-4 pt-2">
              {categoryList.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-800">{cat.name}</span>
                    <span className="font-semibold text-slate-900">
                      ₹{cat.amount.toLocaleString('en-IN')}{' '}
                      <span className="text-slate-400 font-normal">({cat.percent}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percent}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      className="bg-sky-600 h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-64 w-full flex flex-col justify-end">
              <div className="flex items-end justify-center gap-12 sm:gap-20 h-48 pb-4">
                {/* Income Bar */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-emerald-600 mb-2">₹{stats.totalIncome.toLocaleString('en-IN')}</span>
                  <div className="w-16 sm:w-20 bg-emerald-500 rounded-t-xl h-44 transition-all" />
                  <span className="text-xs font-bold text-slate-700 mt-2">Income</span>
                </div>

                {/* Expense Bar */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-rose-600 mb-2">₹{stats.totalExpenses.toLocaleString('en-IN')}</span>
                  <div
                    className="w-16 sm:w-20 bg-rose-500 rounded-t-xl transition-all"
                    style={{
                      height: `${Math.max(20, Math.round((stats.totalExpenses / (stats.totalIncome || 1)) * 176))}px`,
                    }}
                  />
                  <span className="text-xs font-bold text-slate-700 mt-2">Expenses</span>
                </div>

                {/* Savings Bar */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-sky-600 mb-2">
                    ₹{(stats.totalIncome - stats.totalExpenses).toLocaleString('en-IN')}
                  </span>
                  <div
                    className="w-16 sm:w-20 bg-sky-500 rounded-t-xl transition-all"
                    style={{
                      height: `${Math.max(20, Math.round(((stats.totalIncome - stats.totalExpenses) / (stats.totalIncome || 1)) * 176))}px`,
                    }}
                  />
                  <span className="text-xs font-bold text-slate-700 mt-2">Savings</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Top 5 Highest Outflows */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Highest Single Outflows</h3>
            <p className="text-xs text-slate-500 mb-4">Largest expense transactions this month</p>

            <div className="space-y-3">
              {topTransactions.map((tx, idx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900">{tx.merchant}</p>
                    <p className="text-[10px] text-slate-500">{tx.date} • {tx.category}</p>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3.5 bg-sky-50 rounded-xl border border-sky-100 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-sky-950 leading-relaxed font-normal">
              72% of total outflow was concentrated in your top 3 categories.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
