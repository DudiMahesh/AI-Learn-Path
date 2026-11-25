import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Sparkles, FileText, Trophy, Zap, FlaskConical, Dna, ArrowRight } from 'lucide-react';
import CourseCard from '../../components/learning/CourseCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { courseService } from '../../services/courseService';

export default function CoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const DEFAULT_PHYSICS_COURSE = {
    id: 57,
    title: 'NEET (UG) 2026 Physics: Expanded Study Guide',
    description: 'Units 1 to 20 · Basics to depth · Diagrams · Worked examples · MCQs with solutions · Quick revision (Based on NMC/UGMEB syllabus notified 22-12-2025). Full study guide in PDF format.',
    category: 'Physics',
    difficulty: 'intermediate',
    pdf_url: '/materials/NEET_UG_2026_Physics_Expanded_Study_Guide.pdf',
    format: 'PDF',
    pages: 76,
    topics_count: 20,
    duration_hours: 45
  };

  const DEFAULT_CHEMISTRY_COURSE = {
    id: 58,
    title: 'NEET (UG) 2026 Chemistry: Expanded Study Guide',
    description: 'Units 1 to 20 · Physical, Inorganic and Organic Chemistry · In-depth theory · Worked examples · MCQs with solutions · Quick revision (Based on NMC/NTA syllabus notified 22-12-2025). Full study guide in PDF format.',
    category: 'Chemistry',
    difficulty: 'intermediate',
    pdf_url: '/materials/NEET_UG_2026_Chemistry_Expanded_Study_Guide.pdf',
    format: 'PDF',
    pages: 111,
    topics_count: 20,
    duration_hours: 60
  };

  const DEFAULT_BIOLOGY_COURSE = {
    id: 59,
    title: 'NEET (UG) 2026 Biology: Complete Study Guide',
    description: 'Units 1 to 10 · Basics to Depth · Diagrams, comparison tables, worked examples, NEET traps, mnemonics and practice questions with explanations. Full study guide in PDF format.',
    category: 'Biology',
    difficulty: 'intermediate',
    pdf_url: '/materials/NEET_UG_2026_Biology_Complete_Study_Guide.pdf',
    format: 'PDF',
    pages: 84,
    topics_count: 10,
    duration_hours: 50
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await courseService.getCourses();
      const list = Array.isArray(res) ? res : (res?.data || []);
      let merged = [...list];
      if (!merged.some(c => (c.title || '').toLowerCase().includes('physics: expanded study guide'))) {
        merged.push(DEFAULT_PHYSICS_COURSE);
      }
      if (!merged.some(c => (c.title || '').toLowerCase().includes('chemistry: expanded study guide'))) {
        merged.push(DEFAULT_CHEMISTRY_COURSE);
      }
      if (!merged.some(c => (c.title || '').toLowerCase().includes('biology: complete study guide'))) {
        merged.push(DEFAULT_BIOLOGY_COURSE);
      }
      setCourses(merged);
    } catch (err) {
      console.error('Failed to load courses:', err);
      setCourses([DEFAULT_PHYSICS_COURSE, DEFAULT_CHEMISTRY_COURSE, DEFAULT_BIOLOGY_COURSE]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = courses.filter(c => {
    const textMatch = !search || 
      c.title?.toLowerCase().includes(search.toLowerCase()) || 
      c.category?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase());
    
    const diffMatch = difficulty === 'all' || c.difficulty?.toLowerCase() === difficulty.toLowerCase();
    const subjectMatch = selectedSubject === 'all' || c.category?.toLowerCase() === selectedSubject.toLowerCase();

    return textMatch && diffMatch && subjectMatch;
  });

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
            <Sparkles size={13} /> NEET (UG) 2026 Preparation Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Explore Courses &amp; Study Tools
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Official NMC/NTA textbook-style PDF study guides, interactive formula cheat sheets, and MCQ practice drills.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
            {filtered.length} of {courses.length} Guides
          </span>
        </div>
      </div>

      {/* ── Featured Study Chapter Viewer Banner (Eklavya & Modern Study Portal Style) ── */}
      <div 
        onClick={() => navigate('/study')}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0c1a30] via-[#0f2847] to-[#0c1a30] border border-emerald-500/40 p-6 sm:p-7 shadow-xl cursor-pointer group hover:border-emerald-500/80 transition-all"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <Sparkles size={13} /> Interactive Chapter Study Notes &amp; Textbook
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-emerald-300 transition-colors">
              Explore Chapter-wise NEET Notes (Class 11 &amp; 12)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Read 28+ chapters across Physics, Chemistry, and Biology with NCERT overviews, interactive textbook masterclasses, 3D vector schematics, and worked practice drills.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition-all group-hover:scale-105 whitespace-nowrap">
              <span>Open Chapter Study</span>
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>

      {/* ── Separate Interactive Study Tools Suite ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tool 1: Formulas */}
        <div
          onClick={() => navigate('/courses/formulas')}
          className="group p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 hover:border-emerald-500/60 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
              <FileText size={20} />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors">
              Formula Cheat Sheets
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
              Curated equations, laws, and NCERT mnemonics across Physics, Chemistry, and Biology.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span>Explore Formulas</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Tool 2: Practice Quiz */}
        <div
          onClick={() => navigate('/courses/quiz')}
          className="group p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 hover:border-amber-500/60 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-3 shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <Trophy size={20} />
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 transition-colors">
              Practice MCQ Quizzes
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
              5 high-yield NEET practice questions per subject with instant feedback and NCERT solutions.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
            <span>Start Practice Drill</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Subject Switcher & Search Bar */}
      <div className="space-y-4">
        {/* Subject Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold uppercase text-zinc-400 mr-1 hidden sm:inline">Subject:</span>
          {[
            { id: 'all', label: 'All Subjects', count: courses.length },
            { id: 'Physics', label: 'Physics', count: courses.filter(c => (c.category || '').toLowerCase() === 'physics').length, icon: Zap },
            { id: 'Chemistry', label: 'Chemistry', count: courses.filter(c => (c.category || '').toLowerCase() === 'chemistry').length, icon: FlaskConical },
            { id: 'Biology', label: 'Biology', count: courses.filter(c => (c.category || '').toLowerCase() === 'biology').length, icon: Dna },
          ].map(sub => {
            const Icon = sub.icon;
            const active = selectedSubject.toLowerCase() === sub.id.toLowerCase();
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  active
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                {Icon && <Icon size={13} />}
                <span>{sub.label}</span>
                <span className="text-[10px] opacity-60">({sub.count})</span>
              </button>
            );
          })}
        </div>

        {/* Search & Level Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Physics, Chemistry, Biology, Units or Topics (e.g. Optics, Thermodynamics, Genetics, Chemical Bonding)..."
              className="w-full pl-11 pr-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'beginner', 'intermediate', 'advanced'].map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold capitalize whitespace-nowrap transition-all shadow-sm cursor-pointer ${
                difficulty === d
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              {d === 'all' ? 'All Levels' : d}
            </button>
          ))}
          </div>
        </div>
      </div>

      {/* Course List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses found"
          description="Try adjusting your search query or filter criteria to discover matching learning modules."
          actionText="Clear Filters"
          onAction={() => { setSearch(''); setDifficulty('all'); }}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((course, idx) => (
            <CourseCard key={course.id} course={course} index={idx} listMode />
          ))}
        </div>
      )}
    </div>
  );
}
