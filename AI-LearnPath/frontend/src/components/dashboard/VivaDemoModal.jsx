import React from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Award, Zap, Brain } from 'lucide-react';
import { VIVA_DEMO_PROFILES } from '../../data/vivaDemoProfiles';

export default function VivaDemoModal({ isOpen, onClose, onSelectProfile, currentProfileId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20">
              <Brain size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                MCA Viva Demonstration Mode
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                  Live Simulation
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Switch between simulated student personas to demonstrate ML classification and adaptive DAG path updates.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Persona Cards */}
        <div className="space-y-4">
          {/* Profile A: Foundations Learner */}
          <div
            onClick={() => {
              onSelectProfile(VIVA_DEMO_PROFILES.foundations);
              onClose();
            }}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              currentProfileId === 'demo_foundations'
                ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 shadow-md shadow-amber-500/5'
                : 'border-slate-200 dark:border-slate-800 hover:border-amber-400/60 hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Persona 1: Low-Score Remediation
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/30">
                    Score: 285 / 720
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  Aarav Sharma — Foundations Learner (Cluster 0)
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                Tier: Foundations
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Demonstrates student with high deficits in Physics Rotational Motion & Organic Chemistry. The system <strong>locks advanced modules</strong> and automatically <strong>injects foundational remedial lessons</strong>.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
              <div><span className="text-slate-400">Physics:</span> <strong className="text-amber-600">55/180</strong></div>
              <div><span className="text-slate-400">Chemistry:</span> <strong className="text-amber-600">60/180</strong></div>
              <div><span className="text-slate-400">Biology:</span> <strong className="text-amber-600">170/360</strong></div>
            </div>
          </div>

          {/* Profile B: Advanced Specialist */}
          <div
            onClick={() => {
              onSelectProfile(VIVA_DEMO_PROFILES.advanced);
              onClose();
            }}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              currentProfileId === 'demo_advanced'
                ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-md shadow-emerald-500/5'
                : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400/60 hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Persona 2: High-Scorer Fast-Track
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                    Score: 655 / 720
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  Priya Patel — Advanced Specialist (Cluster 2)
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Tier: Advanced
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Demonstrates student with 91% accuracy across all 3 subjects. The system <strong>fast-tracks syllabus units</strong>, unlocks Grand Mock Tests, and predicts top-tier Government Medical College (GMC) eligibility.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
              <div><span className="text-slate-400">Physics:</span> <strong className="text-emerald-600">165/180</strong></div>
              <div><span className="text-slate-400">Chemistry:</span> <strong className="text-emerald-600">160/180</strong></div>
              <div><span className="text-slate-400">Biology:</span> <strong className="text-emerald-600">330/360</strong></div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              onSelectProfile(null);
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset to Live Account State</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

