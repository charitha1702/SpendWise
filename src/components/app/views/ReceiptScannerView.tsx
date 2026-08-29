import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ReceiptText, Upload, Sparkles, Check, CheckCircle2, FileText, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useFinance } from '../../../context/FinanceContext';

export const ReceiptScannerView: React.FC = () => {
  const { addTransaction, user, showToast, setActiveTab } = useFinance();
  const [isScanning, setIsScanning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<'supermarket' | 'cafe' | 'pharmacy'>('supermarket');
  const [isSaved, setIsSaved] = useState(false);

  const presets = {
    supermarket: {
      merchant: 'Nature Basket Supermarket',
      date: '2026-08-28',
      category: 'Groceries' as const,
      paymentMethod: 'UPI' as const,
      items: [
        { name: 'Organic Basmati Rice (1kg)', price: 120 },
        { name: 'Fresh Farm Milk (2L)', price: 60 },
        { name: 'Healthy Trail Mix Snacks', price: 180 },
        { name: 'Seasonal Exotic Fruits', price: 380 },
      ],
      total: 740,
    },
    cafe: {
      merchant: 'Blue Tokai Coffee Roasters',
      date: '2026-08-27',
      category: 'Food & Dining' as const,
      paymentMethod: 'Credit Card' as const,
      items: [
        { name: 'Cold Brew Blend', price: 240 },
        { name: 'Almond Croissant', price: 190 },
        { name: 'Matcha Latte', price: 260 },
      ],
      total: 690,
    },
    pharmacy: {
      merchant: 'Apollo Pharmacy Retail',
      date: '2026-08-26',
      category: 'Health & Medical' as const,
      paymentMethod: 'UPI' as const,
      items: [
        { name: 'Vitamin C & Zinc Supp', price: 320 },
        { name: 'Hydrating Eye Drops', price: 180 },
      ],
      total: 500,
    },
  };

  const activeData = presets[selectedPreset];

  const handleScan = (presetKey: 'supermarket' | 'cafe' | 'pharmacy') => {
    setSelectedPreset(presetKey);
    setIsScanning(true);
    setIsSaved(false);
    setTimeout(() => {
      setIsScanning(false);
    }, 900);
  };

  const handleAddTransaction = () => {
    addTransaction({
      userId: user.id,
      amount: activeData.total,
      type: 'expense',
      category: activeData.category,
      merchant: activeData.merchant,
      date: activeData.date,
      paymentMethod: activeData.paymentMethod,
      description: `Physical receipt scan with ${activeData.items.length} itemized lines`,
      source: 'receipt',
      receiptItems: activeData.items,
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
    });

    setIsSaved(true);
    showToast(`Added ₹${activeData.total} receipt transaction to your records!`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Receipt Scanner OCR
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Scan paper receipts or drag cafe invoices to extract line items and add transactions in one click.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload & Sample Receipts selector */}
        <div className="space-y-4">
          <div
            onClick={() => handleScan('supermarket')}
            className="border-2 border-dashed border-sky-300 hover:border-sky-500 bg-white hover:bg-sky-50/40 rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 shadow-xs group"
          >
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Upload Physical Receipt
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports JPG, PNG, and PDF receipt photos.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Test Sample Receipts
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => handleScan('supermarket')}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  selectedPreset === 'supermarket'
                    ? 'bg-sky-50 border-sky-300 text-sky-900 font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span>🛒 Supermarket Grocery (₹740)</span>
                <span className="text-[10px] text-sky-600">Scan →</span>
              </button>
              <button
                onClick={() => handleScan('cafe')}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  selectedPreset === 'cafe'
                    ? 'bg-sky-50 border-sky-300 text-sky-900 font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span>☕ Blue Tokai Cafe (₹690)</span>
                <span className="text-[10px] text-sky-600">Scan →</span>
              </button>
              <button
                onClick={() => handleScan('pharmacy')}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  selectedPreset === 'pharmacy'
                    ? 'bg-sky-50 border-sky-300 text-sky-900 font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span>💊 Apollo Pharmacy (₹500)</span>
                <span className="text-[10px] text-sky-600">Scan →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 2 cols: Extracted Result Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                  Extracted Receipt Details
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {activeData.merchant}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">
                  Receipt Date
                </span>
                <p className="text-xs font-bold text-slate-700">{activeData.date}</p>
              </div>
            </div>

            {isScanning ? (
              <div className="py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-sky-500 border-t-transparent mb-3" />
                <p className="text-sm font-bold text-slate-800">Reading receipt line items & totals...</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mt-5"
              >
                {/* Itemized Table */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Itemized Breakdown
                  </h4>
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100">
                    {activeData.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-200/50 last:border-0">
                        <span className="text-slate-800 font-medium">{item.name}</span>
                        <span className="font-bold text-slate-900">₹{item.price.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metadata row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Category</span>
                    <p className="text-xs font-bold text-sky-900 mt-0.5">{activeData.category}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Payment</span>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">{activeData.paymentMethod}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-right col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Total Amount</span>
                    <p className="text-base font-black text-slate-900 mt-0.5">₹{activeData.total.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={handleAddTransaction}
              disabled={isSaved || isScanning}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Transaction Added to Records ✓
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Add to Transactions (₹{activeData.total})
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
