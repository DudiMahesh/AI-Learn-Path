import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Zap, FlaskConical, Dna, Copy, Check, Search } from 'lucide-react';
import { SUBJECTS_CONFIG } from '../../data/neetCurriculumData';

const SubjectIcon = ({ id, size = 18 }) => {
  if (id === 'physics')   return <Zap size={size} />;
  if (id === 'chemistry') return <FlaskConical size={size} />;
  return <Dna size={size} />;
};

const SUBJECT_COLORS = {
  physics:   { pill: 'bg-emerald-600 text-white', border: 'border-emerald-500/40', accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  chemistry: { pill: 'bg-teal-600 text-white',    border: 'border-teal-500/40',    accent: 'text-teal-400',    bg: 'bg-teal-500/10'    },
  biology:   { pill: 'bg-green-600 text-white',   border: 'border-green-500/40',   accent: 'text-green-400',   bg: 'bg-green-500/10'   },
};

export default function NEETFormulasPage() {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState('physics');
  const [search, setSearch] = useState('');
  const [copiedIdx, setCopiedIdx] = useState(null);

  const cfg = SUBJECTS_CONFIG[activeSubject];
  const colors = SUBJECT_COLORS[activeSubject];

  const filteredSections = cfg.cheatSheet.filter(section =>
    !search ||
    section.title.toLowerCase().includes(search.toLowerCase()) ||
    section.formulas.some(f => f.toLowerCase().includes(search.toLowerCase()))
  );

  const copyFormula = (formula, idx) => {
    navigator.clipboard.writeText(formula).catch(() => {});
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/courses')}
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
        >
          <ArrowLeft size={15} /> Courses
        </button>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <FileText size={18} className="text-emerald-500" />
            <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">Formula &amp; Cheat Sheets</h1>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">High-yield NEET (UG) 2026 formulas, laws &amp; mnemonics by subject</p>
        </div>
      </div>

      {/* Subject Switcher */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          {Object.entries(SUBJECTS_CONFIG).map(([key, s]) => (
            <button
              key={key}
              onClick={() => { setActiveSubject(key); setSearch(''); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-sm ${
                activeSubject === key
                  ? SUBJECT_COLORS[key].pill + ' shadow-lg'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              <SubjectIcon id={key} size={15} />
              {s.shortTitle}
              <span className="text-[10px] opacity-70">({s.totalPages}p)</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${cfg.shortTitle} formulas…`}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Subject tagline badge */}
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${colors.bg} border ${colors.border} text-xs font-semibold ${colors.accent}`}>
        <SubjectIcon id={activeSubject} size={13} />
        {cfg.tagline}
      </div>

      {/* Formula cards grid */}
      {filteredSections.length === 0 ? (
        <div className="text-center py-16 text-zinc-500 dark:text-zinc-400">
          <FileText size={36} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No formulas found for "<span className="text-emerald-500">{search}</span>"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredSections.map((section, si) => (
            <div
              key={si}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden"
            >
              {/* Section header */}
              <div className={`px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2 ${colors.bg}`}>
                <SubjectIcon id={activeSubject} size={14} className={colors.accent} />
                <span className={`text-sm font-bold ${colors.accent}`}>{section.title}</span>
              </div>

              {/* Formulas */}
              <div className="p-4 space-y-2.5">
                {section.formulas.map((formula, fi) => {
                  const idx = `${si}-${fi}`;
                  const isCopied = copiedIdx === idx;
                  return (
                    <div
                      key={fi}
                      className="group relative flex items-start gap-2 font-mono text-xs bg-zinc-50 dark:bg-zinc-800/80 rounded-xl px-3 py-2.5 leading-relaxed border border-zinc-100 dark:border-zinc-700/60 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                    >
                      <span className="flex-1 text-zinc-700 dark:text-zinc-200 break-words">{formula}</span>
                      <button
                        onClick={() => copyFormula(formula, idx)}
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-400 hover:text-emerald-500"
                      >
                        {isCopied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer note */}
      <div className="text-center text-xs text-zinc-400 dark:text-zinc-600 pb-6">
        📌 All formulas curated from NCERT &amp; NMC/NTA NEET (UG) 2026 syllabus notified 22-12-2025
      </div>
    </div>
  );
}

