import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Clock, Check, Plus, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useFinance } from '../../../context/FinanceContext';

export const ChallengesView: React.FC = () => {
  const { challenges, joinChallenge, updateChallengeProgress, showToast } = useFinance();

  const handleIncrement = (id: string, current: number, target: number) => {
    const nextAmount = Math.min(target, current + 250);
    updateChallengeProgress(id, nextAmount);

    if (nextAmount >= target) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      showToast('🎉 Challenge Completed! Fantastic financial milestone!', 'success');
    } else {
      showToast('Logged +₹250 toward your challenge progress!', 'info');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Money Challenges
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Build lasting financial momentum with achievable 7-day and weekend micro-goals.
        </p>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(challenges || []).map((ch) => {
          const progress = Math.min(100, Math.round((ch.currentAmount / ch.targetAmount) * 100));
          const isComplete = ch.currentAmount >= ch.targetAmount;

          return (
            <div
              key={ch.id}
              className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all ${
                isComplete
                  ? 'bg-emerald-50/40 border-emerald-200 shadow-xs'
                  : ch.joined
                  ? 'bg-white border-sky-200 shadow-md shadow-sky-950/5'
                  : 'bg-white border-slate-200/90 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{ch.icon}</span>
                  <div className="flex items-center gap-2">
                    {isComplete ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-sky-500" />
                        {ch.daysRemaining} days left
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">{ch.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                  {ch.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Accumulated Savings</span>
                  <span className="font-extrabold text-slate-900">
                    ₹{ch.currentAmount.toLocaleString('en-IN')}{' '}
                    <span className="text-slate-400 font-normal">/ ₹{ch.targetAmount.toLocaleString('en-IN')}</span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-sky-600'}`}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {isComplete ? 'Goal achieved!' : `₹${(ch.targetAmount - ch.currentAmount).toLocaleString('en-IN')} to go`}
                  </span>
                  <span className="font-bold text-sky-700">{progress}%</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  {!ch.joined ? (
                    <button
                      onClick={() => joinChallenge(ch.id)}
                      className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Join Challenge
                    </button>
                  ) : !isComplete ? (
                    <>
                      <button
                        onClick={() => handleIncrement(ch.id, ch.currentAmount, ch.targetAmount)}
                        className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Log +₹250 Saved
                      </button>
                      <button
                        onClick={() => joinChallenge(ch.id)}
                        className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 text-xs font-medium"
                      >
                        Leave
                      </button>
                    </>
                  ) : (
                    <div className="w-full py-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4" />
                      Challenge Mastered
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
