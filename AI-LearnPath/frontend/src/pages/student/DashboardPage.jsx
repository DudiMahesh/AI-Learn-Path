import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, CheckCircle, BarChart2, Clock, Zap, ChevronRight, TrendingUp, Award, Play, Sparkles, RotateCcw } from 'lucide-react';
import DynamicGreeting from '../../components/common/DynamicGreeting';
import StatCard from '../../components/common/StatCard';
import EmptyState from '../../components/common/EmptyState';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import GoalCard from '../../components/dashboard/GoalCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import VivaDemoModal from '../../components/dashboard/VivaDemoModal';
import NEETRankPredictorCard from '../../components/analytics/NEETRankPredictorCard';
import { useAuth } from '../../hooks/useAuth';
import { dashboardService } from '../../services/dashboardService';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoProfile, setDemoProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('viva_demo_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleSelectDemoProfile = (profile) => {
    setDemoProfile(profile);
    if (profile) {
      localStorage.setItem('viva_demo_profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('viva_demo_profile');
    }
  };

  useEffect(() => {
    dashboardService.getDashboard()
      .then(d => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const u = JSON.parse(stored);
        if (!u.career || u.career.toLowerCase().includes('data scientist') || u.career.toLowerCase().includes('developer')) {
          u.career = 'NEET (UG) 2026 Aspirant';
          u.career_goal = 'NEET (UG) 2026 Aspirant';
          localStorage.setItem('user', JSON.stringify(u));
        }
      }
    } catch {}
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  const activeData = demoProfile || data;
  const progress = activeData?.overall_progress || 0;
  const completedTopics = activeData?.completed_topics || 0;
  const skillScore = activeData?.diagnostic_completed ? `${Math.round(activeData?.skill_score || 0)}%` : 'Not Assessed';
  const studyHours = activeData?.study_hours_this_week ? `${activeData.study_hours_this_week.toFixed(1)}h` : '0h';
  const topItems = (activeData?.learning_path_items || []).slice(0, 5);
  const activities = (demoProfile ? [] : data?.recent_activity) || [];
  const rawCareer = user?.career || activeData?.career || '';
  const isLegacyTech = !rawCareer || rawCareer.toLowerCase().includes('data scientist') || rawCareer.toLowerCase().includes('developer') || rawCareer.toLowerCase().includes('engineer');
  const career = isLegacyTech ? 'NEET (UG) 2026 Aspirant' : rawCareer;
  const readiness = Math.round(activeData?.career_readiness || (demoProfile ? (demoProfile.skill_score || 0) : 0));
  const evaluatedNeetScore = demoProfile?.raw_scores?.total_neet_score || (activeData?.diagnostic_completed ? Math.round((Number(activeData?.skill_score || 50) / 100) * 720) : 540);

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-8">
      <DynamicGreeting userName={demoProfile ? demoProfile.name.split(' ')[0] : (user?.name || 'Student')} />

      {/* ── Active Viva Demo Alert Bar ── */}
      {demoProfile && (
        <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border-2 border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                  ⚡ Viva Demonstration Active:
                </span>
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  {demoProfile.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-zinc-300 mt-0.5">
                {demoProfile.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Switch Persona
            </button>
            <button
              onClick={() => handleSelectDemoProfile(null)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Exit Demo</span>
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Overall Progress" value={`${Math.round(progress)}%`} subtitle="of learning path" icon={BarChart2} color="blue" />
        <StatCard title="Topics Completed" value={String(completedTopics)} subtitle="Topics mastered" icon={CheckCircle} color="green" />
        <StatCard title="Skill Score" value={skillScore} subtitle={activeData?.diagnostic_completed ? 'Based on assessment' : 'Take the diagnostic'} icon={Map} color="purple" />
        <StatCard title="Study This Week" value={studyHours} subtitle="average per day" icon={Clock} color="orange" />
      </div>

      {/* NEET Rank & College Predictor Component */}
      <NEETRankPredictorCard initialScore={evaluatedNeetScore} isInteractive={true} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Learning Path Preview (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/70 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Map size={20} className="text-blue-600 dark:text-blue-400" /> Learning Path
              </h3>
              {topItems.length > 0 && (
                <button
                  onClick={() => navigate('/learning-path')}
                  className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  View Full Path <ChevronRight size={14} />
                </button>
              )}
            </div>

            {topItems.length === 0 ? (
              <EmptyState
                icon={Map}
                title="No path generated yet"
                message="Explore your recommended modules to get started on your learning path."
                actionLabel="View Learning Path"
                onAction={() => navigate('/learning-path')}
              />
            ) : (
              <div className="space-y-3">
                {topItems.map((item, i) => (
                  <div
                    key={item.id || i}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      item.status === 'completed'
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40'
                        : item.status === 'in_progress'
                        ? 'bg-blue-50/70 dark:bg-blue-950/20 border-blue-200/60 dark:border-blue-800/40'
                        : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-700/50'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        item.status === 'completed'
                          ? 'bg-emerald-500 text-white'
                          : item.status === 'in_progress'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {item.status === 'completed' ? '✓' : i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white text-sm truncate">{item.title}</p>
                      {item.status === 'in_progress' && (
                        <p className="text-xs text-blue-600 dark:text-blue-300 font-semibold mt-0.5">In Progress</p>
                      )}
                    </div>
                    {item.status === 'pending' && (
                      <button
                        onClick={() => navigate('/learning-path')}
                        className="text-xs text-blue-600 dark:text-blue-300 font-bold hover:underline flex-shrink-0"
                      >
                        Start →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          {activities.length > 0 && (
            <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/70 transition-colors">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
              <ActivityFeed activities={activities} />
            </div>
          )}
        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          {/* Career Readiness */}
          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/70 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600 dark:text-blue-400" /> Career Readiness
            </h3>
            {readiness === 0 ? (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <div className="w-24 h-24 rounded-full border-8 border-slate-100 dark:border-slate-700 flex items-center justify-center mb-3">
                  <span className="text-2xl font-black text-slate-300 dark:text-slate-500">0%</span>
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-200 max-w-[200px]">
                  Complete assessment to see readiness score
                </p>
                <button
                  onClick={() => navigate('/career-readiness')}
                  className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-300 hover:underline"
                >
                  View Details →
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="relative w-28 h-28 mb-3">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      className="text-slate-100 dark:text-slate-700"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={readiness >= 70 ? '#22c55e' : readiness >= 40 ? '#f59e0b' : '#3b82f6'}
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - readiness / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-slate-900 dark:text-white">
                    {readiness}%
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 text-center mb-2">
                  {readiness >= 70 ? '🎉 Job Ready!' : readiness >= 40 ? '⚡ Getting There' : '🚀 Keep Going!'}
                </p>
                <button
                  onClick={() => navigate('/career-readiness')}
                  className="text-xs font-bold text-blue-600 dark:text-blue-300 hover:underline"
                >
                  View Details →
                </button>
              </div>
            )}
          </div>

          {/* NEET PYQ & Model Papers Quick Card */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 rounded-2xl border border-emerald-500/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Award size={11} /> Official NTA Papers
              </span>
              <span className="text-[11px] font-bold text-zinc-400">720 Marks</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">NEET Previous Year &amp; Model Papers</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Practice 2024, 2023, 2022 papers and 2026 Model Mock Tests with live countdown timers and solutions.
              </p>
            </div>
            <button
              onClick={() => navigate('/pyq-papers')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
            >
              <Play size={12} className="fill-white" />
              <span>Solve PYQ Papers →</span>
            </button>
          </div>

          {/* Goal Card */}
          {career && (
            <GoalCard
              career={career}
              readiness={readiness}
              diagnostic_completed={data?.diagnostic_completed}
            />
          )}
        </div>
      </div>

      {/* ── Viva Demonstration Switcher Modal ── */}
      <VivaDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectProfile={handleSelectDemoProfile}
        currentProfileId={demoProfile?.id}
      />
    </div>
  );
};

export default DashboardPage;
