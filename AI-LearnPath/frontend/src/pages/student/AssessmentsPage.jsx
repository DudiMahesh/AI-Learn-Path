import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Target, Trophy, Atom, FlaskConical, Dna, Award, Sparkles, ArrowRight } from 'lucide-react';
import AssessmentCard from '../../components/assessment/AssessmentCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { useAuth } from '../../hooks/useAuth';

const DEFAULT_ASSESSMENTS = [
  {
    id: 1,
    title: 'NEET Physics: Mechanics & Electrodynamics 50-Q Model Paper',
    description: 'Kinematics, Laws of Motion, Work Energy Power, Rotational Motion, Electrostatics, and Current Electricity (50 NTA Questions).',
    assessment_type: 'topic',
    time_limit_minutes: 60,
    question_count: 50,
    category: 'Physics'
  },
  {
    id: 2,
    title: 'NEET Physics: Thermodynamics, Waves & Modern Physics 50-Q Model Paper',
    description: 'Thermal Properties, Kinetic Theory, Oscillations, Wave Optics, Dual Nature of Radiation, and Atoms & Nuclei (50 NTA Questions).',
    assessment_type: 'topic',
    time_limit_minutes: 60,
    question_count: 50,
    category: 'Physics'
  },
  {
    id: 3,
    title: 'NEET Chemistry: Physical & Inorganic Chemistry 50-Q Model Paper',
    description: 'Atomic Structure, Chemical Bonding, Thermodynamics, Equilibrium, Electrochemistry, and Periodic Properties (50 NTA Questions).',
    assessment_type: 'topic',
    time_limit_minutes: 60,
    question_count: 50,
    category: 'Chemistry'
  },
  {
    id: 4,
    title: 'NEET Chemistry: Organic Chemistry & Mechanisms 50-Q Model Paper',
    description: 'Hydrocarbons, Haloalkanes, Alcohols, Carbonyl Compounds, Nitrogen Compounds, and Biomolecules (50 NTA Questions).',
    assessment_type: 'topic',
    time_limit_minutes: 60,
    question_count: 50,
    category: 'Chemistry'
  },
  {
    id: 5,
    title: 'NEET Biology: Botany & Plant Physiology 50-Q Model Paper',
    description: 'Diversity in the Living World, Structural Organisation, Plant Physiology, and Reproduction in Flowering Plants (50 NTA Questions).',
    assessment_type: 'topic',
    time_limit_minutes: 60,
    question_count: 50,
    category: 'Biology'
  },
  {
    id: 6,
    title: 'NEET Biology: Zoology, Human Physiology & Genetics 50-Q Model Paper',
    description: 'Cell Biology, Human Physiology, Genetics & Evolution, Biotechnology, and Ecology (50 NTA Questions).',
    assessment_type: 'topic',
    time_limit_minutes: 60,
    question_count: 50,
    category: 'Biology'
  },
  {
    id: 7,
    title: 'NEET (UG) 2026 Official All-India Grand Mock Test 1 (720 Marks)',
    description: 'Official NTA full simulation: 200 questions (180 to attempt) across Physics, Chemistry, Botany & Zoology. Duration: 3 hours 20 minutes (200 min). Total Marks: 720 (+4 / -1).',
    assessment_type: 'practice',
    time_limit_minutes: 200,
    question_count: 180,
    total_questions: 200,
    max_marks: 720,
    category: 'Full Mock'
  },
  {
    id: 8,
    title: 'NEET (UG) 2026 NTA Rank Booster Grand Mock Test 2 (720 Marks)',
    description: 'Advanced 200-question All-India Grand Test (180 to attempt) covering Physics, Chemistry, Botany & Zoology. Full 3 hours 20 minutes (200 min) test for 720 Marks.',
    assessment_type: 'practice',
    time_limit_minutes: 200,
    question_count: 180,
    total_questions: 200,
    max_marks: 720,
    category: 'Full Mock'
  },
];

const SUBJECT_TABS = [
  { id: 'all',        label: 'All Assessments',     icon: ClipboardList },
  { id: 'Physics',    label: 'Physics',             icon: Atom },
  { id: 'Chemistry',  label: 'Chemistry',           icon: FlaskConical },
  { id: 'Biology',    label: 'Biology',             icon: Dna },
  { id: 'Full Mock',  label: 'Full Mock Tests',     icon: Award },
];

export default function AssessmentsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [assessments, setAssessments] = useState(DEFAULT_ASSESSMENTS);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('all');

  const filtered = tab === 'all'
    ? assessments
    : assessments.filter(a => a.category === tab);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/20">
            <Target size={13} /> NEET UG 2026 Benchmarks
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            NEET Subject Assessments &amp; Practice Sets
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Physics, Chemistry, and Biology chapter-wise tests and grand tests aligned to NMC/NTA NEET 2026 syllabus.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
            {assessments.length} Tests Available
          </span>
        </div>
      </div>

      {/* NEET Official Exam Pattern Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Exam Duration', val: '3h 20m (200 min)', sub: 'Continuous Timer', icon: Target },
          { label: 'Questions to Attempt', val: '180 Questions', sub: 'Out of 200 Total', icon: ClipboardList },
          { label: 'Exam Subjects', val: 'Physics, Chemistry, Botany, Zoology', sub: '45 to attempt each', icon: Atom },
          { label: 'Total Marks', val: '🎯 720 Marks', sub: '+4 Correct / -1 Wrong', icon: Award },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{m.val}</div>
                <div className="text-[11px] text-zinc-400">{m.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* NEET PYQ & Model Papers Feature Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-zinc-900 to-zinc-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <Award size={16} /> Official NTA Pattern: 3 Hours 20 Minutes (200 min) · 180 to Attempt · 720 Marks
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-white">
            Practice Official NEET Previous Year &amp; Model Question Papers
          </h2>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Simulate real 200-minute NTA exam conditions across Physics, Chemistry, Botany &amp; Zoology with authentic question papers, +4 / −1 negative marking, and step-by-step verified solutions.
          </p>
        </div>
        <button
          onClick={() => navigate('/pyq-papers')}
          className="flex-shrink-0 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all"
        >
          <span>Explore PYQ Papers</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 border-b border-zinc-200 dark:border-zinc-800">
        {SUBJECT_TABS.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`pb-3 px-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                tab === t.id
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Assessment Cards Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No Assessments Found"
          description={`No ${tab} assessments found. Try a different track filter.`}
          actionText="View All Assessments"
          onAction={() => setTab('all')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a, i) => (
            <AssessmentCard key={a.id || i} assessment={a} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
