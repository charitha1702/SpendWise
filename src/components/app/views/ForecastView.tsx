import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, AlertCircle, Sparkles, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';

export const ForecastView: React.FC = () => {
  const { stats } = useFinance();
  const [dailySpendSimulation, setDailySpendSimulation] = useState<number>(500);

  const daysRemaining = 3;
  const currentBalance = stats.balance;
  const scheduledFixedBills = 8448; // Rent + subs
  const projectedExtraSpend = dailySpendSimulation * daysRemaining;
  const estimatedEndBalance = Math.max(0, currentBalance - scheduledFixedBills - projectedExtraSpend);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Financial Forecast & Runway
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Project your month-end liquidity based on your current burn velocity and scheduled obligations.
        </p>
      </div>

      {/* Main Forecast Balance Comparison Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Current Verified Balance
          </span>
          <div className="my-2">
            <h3 className="text-3xl font-black text-slate-900">
              ₹{currentBalance.toLocaleString('en-IN')}
            </h3>
            <span className="text-xs text-emerald-600 font-semibold mt-1 block">
              Live active funds
            </span>
          </div>
          <p className="text-[11px] text-slate-400">As of today (Day 28)</p>
        </div>

        <div className="bg-gradient-to-br from-sky-600 to-sky-700 p-6 rounded-2xl text-white shadow-xl shadow-sky-600/20 flex flex-col justify-between">
          <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
            Estimated Month-End Balance
          </span>
          <div className="my-2">
            <h3 className="text-3xl font-black text-white">
              ₹{estimatedEndBalance.toLocaleString('en-IN')}
            </h3>
            <span className="text-xs text-sky-200 font-medium mt-1 block">
              Includes scheduled bills & daily burn
            </span>
          </div>
          <p className="text-[11px] text-sky-200/80">Calculated for Aug 31</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Upcoming Committed Bills
          </span>
          <div className="my-2">
            <h3 className="text-3xl font-black text-rose-600">
              ₹{scheduledFixedBills.toLocaleString('en-IN')}
            </h3>
            <span className="text-xs text-slate-600 font-medium mt-1 block">
              Rent (₹8,000) + Subscriptions (₹448)
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Scheduled before month close</p>
        </div>
      </div>

      {/* Interactive Scenario Simulation Slider */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sky-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Runway Simulation Playground</h3>
            <p className="text-xs text-slate-500">
              See how changing your remaining daily discretionary spend affects your final month-end balance.
            </p>
          </div>
          <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 self-start sm:self-auto">
            {daysRemaining} days left in August
          </span>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Simulated Daily Spend for Next {daysRemaining} Days
            </label>
            <span className="text-base font-extrabold text-sky-600">
              ₹{dailySpendSimulation.toLocaleString('en-IN')} / day
            </span>
          </div>

          <input
            type="range"
            min="200"
            max="3000"
            step="100"
            value={dailySpendSimulation}
            onChange={(e) => setDailySpendSimulation(Number(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />

          <div className="flex justify-between text-[11px] text-slate-400 mt-1">
            <span>Frugal: ₹200/day</span>
            <span>Moderate: ₹1,500/day</span>
            <span>High: ₹3,000/day</span>
          </div>
        </div>

        {/* Projected Outcome Summary */}
        <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-200/80 flex items-start gap-3.5">
          <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-slate-700">
            <p>
              At <strong className="text-slate-900 font-bold">₹{dailySpendSimulation}/day</strong>, you will spend approximately{' '}
              <strong className="text-slate-900 font-bold">₹{projectedExtraSpend.toLocaleString('en-IN')}</strong> over the final {daysRemaining} days.
            </p>
            <p>
              After clearing your <strong className="text-slate-900 font-bold">₹{scheduledFixedBills.toLocaleString('en-IN')}</strong> scheduled rent and bills, you will enter September with approximately{' '}
              <strong className="text-sky-700 font-black text-base">₹{estimatedEndBalance.toLocaleString('en-IN')}</strong> in net cash.
            </p>
          </div>
        </div>
      </div>

      {/* Scheduled Bills Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs space-y-4">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Scheduled & Expected Upcoming Outflows
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">Apartment Rent</p>
              <p className="text-[10px] text-slate-500">Scheduled for Sep 01</p>
            </div>
            <span className="text-sm font-extrabold text-slate-900">₹8,000</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">Netflix & Spotify</p>
              <p className="text-[10px] text-slate-500">Auto-debit mandate</p>
            </div>
            <span className="text-sm font-extrabold text-slate-900">₹448</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">Daily Groceries / Food</p>
              <p className="text-[10px] text-slate-500">Estimated discretionary</p>
            </div>
            <span className="text-sm font-extrabold text-slate-900">₹{projectedExtraSpend.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
