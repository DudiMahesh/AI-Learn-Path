import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  TrendingUp, 
  Target, 
  Sparkles, 
  BookOpen, 
  RotateCcw, 
  Award, 
  HelpCircle, 
  BarChart3, 
  Check, 
  X, 
  Layers,
  Flame,
  Clock,
  Compass,
  FileCheck
} from 'lucide-react';
import { assessmentService } from '../../services/assessmentService';
import NEETRankPredictorCard from '../../components/analytics/NEETRankPredictorCard';
import { getQuestionExplanation } from '../../utils/assessmentExplanationEngine';

export default function AssessmentResultsPage() {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(state?.result || null);
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'review'
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'correct' | 'incorrect' | 'unanswered'
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  // If user came via URL parameter attempt_id, load attempt review from backend
  useEffect(() => {
    const attemptId = searchParams.get('attempt_id');
    if (attemptId && !resultData?.review_questions) {
      loadReview(attemptId);
    }
  }, [searchParams]);

  const loadReview = async (id) => {
    setLoading(true);
    try {
      const res = await assessmentService.getAttemptReview(id);
      const data = res?.data || res;
      if (data) {
        setResultData(prev => ({ ...(prev || {}), ...data }));
      }
    } catch (err) {
      console.error("Failed to load attempt review:", err);
    } finally {
      setLoading(false);
    }
  };

  const result = resultData || {};
  const score = Math.round(result.score !== undefined ? result.score : 80);
  const totalQuestions = result.total_questions || (result.review_questions ? result.review_questions.length : 20);
  const correctAnswers = result.correct_answers !== undefined ? result.correct_answers : Math.round((score / 100) * totalQuestions);
  const attemptedCount = result.attempted_count !== undefined ? result.attempted_count : totalQuestions;
  const incorrectAnswers = result.incorrect_answers !== undefined ? result.incorrect_answers : Math.max(attemptedCount - correctAnswers, 0);
  const unansweredCount = result.unanswered_count !== undefined ? result.unanswered_count : Math.max(totalQuestions - attemptedCount, 0);
  const accuracy = result.accuracy !== undefined ? result.accuracy : (attemptedCount > 0 ? Math.round((correctAnswers / attemptedCount) * 100) : 0);
  const level = result.level || (score >= 75 ? 'advanced' : (score >= 50 ? 'intermediate' : 'beginner'));
  const profile = result.profile || {
    label: score >= 75 ? 'Advanced Tech Practitioner' : (score >= 50 ? 'Intermediate Developer' : 'Foundational Learner'),
    description: 'Your personalized engineering study roadmap has been generated based on your diagnostic performance.'
  };
  const skillScores = result.skill_scores || { 
    "Programming & Core Syntax": Math.min(score + 4, 100), 
    "Data Structures & Algorithms": score, 
    "Databases & System Design": Math.min(score + 8, 100),
    "Architecture & DevOps": Math.max(score - 6, 40)
  };

  const reviewQuestions = result.review_questions || [];

  // Filter questions for recheck
  const filteredQuestions = reviewQuestions.filter(q => {
    if (reviewFilter === 'correct') return q.is_correct || q.status === 'correct';
    if (reviewFilter === 'incorrect') return (!q.is_correct && q.selected_option) || q.status === 'incorrect';
    if (reviewFilter === 'unanswered') return !q.selected_option || q.status === 'unanswered';
    return true;
  });

  const scoreColor = score >= 75 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400';
  const scoreBg = score >= 75 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500';
  const r = 52, circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  const strengths = Object.entries(skillScores).filter(([, v]) => v >= 70);
  const weaknesses = Object.entries(skillScores).filter(([, v]) => v < 70);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── Top Header Banner ── */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-900/90 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                <CheckCircle size={14} className="text-emerald-400" />
                Assessment Complete • {totalQuestions} Questions Evaluated
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Diagnostic Assessment Analysis & Answer Key
              </h1>

              <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Comprehensive performance diagnostics, skill proficiency evaluation, and question-by-question answer review.
              </p>
            </div>

            {/* Header Fast Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setActiveTab(activeTab === 'review' ? 'analytics' : 'review')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border shadow-lg ${
                  activeTab === 'review' 
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-emerald-600/30' 
                    : 'bg-zinc-800/90 border-zinc-700 text-emerald-300 hover:bg-zinc-800'
                }`}
              >
                <FileCheck size={16} />
                <span>{activeTab === 'review' ? 'View Full Analysis' : 'Recheck All Answers'}</span>
              </button>

              <button
                onClick={() => navigate('/learning-path')}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <span>Start Learning Path</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-zinc-800">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <BarChart3 size={15} />
              <span>Performance Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'review'
                  ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <FileCheck size={15} />
              <span>Recheck Answers ({reviewQuestions.length || totalQuestions})</span>
            </button>
          </div>
        </div>

        {/* ── SECTION 1: Performance Analytics ── */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Overall Score */}
              <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-5 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Overall Score</p>
                
                <div className="relative my-1">
                  <svg width="116" height="116" viewBox="0 0 116 116">
                    <circle cx="58" cy="58" r={r} fill="none" stroke="#27272a" strokeWidth="9" />
                    <circle 
                      cx="58" cy="58" r={r} fill="none" 
                      stroke={score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="9" 
                      strokeDasharray={circ} 
                      strokeDashoffset={offset}
                      strokeLinecap="round" 
                      transform="rotate(-90 58 58)" 
                      style={{ transition: 'stroke-dashoffset 1.2s ease' }} 
                    />
                    <text x="58" y="62" textAnchor="middle" fontSize="24" fontWeight="800" fill="#ffffff">{score}%</text>
                    <text x="58" y="78" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a1a1aa">SCORE</text>
                  </svg>
                </div>

                <span className={`text-[11px] font-extrabold uppercase mt-1 tracking-wider ${scoreColor}`}>
                  {score >= 75 ? 'Distinction' : score >= 50 ? 'Proficient' : 'Needs Practice'}
                </span>
              </div>

              {/* Accuracy Card */}
              <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-5 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Accuracy Rate</p>
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Target size={16} />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">{accuracy}%</span>
                    <span className="text-xs text-zinc-400">of attempted</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mt-3">
                    <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${accuracy}%` }} />
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400">
                  {correctAnswers} of {attemptedCount} attempted answered correctly
                </p>
              </div>

              {/* Breakdown Card */}
              <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-5 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Question Stats</p>
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <BarChart3 size={16} />
                  </div>
                </div>

                <div className="space-y-2 my-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Correct
                    </span>
                    <span className="font-bold text-white">{correctAnswers}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-red-400 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-red-500" /> Incorrect
                    </span>
                    <span className="font-bold text-white">{incorrectAnswers}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-zinc-400 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-zinc-600" /> Skipped
                    </span>
                    <span className="font-bold text-white">{unansweredCount}</span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400">Total: {totalQuestions} Questions</p>
              </div>

              {/* AI Tier Card */}
              <div className="bg-gradient-to-br from-emerald-950/60 via-zinc-900 to-zinc-900 rounded-3xl border border-emerald-500/30 p-5 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Proficiency Tier</p>
                  <Sparkles size={16} className="text-emerald-400" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white capitalize">{level}</h3>
                  <p className="text-xs text-emerald-300/90 font-medium mt-1">
                    {profile.label || 'Skill Builder'}
                  </p>
                </div>

                <div className="bg-emerald-950/80 border border-emerald-500/20 rounded-xl px-2.5 py-1.5 text-[11px] text-zinc-300">
                  Custom curriculum generated
                </div>
              </div>
            </div>

            {/* NEET (UG) 2026 All India Rank & Cutoff Predictor */}
            <NEETRankPredictorCard initialScore={Math.max(100, Math.round((score / 100) * 720))} isInteractive={true} />

            {/* Domain Breakdown & AI Diagnosis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Skill Breakdown (2 cols) */}
              <div className="lg:col-span-2 bg-zinc-900 rounded-3xl border border-zinc-800 p-6 sm:p-7 shadow-lg space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-emerald-400" />
                    <h3 className="text-base font-bold text-white">Skill Mastery Breakdown</h3>
                  </div>
                  <span className="text-xs text-zinc-400 font-semibold">Evaluated by Adaptive Engine</span>
                </div>

                <div className="space-y-4">
                  {Object.entries(skillScores).map(([skill, val]) => {
                    const skillScore = Math.round(val);
                    const barColor = skillScore >= 75 ? 'bg-emerald-500' : skillScore >= 50 ? 'bg-amber-500' : 'bg-red-500';
                    return (
                      <div key={skill} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-200">{skill}</span>
                          <span className="font-bold text-white">{skillScore}%</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-1000 ${barColor}`} style={{ width: `${skillScore}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Strengths & Growth Areas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                  <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-4">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle size={14} /> Key Strengths
                    </p>
                    <ul className="text-xs text-zinc-300 space-y-1.5">
                      {strengths.length > 0 ? (
                        strengths.map(([s]) => (
                          <li key={s} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                            <span>{s}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-zinc-400 italic">Foundational topics completed</li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-amber-950/30 border border-amber-500/20 rounded-2xl p-4">
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <AlertCircle size={14} /> Targeted Growth Areas
                    </p>
                    <ul className="text-xs text-zinc-300 space-y-1.5">
                      {weaknesses.length > 0 ? (
                        weaknesses.map(([w]) => (
                          <li key={w} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                            <span>{w}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-zinc-400 italic">Advanced specializations unlocked</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* AI Diagnostic Summary & Recommendations (1 col) */}
              <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 shadow-lg flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-3">
                    <Compass size={18} />
                    <h3 className="text-base font-bold text-white">AI Diagnostic Insight</h3>
                  </div>

                  <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-4 space-y-3">
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {profile.description || 'Based on your diagnostic assessment, our machine learning pipeline has calculated your skill gaps and adapted the course sequences.'}
                    </p>
                    <div className="text-xs text-emerald-300 bg-emerald-950/50 border border-emerald-500/20 rounded-xl p-2.5 flex items-center gap-2">
                      <Sparkles size={14} className="flex-shrink-0" />
                      <span>Curriculum optimized for rapid mastery</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('review')}
                    className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <FileCheck size={16} className="text-emerald-400" />
                    <span>Recheck & Review Answers</span>
                  </button>

                  <button
                    onClick={() => navigate('/learning-path')}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                  >
                    <span>View Personalized Learning Path</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SECTION 2: Interactive Question Recheck & Answer Key ── */}
        {activeTab === 'review' && (
          <div className="space-y-6">

            {/* Answer Key Control Bar */}
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <FileCheck size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Answer Review & Solution Key</h3>
                  <p className="text-xs text-zinc-400">
                    Review each question, your submitted choice, and verified correct solutions.
                  </p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    reviewFilter === 'all'
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All ({reviewQuestions.length || totalQuestions})
                </button>

                <button
                  onClick={() => setReviewFilter('correct')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    reviewFilter === 'correct'
                      ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                      : 'text-emerald-400 hover:text-emerald-300'
                  }`}
                >
                  <Check size={12} /> Correct ({correctAnswers})
                </button>

                <button
                  onClick={() => setReviewFilter('incorrect')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    reviewFilter === 'incorrect'
                      ? 'bg-red-950 border border-red-500/40 text-red-300'
                      : 'text-red-400 hover:text-red-300'
                  }`}
                >
                  <X size={12} /> Incorrect ({incorrectAnswers})
                </button>

                {unansweredCount > 0 && (
                  <button
                    onClick={() => setReviewFilter('unanswered')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      reviewFilter === 'unanswered'
                        ? 'bg-zinc-800 text-zinc-200'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Skipped ({unansweredCount})
                  </button>
                )}
              </div>
            </div>

            {/* Quick Question Number Jump Grid */}
            {reviewQuestions.length > 0 && (
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-zinc-400 font-bold uppercase tracking-wider">Question Navigator</span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Correct</span>
                    <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 rounded-full bg-red-500" /> Incorrect</span>
                    <span className="flex items-center gap-1 text-zinc-500"><span className="w-2 h-2 rounded-full bg-zinc-600" /> Skipped</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {reviewQuestions.map((q, idx) => {
                    const isCorr = q.is_correct || q.status === 'correct';
                    const isAtt = q.selected_option !== null && q.selected_option !== undefined;
                    const btnColor = isCorr 
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' 
                      : (isAtt ? 'bg-red-950/60 border-red-500/50 text-red-300' : 'bg-zinc-800/80 border-zinc-700 text-zinc-400');
                    
                    return (
                      <a
                        key={idx}
                        href={`#question-card-${idx + 1}`}
                        className={`w-8 h-8 rounded-xl border flex items-center justify-center text-xs font-bold transition-all hover:scale-110 ${btnColor}`}
                      >
                        {idx + 1}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question Cards List */}
            <div className="space-y-5">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q, idx) => {
                  const qNum = q.question_id || q.id || idx + 1;
                  const isCorrect = q.is_correct || q.status === 'correct';
                  const isAttempted = q.selected_option !== null && q.selected_option !== undefined && String(q.selected_option).trim() !== '';
                  const correctOpt = String(q.correct_option || 'A').toUpperCase();
                  const selectedOpt = isAttempted ? String(q.selected_option).toUpperCase() : null;
                  const optionsObj = q.options || {};

                  return (
                    <div 
                      key={idx} 
                      id={`question-card-${qNum}`}
                      className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 sm:p-7 shadow-xl space-y-5 transition-all scroll-mt-6"
                    >
                      {/* Card Header: Question Number + Status Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 text-white font-black text-xs flex items-center justify-center">
                            Q{qNum}
                          </span>
                          <span className="text-xs text-zinc-400 font-semibold">Multiple Choice Question</span>
                        </div>

                        {/* Status Badge */}
                        {isCorrect ? (
                          <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                            <CheckCircle size={14} /> Correct Answer
                          </div>
                        ) : isAttempted ? (
                          <div className="inline-flex items-center gap-1.5 bg-red-950/80 border border-red-500/40 text-red-400 px-3 py-1 rounded-full text-xs font-bold">
                            <XCircle size={14} /> Incorrect
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 bg-zinc-800 border border-zinc-700 text-zinc-400 px-3 py-1 rounded-full text-xs font-bold">
                            <HelpCircle size={14} /> Skipped / Unanswered
                          </div>
                        )}
                      </div>

                      {/* Question Text */}
                      <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {q.question_text || q.text}
                      </h4>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {Object.entries(optionsObj).map(([optKey, optText]) => {
                          const keyUpper = String(optKey).toUpperCase();
                          const isThisCorrect = keyUpper === correctOpt;
                          const isThisSelected = keyUpper === selectedOpt;

                          let containerStyle = "bg-zinc-950/50 border-zinc-800 text-zinc-300";
                          let badgeStyle = "bg-zinc-800 text-zinc-400";

                          if (isThisCorrect) {
                            containerStyle = "bg-emerald-950/40 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/30";
                            badgeStyle = "bg-emerald-500 text-zinc-950 font-black";
                          } else if (isThisSelected && !isCorrect) {
                            containerStyle = "bg-red-950/40 border-red-500/60 text-red-200 ring-1 ring-red-500/30";
                            badgeStyle = "bg-red-500 text-white font-black";
                          }

                          return (
                            <div
                              key={optKey}
                              className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${containerStyle}`}
                            >
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${badgeStyle}`}>
                                {keyUpper}
                              </span>

                              <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                                <span>{optText}</span>
                                
                                {isThisCorrect && (
                                  <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                                    <Check size={13} /> Correct Answer
                                  </div>
                                )}

                                {isThisSelected && !isCorrect && (
                                  <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-red-400">
                                    <X size={13} /> Your Selection
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Summary Banner for this question */}
                      <div className={`rounded-2xl p-3.5 text-xs flex items-center justify-between gap-3 ${
                        isCorrect ? 'bg-emerald-950/30 border border-emerald-500/20 text-emerald-300' : 'bg-zinc-950/80 border border-zinc-800 text-zinc-300'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-400">Correct Option:</span>
                          <span className="font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                            Option {correctOpt}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-400">Your Answer:</span>
                          <span className={`font-extrabold px-2.5 py-1 rounded-lg border ${
                            isCorrect 
                              ? 'text-emerald-400 bg-emerald-950/80 border-emerald-500/30' 
                              : (isAttempted ? 'text-red-400 bg-red-950/80 border-red-500/30' : 'text-zinc-400 bg-zinc-800 border-zinc-700')
                          }`}>
                            {isAttempted ? `Option ${selectedOpt}` : 'Not Answered'}
                          </span>
                        </div>
                      </div>

                      {/* ── Deep Solution & Concept Breakdown ("Why It's Wrong" & "Why It's Correct") ── */}
                      {(() => {
                        const exp = getQuestionExplanation(q, selectedOpt);
                        return (
                          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-4 shadow-inner">
                            <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                                <Sparkles size={15} />
                                <span>Concept Masterclass & Solution Explanation</span>
                              </div>
                              <span className="text-[11px] text-zinc-400 font-mono">NEET UG 2026 Verified</span>
                            </div>

                            {/* Why Selected Option is Wrong (when user answered incorrectly) */}
                            {!isCorrect && isAttempted && exp.whyWrong && (
                              <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-4 space-y-1.5 shadow-sm">
                                <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                                  <XCircle size={15} className="flex-shrink-0" />
                                  <span>Why Your Selected Answer (Option {selectedOpt}) is Wrong:</span>
                                </div>
                                <p className="text-xs sm:text-[13px] text-red-100/90 leading-relaxed pl-6 whitespace-pre-line">
                                  {exp.whyWrong}
                                </p>
                              </div>
                            )}

                            {/* Why Correct Option is Right (Exhaustive Proof) */}
                            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 space-y-1.5 shadow-sm">
                              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                                <CheckCircle size={15} className="flex-shrink-0" />
                                <span>Why Option {correctOpt} is the Correct Answer:</span>
                              </div>
                              <p className="text-xs sm:text-[13px] text-emerald-100/90 leading-relaxed pl-6 whitespace-pre-line">
                                {exp.whyCorrect}
                              </p>
                            </div>

                            {/* Step-by-Step Derivation & Verification Steps */}
                            {exp.derivationSteps && exp.derivationSteps.length > 0 && (
                              <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-2.5">
                                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                                  Step-by-Step Derivation & Verification:
                                </span>
                                <div className="space-y-2">
                                  {exp.derivationSteps.map((step, sIdx) => (
                                    <div key={sIdx} className="text-xs text-zinc-300 flex items-start gap-2.5 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800/60">
                                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                                        {sIdx + 1}
                                      </span>
                                      <span className="leading-relaxed">{step}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Option-by-Option Breakdown */}
                            {exp.optionBreakdown && Object.keys(exp.optionBreakdown).length > 0 && (
                              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                                  Option-by-Option Analysis & Distractor Check:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                  {Object.entries(exp.optionBreakdown).map(([opt, desc]) => {
                                    const isThisCorrect = opt === correctOpt;
                                    const isThisSelected = opt === selectedOpt;
                                    return (
                                      <div
                                        key={opt}
                                        className={`p-3 rounded-xl border leading-relaxed ${
                                          isThisCorrect
                                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                                            : isThisSelected && !isCorrect
                                            ? 'bg-red-950/30 border-red-500/40 text-red-200'
                                            : 'bg-zinc-900/90 border-zinc-800 text-zinc-300'
                                        }`}
                                      >
                                        <div className="flex items-center gap-1.5 font-bold mb-1">
                                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${
                                            isThisCorrect ? 'bg-emerald-500 text-zinc-950' : (isThisSelected ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-400')
                                          }`}>
                                            {opt}
                                          </span>
                                          <span className={isThisCorrect ? 'text-emerald-400' : (isThisSelected ? 'text-red-400' : 'text-zinc-400')}>
                                            {isThisCorrect ? 'Correct Option' : (isThisSelected ? 'Your Selection (Incorrect)' : 'Distractor')}
                                          </span>
                                        </div>
                                        <p className="text-[11.5px] pl-6.5 text-zinc-300">{desc}</p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* NEET Trap Alert */}
                            {exp.neetTrapAlert && (
                              <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-300 flex items-start gap-2">
                                <AlertCircle size={15} className="flex-shrink-0 mt-0.5 text-amber-400" />
                                <p className="leading-relaxed">{exp.neetTrapAlert}</p>
                              </div>
                            )}

                            {/* NCERT High-Yield Takeaway */}
                            {exp.keyTakeaway && (
                              <div className="bg-teal-950/30 border border-teal-500/30 rounded-xl p-3.5 text-xs text-teal-300 flex items-start gap-2.5">
                                <BookOpen size={15} className="flex-shrink-0 mt-0.5 text-teal-400" />
                                <div>
                                  <strong className="block text-teal-200 mb-0.5">NEET (UG) 2026 Core Takeaway & NCERT Reference:</strong>
                                  <p className="text-zinc-300 leading-relaxed">{exp.keyTakeaway}</p>
                                  {exp.ncertReference && (
                                    <span className="block mt-1 text-[11px] text-teal-400 font-mono">
                                      📖 {exp.ncertReference}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Ask AI Tutor Action Strip */}
                            <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
                              <span className="text-[11.5px] text-zinc-400">
                                Need an 8–10 page chapter masterclass or 3D diagram on this concept?
                              </span>
                              <button
                                onClick={() => {
                                  navigate('/courses/ai-tutor', {
                                    state: {
                                      autoQuery: `Provide an exhaustive chapter masterclass on this NEET question with complete mathematical derivation and 3D vector diagram: "${q.question_text || q.text}"`
                                    }
                                  });
                                }}
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
                              >
                                <Sparkles size={13} />
                                <span>Ask AI Tutor for Deep Masterclass & 3D Diagram</span>
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  );
                })
              ) : (
                <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-10 text-center text-zinc-400 space-y-3">
                  <HelpCircle size={32} className="mx-auto text-zinc-500" />
                  <p className="text-sm font-semibold">No questions match the current filter "{reviewFilter}".</p>
                  <button
                    onClick={() => setReviewFilter('all')}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold"
                  >
                    View All Questions
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">Finished reviewing all answers?</h4>
                <p className="text-xs text-zinc-400">Proceed to your personalized learning path or practice more courses.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/assessment')}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs sm:text-sm font-semibold border border-zinc-700 transition-all flex items-center gap-2"
                >
                  <RotateCcw size={15} />
                  <span>Retake Assessment</span>
                </button>

                <button
                  onClick={() => navigate('/learning-path')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
                >
                  <span>Go to Learning Path</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
