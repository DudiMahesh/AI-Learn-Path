import React, { useState } from 'react';
import { Trophy, Award, TrendingUp, Building2, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export function calculateNEETRankAndPercentile(score) {
  const boundedScore = Math.max(0, Math.min(720, Math.round(Number(score) || 0)));

  let percentile = 0.0;
  let airMin = 0;
  let airMax = 0;
  let tierName = '';
  let collegeCategory = '';
  let badgeColor = '';

  if (boundedScore >= 680) {
    percentile = 99.85 + ((boundedScore - 680) / 40.0) * 0.14;
    airMin = Math.max(1, Math.round(1500 - ((boundedScore - 680) / 40.0) * 1499));
    airMax = Math.max(50, Math.round(2500 - ((boundedScore - 680) / 40.0) * 2400));
    tierName = 'AIIMS / MAMC / JIPMER Elite Tier';
    collegeCategory = 'Top Central Medical Institutes & Top 5 State GMCs';
    badgeColor = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
  } else if (boundedScore >= 620) {
    percentile = 98.40 + ((boundedScore - 620) / 60.0) * 1.45;
    airMin = Math.round(12000 - ((boundedScore - 620) / 60.0) * 9500);
    airMax = Math.round(16000 - ((boundedScore - 620) / 60.0) * 11000);
    tierName = 'Premier State Government Medical Colleges (GMC)';
    collegeCategory = 'Top State GMCs (KGMU Lucknow, Seth GS Mumbai, MMC Chennai)';
    badgeColor = 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30';
  } else if (boundedScore >= 540) {
    percentile = 92.50 + ((boundedScore - 540) / 80.0) * 5.90;
    airMin = Math.round(55000 - ((boundedScore - 540) / 80.0) * 39000);
    airMax = Math.round(68000 - ((boundedScore - 540) / 80.0) * 48000);
    tierName = 'State Government & Semi-Govt Medical Colleges';
    collegeCategory = 'District GMCs & State Quota MBBS Seats';
    badgeColor = 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
  } else if (boundedScore >= 450) {
    percentile = 84.00 + ((boundedScore - 450) / 90.0) * 8.50;
    airMin = Math.round(145000 - ((boundedScore - 450) / 90.0) * 77000);
    airMax = Math.round(175000 - ((boundedScore - 450) / 90.0) * 95000);
    tierName = 'Private / Deemed University MBBS & BDS';
    collegeCategory = 'Deemed Medical Universities, BDS, BAMS, BHMS';
    badgeColor = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
  } else {
    percentile = Math.max(5.0, (boundedScore / 450.0) * 84.0);
    airMin = Math.round(850000 - (boundedScore / 450.0) * 650000);
    airMax = Math.round(1000000 - (boundedScore / 450.0) * 780000);
    tierName = 'Foundational Preparation Zone';
    collegeCategory = 'Requires targeted NCERT concept revision to cross cutoff';
    badgeColor = 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
  }

  return {
    score: boundedScore,
    percentile: Math.min(99.99, Number(percentile.toFixed(2))),
    airMin: Math.max(1, airMin),
    airMax: Math.max(airMin + 50, airMax),
    tierName,
    collegeCategory,
    badgeColor,
    isQualified: boundedScore >= 164 // Standard UR qualifying cutoff approximation
  };
}

export default function NEETRankPredictorCard({ initialScore = 550, isInteractive = true }) {
  const [testScore, setTestScore] = useState(initialScore);
  const prediction = calculateNEETRankAndPercentile(testScore);

  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-700/70 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Trophy size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              NEET (UG) 2026 All India Rank & Cutoff Predictor
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                NTA Empirical Model
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Maps diagnostic & mock test marks out of 720 to predicted AIR, percentile, and college tier
            </p>
          </div>
        </div>

        <span className={`self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-full border ${prediction.badgeColor}`}>
          {prediction.tierName}
        </span>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Score */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 block uppercase tracking-wider">
            Exam Score
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{prediction.score}</span>
            <span className="text-xs text-slate-400 font-medium">/ 720</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1 block">
            {((prediction.score / 720) * 100).toFixed(1)}% marks
          </span>
        </div>

        {/* Predicted Percentile */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 block uppercase tracking-wider">
            Predicted Percentile
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {prediction.percentile}%ile
            </span>
          </div>
          <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 mt-1 block font-medium">
            NTA Rank Percentile
          </span>
        </div>

        {/* Estimated AIR */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 block uppercase tracking-wider">
            Estimated AIR
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl sm:text-2xl font-black text-teal-600 dark:text-teal-400">
              ~{prediction.airMin.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1 block">
            Range: {prediction.airMin.toLocaleString()} – {prediction.airMax.toLocaleString()}
          </span>
        </div>

        {/* Qualification Status */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 block uppercase tracking-wider">
            NEET Cutoff Status
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <CheckCircle2 size={18} className={prediction.isQualified ? "text-emerald-500" : "text-amber-500"} />
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {prediction.isQualified ? "Qualified" : "Below Cutoff"}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1 block">
            UR Cutoff: ~164 marks
          </span>
        </div>
      </div>

      {/* College Fit Callout */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 text-xs sm:text-sm">
        <Building2 size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900 dark:text-white">Target College Eligibility: </span>
          <span className="text-slate-700 dark:text-slate-300">{prediction.collegeCategory}</span>
        </div>
      </div>

      {/* Interactive Score Simulation Slider */}
      {isInteractive && (
        <div className="pt-2 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-600 dark:text-zinc-400 flex items-center gap-1.5">
              <Sparkles size={13} className="text-emerald-500" />
              Interactive Viva Simulation: Test different NEET scores
            </span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              Score: {testScore} / 720
            </span>
          </div>
          <input
            type="range"
            min="100"
            max="720"
            step="5"
            value={testScore}
            onChange={(e) => setTestScore(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>100 (Foundation)</span>
            <span>450 (Private/BDS)</span>
            <span>550 (Govt GMC)</span>
            <span>650+ (Top AIIMS/MMC)</span>
            <span>720 (AIR 1)</span>
          </div>
        </div>
      )}
    </div>
  );
}
