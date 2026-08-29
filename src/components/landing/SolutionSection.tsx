import React from 'react';
import { motion } from 'motion/react';
import { Wallet, FileSpreadsheet, Sparkles, BrainCircuit, LineChart, ArrowRight, ArrowDown } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const steps = [
    {
      title: 'UPI / Bank / Wallet / Cards',
      subtitle: 'Where money is spent',
      icon: <Wallet className="w-6 h-6 text-sky-600" />,
      isMain: false,
    },
    {
      title: 'Statement',
      subtitle: 'PDF / CSV / Excel export',
      icon: <FileSpreadsheet className="w-6 h-6 text-sky-600" />,
      isMain: false,
    },
    {
      title: 'SPENDWISE',
      subtitle: 'Central intelligence hub',
      icon: <Sparkles className="w-6 h-6 text-white" />,
      isMain: true,
    },
    {
      title: 'AI Organization',
      subtitle: 'Clean categories & merchants',
      icon: <BrainCircuit className="w-6 h-6 text-sky-600" />,
      isMain: false,
    },
    {
      title: 'Insights',
      subtitle: 'Budgets, forecasts & clarity',
      icon: <LineChart className="w-6 h-6 text-sky-600" />,
      isMain: false,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-sky-50/40 via-white to-sky-50/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-sky-100 shadow-xs">
            The SpendWise Flow
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your money is everywhere. Your clarity shouldn't be.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            SpendWise bridges scattered statements into a single, structured view of your financial life.
          </p>
        </div>

        {/* Visual Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-center">
          {steps.map((item, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`relative rounded-2xl p-5 border text-center flex flex-col items-center justify-center transition-all ${
                  item.isMain
                    ? 'bg-sky-600 text-white border-sky-600 shadow-lg shadow-sky-600/20 py-6'
                    : 'bg-white text-slate-900 border-sky-100 shadow-xs hover:border-sky-200'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                    item.isMain ? 'bg-white/20 text-white' : 'bg-sky-50 text-sky-600'
                  }`}
                >
                  {item.icon}
                </div>
                <h3
                  className={`text-sm font-bold tracking-tight ${
                    item.isMain ? 'text-white font-black' : 'text-slate-900'
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-xs mt-1 font-normal ${
                    item.isMain ? 'text-sky-100' : 'text-slate-500'
                  }`}
                >
                  {item.subtitle}
                </p>
              </motion.div>

              {/* Arrow Connector for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex justify-center -mx-2 z-10">
                  <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}

              {/* Arrow Connector for mobile */}
              {idx < steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-1">
                  <ArrowDown className="w-4 h-4 text-sky-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
