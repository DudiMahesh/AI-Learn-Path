import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { Mail, Lock, Loader2, ShieldCheck, AlertTriangle, KeyRound, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await authService.login(email, password);

      // Verify that authenticated user has administrator or super administrator privileges
      const isUserAdmin =
        data.user?.role === 'admin' ||
        data.user?.role === 'super_admin' ||
        data.user?.is_admin === true ||
        data.user?.is_super_admin === true;

      if (!isUserAdmin) {
        logout();
        setError('Access Denied: This account does not possess administrator permissions.');
        setIsLoading(false);
        return;
      }

      login(data.token, data.user);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Authentication failed. Please verify your administrator credentials.'
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle ambient security background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-950/40 mb-1">
            <ShieldCheck size={36} />
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              Restricted Area
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Administration Console
          </h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Authorized personnel only. Access to platform oversight, AI knowledge base indexing, and candidate metrics.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-5 p-3.5 bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-start gap-2.5">
              <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Administrator Email
                </label>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  👑 Clearance
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your admin email"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your security password"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Check password"}
                  aria-label={showPassword ? "Hide password" : "Check password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-950/40 disabled:opacity-50 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span>Verifying Administrator Token...</span>
                </>
              ) : (
                <>
                  <KeyRound size={16} />
                  <span>Authenticate to Console</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Student Portal Switcher Link */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-500">
              Are you a NEET student candidate?{' '}
              <Link to="/login" className="text-emerald-400 font-bold hover:underline">
                Return to Student Login
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-600 font-medium">
          AI-LearnPath Security System • Protected by JWT RBAC & TLS Encryption
        </p>
      </div>
    </div>
  );
}

