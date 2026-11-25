import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Code, Cpu, Cloud, Shield, Sparkles, ChevronRight, Check } from 'lucide-react';
import api from '../../services/api';

const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    career: '',
    studyTime: '4',
    learningPreference: 'mixed',
    language: 'english'
  });
  
  const navigate = useNavigate();

  const careers = [
    { id: 'NEET (UG) 2026 Aspirant', icon: Sparkles, desc: 'Comprehensive preparation for NEET (UG) 2026 covering complete Physics and Chemistry curricula.' },
    { id: 'MBBS Pre-Medical Track', icon: Check, desc: 'Targeting top government medical colleges with mastery in theory, derivations, and high-yield MCQs.' },
    { id: 'BDS & Allied Sciences Track', icon: Database, desc: 'Targeted study plan and practice sets designed for pre-medical science entrance excellence.' },
  ];

  const handleNext = () => setStep(prev => prev + 1);
  
  const handleFinish = async () => {
    // Save career + preferences to profile
    try {
      await api.put('/api/profile', {
        career: formData.career,
        daily_study_time: parseInt(formData.studyTime) || 4,
        learning_preference: formData.learningPreference,
        preferred_language: formData.language,
      })
    } catch {}
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e14] flex flex-col items-center pt-12 pb-24 px-4">
      {/* Progress Stepper */}
      <div className="w-full max-w-3xl mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-[#1e2530] -z-10"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-emerald-600 -z-10 transition-all duration-300" style={{ width: `${(step - 1) * 50}%` }}></div>
          
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors ${step >= i ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white dark:bg-[#151b23] border-slate-300 dark:border-[#1e2530] text-slate-400'}`}>
              {step > i ? <Check size={16} /> : i}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs font-medium text-slate-500 dark:text-zinc-400 px-1">
          <span>Target Career</span>
          <span>Study Profile</span>
          <span>Ready</span>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-white dark:bg-[#151b23] rounded-2xl shadow-xl border border-slate-100 dark:border-[#1e2530] overflow-hidden">
        
        {step === 1 && (
          <div className="p-8 md:p-12 animate-in fade-in zoom-in-95">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">What is your target career path?</h2>
            <p className="text-slate-500 dark:text-zinc-400 mb-8">Select your target technology role. We will tailor your personalized curriculum roadmap and skill assessments.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careers.map(c => {
                const Icon = c.icon;
                const isSelected = formData.career === c.id;
                return (
                  <div 
                    key={c.id}
                    onClick={() => setFormData({...formData, career: c.id})}
                    className={`cursor-pointer rounded-xl p-5 border-2 transition-all ${isSelected ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-[#1e2530] hover:border-emerald-600/50 hover:bg-slate-50 dark:hover:bg-[#1a212d]'}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-[#0d1117] text-slate-600 dark:text-slate-300'}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{c.id}</h3>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">{c.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleNext} disabled={!formData.career}
                className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-500 disabled:opacity-50 transition-colors"
              >
                Continue <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-8 md:p-12 animate-in slide-in-from-right">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Set your learning preferences</h2>
            <p className="text-slate-500 dark:text-zinc-400 mb-8">Help AI LearnPath adapt to your specific learning pace and study schedule.</p>
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-4">How much time can you dedicate daily?</label>
                <input 
                  type="range" min="1" max="8" value={formData.studyTime} 
                  onChange={(e) => setFormData({...formData, studyTime: e.target.value})}
                  className="w-full h-2 bg-slate-200 dark:bg-[#1e2530] rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="mt-2 text-center font-semibold text-emerald-600 dark:text-emerald-400">{formData.studyTime} {formData.studyTime === '1' ? 'Hour' : 'Hours'}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-4">Preferred Learning Style</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Visual', 'Reading', 'Practice', 'Mixed'].map(pref => (
                    <div 
                      key={pref} onClick={() => setFormData({...formData, learningPreference: pref.toLowerCase()})}
                      className={`cursor-pointer text-center py-3 rounded-lg border font-medium text-sm transition-colors ${formData.learningPreference === pref.toLowerCase() ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' : 'border-slate-200 dark:border-[#1e2530] hover:bg-slate-50 dark:hover:bg-[#1a212d] text-slate-600 dark:text-zinc-300'}`}
                    >
                      {pref}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-between">
              <button onClick={() => setStep(1)} className="px-6 py-3 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium">Back</button>
              <button onClick={handleNext} className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-500 transition-colors">
                Continue <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-8 md:p-12 text-center animate-in slide-in-from-right">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">You're all set!</h2>
            <p className="text-slate-500 dark:text-zinc-400 max-w-md mx-auto mb-8">
              Your profile has been created. Head over to your dashboard to start exploring your personalized learning path and technical modules.
            </p>

            <button 
              onClick={handleFinish}
              className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default OnboardingFlow;
