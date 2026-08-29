import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ReceiptText, Upload, Sparkles, Check, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const ReceiptScannerHeroSection: React.FC = () => {
  const { setCurrentView, setActiveTab, showToast, addTransaction, user } = useFinance();
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const receiptData = {
    merchant: 'Nature Basket Supermarket',
    date: 'Aug 29, 2026',
    category: 'Groceries',
    items: [
      { name: 'Organic Basmati Rice (1kg)', price: 120 },
      { name: 'Fresh Farm Milk (2L)', price: 60 },
      { name: 'Healthy Trail Mix Snacks', price: 180 },
      { name: 'Seasonal Exotic Fruits', price: 380 },
    ],
    total: 740,
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setHasScanned(false);
    setIsAdded(false);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 1200);
  };

  const handleAddTransaction = () => {
    addTransaction({
      userId: user.id,
      amount: receiptData.total,
      type: 'expense',
      category: 'Groceries',
      merchant: receiptData.merchant,
      date: '2026-08-29',
      paymentMethod: 'UPI',
      description: 'Supermarket physical receipt scan',
      source: 'receipt',
      receiptItems: receiptData.items,
    });
    setIsAdded(true);
    showToast('Receipt transaction added to your live dashboard!', 'success');
  };

  return (
    <section id="receipts" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Physical Receipt OCR
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Turn receipts into transactions.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Snap paper bills and let SpendWise OCR itemize prices, tax lines, and categories automatically.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Upload Drop Area */}
          <div
            onClick={handleSimulateScan}
            className="border-2 border-dashed border-sky-200 hover:border-sky-500 bg-sky-50/40 hover:bg-sky-50/70 rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 h-full flex flex-col justify-center items-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white shadow-xs border border-sky-100 flex items-center justify-center mb-4 text-sky-600 group-hover:scale-110 transition-transform">
              <Upload className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">
              Drag & drop receipt
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              PNG, JPG, or PDF supermarket & cafe invoices
            </p>
            <button
              type="button"
              className="px-4 py-2 bg-white hover:bg-sky-50 text-sky-700 text-xs font-bold rounded-xl border border-sky-200 shadow-xs transition-colors"
            >
              Upload Receipt
            </button>
          </div>

          {/* Extracted Receipt Card */}
          <div className="bg-white border border-sky-100 rounded-3xl shadow-xl p-6 sm:p-7 relative">
            {isScanning ? (
              <div className="py-16 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-sky-500 border-t-transparent mb-3" />
                <p className="text-sm font-semibold text-slate-700">Detecting items, merchant and totals...</p>
              </div>
            ) : hasScanned ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">
                      Extracted Merchant
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      {receiptData.merchant}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Date
                    </span>
                    <p className="text-xs font-semibold text-slate-700">
                      {receiptData.date}
                    </p>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-2 py-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Line Items
                  </span>
                  {receiptData.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-1 text-slate-700 border-b border-slate-50">
                      <span>{it.name}</span>
                      <span className="font-semibold text-slate-900">₹{it.price}</span>
                    </div>
                  ))}
                </div>

                {/* Total & Category */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 font-medium">Category: </span>
                    <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200">
                      {receiptData.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">Total: </span>
                    <span className="text-xl font-extrabold text-slate-900">
                      ₹{receiptData.total}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={handleAddTransaction}
                  disabled={isAdded}
                  className={`w-full mt-3 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                    isAdded
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-sky-600 hover:bg-sky-700 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Transaction Added ✓
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Add Transaction
                    </>
                  )}
                </button>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
