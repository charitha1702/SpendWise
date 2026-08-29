import React from 'react';
import { motion } from 'motion/react';
import { Upload, Sparkles, PieChart, Compass, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Import',
      subtitle: 'Upload your transaction statement.',
      description: 'Drag in a PDF, CSV, or Excel statement from your bank or UPI apps. Takes 3 seconds.',
      icon: <Upload className="w-6 h-6 text-sky-600" />,
    },
    {
      num: '02',
      title: 'Organize',
      subtitle: 'SpendWise extracts and categorizes transactions.',
      description: 'Our engine cleans merchant names, eliminates duplicates, and assigns correct categories automatically.',
      icon: <Sparkles className="w-6 h-6 text-sky-600" />,
    },
    {
      num: '03',
      title: 'Understand',
      subtitle: 'Explore your spending patterns and insights.',
      description: 'See your real daily burn rate, weekend spikes, recurring leaks, and category shares.',
      icon: <PieChart className="w-6 h-6 text-sky-600" />,
    },
    {
      num: '04',
      title: 'Plan',
      subtitle: 'Set budgets, forecast balance and make decisions.',
      description: 'Forecast month-end cash flow, set adaptive limits, and simulate purchases before spending.',
      icon: <Compass className="w-6 h-6 text-sky-600" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Frictionless Process
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How SpendWise Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            From raw, messy statement exports to crystal-clear financial clarity in four seamless steps.
          </p>
        </div>

        {/* 4 Step Horizontal Flow */}
        <div className="relative">
          {/* Animated background connector line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-sky-200 via-sky-400 to-sky-200 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {st.icon}
                    </div>
                    <span className="text-2xl font-black text-sky-400/60 font-mono tracking-tighter">
                      {st.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
                    {st.title}
                  </h3>
                  <p className="text-xs font-semibold text-sky-700 mb-3">
                    {st.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-sky-600 transition-colors">
                  <span>Step {idx + 1} of 4</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
