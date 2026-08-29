import React from 'react';
import { motion } from 'motion/react';
import {
  FileSpreadsheet,
  BrainCircuit,
  BarChart3,
  Target,
  Bot,
  TrendingUp,
  ReceiptText,
  Calculator,
  Trophy,
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { AppTab } from '../../types';

export const FeaturesGridSection: React.FC = () => {
  const { setCurrentView, setActiveTab } = useFinance();

  const features = [
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-sky-600" />,
      title: 'Smart Import',
      description: 'Automatically organize uploaded transaction statements from banks, UPI apps, and cards with zero manual input.',
      tab: 'import' as AppTab,
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-sky-600" />,
      title: 'AI Categorization',
      description: 'Automatically identify categories such as Food, Shopping, Transport, Bills and Entertainment with 98% accuracy.',
      tab: 'transactions' as AppTab,
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-sky-600" />,
      title: 'Spending Analytics',
      description: 'Understand exactly where your money goes with interactive breakdowns, burn velocity, and heatmaps.',
      tab: 'analytics' as AppTab,
    },
    {
      icon: <Target className="w-6 h-6 text-sky-600" />,
      title: 'Smart Budgets',
      description: 'Set overall and category-specific spending limits with automated pacing indicators and breach warnings.',
      tab: 'budgets' as AppTab,
    },
    {
      icon: <Bot className="w-6 h-6 text-sky-600" />,
      title: 'AI Money Copilot',
      description: 'Ask questions about your finances in natural language and receive instant, objective insights.',
      tab: 'copilot' as AppTab,
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-sky-600" />,
      title: 'Financial Forecast',
      description: 'Estimate your month-end balance based on historical burn rates, recurring bills, and projected spend.',
      tab: 'forecast' as AppTab,
    },
    {
      icon: <ReceiptText className="w-6 h-6 text-sky-600" />,
      title: 'Receipt Scanner',
      description: 'Upload physical receipts and instantly extract merchant, items, date, tax, and category totals.',
      tab: 'receipts' as AppTab,
    },
    {
      icon: <Calculator className="w-6 h-6 text-sky-600" />,
      title: 'Before You Spend',
      description: 'Test potential purchases before buying to understand exact balance impact and budget runway.',
      tab: 'before-you-spend' as AppTab,
    },
    {
      icon: <Trophy className="w-6 h-6 text-sky-600" />,
      title: 'Money Challenges',
      description: 'Turn financial discipline into achievable micro-challenges like No-Spend Weekends or ₹1,000 saves.',
      tab: 'challenges' as AppTab,
    },
  ];

  const handleCardClick = (tab: AppTab) => {
    setActiveTab(tab);
    setCurrentView('app');
  };

  return (
    <section id="features" className="py-24 bg-sky-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-sky-100 shadow-xs">
            Complete Toolkit
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything you need to understand your money.
          </h2>
          <p className="mt-4 text-base text-slate-600 font-normal leading-relaxed">
            Built from the ground up for modern spenders. No tedious bookkeeping, no spreadsheet headaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => handleCardClick(item.tab)}
              className="bg-white hover:bg-sky-50/50 border border-sky-100/80 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600">
                <span>Explore in App</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
