export type TransactionType = 'expense' | 'income';

export type TransactionCategory =
  | 'Food'
  | 'Food & Dining'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Bills & Utilities'
  | 'Entertainment'
  | 'Groceries'
  | 'Health'
  | 'Health & Medical'
  | 'Salary'
  | 'Investments'
  | 'Education'
  | 'Freelance'
  | 'Other';

export type PaymentMethod =
  | 'UPI'
  | 'Card'
  | 'Credit Card'
  | 'Debit Card'
  | 'NetBanking'
  | 'Net Banking'
  | 'Cash'
  | 'Wallet'
  | 'NEFT';

export type TransactionSource = 'manual' | 'statement' | 'receipt' | 'import';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  merchant: string;
  date: string; // YYYY-MM-DD
  paymentMethod: PaymentMethod;
  description: string;
  source: TransactionSource;
  createdAt?: string;
  status?: 'completed' | 'pending' | 'flagged';
  receiptItems?: { name: string; price: number }[];
}

export interface Budget {
  id: string;
  category: TransactionCategory | 'Overall';
  allocated: number;
  limit?: number;
  spent: number;
  period: 'monthly';
  warningThreshold?: number; // e.g. 80
}

export interface ReceiptItem {
  name: string;
  price: number;
  quantity?: number;
}

export interface Receipt {
  id: string;
  merchant: string;
  date: string;
  total: number;
  category: TransactionCategory;
  items: ReceiptItem[];
  imageUrl?: string;
  status: 'scanned' | 'imported';
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: TransactionCategory | 'Savings';
  targetAmount: number;
  currentAmount: number;
  durationDays: number;
  daysRemaining: number;
  icon: string;
  joined: boolean;
  completed: boolean;
  rewardBadge: string;
}

export type InsightType = 'biggest' | 'pattern' | 'mom' | 'unusual' | 'budget';

export interface AIInsight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  metric: string;
  impact: 'positive' | 'neutral' | 'warning' | 'tip';
  date: string;
  actionPrompt?: string;
}

export interface RecurringExpense {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'weekly' | 'annual';
  nextDueDate: string;
  category: TransactionCategory;
  icon: string;
  autoPay?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  currency: string;
  monthlyIncome: number;
  targetSavingsRate: number; // percentage e.g. 30
  avatar?: string;
  createdAt?: string;
}

export interface AuthSession {
  token: string;
  userId: string;
  email: string;
  name: string;
  issuedAt: number;
  expiresAt: number;
}

export interface DuplicateDetectionResult {
  isDuplicate: boolean;
  matchedTransactionId?: string;
  confidence: number;
  reason: string;
}

export type AppView = 'landing' | 'auth' | 'app';

export type AppTab =
  | 'dashboard'
  | 'transactions'
  | 'import'
  | 'analytics'
  | 'budgets'
  | 'copilot'
  | 'forecast'
  | 'receipts'
  | 'challenges'
  | 'before-you-spend'
  | 'settings';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  dataPoints?: { label: string; value: string }[];
}

export type CopilotMessage = ChatMessage;

export interface StatementUploadPreview {
  filename: string;
  totalDetected: number;
  categoriesFound: Record<string, number>;
  transactions: Transaction[];
}
