import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Lock, Mail, User, CheckCircle2, Shield, Eye, EyeOff } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const AuthPage: React.FC = () => {
  const { authMode, setAuthMode, setCurrentView, login, signup, showToast, user } = useFinance();

  const [fullName, setFullName] = useState(authMode === 'login' ? 'Charitha Padamati' : '');
  const [email, setEmail] = useState(authMode === 'login' ? 'charitha.padamati@gmail.com' : '');
  const [password, setPassword] = useState('demo12345');
  const [confirmPassword, setConfirmPassword] = useState('demo12345');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Compute password strength
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['Too weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const strengthColors = ['bg-rose-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-500', 'bg-teal-500'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (authMode === 'signup') {
      if (!fullName.trim()) {
        setError('Full Name is required.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long for security.');
        return;
      }
    }

    setIsLoading(true);
    try {
      if (authMode === 'signup') {
        await signup(fullName.trim(), cleanEmail, password);
        showToast('Account created successfully! Welcome to SpendWise.', 'success');
      } else {
        await login(cleanEmail, password, fullName.trim());
        showToast(`Welcome back, ${fullName || user.name}!`, 'success');
      }
      setCurrentView('app');
    } catch {
      setError('Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    await login('charitha.padamati@gmail.com', 'demo12345', 'Charitha Padamati');
    setIsLoading(false);
    showToast('Authenticated as Charitha Padamati (₹24,500 active balance)', 'success');
    setCurrentView('app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/80 via-white to-sky-50/60 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Top back to landing button */}
      <div className="absolute top-6 left-6">
        <button
          id="auth-back-to-landing"
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-sky-600 bg-white/90 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-sky-100 shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to SpendWise
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        {/* Brand Wordmark */}
        <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase block mb-3">
          SPEND<span className="text-sky-600">WISE</span>
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {authMode === 'signup' ? 'Create your secure account' : 'Welcome back 👋'}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-normal">
          {authMode === 'signup'
            ? 'Private, zero-credential financial clarity & AI tracking.'
            : 'Enter your credentials to access your isolated financial vault.'}
        </p>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-sky-950/5 rounded-3xl border border-sky-100"
        >
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Charitha Padamati"
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="charitha.padamati@gmail.com"
                  className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => showToast('Password reset link sent to your email.', 'info')}
                    className="text-[11px] font-semibold text-sky-600 hover:text-sky-700"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator for Signup */}
              {authMode === 'signup' && password.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span>Password Strength:</span>
                    <span className="font-semibold text-slate-700">{strengthLabels[strength]}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    {[0, 1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-full transition-colors ${
                          strength > step ? strengthColors[strength] : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                id="auth-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-[0.99] text-white text-sm font-bold shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : authMode === 'signup' ? (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Log In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Access */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <button
              id="demo-login-btn"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              1-Click Verified Demo Login (Charitha)
            </button>
          </div>

          {/* Toggle between Login and Signup */}
          <div className="mt-5 text-center">
            {authMode === 'signup' ? (
              <p className="text-xs text-slate-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setError(null); setAuthMode('login'); }}
                  className="font-bold text-sky-600 hover:text-sky-700 underline"
                >
                  Log In
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setError(null); setAuthMode('signup'); }}
                  className="font-bold text-sky-600 hover:text-sky-700 underline"
                >
                  Create account
                </button>
              </p>
            )}
          </div>
        </motion.div>

        {/* Security Trust Note */}
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-xs text-slate-500">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>Zero credential scraping. Bank login / UPI PIN never requested.</span>
        </div>
      </div>
    </div>
  );
};

