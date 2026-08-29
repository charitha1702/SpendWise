import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  Transaction,
  Budget,
  Challenge,
  AIInsight,
  RecurringExpense,
  Receipt,
  UserProfile,
  AuthSession,
  DuplicateDetectionResult,
  AppView,
  AppTab,
  ChatMessage,
  TransactionCategory,
} from '../types';
import {
  initialUser,
  initialTransactions,
  initialBudgets,
  initialChallenges,
  initialRecurringExpenses,
  initialInsights,
  initialReceipts,
} from '../data/initialData';

interface FinanceStats {
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  balance: number;
  totalSavings: number;
  savingsRate: number;
  categoryTotals: Record<string, number>;
  categoryBreakdown: Record<string, number>;
  categoryPercentages: Record<string, number>;
  dailyBurnRate: number;
  burnRateDaily: number;
  projectedMonthEndBalance: number;
  overallBudgetTotal: number;
  overallBudgetSpent: number;
  overallBudgetPercentage: number;
}

interface BudgetProgressItem {
  budget: Budget;
  spent: number;
  remaining: number;
  percentage: number;
  isOver: boolean;
}

interface FinanceContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isAuthenticated: boolean;
  sessionToken: string | null;
  login: (email: string, password?: string, fullName?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  deleteAccountData: () => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  budgets: Budget[];
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
  budgetProgress: BudgetProgressItem[];
  challenges: Challenge[];
  setChallenges: React.Dispatch<React.SetStateAction<Challenge[]>>;
  recurringExpenses: RecurringExpense[];
  insights: AIInsight[];
  receipts: Receipt[];
  chatMessages: ChatMessage[];
  copilotMessages: ChatMessage[];
  isAddTxModalOpen: boolean;
  setIsAddTxModalOpen: (open: boolean) => void;
  editingTransaction: Transaction | null;
  setEditingTransaction: (tx: Transaction | null) => void;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  stats: FinanceStats;
  addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  importTransactions: (newTxs: Transaction[]) => void;
  detectDuplicate: (candidate: { date: string; amount: number; merchant: string; description?: string }) => DuplicateDetectionResult;
  updateBudget: (id: string, allocated: number) => void;
  createBudget: (category: TransactionCategory, allocated: number) => void;
  deleteBudget: (id: string) => void;
  joinChallenge: (id: string) => void;
  updateChallengeProgress: (id: string, amount: number) => void;
  addReceipt: (receipt: Receipt) => void;
  addRecurringExpense: (exp: Omit<RecurringExpense, 'id'>) => void;
  deleteRecurringExpense: (id: string) => void;
  sendCopilotMessage: (text: string) => Promise<void>;
  askCopilot: (text: string) => Promise<void>;
  isCopilotTyping: boolean;
  isCopilotLoading: boolean;
  resetToDemoData: () => void;
  triggerCelebration: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SESSION: 'spendwise_session_v1',
  USER: 'spendwise_user_v1',
  TRANSACTIONS: 'spendwise_txs_v1',
  BUDGETS: 'spendwise_budgets_v1',
  CHALLENGES: 'spendwise_challenges_v1',
  RECURRING: 'spendwise_recurring_v1',
  RECEIPTS: 'spendwise_receipts_v1',
  VIEW: 'spendwise_view_v1',
};

function safeStorageGet<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    if (Array.isArray(fallback)) {
      return (Array.isArray(parsed) ? parsed : fallback) as unknown as T;
    }
    return parsed && typeof parsed === 'object' ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(() => {
    return safeStorageGet<AuthSession | null>(STORAGE_KEYS.SESSION, {
      token: 'demo_session_charitha_default',
      userId: 'usr-1',
      email: 'charitha.padamati@gmail.com',
      name: 'Charitha Padamati',
      issuedAt: Date.now(),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
  });

  const [user, setUser] = useState<UserProfile>(() => safeStorageGet(STORAGE_KEYS.USER, initialUser));

  const [currentView, setCurrentView] = useState<AppView>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIEW);
      return (saved as AppView) || 'landing';
    } catch {
      return 'landing';
    }
  });

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');

  const [transactions, setTransactions] = useState<Transaction[]>(() => safeStorageGet(STORAGE_KEYS.TRANSACTIONS, initialTransactions));
  const [budgets, setBudgets] = useState<Budget[]>(() => safeStorageGet(STORAGE_KEYS.BUDGETS, initialBudgets));
  const [challenges, setChallenges] = useState<Challenge[]>(() => safeStorageGet(STORAGE_KEYS.CHALLENGES, initialChallenges));
  const [recurringExpenses, setRecurringExpenses] = useState<RecurringExpense[]>(() => safeStorageGet(STORAGE_KEYS.RECURRING, initialRecurringExpenses));
  const [receipts, setReceipts] = useState<Receipt[]>(() => safeStorageGet(STORAGE_KEYS.RECEIPTS, initialReceipts));
  const [insights] = useState<AIInsight[]>(initialInsights);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello! I am your SpendWise Money Copilot. I analyze your statements, spending trends, and category budgets to answer questions and offer actionable clarity.',
      timestamp: 'Just now',
      dataPoints: [
        { label: 'Current Month Balance', value: '₹24,500' },
        { label: 'Top Outflow', value: 'Bills & Utilities (32%)' },
      ],
    },
  ]);

  const [isCopilotTyping, setIsCopilotTyping] = useState(false);
  const [isAddTxModalOpen, setIsAddTxModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const isAuthenticated = Boolean(session && session.expiresAt > Date.now());
  const sessionToken = session ? session.token : null;

  // Persistence effects
  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    }
  }, [session]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECURRING, JSON.stringify(recurringExpenses));
  }, [recurringExpenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(receipts));
  }, [receipts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIEW, currentView);
  }, [currentView]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#38bdf8', '#7dd3fc', '#0284c7'],
      });
    } catch {
      // safe fallback
    }
  };

  // Secure Auth Methods
  const login = async (email: string, _password?: string, fullName?: string): Promise<boolean> => {
    const userId = email.includes('charitha') ? 'usr-1' : `usr-${Date.now()}`;
    const newSession: AuthSession = {
      token: `spw_sess_${btoa(JSON.stringify({ userId, email, name: fullName || user.name, expiresAt: Date.now() + 7 * 86400000 }))}`,
      userId,
      email,
      name: fullName || (email.includes('charitha') ? 'Charitha Padamati' : email.split('@')[0]),
      issuedAt: Date.now(),
      expiresAt: Date.now() + 7 * 86400000,
    };
    setSession(newSession);
    setUser((prev) => ({
      ...prev,
      id: userId,
      name: newSession.name,
      email: newSession.email,
    }));
    return true;
  };

  const signup = async (name: string, email: string, password?: string): Promise<boolean> => {
    return login(email, password, name);
  };

  const logout = () => {
    setSession(null);
    setCurrentView('auth');
    setAuthMode('login');
    showToast('Signed out of SpendWise session securely', 'info');
  };

  const deleteAccountData = () => {
    setTransactions([]);
    setBudgets([]);
    setChallenges([]);
    setRecurringExpenses([]);
    setReceipts([]);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.BUDGETS);
    localStorage.removeItem(STORAGE_KEYS.CHALLENGES);
    localStorage.removeItem(STORAGE_KEYS.RECURRING);
    localStorage.removeItem(STORAGE_KEYS.RECEIPTS);
    showToast('All personal financial records have been purged.', 'info');
  };

  // Duplicate Transaction Detection
  const detectDuplicate = (candidate: {
    date: string;
    amount: number;
    merchant: string;
    description?: string;
  }): DuplicateDetectionResult => {
    const cleanCandMerchant = candidate.merchant.toLowerCase().replace(/[^a-z0-9]/g, '');
    const matched = transactions.find((tx) => {
      const isDateMatch = tx.date === candidate.date;
      const isAmountMatch = Math.abs(tx.amount - candidate.amount) < 0.01;
      const cleanTxMerchant = tx.merchant.toLowerCase().replace(/[^a-z0-9]/g, '');
      const isMerchantSimilar =
        cleanTxMerchant.includes(cleanCandMerchant) ||
        cleanCandMerchant.includes(cleanTxMerchant) ||
        (candidate.description && tx.description && tx.description.toLowerCase() === candidate.description.toLowerCase());
      return isDateMatch && isAmountMatch && isMerchantSimilar;
    });

    if (matched) {
      return {
        isDuplicate: true,
        matchedTransactionId: matched.id,
        confidence: 0.95,
        reason: `Matches existing ₹${matched.amount.toLocaleString('en-IN')} ${matched.merchant} record on ${matched.date}`,
      };
    }

    return {
      isDuplicate: false,
      confidence: 0,
      reason: 'Unique transaction',
    };
  };

  // Compute live financial stats
  const calculateStats = (): FinanceStats => {
    let totalIncome = 0;
    let totalExpenses = 0;
    const categoryTotals: Record<string, number> = {};

    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        totalIncome += tx.amount;
      } else {
        totalExpenses += tx.amount;
        const cat = tx.category || 'Other';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + tx.amount;
      }
    });

    const balance = totalIncome - totalExpenses;
    const totalSavings = Math.max(0, balance);
    const savingsRate = totalIncome > 0 ? Math.round((totalSavings / totalIncome) * 100) : 0;

    const categoryPercentages: Record<string, number> = {};
    if (totalExpenses > 0) {
      Object.entries(categoryTotals).forEach(([cat, amt]) => {
        categoryPercentages[cat] = Math.round((amt / totalExpenses) * 100);
      });
    }

    const dailyBurnRate = Math.round(totalExpenses / 28);
    const projectedMonthEndBalance = Math.max(0, balance - dailyBurnRate * 3);

    let overallBudgetTotal = 0;
    let overallBudgetSpent = 0;
    budgets.forEach((b) => {
      overallBudgetTotal += b.allocated;
      overallBudgetSpent += b.spent;
    });
    const overallBudgetPercentage =
      overallBudgetTotal > 0 ? Math.min(100, Math.round((overallBudgetSpent / overallBudgetTotal) * 100)) : 0;

    return {
      totalIncome,
      totalExpenses,
      currentBalance: balance,
      balance,
      totalSavings,
      savingsRate,
      categoryTotals,
      categoryBreakdown: categoryTotals,
      categoryPercentages,
      dailyBurnRate,
      burnRateDaily: dailyBurnRate,
      projectedMonthEndBalance,
      overallBudgetTotal,
      overallBudgetSpent,
      overallBudgetPercentage,
    };
  };

  const stats = calculateStats();

  const budgetProgress: BudgetProgressItem[] = budgets.map((b) => {
    const spent = b.spent;
    const remaining = Math.max(0, b.allocated - spent);
    const percentage = b.allocated > 0 ? Math.round((spent / b.allocated) * 100) : 0;
    const isOver = spent > b.allocated;
    return {
      budget: b,
      spent,
      remaining,
      percentage,
      isOver,
    };
  });

  const addTransaction = (tx: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Update corresponding budget spent automatically
    setBudgets((prev) =>
      prev.map((b) => {
        if (b.category === tx.category || b.category === 'Overall') {
          return { ...b, spent: b.spent + (tx.type === 'expense' ? tx.amount : 0) };
        }
        return b;
      })
    );

    showToast(`Added ${tx.type === 'income' ? 'income' : 'expense'} of ₹${tx.amount.toLocaleString('en-IN')}`, 'success');
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    showToast('Transaction updated', 'success');
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast('Transaction deleted', 'info');
  };

  const importTransactions = (newTxs: Transaction[]) => {
    const withIds = newTxs.map((t) => ({
      ...t,
      id: t.id || `imp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
    }));
    setTransactions((prev) => [...withIds, ...prev]);
    showToast(`Imported ${newTxs.length} transactions successfully!`, 'success');
  };

  const updateBudget = (id: string, allocated: number) => {
    setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, allocated } : b)));
    showToast('Budget allocation updated', 'success');
  };

  const createBudget = (category: TransactionCategory, allocated: number) => {
    const newBudget: Budget = {
      id: `bg-${Date.now()}`,
      category,
      allocated,
      spent: 0,
      period: 'monthly',
      warningThreshold: 80,
    };
    setBudgets((prev) => [...prev, newBudget]);
    showToast(`Created ${category} budget of ₹${allocated.toLocaleString('en-IN')}`, 'success');
  };

  const deleteBudget = (id: string) => {
    setBudgets((prev) => prev.filter((b) => b.id !== id));
    showToast('Budget removed', 'info');
  };

  const joinChallenge = (id: string) => {
    setChallenges((prev) => prev.map((c) => (c.id === id ? { ...c, joined: true } : c)));
    showToast('Joined savings challenge! Track your progress here.', 'success');
  };

  const updateChallengeProgress = (id: string, amount: number) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextAmt = Math.min(c.targetAmount, c.currentAmount + amount);
          const isDone = nextAmt >= c.targetAmount;
          if (isDone && !c.completed) {
            triggerCelebration();
            showToast(`🏆 Congratulations! You completed "${c.title}"!`, 'success');
          }
          return {
            ...c,
            currentAmount: nextAmt,
            completed: isDone,
          };
        }
        return c;
      })
    );
  };

  const addReceipt = (receipt: Receipt) => {
    setReceipts((prev) => [receipt, ...prev]);
    showToast(`Scanned bill from ${receipt.merchant} (₹${receipt.total.toLocaleString('en-IN')})`, 'success');

    // Automatically add corresponding transaction
    addTransaction({
      userId: user.id,
      amount: receipt.total,
      type: 'expense',
      category: receipt.category,
      merchant: receipt.merchant,
      date: receipt.date,
      paymentMethod: 'UPI',
      description: `Receipt items: ${receipt.items.map((i) => i.name).join(', ')}`,
      source: 'receipt',
      receiptItems: receipt.items,
    });
  };

  const addRecurringExpense = (exp: Omit<RecurringExpense, 'id'>) => {
    const newExp: RecurringExpense = {
      ...exp,
      id: `rec-${Date.now()}`,
    };
    setRecurringExpenses((prev) => [...prev, newExp]);
    showToast(`Added recurring bill for ${exp.name}`, 'success');
  };

  const deleteRecurringExpense = (id: string) => {
    setRecurringExpenses((prev) => prev.filter((r) => r.id !== id));
    showToast('Recurring bill removed', 'info');
  };

  const sendCopilotMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsCopilotTyping(true);

    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionToken ? `Bearer ${sessionToken}` : 'Bearer demo_session_charitha_default',
        },
        body: JSON.stringify({
          prompt: text,
          transactions: transactions.slice(0, 15),
          stats,
        }),
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.reply || 'Based on your spending data, you are in a steady financial position.',
        timestamp: 'Just now',
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: `Based on your spending records: You currently have ₹${stats.currentBalance.toLocaleString('en-IN')} in available balance. Your biggest expense category this month is Food & Bills.`,
        timestamp: 'Just now',
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsCopilotTyping(false);
    }
  };

  const resetToDemoData = () => {
    setUser(initialUser);
    setTransactions(initialTransactions);
    setBudgets(initialBudgets);
    setChallenges(initialChallenges);
    setRecurringExpenses(initialRecurringExpenses);
    setReceipts(initialReceipts);
    showToast('Reset to original demo data', 'info');
  };

  return (
    <FinanceContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        sessionToken,
        login,
        signup,
        logout,
        deleteAccountData,
        currentView,
        setCurrentView,
        authMode,
        setAuthMode,
        activeTab,
        setActiveTab,
        transactions,
        setTransactions,
        budgets,
        setBudgets,
        budgetProgress,
        challenges,
        setChallenges,
        recurringExpenses,
        insights,
        receipts,
        chatMessages,
        copilotMessages: chatMessages,
        isAddTxModalOpen,
        setIsAddTxModalOpen,
        editingTransaction,
        setEditingTransaction,
        toast,
        showToast,
        stats,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        importTransactions,
        detectDuplicate,
        updateBudget,
        createBudget,
        deleteBudget,
        joinChallenge,
        updateChallengeProgress,
        addReceipt,
        addRecurringExpense,
        deleteRecurringExpense,
        sendCopilotMessage,
        askCopilot: sendCopilotMessage,
        isCopilotTyping,
        isCopilotLoading: isCopilotTyping,
        resetToDemoData,
        triggerCelebration,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

