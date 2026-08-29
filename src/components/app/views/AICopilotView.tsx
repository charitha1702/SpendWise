import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, Send, Sparkles, User, HelpCircle, Shield, RefreshCw } from 'lucide-react';
import { useFinance } from '../../../context/FinanceContext';
import { CopilotMessage } from '../../../types';

export const AICopilotView: React.FC = () => {
  const { copilotMessages, askCopilot, isCopilotLoading } = useFinance();
  const [inputVal, setInputVal] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    "Where did most of my money go?",
    "Why did I spend more this month?",
    "How much did I spend on food?",
    "Compare this month with last month",
    "What's my biggest spending category?",
    "How can I improve my savings rate?",
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [copilotMessages, isCopilotLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isCopilotLoading) return;
    setInputVal('');
    await askCopilot(text);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          AI Money Copilot
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Ask questions in natural language. Copilot analyzes your real categorized statement records.
        </p>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-xl shadow-sky-950/5 flex flex-col h-[600px] overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold">SpendWise Intelligence</h3>
              <p className="text-[11px] text-sky-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Context: Active Ledger Data
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-xs text-sky-100 bg-white/10 px-3 py-1 rounded-full">
            <Shield className="w-3.5 h-3.5" />
            <span>Private & Objective</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {(copilotMessages || []).map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-slate-800 border border-sky-100 rounded-tl-xs shadow-xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <span
                  className={`block text-[10px] mt-2 ${
                    msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 mt-1 text-xs font-bold shadow-xs">
                  U
                </div>
              )}
            </motion.div>
          ))}

          {isCopilotLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3.5 rounded-2xl border border-sky-100 max-w-xs shadow-xs">
              <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
              <span>Analyzing your financial data...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Suggested prompts carousel & input */}
        <div className="p-4 bg-white border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Suggestions:
            </span>
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-800 border border-slate-200 hover:border-sky-300 rounded-full px-3 py-1 whitespace-nowrap transition-all shrink-0 font-medium"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about your spending, categories, or savings..."
              className="flex-1 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={isCopilotLoading || !inputVal.trim()}
              className="p-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-center text-slate-400">
            SpendWise provides objective data observations to empower your decisions, not rigid financial mandates.
          </p>
        </div>
      </div>
    </div>
  );
};
