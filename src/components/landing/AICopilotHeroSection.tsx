import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, User, ArrowRight, Sparkles, Send } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const AICopilotHeroSection: React.FC = () => {
  const { setCurrentView, setAuthMode } = useFinance();

  const suggestedQuestions = [
    "Where did most of my money go?",
    "Why did I spend more this month?",
    "How much did I spend on food?",
    "Compare this month with last month",
    "What's my biggest spending category?",
  ];

  const [activeQuestion, setActiveQuestion] = useState("Where did most of my money go?");
  const [activeResponse, setActiveResponse] = useState(
    "Based on your spending data, Bills & Utilities is your largest expense category this month (₹3,800), followed by Food & Dining (₹3,420)."
  );

  const handleSelectQuestion = (q: string) => {
    setActiveQuestion(q);
    if (q === "Where did most of my money go?") {
      setActiveResponse("Based on your spending data, Bills & Utilities is your largest expense category this month (₹3,800), followed by Food & Dining (₹3,420).");
    } else if (q === "Why did I spend more this month?") {
      setActiveResponse("Your discretionary shopping increased by 18% during the festival week, along with an annual car insurance renewal of ₹4,200.");
    } else if (q === "How much did I spend on food?") {
      setActiveResponse("You spent ₹3,420 across 38 food transactions (Swiggy, Zomato, and local grocery stores), which is well within your ₹5,000 budget.");
    } else if (q === "Compare this month with last month") {
      setActiveResponse("Total expenses decreased by 8.4% compared to last month, increasing your net savings rate to 35%.");
    } else {
      setActiveResponse("Your biggest expense is Rent & Utilities at 36% of monthly outlay, followed by Food at 32%.");
    }
  };

  const handleCTA = () => {
    setAuthMode('signup');
    setCurrentView('auth');
  };

  return (
    <section id="ai-copilot" className="py-20 bg-gradient-to-b from-sky-50/40 via-white to-sky-50/20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-sky-100 shadow-xs">
              AI Copilot
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Ask your money anything.
            </h2>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Have real conversational clarity over your finances. Get instant insights powered by your imported transaction data without complex spreadsheet math.
            </p>
            <p className="text-xs font-medium text-slate-500">
              * Interactive chat preview. The full AI Money Copilot workspace is accessible inside your SpendWise account.
            </p>
            <div>
              <button
                onClick={handleCTA}
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                Explore SpendWise
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Small Interactive Chat Preview */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-sky-100 rounded-3xl p-6 shadow-xl shadow-sky-950/5 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">SpendWise Copilot</h3>
                    <p className="text-[11px] text-emerald-600 font-semibold">● Ready to answer</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                  Interactive Preview
                </span>
              </div>

              {/* Chat Thread */}
              <div className="space-y-3.5 mb-5 min-h-[160px]">
                {/* User Message */}
                <div className="flex justify-end items-start gap-2">
                  <div className="bg-sky-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-semibold max-w-sm shadow-xs">
                    {activeQuestion}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* AI Message */}
                <div className="flex justify-start items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 text-slate-800 px-4 py-3 rounded-2xl rounded-tl-xs text-xs leading-relaxed max-w-md shadow-xs font-normal">
                    {activeResponse}
                  </div>
                </div>
              </div>

              {/* Suggested Questions */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Suggested Questions (Click to test):
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuestion(q)}
                      className={`text-[11px] px-3 py-1.5 rounded-lg border font-medium transition-all text-left ${
                        activeQuestion === q
                          ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
