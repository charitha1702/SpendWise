import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Calendar, AlertCircle, Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const ForecastHeroSection: React.FC = () => {
  const { setCurrentView, setActiveTab } = useFinance();

  const forecastPoints = [
    { day: 'Aug 01', actual: 35000, projected: 35000 },
    { day: 'Aug 08', actual: 31200, projected: 31500 },
    { day: 'Aug 15', actual: 28400, projected: 28000 },
    { day: 'Aug 22', actual: 26100, projected: 25500 },
    { day: 'Aug 28 (Today)', actual: 24500, projected: 24500 },
    { day: 'Aug 31 (Est)', actual: null, projected: 18420 },
  ];

  return (
    <section id="forecast" className="py-24 bg-sky-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-sky-100 shadow-xs">
            Predictive Balance Engine
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            See where your money is heading.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Anticipate your month-end balance with smart trend extrapolations and upcoming bill schedules.
          </p>
        </div>

        {/* Interactive Graph Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-sky-100 shadow-xl p-6 sm:p-10">
          {/* Top Balance Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8 border-b border-slate-100">
            <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Current Balance
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                ₹32,500
              </div>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                Live verified balance
              </span>
            </div>

            <div className="bg-gradient-to-br from-sky-600 to-sky-700 p-5 rounded-2xl text-white shadow-md shadow-sky-600/20">
              <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                Projected Month-End Balance
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                ₹18,420
              </div>
              <span className="text-xs text-sky-200 font-medium flex items-center gap-1 mt-1">
                <Sparkles className="w-3.5 h-3.5" />
                Estimated runway based on current velocity
              </span>
            </div>
          </div>

          {/* Line Chart Visual Representation */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Balance Trajectory (Actual vs Estimated)
              </span>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-sky-700">
                  <span className="w-3 h-3 rounded-full bg-sky-600" />
                  Actual
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-3 h-3 rounded-full bg-slate-300 border border-dashed border-slate-500" />
                  Projected (Estimate)
                </span>
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="h-56 w-full relative">
              <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="40" x2="600" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="160" x2="600" y2="160" stroke="#f1f5f9" strokeWidth="1" />

                {/* Gradient area */}
                <path
                  d="M 50 30 L 150 55 L 250 80 L 350 100 L 450 120 L 550 165 L 550 190 L 50 190 Z"
                  fill="url(#forecastGrad)"
                />

                {/* Actual Solid Line (Aug 01 to Aug 28) */}
                <path
                  d="M 50 30 L 150 55 L 250 80 L 350 100 L 450 120"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Projected Dashed Line (Aug 28 to Aug 31) */}
                <path
                  d="M 450 120 L 550 165"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="3"
                  strokeDasharray="6,6"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                <circle cx="50" cy="30" r="5" fill="#0284c7" />
                <circle cx="150" cy="55" r="5" fill="#0284c7" />
                <circle cx="250" cy="80" r="5" fill="#0284c7" />
                <circle cx="350" cy="100" r="5" fill="#0284c7" />
                <circle cx="450" cy="120" r="6" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                <circle cx="550" cy="165" r="6" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />

                {/* Point Labels */}
                <text x="50" y="20" fontSize="11" fill="#475569" textAnchor="middle" fontWeight="bold">₹35k</text>
                <text x="450" y="108" fontSize="11" fill="#0284c7" textAnchor="middle" fontWeight="bold">Today ₹24.5k</text>
                <text x="550" y="155" fontSize="11" fill="#0284c7" textAnchor="middle" fontWeight="bold">₹18.4k</text>
              </svg>

              {/* Bottom Day Labels */}
              <div className="flex justify-between text-[11px] font-semibold text-slate-500 pt-2">
                <span>Aug 01</span>
                <span>Aug 08</span>
                <span>Aug 15</span>
                <span>Aug 22</span>
                <span className="text-sky-700 font-bold">Aug 28 (Today)</span>
                <span className="text-slate-600 font-bold">Aug 31 (Est)</span>
              </div>
            </div>
          </div>

          {/* Upcoming Expenses Card Grid */}
          <div className="mt-10 pt-8 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              Upcoming scheduled & expected outflows:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">Rent (Sep 01)</p>
                  <p className="text-[11px] text-slate-500">Scheduled bill</p>
                </div>
                <span className="text-sm font-bold text-slate-900">₹8,000</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">Subscriptions</p>
                  <p className="text-[11px] text-slate-500">Netflix + Spotify</p>
                </div>
                <span className="text-sm font-bold text-slate-900">₹448</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">Expected expenses</p>
                  <p className="text-[11px] text-slate-500">Daily burn forecast</p>
                </div>
                <span className="text-sm font-bold text-slate-900">₹5,200</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <AlertCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>All projections are mathematical estimates based on current average burn velocity.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
