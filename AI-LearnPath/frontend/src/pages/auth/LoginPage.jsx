import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await authService.login(email, password);
      login(data.token, data.user);
      if (data.user?.is_admin || data.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      if (!err.response) {
        setError('Cannot reach backend server at http://localhost:5000. Please ensure the backend is running.');
      } else {
        setError(err.response?.data?.message || 'Invalid email or password.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm">
          Sign in to continue your NEET learning journey
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/15 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-900/30">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 dark:border-[#1e2530] rounded-lg bg-gray-50 dark:bg-[#151b23] text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all"
              placeholder="you@example.com" required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <a href="#" className="text-[12px] text-emerald-600 dark:text-emerald-400 hover:underline font-medium">Forgot password?</a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-9 pr-10 py-2.5 border border-gray-200 dark:border-[#1e2530] rounded-lg bg-gray-50 dark:bg-[#151b23] text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
              title={showPassword ? "Hide password" : "Check password"}
              aria-label={showPassword ? "Hide password" : "Check password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input id="remember-me" type="checkbox" className="h-3.5 w-3.5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500 dark:text-gray-400">Remember me</label>
        </div>

        <button type="submit" disabled={isLoading}
          className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 disabled:opacity-50 transition-colors cursor-pointer">
          {isLoading ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
