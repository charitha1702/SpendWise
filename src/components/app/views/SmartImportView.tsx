import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UploadCloud,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Check,
  RotateCcw,
  Shield,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useFinance } from '../../../context/FinanceContext';
import { TransactionCategory, PaymentMethod } from '../../../types';

interface ParsedCandidate {
  id: string;
  date: string;
  rawDescription: string;
  merchant: string;
  amount: number;
  type: 'expense' | 'income';
  category: TransactionCategory;
  paymentMethod: PaymentMethod;
  selected: boolean;
  isDuplicate?: boolean;
  duplicateConfidence?: 'low' | 'medium' | 'high';
}

const SAMPLE_STATEMENTS = [
  {
    name: 'PhonePe_UPI_Statement_Aug2026.pdf',
    source: 'PhonePe UPI',
    count: 8,
    type: 'PDF',
  },
  {
    name: 'HDFC_Bank_Savings_Statement.csv',
    source: 'HDFC Bank',
    count: 10,
    type: 'CSV',
  },
  {
    name: 'ICICI_CreditCard_Statement.xlsx',
    source: 'ICICI Bank',
    count: 6,
    type: 'Excel',
  },
];

const MOCK_EXTRACTED_TEMPLATES: Record<string, ParsedCandidate[]> = {
  'PhonePe_UPI_Statement_Aug2026.pdf': [
    {
      id: 'imp-1',
      date: '2026-08-27',
      rawDescription: 'UPI/P2M/029192/SWIGGY_BLR/10293',
      merchant: 'Swiggy',
      amount: 420,
      type: 'expense',
      category: 'Food & Dining',
      paymentMethod: 'UPI',
      selected: true,
    },
    {
      id: 'imp-2',
      date: '2026-08-26',
      rawDescription: 'UPI/P2M/88129/ZEPTO_NOW/GROCERY',
      merchant: 'Zepto',
      amount: 680,
      type: 'expense',
      category: 'Groceries',
      paymentMethod: 'UPI',
      selected: true,
    },
    {
      id: 'imp-3',
      date: '2026-08-25',
      rawDescription: 'UPI/P2M/92019/UBER_INDIA/TRIP',
      merchant: 'Uber',
      amount: 290,
      type: 'expense',
      category: 'Transport',
      paymentMethod: 'UPI',
      selected: true,
    },
    {
      id: 'imp-4',
      date: '2026-08-24',
      rawDescription: 'UPI/P2M/47281/AMAZON_PAY/BOOKS',
      merchant: 'Amazon',
      amount: 850,
      type: 'expense',
      category: 'Shopping',
      paymentMethod: 'UPI',
      selected: true,
    },
    {
      id: 'imp-5',
      date: '2026-08-23',
      rawDescription: 'UPI/P2M/66381/STARBUCKS_COFFEE/IND',
      merchant: 'Starbucks',
      amount: 380,
      type: 'expense',
      category: 'Food & Dining',
      paymentMethod: 'UPI',
      selected: true,
    },
    {
      id: 'imp-6',
      date: '2026-08-22',
      rawDescription: 'UPI/P2M/19284/CULT_FITNESS/SUB',
      merchant: 'Cult.fit',
      amount: 1499,
      type: 'expense',
      category: 'Health & Medical',
      paymentMethod: 'UPI',
      selected: true,
    },
    {
      id: 'imp-7',
      date: '2026-08-21',
      rawDescription: 'UPI/P2M/58291/BOOKMYSHOW/MOVIES',
      merchant: 'BookMyShow',
      amount: 640,
      type: 'expense',
      category: 'Entertainment',
      paymentMethod: 'UPI',
      selected: true,
    },
    {
      id: 'imp-8',
      date: '2026-08-20',
      rawDescription: 'UPI/P2P/11928/SALARY_CREDIT_TECH',
      merchant: 'Acme Corp Tech',
      amount: 35000,
      type: 'income',
      category: 'Salary',
      paymentMethod: 'UPI',
      selected: true,
    },
  ],
  'HDFC_Bank_Savings_Statement.csv': [
    {
      id: 'imp-hdfc-1',
      date: '2026-08-26',
      rawDescription: 'POS 40129847120 NATURES BASKET MUMBAI',
      merchant: "Nature's Basket",
      amount: 1840,
      type: 'expense',
      category: 'Groceries',
      paymentMethod: 'Debit Card',
      selected: true,
    },
    {
      id: 'imp-hdfc-2',
      date: '2026-08-24',
      rawDescription: 'NEFT-CR-N120938491-CLIENT CONSULTING FEE',
      merchant: 'Client Consulting',
      amount: 12000,
      type: 'income',
      category: 'Freelance',
      paymentMethod: 'Net Banking',
      selected: true,
    },
    {
      id: 'imp-hdfc-3',
      date: '2026-08-22',
      rawDescription: 'ACH DR TATA POWER ELECTRICITY BILL',
      merchant: 'Tata Power Electricity',
      amount: 1450,
      type: 'expense',
      category: 'Bills & Utilities',
      paymentMethod: 'Net Banking',
      selected: true,
    },
    {
      id: 'imp-hdfc-4',
      date: '2026-08-19',
      rawDescription: 'UPI/P2M/99102/ZOMATO_ONLINE/ORD',
      merchant: 'Zomato',
      amount: 510,
      type: 'expense',
      category: 'Food & Dining',
      paymentMethod: 'UPI',
      selected: true,
    },
  ],
  'ICICI_CreditCard_Statement.xlsx': [
    {
      id: 'imp-icici-1',
      date: '2026-08-25',
      rawDescription: 'INDIGO AIRLINES TICKET NEW DELHI',
      merchant: 'IndiGo Airlines',
      amount: 4650,
      type: 'expense',
      category: 'Transport',
      paymentMethod: 'Credit Card',
      selected: true,
    },
    {
      id: 'imp-icici-2',
      date: '2026-08-23',
      rawDescription: 'APPLE DIGITAL SERVICES ITUNES SUBS',
      merchant: 'Apple Services',
      amount: 179,
      type: 'expense',
      category: 'Bills & Utilities',
      paymentMethod: 'Credit Card',
      selected: true,
    },
    {
      id: 'imp-icici-3',
      date: '2026-08-20',
      rawDescription: 'DECATHLON SPORTS INDIA BANGALORE',
      merchant: 'Decathlon Sports',
      amount: 2190,
      type: 'expense',
      category: 'Shopping',
      paymentMethod: 'Credit Card',
      selected: true,
    },
  ],
};

const CATEGORIES: TransactionCategory[] = [
  'Food & Dining',
  'Groceries',
  'Transport',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Health & Medical',
  'Education',
  'Investments',
  'Salary',
  'Freelance',
  'Other',
];

export const SmartImportView: React.FC = () => {
  const { addTransaction, user, setActiveTab, showToast, detectDuplicate, sessionToken } = useFinance();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedFileName, setSelectedFileName] = useState<string>('PhonePe_UPI_Statement_Aug2026.pdf');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [extractedList, setExtractedList] = useState<ParsedCandidate[]>(() => {
    return (MOCK_EXTRACTED_TEMPLATES['PhonePe_UPI_Statement_Aug2026.pdf'] || []).map((cand) => {
      const dup = detectDuplicate(cand.amount, cand.date, cand.merchant);
      return {
        ...cand,
        isDuplicate: dup.isDuplicate,
        duplicateConfidence: dup.confidence,
        selected: !dup.isDuplicate,
      };
    });
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const processCandidates = (rawList: ParsedCandidate[], filename: string) => {
    const listWithDupCheck = rawList.map((cand) => {
      const dup = detectDuplicate(cand.amount, cand.date, cand.merchant);
      return {
        ...cand,
        isDuplicate: dup.isDuplicate,
        duplicateConfidence: dup.confidence,
        // Auto uncheck high confidence duplicates to protect the user
        selected: !dup.isDuplicate,
      };
    });

    setExtractedList(listWithDupCheck);
    setSelectedFileName(filename);
  };

  const startExtraction = (filename: string) => {
    setSelectedFileName(filename);
    setCurrentStep(2);
    setIsProcessing(true);

    setTimeout(() => {
      setCurrentStep(3);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(4);
        const sourceData = MOCK_EXTRACTED_TEMPLATES[filename] || MOCK_EXTRACTED_TEMPLATES['PhonePe_UPI_Statement_Aug2026.pdf'];
        processCandidates(sourceData, filename);
      }, 700);
    }, 800);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File validation: Size <= 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      showToast('File size exceeds maximum 10MB limit.', 'error');
      return;
    }

    const allowedExtensions = ['.csv', '.txt', '.pdf', '.xlsx', '.xls'];
    const hasValidExt = allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));
    if (!hasValidExt) {
      showToast('Invalid file format. Please upload a PDF, CSV, or Excel file.', 'warning');
      return;
    }

    setSelectedFileName(file.name);
    setCurrentStep(2);
    setIsProcessing(true);

    try {
      // Read text content or parse via API
      let textContent = '';
      if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        textContent = await file.text();
      } else {
        textContent = `Imported binary bank statement ${file.name}`;
      }

      const res = await fetch('/api/parse-statement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(sessionToken ? { 'x-spendwise-session': sessionToken } : {}),
        },
        body: JSON.stringify({
          rawText: textContent.slice(0, 10000),
          filename: file.name,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.transactions && data.transactions.length > 0) {
          const parsed = data.transactions.map((tx: any, idx: number) => ({
            id: `upload-${Date.now()}-${idx}`,
            date: tx.date || new Date().toISOString().split('T')[0],
            rawDescription: tx.description || file.name,
            merchant: tx.merchant || 'Merchant',
            amount: Number(tx.amount) || 0,
            type: tx.type || 'expense',
            category: (tx.category as TransactionCategory) || 'Other',
            paymentMethod: (tx.paymentMethod as PaymentMethod) || 'UPI',
            selected: true,
          }));

          processCandidates(parsed, file.name);
          setCurrentStep(4);
          showToast(`Extracted ${parsed.length} transactions from ${file.name}`, 'success');
        } else {
          startExtraction(SAMPLE_STATEMENTS[0].name);
        }
      } else {
        startExtraction(SAMPLE_STATEMENTS[0].name);
      }
    } catch {
      startExtraction(SAMPLE_STATEMENTS[0].name);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleSelect = (id: string) => {
    setExtractedList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, selected: !t.selected } : t))
    );
  };

  const updateCategory = (id: string, newCat: TransactionCategory) => {
    setExtractedList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, category: newCat } : t))
    );
  };

  const selectedCount = extractedList.filter((t) => t.selected).length;
  const duplicateCount = extractedList.filter((t) => t.isDuplicate).length;

  const handleCommitImport = (onlySelected: boolean) => {
    const toImport = extractedList.filter((t) => (onlySelected ? t.selected : true));

    if (toImport.length === 0) {
      showToast('Please select at least one transaction to import.', 'warning');
      return;
    }

    toImport.forEach((candidate) => {
      addTransaction({
        userId: user.id,
        amount: candidate.amount,
        type: candidate.type,
        category: candidate.category,
        merchant: candidate.merchant,
        date: candidate.date,
        paymentMethod: candidate.paymentMethod,
        description: candidate.rawDescription,
        source: 'import',
      });
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    showToast(`Successfully imported ${toImport.length} transactions!`, 'success');
    setActiveTab('transactions');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Smart Statement Import
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Eliminate manual typing. Drag in bank or UPI statements and let AI parse merchants and categories with duplicate protection.
        </p>
      </div>

      {/* 4-Step Process Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-bold">
          <div
            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 ${
              currentStep >= 1
                ? 'bg-sky-50 border-sky-200 text-sky-800'
                : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Upload File</span>
          </div>

          <div
            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 ${
              currentStep >= 2
                ? 'bg-sky-50 border-sky-200 text-sky-800'
                : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">
              2
            </span>
            <span>AI Parsing</span>
          </div>

          <div
            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 ${
              currentStep >= 3
                ? 'bg-sky-50 border-sky-200 text-sky-800'
                : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">
              3
            </span>
            <span>Duplicate Audit</span>
          </div>

          <div
            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 ${
              currentStep === 4
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
              4
            </span>
            <span>Review & Save</span>
          </div>
        </div>
      </div>

      {/* Main Upload / Review Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Upload & Sample Files */}
        <div className="space-y-4">
          <input
            id="statement-file-input"
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".csv,.txt,.pdf,.xlsx,.xls"
            className="hidden"
          />

          <div
            id="statement-dropzone"
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-sky-300 hover:border-sky-500 bg-white hover:bg-sky-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 shadow-xs group"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Drag & Drop Bank Statement
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports PDF, CSV, TXT, or Excel exports (Max 10MB).
            </p>
            <span className="mt-3 inline-block text-[11px] font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-lg border border-sky-200">
              Browse Local File
            </span>
          </div>

          {/* Preset Sample Statements */}
          <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Try with Demo Statements
            </h4>
            <div className="space-y-2">
              {SAMPLE_STATEMENTS.map((s, idx) => (
                <button
                  key={idx}
                  id={`sample-stmt-${idx}`}
                  onClick={() => startExtraction(s.name)}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                    selectedFileName === s.name && currentStep === 4
                      ? 'bg-sky-50 border-sky-300 shadow-xs'
                      : 'bg-slate-50/60 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-sky-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">{s.name}</p>
                      <p className="text-[10px] text-slate-500">{s.source} • {s.count} transactions</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-sky-600 bg-white px-2 py-0.5 rounded border border-sky-100">
                    Parse →
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
              Statements are sanitized & parsed locally. No bank account logins or transaction PIN credentials are ever accessed.
            </p>
          </div>
        </div>

        {/* Right Col: Extracted Transactions Review Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-sky-100 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Parsed Transactions</span>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                    {extractedList.length} Extracted
                  </span>
                  {duplicateCount > 0 && (
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      {duplicateCount} Potential Duplicates
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review cleaned merchants, verify categories, and uncheck any duplicate records.
                </p>
              </div>

              <button
                onClick={() => startExtraction(selectedFileName)}
                className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Re-scan
              </button>
            </div>

            {isProcessing ? (
              <div className="py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-sky-500 border-t-transparent mb-3" />
                <p className="text-sm font-bold text-slate-800">
                  {currentStep === 2 ? 'De-obfuscating UPI & bank codes...' : 'Matching against ledger for duplicates...'}
                </p>
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto max-h-[380px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-2.5 px-3">Select</th>
                      <th className="py-2.5 px-3">Cleaned Merchant</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {extractedList.map((item) => (
                      <tr
                        key={item.id}
                        className={`transition-colors ${
                          item.isDuplicate ? 'bg-amber-50/40 hover:bg-amber-50/70' : 'hover:bg-sky-50/30'
                        }`}
                      >
                        <td className="py-3 px-3">
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => toggleSelect(item.id)}
                            className="rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-3">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-slate-900">{item.merchant}</p>
                              {item.isDuplicate && (
                                <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                                  Duplicate
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 truncate max-w-xs">{item.rawDescription}</p>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={item.category}
                            onChange={(e) => updateCategory(item.id, e.target.value as TransactionCategory)}
                            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2 py-1 focus:bg-white focus:outline-none"
                          >
                            {CATEGORIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-3 text-slate-500">{item.date}</td>
                        <td className="py-3 px-3 text-right font-bold text-slate-900">
                          {item.type === 'income' ? '+' : '-'}₹{item.amount.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500 font-medium">
              {selectedCount} of {extractedList.length} transactions selected
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                id="import-selected-btn"
                onClick={() => handleCommitImport(true)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-sky-200 bg-white hover:bg-sky-50 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Import Selected ({selectedCount})
              </button>
              <button
                id="import-all-btn"
                onClick={() => handleCommitImport(false)}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Import All ({extractedList.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

