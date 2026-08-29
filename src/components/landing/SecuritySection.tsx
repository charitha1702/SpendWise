import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, KeyRound, CreditCard, Sliders, Database } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const privacyPoints = [
    {
      icon: <Database className="w-5 h-5 text-sky-600" />,
      title: 'Secure Data Handling',
      description: 'Your statements and records are processed securely and stored directly under your session control.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-sky-600" />,
      title: 'Privacy-First Design',
      description: 'Built from the ground up to respect data ownership without third-party tracking.',
    },
    {
      icon: <KeyRound className="w-5 h-5 text-sky-600" />,
      title: 'No Banking Passwords',
      description: 'We never ask for your net banking credentials, OTPs, or master bank logins.',
    },
    {
      icon: <Lock className="w-5 h-5 text-sky-600" />,
      title: 'No UPI PINs',
      description: 'SpendWise operates strictly via statements and never requests transaction PINs.',
    },
    {
      icon: <CreditCard className="w-5 h-5 text-sky-600" />,
      title: 'No Card CVVs',
      description: 'Zero debit or credit card security codes requested or stored at any point.',
    },
    {
      icon: <Sliders className="w-5 h-5 text-sky-600" />,
      title: 'User-Controlled Imports',
      description: 'You decide exactly what gets imported, edited, exported, or deleted at any time.',
    },
  ];

  return (
    <section id="security" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Privacy & Trust
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your money stays yours.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            SpendWise gives you actionable clarity without compromising your credentials.
          </p>
        </div>

        {/* 6 Privacy Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {privacyPoints.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="bg-sky-50/40 border border-sky-100 rounded-2xl p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-sky-100 flex items-center justify-center shrink-0 shadow-xs">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
