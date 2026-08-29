import React from 'react';
import { motion } from 'motion/react';
import { FileUp, FileSpreadsheet, FileText, CheckCircle2, ArrowRight, Sparkles, Utensils, Car, ShoppingBag, Zap, Film, Layers } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const SmartImportHeroSection: React.FC = () => {
  const { setCurrentView, setAuthMode } = useFinance();

  const handleCTA = () => {
    setAuthMode('signup');
    setCurrentView('auth');
  };

  const detectedCategories = [
    { name: 'Food', count: 38, icon: <Utensils className="w-4 h-4 text-orange-500" />, bg: 'bg-orange-50' },
    { name: 'Transport', count: 24, icon: <Car className="w-4 h-4 text-blue-500" />, bg: 'bg-blue-50' },
    { name: 'Shopping', count: 31, icon: <ShoppingBag className="w-4 h-4 text-purple-500" />, bg: 'bg-purple-50' },
    { name: 'Bills', count: 18, icon: <Zap className="w-4 h-4 text-amber-500" />, bg: 'bg-amber-50' },
    { name: 'Entertainment', count: 12, icon: <Film className="w-4 h-4 text-pink-500" />, bg: 'bg-pink-50' },
    { name: 'Other', count: 19, icon: <Layers className="w-4 h-4 text-slate-500" />, bg: 'bg-slate-50' },
  ];

  return (
    <section id="smart-import" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Information */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Smart Import
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Stop entering every transaction manually.
            </h2>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Import your transaction statement and let SpendWise organize it automatically.
            </p>
            <p className="text-sm font-medium text-sky-800 bg-sky-50/70 p-3.5 rounded-xl border border-sky-100">
              💡 Import statements from your UPI apps, banks and cards. No private bank credentials or account linking required.
            </p>
            <div>
              <button
                onClick={handleCTA}
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                See how it works
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Beautiful Product Mockup */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-slate-50/70 border border-sky-100/90 rounded-3xl p-6 sm:p-8 shadow-lg shadow-sky-950/5 relative"
            >
              {/* Mockup Upload Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200/80">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Statement Analyzer</h3>
                  <p className="text-xs text-slate-500">Supports PDF, CSV & Excel formats</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-rose-500" /> PDF
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-1">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" /> CSV
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-1">
                    <FileUp className="w-3.5 h-3.5 text-sky-500" /> Excel
                  </span>
                </div>
              </div>

              {/* Status Banner */}
              <div className="my-5 p-4 rounded-2xl bg-white border border-sky-100 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">142 transactions detected</h4>
                    <p className="text-xs text-slate-500">Cleanly grouped into 6 smart categories</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  100% Parsed
                </span>
              </div>

              {/* Category Breakdown Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {detectedCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100 rounded-xl p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${cat.bg} flex items-center justify-center`}>
                        {cat.icon}
                      </div>
                      <span className="text-xs font-bold text-slate-800">{cat.name}</span>
                    </div>
                    <span className="text-xs font-extrabold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
