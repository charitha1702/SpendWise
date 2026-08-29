import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileSpreadsheet,
  Receipt,
  BarChart3,
  Target,
  Bot,
  TrendingUp,
  ReceiptText,
  Calculator,
  Trophy,
  Settings,
  Plus,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { AppTab } from '../../types';
import { AddTransactionModal } from '../common/AddTransactionModal';

interface NavItem {
  id: AppTab;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activeTab,
    setActiveTab,
    setCurrentView,
    user,
    stats,
    showToast,
  } = useFinance();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'transactions', label: 'Transactions', icon: <Receipt className="w-4 h-4" /> },
    { id: 'import', label: 'Smart Import', icon: <FileSpreadsheet className="w-4 h-4" />, badge: 'AI' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'budgets', label: 'Budgets', icon: <Target className="w-4 h-4" /> },
    { id: 'copilot', label: 'AI Copilot', icon: <Bot className="w-4 h-4" />, badge: 'AI' },
    { id: 'forecast', label: 'Forecast', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'receipts', label: 'Receipts', icon: <ReceiptText className="w-4 h-4" /> },
    { id: 'challenges', label: 'Challenges', icon: <Trophy className="w-4 h-4" /> },
    { id: 'before-you-spend', label: 'Before You Spend', icon: <Calculator className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    showToast('Signed out of SpendWise', 'info');
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-sky-100/90 shrink-0 h-screen sticky top-0 z-30 justify-between">
        {/* Brand Header - Clean typography, no symbol */}
        <div>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentView('landing')}
              className="text-left cursor-pointer focus:outline-none group"
              title="Back to Landing Page"
            >
              <span className="text-xl font-black text-slate-900 tracking-tighter uppercase block leading-none">
                SPEND<span className="text-sky-600">WISE</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5 block">
                Fintech Workspace
              </span>
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 shadow-xs border border-sky-200/70'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-sky-600' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider font-extrabold bg-sky-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm border border-sky-200">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
            <button
              onClick={() => setCurrentView('landing')}
              className="text-slate-500 hover:text-sky-600 flex items-center gap-1 font-medium text-[11px] cursor-pointer"
            >
              <ExternalLink className="w-3 h-3" />
              Public Landing
            </button>
            <button
              onClick={handleLogout}
              className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium text-[11px] cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-sky-100/80 sticky top-0 z-20 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 backdrop-blur-md bg-white/90">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-black text-slate-900 text-base tracking-tight uppercase">
              SPEND<span className="text-sky-600">WISE</span>
            </span>
          </div>

          {/* Search bar */}
          <div className="hidden sm:flex items-center flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search transactions, merchants, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Balances Chip */}
            <div className="hidden lg:flex items-center gap-2 bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-xl text-xs">
              <span className="text-slate-500 font-medium">Balance:</span>
              <span className="font-black text-sky-800">
                ₹{stats.currentBalance.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => showToast('All accounts in sync. 142 transactions logged.', 'info')}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-sky-500 absolute top-1.5 right-1.5" />
            </button>

            {/* Add Transaction Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Transaction</span>
            </button>
          </div>
        </header>

        {/* View Component Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/50 backdrop-blur-xs flex">
          <div className="w-72 bg-white h-full p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-black text-slate-900 text-lg tracking-tight uppercase">
                  SPEND<span className="text-sky-600">WISE</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 space-y-1 overflow-y-auto max-h-[70vh]">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold ${
                      activeTab === item.id
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] bg-sky-600 text-white px-1.5 py-0.5 rounded font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView('landing');
                }}
                className="w-full py-2 text-xs font-bold text-slate-600 hover:text-sky-600 flex items-center justify-center gap-1.5 bg-slate-50 rounded-xl mb-2"
              >
                Back to Public Landing
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2 text-xs font-bold text-rose-600 flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            activeTab === 'dashboard' ? 'text-sky-600' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          Home
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            activeTab === 'transactions' ? 'text-sky-600' : 'text-slate-400'
          }`}
        >
          <Receipt className="w-5 h-5 mb-0.5" />
          Txs
        </button>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex flex-col items-center p-2 rounded-full bg-sky-600 text-white -mt-5 shadow-lg shadow-sky-600/30"
          title="Add Transaction"
        >
          <Plus className="w-6 h-6" />
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            activeTab === 'analytics' ? 'text-sky-600' : 'text-slate-400'
          }`}
        >
          <BarChart3 className="w-5 h-5 mb-0.5" />
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('copilot')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            activeTab === 'copilot' ? 'text-sky-600' : 'text-slate-400'
          }`}
        >
          <Bot className="w-5 h-5 mb-0.5" />
          AI
        </button>
      </nav>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};
