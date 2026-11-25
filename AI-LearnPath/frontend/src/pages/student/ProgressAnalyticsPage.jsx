import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, CheckCircle2, BookOpen, Clock, 
  Award, Flame, TrendingUp, Sparkles, ArrowRight, Compass 
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StudyTimeChart from '../../components/charts/StudyTimeChart';
import AssessmentHistoryChart from '../../components/charts/AssessmentHistoryChart';
import ProgressChart from '../../components/charts/ProgressChart';
import { progressService } from '../../services/progressService';

export default function ProgressAnalyticsPage() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    progressService.getAnalytics()
      .then(d => setAnalytics(d))
      .catch((err) => {
        console.error('Failed to load analytics:', err);
        setAnalytics({
          overall_progress: 0,
          completed_topics: 0,
          total_topics: 0,
          completed_lessons: 0,
          study_hours_total: 0,
          assessment_count: 0,
          study_time_by_day: [],
          assessment_scores: [],
          current_streak: 0
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  const overallProgress = analytics?.overall_progress || 0;
  const completedTopics = analytics?.completed_topics || 0;
  const totalTopics = analytics?.total_topics || 0;
  const completedLessons = analytics?.completed_lessons || 0;
  const studyHours = analytics?.study_hours_total || 0;
  const assessmentCount = analytics?.assessment_count || 0;
  const streak = analytics?.current_streak || 0;
  const studyDays = analytics?.study_time_by_day || [];
  const assessmentScores = analytics?.assessment_scores || [];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl">
            <BarChart3 size={28} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Progress & Analytics
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Real-time breakdown of your learning pace, mastery, and assessment performance.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate('/learning-path')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Compass size={16} /> Continue Path
          </button>
        </div>
      </div>

      {/* Top Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Overall Progress Widget */}
        <div className="md:col-span-1 bg-white dark:bg-slate-800/70 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/60 flex flex-col items-center justify-center transition-colors">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            Overall Progress
          </span>
          <ProgressChart progress={overallProgress} size={150} />
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center">
            {totalTopics > 0 ? `${completedTopics} of ${totalTopics} topics complete` : 'Start your first path module'}
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-slate-800/70 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Topics Mastered</span>
              <div className="p-2 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-xl">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{completedTopics}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{completedLessons} individual lessons completed</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/70 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Study Time</span>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl">
                <Clock size={20} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{studyHours}h</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total time dedicated to study</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/70 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Assessments</span>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-xl">
                <Award size={20} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{assessmentCount}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Quizzes and diagnostics taken</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Streak Banner */}
      {streak > 0 && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Flame size={32} className="text-yellow-200 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-semibold opacity-90">Active Learning Streak</p>
              <p className="text-2xl sm:text-3xl font-extrabold">{streak} Day{streak > 1 ? 's' : ''} on Fire!</p>
              <p className="text-xs opacity-85 mt-0.5">Keep learning daily to compound your skills and maintain momentum.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-orange-600 text-sm font-bold rounded-xl hover:bg-orange-50 transition-colors shadow"
          >
            Study Now <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Study Time Chart */}
        <div className="bg-white dark:bg-slate-800/70 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/60 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Daily Study Time</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Hours spent per day over the past 7 days</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              Last 7 Days
            </span>
          </div>
          <StudyTimeChart data={studyDays} />
        </div>

        {/* Assessment Score History */}
        <div className="bg-white dark:bg-slate-800/70 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/60 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Assessment Scores</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Evaluation history & score trajectory</p>
            </div>
            {assessmentScores.length > 0 && (
              <span className="text-xs font-semibold px-2.5 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                {assessmentScores.length} Attempt{assessmentScores.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <AssessmentHistoryChart data={assessmentScores} />
        </div>
      </div>

      {/* Recommendations & Next Actions */}
      <div className="bg-white dark:bg-slate-800/70 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/60 transition-colors">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <Sparkles size={18} className="text-purple-600 dark:text-purple-400" />
          Recommended Next Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/recommendations')}
            className="p-4 text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all group"
          >
            <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              AI Recommendations →
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Explore tailored learning modules based on your target skills.
            </p>
          </button>

          <button
            onClick={() => navigate('/learning-path')}
            className="p-4 text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all group"
          >
            <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Complete Next Topic →
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Advance your syllabus and unlock higher readiness tiers.
            </p>
          </button>

          <button
            onClick={() => navigate('/career-readiness')}
            className="p-4 text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all group"
          >
            <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              View Career Readiness →
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Inspect your target role readiness score and skill gap analysis.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
