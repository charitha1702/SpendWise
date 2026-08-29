import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Plus, Edit2, AlertTriangle, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';
import { TransactionCategory } from '../../../types';

export const BudgetsView: React.FC = () => {
  const { budgets, budgetProgress, stats, updateBudget, showToast } = useFinance();
  const [editingBudgetId, setEditingBudgetId] = useState<string | null>(null);
  const [editLimitValue, setEditLimitValue] = useState<number>(0);

  const overallBudgetLimit = 25000;
  const overallSpent = stats.totalExpenses;
  const overallRemaining = Math.max(0, overallBudgetLimit - overallSpent);
  const overallPercent = Math.min(100, Math.round((overallSpent / overallBudgetLimit) * 100));

  const handleStartEdit = (id: string, currentLimit: number) => {
    setEditingBudgetId(id);
    setEditLimitValue(currentLimit);
  };

  const handleSaveEdit = (id: string) => {
    updateBudget(id, editLimitValue);
    setEditingBudgetId(null);
    showToast('Budget limit updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Smart Budgets
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Set and track spending boundaries with proactive pacing indicators.
          </p>
        </div>
      </div>

      {/* Overall Budget Hero Card */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-600 to-sky-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-600/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
              Total Monthly Budget Limit
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              ₹{overallSpent.toLocaleString('en-IN')}{' '}
              <span className="text-lg sm:text-xl font-medium text-sky-200">
                / ₹{overallBudgetLimit.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-3xl sm:text-4xl font-black text-white">{overallPercent}%</span>
            <p className="text-xs text-sky-200 mt-0.5">₹{overallRemaining.toLocaleString('en-IN')} remaining runway</p>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="w-full bg-white/20 h-4 rounded-full overflow-hidden p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              overallPercent > 90 ? 'bg-rose-400' : overallPercent > 75 ? 'bg-amber-300' : 'bg-white'
            }`}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-sky-100 font-medium">
          <span>Pacing: 28 of 31 days elapsed (90% of month passed)</span>
          <span className="bg-white/15 px-3 py-1 rounded-full text-white font-semibold">
            Status: On Track (Healthy)
          </span>
        </div>
      </div>

      {/* Category Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(budgetProgress || []).map((item) => {
          const isEditing = editingBudgetId === item?.budget?.id;
          const isWarning = item.percentage >= 80 && item.percentage <= 100;
          const isBreached = item.percentage > 100;

          return (
            <div
              key={item.budget.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                isBreached
                  ? 'border-rose-200 bg-rose-50/20'
                  : isWarning
                  ? 'border-amber-200 bg-amber-50/10'
                  : 'border-sky-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900">{item.budget.category}</h3>
                  <div className="flex items-center gap-1.5">
                    {isBreached ? (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        Breached
                      </span>
                    ) : isWarning ? (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        {item.percentage}% Warning
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Safe ({item.percentage}%)
                      </span>
                    )}

                    <button
                      onClick={() => handleStartEdit(item.budget.id, item.budget.allocated || item.budget.limit || 0)}
                      className="p-1 text-slate-400 hover:text-sky-600 rounded transition-colors"
                      title="Edit Limit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="my-2">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600">Spent: ₹{item.spent.toLocaleString('en-IN')}</span>
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">₹</span>
                        <input
                          type="number"
                          value={editLimitValue}
                          onChange={(e) => setEditLimitValue(Number(e.target.value) || 0)}
                          className="w-20 px-1.5 py-0.5 border border-sky-300 rounded text-xs text-slate-900 font-bold"
                        />
                        <button
                          onClick={() => handleSaveEdit(item.budget.id)}
                          className="px-2 py-0.5 bg-sky-600 text-white rounded text-[10px] font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-900 font-bold">
                        Limit: ₹{(item.budget.allocated || item.budget.limit || 0).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, item.percentage)}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full ${
                        isBreached ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-sky-600'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>
                  {item.remaining > 0
                    ? `₹${item.remaining.toLocaleString('en-IN')} remaining`
                    : `₹${Math.abs(item.remaining).toLocaleString('en-IN')} over limit`}
                </span>
                <span className="font-semibold text-slate-700">{item.percentage}% used</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
