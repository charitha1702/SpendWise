import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Clock, Check, Plus, ArrowRight } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const ChallengesHeroSection: React.FC = () => {
  const { challenges, joinChallenge, setCurrentView, setActiveTab } = useFinance();

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Gamified Financial Health
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Make saving feel achievable.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Turn lofty financial goals into bite-sized 7-day and weekend micro-challenges that celebrate your progress.
          </p>
        </div>

        {/* 4 Challenge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((ch, idx) => {
            const progress = Math.min(100, Math.round((ch.currentAmount / ch.targetAmount) * 100));
            const remaining = Math.max(0, ch.targetAmount - ch.currentAmount);

            return (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 ${
                  ch.joined
                    ? 'bg-sky-50/50 border-sky-200 shadow-sm'
                    : 'bg-white border-slate-200/90 shadow-xs hover:border-sky-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{ch.icon}</span>
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-100">
                      <Clock className="w-3 h-3 text-sky-500" />
                      {ch.daysRemaining} days left
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                    {ch.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Progress</span>
                    <span className="font-bold text-slate-900">
                      ₹{ch.currentAmount.toLocaleString('en-IN')} / ₹{ch.targetAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="bg-sky-600 h-full rounded-full"
                    />
                  </div>

                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">₹{remaining.toLocaleString('en-IN')} remaining</span>
                    <span className="font-semibold text-sky-700">{progress}%</span>
                  </div>

                  {/* Join Button */}
                  <button
                    onClick={() => joinChallenge(ch.id)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      ch.joined
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-white hover:bg-sky-50 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {ch.joined ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Active Challenge
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-sky-600" />
                        Join Challenge
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
