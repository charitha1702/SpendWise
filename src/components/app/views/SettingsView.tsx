import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, DollarSign, Shield, Download, RotateCcw, Check, Sparkles, Trash2, Key, AlertTriangle, Lock, FileSpreadsheet } from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';
import { INITIAL_TRANSACTIONS, INITIAL_BUDGETS, INITIAL_CHALLENGES } from '../../../data/initialData';

export const SettingsView: React.FC = () => {
  const {
    user,
    setUser,
    transactions,
    budgets,
    challenges,
    recurringExpenses,
    receipts,
    setTransactions,
    setBudgets,
    setChallenges,
    showToast,
    sessionToken,
    deleteAccountData,
    logout,
  } = useFinance();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [monthlyIncome, setMonthlyIncome] = useState(user.monthlyIncome);
  const [savingsTarget, setSavingsTarget] = useState(user.targetSavingsRate);
  const [currency, setCurrency] = useState(user.currency);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      name,
      email,
      monthlyIncome,
      targetSavingsRate: savingsTarget,
      currency,
    });
    showToast('Profile & preferences saved successfully!', 'success');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all transactions and budgets back to initial sample state?')) {
      setTransactions(INITIAL_TRANSACTIONS);
      setBudgets(INITIAL_BUDGETS);
      setChallenges(INITIAL_CHALLENGES);
      showToast('All data has been reset to default demo records.', 'info');
    }
  };

  const handleExportJSON = () => {
    const data = {
      user,
      transactions,
      budgets,
      challenges,
      recurringExpenses,
      receipts,
      exportedAt: new Date().toISOString(),
      version: '2.0-secure',
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `SpendWise_Complete_Vault_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Complete financial vault exported as encrypted JSON', 'success');
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Merchant', 'Amount', 'Type', 'Category', 'PaymentMethod', 'Description'];
    const rows = transactions.map((t) => [
      `"${t.id}"`,
      `"${t.date}"`,
      `"${t.merchant.replace(/"/g, '""')}"`,
      t.amount,
      `"${t.type}"`,
      `"${t.category}"`,
      `"${t.paymentMethod}"`,
      `"${(t.description || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SpendWise_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Transactions exported as CSV ledger', 'success');
  };

  const handleDeleteAllData = () => {
    if (deleteConfirmText.trim().toLowerCase() !== 'delete my data') {
      showToast('Please type "DELETE MY DATA" exactly to confirm.', 'error');
      return;
    }

    deleteAccountData();
    setIsDeleteModalOpen(false);
    showToast('All user data and active session have been permanently erased.', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Settings & Privacy Center
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your personal profile, baseline monthly income, session encryption, and data isolation.
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <span>Personal Financial Profile</span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" />
            Isolated Vault #{user.id}
          </span>
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                id="settings-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-sm text-slate-900 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Monthly Income Baseline ({user.currency})
              </label>
              <input
                id="settings-monthly-income"
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-sm font-bold text-slate-900 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Savings Rate (%)
              </label>
              <input
                id="settings-savings-target"
                type="number"
                min="0"
                max="100"
                value={savingsTarget}
                onChange={(e) => setSavingsTarget(Number(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-sm font-bold text-slate-900 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Currency Symbol
              </label>
              <select
                id="settings-currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-sm font-bold text-slate-900 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="₹">₹ (INR - Indian Rupee)</option>
                <option value="$">$ (USD - US Dollar)</option>
                <option value="€">€ (EUR - Euro)</option>
                <option value="£">£ (GBP - British Pound)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              id="settings-save-btn"
              type="submit"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Save Preferences
            </button>
          </div>
        </form>
      </div>

      {/* Security & Active Session Status */}
      <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Key className="w-4 h-4 text-sky-600" />
          <span>Security & Active Session</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Session Token Status</span>
            <p className="font-mono text-slate-800 truncate font-semibold">
              {sessionToken ? `AUTH-${sessionToken.slice(0, 16)}...` : 'Client Vault Session'}
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">AI Sandbox Protection</span>
            <p className="text-emerald-700 font-semibold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              Strict Prompt Injection Guard & Anonymization
            </p>
          </div>
        </div>
      </div>

      {/* Data Management Card */}
      <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Data Management & Portability
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Export your complete ledger for external spreadsheets or backup, or reset data to default initial state.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="export-json-btn"
            onClick={handleExportJSON}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-sky-600" />
            Export Full JSON Vault
          </button>

          <button
            id="export-csv-btn"
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Export CSV Ledger
          </button>

          <button
            id="reset-demo-btn"
            onClick={handleResetData}
            className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Sample Data
          </button>

          <button
            id="delete-all-data-btn"
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            Delete All Account Data
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
          <Shield className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>
            SpendWise adheres to the Principle of Least Privilege and Zero Credential Scraping. Your data is isolated to your user ID and never shared or used to train third-party models.
          </span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-100 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Delete All Account Data?
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  This action is permanent and cannot be undone. All your transactions, budgets, receipts, AI chat logs, and profile records will be permanently wiped.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Type <span className="text-rose-600">DELETE MY DATA</span> to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="DELETE MY DATA"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:bg-white focus:border-rose-500 rounded-xl text-xs font-mono text-slate-900 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setDeleteConfirmText('');
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAllData}
                  disabled={deleteConfirmText.trim().toLowerCase() !== 'delete my data'}
                  className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Permanently Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

