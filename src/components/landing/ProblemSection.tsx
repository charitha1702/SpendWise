import React from 'react';
import { motion } from 'motion/react';
import { Clock, Smartphone, HelpCircle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: <Clock className="w-6 h-6 text-sky-600" />,
      title: 'Manual Entry',
      description: 'Entering every transaction manually takes effort and easily gets abandoned after a few days.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-sky-600" />,
      title: 'Scattered Data',
      description: 'Your spending is split across UPI apps, bank accounts, credit cards, and digital wallets.',
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-sky-600" />,
      title: 'No Clear Picture',
      description: 'Raw bank codes and numbers alone do not tell you where your money is actually going.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            The Problem
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tracking money shouldn't feel like work.
          </h2>
        </div>

        {/* 3 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((prob, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-sky-50/50 hover:bg-sky-50/80 border border-sky-100 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-sky-100 flex items-center justify-center mb-5">
                  {prob.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {prob.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {prob.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
