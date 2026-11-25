import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { Mail, Lock, User, Briefcase, Clock, Loader2, Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    careerGoal: 'NEET (UG) 2026 Aspirant', skillLevel: 'beginner', dailyStudyTime: '3'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const careers = [
    'NEET (UG) 2026 Aspirant',
    'MBBS Pre-Medical Track',
    'BDS & Allied Sciences Track',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { setError("Passwords do not match"); return; }
    if (formData.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    
    setIsLoading(true);
    setError('');

    try {
      const data = await authService.register({
        name: formData.name, email: formData.email, password: formData.password,
        career: formData.careerGoal, skill_level: formData.skillLevel,
        daily_study_time: parseInt(formData.dailyStudyTime) || 2,
      });
      login(data.token, data.user);
      navigate('/onboarding');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Email may already be in use.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputCls = "block w-full pl-9 pr-3 py-2.5 border border-gray-200 dark:border-[#1e2530] rounded-lg bg-gray-50 dark:bg-[#151b23] text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all";
  const selectCls = "block w-full px-3 py-2.5 border border-gray-200 dark:border-[#1e2530] rounded-lg bg-gray-50 dark:bg-[#151b23] text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all";

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Create your account</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm">Start your personalized learning journey</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/15 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-900/30">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-4 w-4 text-gray-400" /></div>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputCls} placeholder="John Doe" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-4 w-4 text-gray-400" /></div>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputCls} placeholder="you@example.com" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-4 w-4 text-gray-400" /></div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`${inputCls} pr-8`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Check password"}
                aria-label={showPassword ? "Hide password" : "Check password"}
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-4 w-4 text-gray-400" /></div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`${inputCls} pr-8`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                title={showConfirmPassword ? "Hide password" : "Check password"}
                aria-label={showConfirmPassword ? "Hide password" : "Check password"}
              >
                {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Career Path</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Briefcase className="h-4 w-4 text-gray-400" /></div>
            <select name="careerGoal" value={formData.careerGoal} onChange={handleChange} className={inputCls}>
              {careers.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Level</label>
            <select name="skillLevel" value={formData.skillLevel} onChange={handleChange} className={selectCls}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Daily Study</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Clock className="h-4 w-4 text-gray-400" /></div>
              <select name="dailyStudyTime" value={formData.dailyStudyTime} onChange={handleChange} className={inputCls}>
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3+ Hours</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" disabled={isLoading}
          className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 mt-2 disabled:opacity-50 transition-colors">
          {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Create Account'}
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline">Sign in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
