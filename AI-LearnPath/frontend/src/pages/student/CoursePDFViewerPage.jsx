import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  X, Search, CheckCircle2, Circle, Check, RotateCcw, Trophy
} from 'lucide-react';
import { SUBJECTS_CONFIG } from '../../data/neetCurriculumData';
import { UNIT_QUIZZES, getQuizForUnit } from '../../data/unitQuizData';
import SinglePagePDFCanvas from '../../components/learning/SinglePagePDFCanvas';

const lsGet = (k, d) => {
  try {
    const v = localStorage.getItem(k);
    return v !== null ? JSON.parse(v) : d;
  } catch {
    return d;
  }
};

const lsSet = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};

// Standard A4 dimensions in CSS pixels (96 DPI)
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export default function CoursePDFViewerPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const scrollContainerRef = useRef(null);

  const fileParam  = searchParams.get('file');
  const titleParam = searchParams.get('title');

  const detectSubject = () => {
    const c = ((fileParam || '') + ' ' + (titleParam || '')).toLowerCase();
    if (c.includes('biology'))   return 'biology';
    if (c.includes('chemistry')) return 'chemistry';
    return 'physics';
  };

  const [activeSubject] = useState(detectSubject());
  const cfg = SUBJECTS_CONFIG[activeSubject];

  // Remember last page per subject (defaults to 1 or 2)
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = lsGet(`neet_last_page_${activeSubject}`, 2);
    return Math.max(1, Math.min(saved, cfg.totalPages));
  });

  // Remember zoom level per subject in localStorage (default 100% = 1.0)
  const [zoom, setZoom] = useState(() => {
    const saved = lsGet(`neet_last_zoom_${activeSubject}`, 1.0);
    return saved && Number(saved) >= 0.75 ? Number(saved) : 1.0;
  });

  const updateZoom = useCallback((newZoom) => {
    const clamped = +Math.max(0.5, Math.min(2.0, newZoom)).toFixed(2);
    setZoom(clamped);
    lsSet(`neet_last_zoom_${activeSubject}`, clamped);
  }, [activeSubject]);

  const [syllabusOpen, setSyllabusOpen] = useState(false);
  const [syllabusSearch, setSyllabusSearch] = useState('');

  // Sub-topics checklist state persisted per subject
  const [subtopicsDone, setSubtopicsDone] = useState(() =>
    lsGet(`neet_subtopics_${activeSubject}`, {})
  );

  // Completed units (when unit is checked or quiz passed)
  const [completedUnits, setCompletedUnits] = useState(() =>
    lsGet(`neet_completed_${activeSubject}`, {})
  );

  // Active Unit Quiz Modal State
  const [activeQuizUnit, setActiveQuizUnit] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Save last page on change and reset scroll to top of page
  const jumpToPage = useCallback((page) => {
    const p = Math.max(1, Math.min(page, cfg.totalPages));
    setCurrentPage(p);
    lsSet(`neet_last_page_${activeSubject}`, p);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [cfg.totalPages, activeSubject]);

  // Page turning helpers
  const prevPage = useCallback(() => jumpToPage(currentPage - 1), [currentPage, jumpToPage]);
  const nextPage = useCallback(() => jumpToPage(currentPage + 1), [currentPage, jumpToPage]);

  // Determine current unit based on currentPage
  const getCurrentUnit = useCallback(() => {
    const units = cfg.units;
    for (let i = units.length - 1; i >= 0; i--) {
      if (currentPage >= units[i].page) {
        return units[i];
      }
    }
    return units[0];
  }, [cfg.units, currentPage]);

  const currentUnit = getCurrentUnit();

  // Zoom preset actions
  const handleFitPage = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const availHeight = scrollContainerRef.current.clientHeight - 80;
    const scale = availHeight / A4_HEIGHT_PX;
    updateZoom(scale);
  }, [updateZoom]);

  const handleFitWidth = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const availWidth = scrollContainerRef.current.clientWidth - 110;
    const scale = availWidth / A4_WIDTH_PX;
    updateZoom(scale);
  }, [updateZoom]);

  // Keyboard navigation
  // Arrow Up/Down: scroll | Left/Right or PageUp/PageDown: turn page | Ctrl +/-: zoom
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;

      // Ctrl + "+" / Ctrl + "-" Zoom
      if (e.ctrlKey && (e.key === '=' || e.key === '+')) {
        updateZoom(zoom + 0.1);
        e.preventDefault();
        return;
      }
      if (e.ctrlKey && (e.key === '-' || e.key === '_')) {
        updateZoom(zoom - 0.1);
        e.preventDefault();
        return;
      }

      // Arrow Up/Down scroll
      if (e.key === 'ArrowDown') {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy({ top: 180, behavior: 'smooth' });
          e.preventDefault();
        }
      } else if (e.key === 'ArrowUp') {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy({ top: -180, behavior: 'smooth' });
          e.preventDefault();
        }
      }

      // PageUp / PageDown / Left / Right page turns
      if (e.key === 'PageDown' || e.key === 'ArrowRight') {
        nextPage();
        e.preventDefault();
      } else if (e.key === 'PageUp' || e.key === 'ArrowLeft') {
        prevPage();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoom, updateZoom, nextPage, prevPage]);

  // Subtopics and quiz handling
  const toggleSubtopic = (unitId, topicIndex) => {
    setSubtopicsDone(prev => {
      const key = `${unitId}_${topicIndex}`;
      const updated = { ...prev, [key]: !prev[key] };
      lsSet(`neet_subtopics_${activeSubject}`, updated);
      return updated;
    });
  };

  const toggleUnitCompleted = (unitId) => {
    setCompletedUnits(prev => {
      const updated = { ...prev, [unitId]: !prev[unitId] };
      lsSet(`neet_completed_${activeSubject}`, updated);
      return updated;
    });
  };

  const openUnitQuiz = (unit) => {
    setActiveQuizUnit(unit);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const getQuestionsForUnit = (unit) => {
    if (!unit) return [];
    return getQuizForUnit(activeSubject, unit.number, unit.title, unit.topics);
  };

  const handleQuizSubmit = (questions) => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score / questions.length >= 0.7 && activeQuizUnit) {
      toggleUnitCompleted(activeQuizUnit.id);
    }
  };

  const doneCount = Object.values(completedUnits).filter(Boolean).length;

  const filteredUnits = cfg.units.filter(u =>
    !syllabusSearch ||
    u.title.toLowerCase().includes(syllabusSearch.toLowerCase()) ||
    u.topics.toLowerCase().includes(syllabusSearch.toLowerCase())
  );

  const activeQuestions = activeQuizUnit ? getQuestionsForUnit(activeQuizUnit) : [];

  return (
    <div
      className="relative flex flex-col w-screen h-screen overflow-hidden select-none font-sans"
      style={{ backgroundColor: '#323232' }}
    >
      {/* ── Top Bar (Exact UI: ← Courses, Physics pill, and Syllabus 0/20 on right) ── */}
      <header
        className="relative z-30 flex items-center justify-between px-5 py-2.5 shadow-md border-b"
        style={{
          backgroundColor: '#1c1d21',
          borderColor: '#3a3d45'
        }}
      >
        {/* Left: ← Courses button & Green Subject Pill (#7ee8c3 on #173a30) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/courses')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer border border-[#3a3d45] hover:border-zinc-500 bg-white/5"
            title="Return to Courses"
            aria-label="Return to Courses"
          >
            ← Courses
          </button>

          {/* Green Subject Pill */}
          <div
            className="px-3.5 py-1 rounded-full text-xs font-bold"
            style={{
              color: '#7ee8c3',
              backgroundColor: '#173a30',
              borderColor: 'rgba(126, 232, 195, 0.3)',
              borderWidth: '1px'
            }}
          >
            {cfg.shortTitle}
          </div>
        </div>

        {/* Right: Clean Syllabus 0/20 Button */}
        <div>
          <button
            onClick={() => setSyllabusOpen(o => !o)}
            className="text-xs font-medium text-zinc-300 hover:text-white transition-all cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/5"
            title="Open Syllabus and Unit Checklist"
            aria-label="Open Syllabus"
          >
            Syllabus {doneCount}/{cfg.units.length}
          </button>
        </div>
      </header>

      {/* ── Main Reading Canvas Area ── */}
      <main className="relative flex-1 min-h-0 w-full h-full overflow-hidden flex flex-col">
        {/* ── Vertical Scroll Container with Custom 16px Scrollbar ── */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          className="material-scroll-container relative w-full h-full overflow-y-scroll overflow-x-auto flex flex-col items-center justify-start pt-6 pb-44 px-4 select-auto outline-none"
          style={{ backgroundColor: '#323232' }}
        >
          {/* Actual PDF Page Rendered via PDF.js */}
          <SinglePagePDFCanvas
            pdfUrl={cfg.pdfUrl}
            pageNum={currentPage}
            zoom={zoom}
            onTotalPages={() => {}}
          />

          {/* Bottom spacer so floating bottom nav never covers content */}
          <div className="h-40 w-full flex-shrink-0" />
        </div>

        {/* ── Floating Zoom Toolbar on the Right (Exact match: +, 100%, −, Page, Width) ── */}
        <aside
          className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1.5 p-2 rounded-2xl shadow-2xl w-14"
          style={{
            backgroundColor: '#1c1d21',
            borderColor: '#3a3d45',
            borderWidth: '1px'
          }}
          aria-label="Zoom and View Controls"
        >
          {/* Zoom In (+) */}
          <button
            onClick={() => updateZoom(zoom + 0.1)}
            disabled={zoom >= 2.0}
            className="w-full py-1.5 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white disabled:opacity-30 transition-all cursor-pointer text-sm font-bold flex items-center justify-center min-h-[36px]"
            title="Zoom In (Ctrl + +)"
            aria-label="Zoom In"
          >
            +
          </button>

          {/* Current Zoom % Badge (Green text) */}
          <span
            className="font-mono text-xs font-bold py-0.5 select-none text-center"
            style={{ color: '#7ee8c3' }}
          >
            {Math.round(zoom * 100)}%
          </span>

          {/* Zoom Out (−) */}
          <button
            onClick={() => updateZoom(zoom - 0.1)}
            disabled={zoom <= 0.5}
            className="w-full py-1.5 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white disabled:opacity-30 transition-all cursor-pointer text-sm font-bold flex items-center justify-center min-h-[36px]"
            title="Zoom Out (Ctrl + -)"
            aria-label="Zoom Out"
          >
            −
          </button>

          <div className="w-6 h-[1px] my-0.5" style={{ backgroundColor: '#3a3d45' }} />

          {/* Fit Whole Page in View */}
          <button
            onClick={handleFitPage}
            className="w-full py-1 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white font-semibold transition-all text-[11px] flex items-center justify-center cursor-pointer min-h-[32px]"
            title="Fit whole page in view"
            aria-label="Fit Page"
          >
            Page
          </button>

          {/* Fit Page Width to Viewport */}
          <button
            onClick={handleFitWidth}
            className="w-full py-1 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white font-semibold transition-all text-[11px] flex items-center justify-center cursor-pointer min-h-[32px]"
            title="Fit page width to viewport"
            aria-label="Fit Width"
          >
            Width
          </button>
        </aside>

        {/* ── Bottom Nav (Floating Pill, Centered: ‹ Prev · Page 2 / 76 · Next › · Unit name · Unit Quiz) ── */}
        <nav
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 sm:gap-3 px-3.5 py-2 rounded-2xl shadow-2xl text-xs max-w-[95vw]"
          style={{
            backgroundColor: '#1c1d21',
            borderColor: '#3a3d45',
            borderWidth: '1px'
          }}
          aria-label="Page and Unit Navigation"
        >
          {/* ‹ Prev Button (disabled on page 1) */}
          <button
            onClick={prevPage}
            disabled={currentPage <= 1}
            className="flex items-center gap-0.5 px-2.5 py-1.5 rounded-xl font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-white/5 text-zinc-200 hover:text-white"
            title="Previous Page (Left Arrow or PageUp)"
            aria-label="Previous Page"
          >
            <span>‹ Prev</span>
          </button>

          {/* Green Page Counter Pill (#7ee8c3 on #173a30) */}
          <div
            className="font-mono text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-sm"
            style={{
              color: '#7ee8c3',
              backgroundColor: '#173a30',
              borderColor: 'rgba(126, 232, 195, 0.3)',
              borderWidth: '1px'
            }}
            aria-current="page"
          >
            Page {currentPage} / {cfg.totalPages}
          </div>

          {/* Next › Button (disabled on last page) */}
          <button
            onClick={nextPage}
            disabled={currentPage >= cfg.totalPages}
            className="flex items-center gap-0.5 px-2.5 py-1.5 rounded-xl font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-white/5 text-zinc-200 hover:text-white"
            title="Next Page (Right Arrow or PageDown)"
            aria-label="Next Page"
          >
            <span>Next ›</span>
          </button>

          {/* Vertical Separator */}
          <div className="w-[1px] h-4" style={{ backgroundColor: '#3a3d45' }} />

          {/* Current Unit Name */}
          <div className="truncate max-w-[140px] sm:max-w-[220px] md:max-w-[300px] font-semibold text-zinc-200 text-xs">
            {currentUnit ? `U${currentUnit.number}: ${currentUnit.title}` : cfg.shortTitle}
          </div>

          {/* Amber "Unit Quiz" Button (#f59e0b) */}
          <button
            onClick={() => openUnitQuiz(currentUnit)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-black transition-all cursor-pointer whitespace-nowrap shadow-md hover:brightness-110 active:scale-95"
            style={{ backgroundColor: '#f59e0b' }}
            title="Take interactive Quiz for this unit"
            aria-label="Take Unit Quiz"
          >
            <span>Unit Quiz</span>
          </button>
        </nav>
      </main>

      {/* ── Slide-in Syllabus Panel ── */}
      {syllabusOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setSyllabusOpen(false)}
        >
          <div
            className="w-full max-w-md h-full flex flex-col shadow-2xl border-l animate-in slide-in-from-right duration-200"
            style={{
              backgroundColor: '#1c1d21',
              borderColor: '#3a3d45'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#3a3d45]">
              <div>
                <h2 className="text-sm font-bold text-white">Syllabus & Units</h2>
                <p className="text-[11px] text-zinc-400">
                  {doneCount} of {cfg.units.length} units completed ({Math.round((doneCount / cfg.units.length) * 100)}%)
                </p>
              </div>

              <button
                onClick={() => setSyllabusOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                title="Close Syllabus"
                aria-label="Close Syllabus"
              >
                <X size={18} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#173a30] h-1.5 overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${(doneCount / cfg.units.length) * 100}%`,
                  backgroundColor: '#7ee8c3'
                }}
              />
            </div>

            {/* Search Filter */}
            <div className="p-3 border-b border-[#3a3d45]">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Filter units or topics..."
                  value={syllabusSearch}
                  onChange={e => setSyllabusSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-[#3a3d45] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7ee8c3]"
                />
              </div>
            </div>

            {/* Units and Subtopics List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
              {filteredUnits.map(unit => {
                const subtopics = unit.topics.split(',').map(s => s.trim());
                const isUnitDone = completedUnits[unit.id];
                const isCurrent = currentUnit?.id === unit.id;

                return (
                  <div
                    key={unit.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-[#173a30]/30 border-[#7ee8c3]'
                        : 'bg-white/5 border-[#3a3d45] hover:border-zinc-500'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded font-mono"
                            style={{
                              backgroundColor: '#173a30',
                              color: '#7ee8c3'
                            }}
                          >
                            Unit {unit.number}
                          </span>
                          <h3 className="text-xs font-bold text-white">{unit.title}</h3>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          jumpToPage(unit.page);
                          setSyllabusOpen(false);
                        }}
                        className="px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer hover:brightness-110 transition-all whitespace-nowrap min-h-[32px]"
                        style={{
                          backgroundColor: '#173a30',
                          color: '#7ee8c3'
                        }}
                        title={`Jump to Page ${unit.page}`}
                      >
                        p. {unit.page}
                      </button>
                    </div>

                    {/* Subtopic checkboxes */}
                    <div className="space-y-1.5 pl-1 pt-1 border-t border-white/5">
                      {subtopics.map((topic, tIdx) => {
                        const isDone = subtopicsDone[`${unit.id}_${tIdx}`];
                        return (
                          <label
                            key={tIdx}
                            className="flex items-center gap-2 text-xs text-zinc-300 hover:text-white cursor-pointer select-none py-0.5"
                          >
                            <input
                              type="checkbox"
                              checked={!!isDone}
                              onChange={() => toggleSubtopic(unit.id, tIdx)}
                              className="accent-[#7ee8c3] w-3.5 h-3.5 rounded cursor-pointer"
                            />
                            <span className={isDone ? 'line-through text-zinc-500' : ''}>
                              {topic}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Quiz & complete status */}
                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => toggleUnitCompleted(unit.id)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 hover:text-white cursor-pointer"
                      >
                        {isUnitDone ? (
                          <>
                            <CheckCircle2 size={13} className="text-[#7ee8c3]" />
                            <span className="text-[#7ee8c3]">Completed</span>
                          </>
                        ) : (
                          <>
                            <Circle size={13} />
                            <span>Mark complete</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          openUnitQuiz(unit);
                          setSyllabusOpen(false);
                        }}
                        className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                      >
                        <Trophy size={12} />
                        <span>Take Quiz</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Interactive Unit Quiz Modal ── */}
      {activeQuizUnit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setActiveQuizUnit(null)}
        >
          <div
            className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            style={{
              backgroundColor: '#1c1d21',
              borderColor: '#3a3d45'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#3a3d45]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <Trophy size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Unit {activeQuizUnit.number} Quiz: {activeQuizUnit.title} ({activeQuestions.length} Questions)
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Score 70% (at least {Math.ceil(activeQuestions.length * 0.7)}/{activeQuestions.length}) to mark unit completed
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveQuizUnit(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Close Quiz"
                aria-label="Close Quiz"
              >
                <X size={18} />
              </button>
            </div>

            {/* Questions Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs">
              {activeQuestions.map((q, qIdx) => {
                const userChoice = quizAnswers[qIdx];
                return (
                  <div key={qIdx} className="p-3.5 rounded-xl bg-white/5 border border-[#3a3d45]">
                    <p className="font-semibold text-white mb-2.5">
                      <span className="text-[#7ee8c3] mr-1">Q{qIdx + 1}.</span> {q.question}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = "bg-white/5 border-[#3a3d45] text-zinc-300 hover:bg-white/10";
                        if (quizSubmitted) {
                          if (optIdx === q.correct) {
                            btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                          } else if (userChoice === optIdx) {
                            btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                          }
                        } else if (userChoice === optIdx) {
                          btnStyle = "bg-[#173a30] border-[#7ee8c3] text-[#7ee8c3] font-bold";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                            className={`w-full text-left px-3 py-2 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.correct && (
                              <Check size={14} className="text-emerald-400 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="mt-2.5 pt-2 border-t border-white/5 text-[11px] text-zinc-400 leading-relaxed">
                        <span className="font-bold text-[#7ee8c3]">Explanation:</span> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Quiz Results Banner */}
              {quizSubmitted && (
                <div
                  className="p-4 rounded-xl text-center border"
                  style={{
                    backgroundColor: quizScore / activeQuestions.length >= 0.7 ? '#173a30' : 'rgba(239, 68, 68, 0.1)',
                    borderColor: quizScore / activeQuestions.length >= 0.7 ? '#7ee8c3' : '#ef4444'
                  }}
                >
                  <p className="text-sm font-bold text-white mb-1">
                    {quizScore / activeQuestions.length >= 0.7 ? "🎉 Unit Completed!" : "Keep practicing!"}
                  </p>
                  <p className="text-xs text-zinc-300">
                    You scored {quizScore} out of {activeQuestions.length} ({Math.round((quizScore / activeQuestions.length) * 100)}%)
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#3a3d45] flex items-center justify-between bg-black/20">
              {quizSubmitted ? (
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 border border-[#3a3d45] cursor-pointer min-h-[44px]"
                >
                  <RotateCcw size={14} />
                  <span>Retry Quiz</span>
                </button>
              ) : (
                <div className="text-[11px] text-zinc-400">
                  {Object.keys(quizAnswers).length} of {activeQuestions.length} answered
                </div>
              )}

              {quizSubmitted ? (
                <button
                  onClick={() => setActiveQuizUnit(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-black cursor-pointer min-h-[44px]"
                  style={{ backgroundColor: '#7ee8c3' }}
                >
                  Done
                </button>
              ) : (
                <button
                  onClick={() => handleQuizSubmit(activeQuestions)}
                  disabled={Object.keys(quizAnswers).length === 0}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-black disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-h-[44px]"
                  style={{ backgroundColor: '#f59e0b' }}
                >
                  Submit Answers
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
