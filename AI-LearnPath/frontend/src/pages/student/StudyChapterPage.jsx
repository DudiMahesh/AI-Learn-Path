import React, { useState, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  BookOpen, Bot, Sparkles, Trophy, FileText, Search, 
  ChevronLeft, ChevronRight, CheckCircle2, ArrowRight,
  ExternalLink, Layers, GraduationCap, ChevronDown, 
  Sun, Moon, Shield, Award, HelpCircle, Check, X, Pin
} from 'lucide-react';
import { STUDY_SUBJECTS } from '../../data/neetStudyChaptersData';
import { UNIT_TEXTBOOKS, getUnitMasterclass } from '../../data/neetUnitTextbooks';
import { SUBJECTS_CONFIG } from '../../data/neetCurriculumData';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import { FormattedMessageContent } from './NEETAITutorPage';

export default function StudyChapterPage() {
  const navigate = useNavigate();
  const { subject: urlSubject } = useParams();
  const { darkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();

  // Selected subject: physics, chemistry, biology
  const [activeSubject, setActiveSubject] = useState(
    urlSubject && STUDY_SUBJECTS[urlSubject.toLowerCase()] ? urlSubject.toLowerCase() : 'physics'
  );
  
  // Class filter: 'all', 11, or 12
  const [selectedClass, setSelectedClass] = useState(11);
  const [chapterSearch, setChapterSearch] = useState('');
  
  // Hover-to-reveal & Pin states
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const isSidebarVisible = isSidebarPinned || isSidebarHovered;

  // Active Subject Data
  const currentSubjectData = STUDY_SUBJECTS[activeSubject] || STUDY_SUBJECTS.physics;

  // Filtered chapters based on Class and Search
  const filteredChapters = useMemo(() => {
    let list = currentSubjectData.chapters || [];
    if (selectedClass !== 'all') {
      list = list.filter(ch => ch.classLevel === selectedClass);
    }
    if (chapterSearch.trim()) {
      const q = chapterSearch.toLowerCase();
      list = list.filter(ch => 
        ch.title.toLowerCase().includes(q) || 
        ch.code.includes(q) ||
        (ch.overview && ch.overview.toLowerCase().includes(q))
      );
    }
    return list;
  }, [currentSubjectData, selectedClass, chapterSearch]);

  // Selected Chapter (defaults to first filtered or first available)
  const [selectedChapterId, setSelectedChapterId] = useState(
    currentSubjectData.chapters[0]?.id || 'phy-11-01'
  );

  const activeChapter = useMemo(() => {
    return currentSubjectData.chapters.find(c => c.id === selectedChapterId) || currentSubjectData.chapters[0];
  }, [currentSubjectData, selectedChapterId]);

  // Active Reading Tab: 'overview' | 'textbook' | 'sections' | 'formulas' | 'mcq'
  const [activeTab, setActiveTab] = useState('overview');

  // Interactive MCQ selection state inside the chapter reader
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const handleSubjectChange = (newSub) => {
    setActiveSubject(newSub);
    const subData = STUDY_SUBJECTS[newSub] || STUDY_SUBJECTS.physics;
    const firstCh = subData.chapters.find(c => c.classLevel === selectedClass) || subData.chapters[0];
    if (firstCh) setSelectedChapterId(firstCh.id);
  };

  const handleSelectChapter = (ch) => {
    setSelectedChapterId(ch.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Associated Unit Masterclass from neetUnitTextbooks
  const unitMasterclass = useMemo(() => {
    const unitNum = activeChapter?.mappedUnitId || activeChapter?.chapterNumber || 1;
    const subUnits = UNIT_TEXTBOOKS[activeSubject] || {};
    return subUnits[unitNum] || getUnitMasterclass(activeSubject, unitNum, activeChapter?.title);
  }, [activeSubject, activeChapter]);

  // Subject config for colors & cheat sheet
  const currentCfg = SUBJECTS_CONFIG[activeSubject] || SUBJECTS_CONFIG.physics;

  return (
    <div className="h-screen bg-[#0a0f1d] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 overflow-hidden">
      
      {/* ── TOP NAV BAR (Matches Eklavya & Modern Study Portal) ── */}
      <header className="h-16 flex-shrink-0 z-30 border-b border-slate-800 bg-[#0c1322] px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <Link to="/study" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                AI LearnPath
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                NEET 2026
              </span>
            </div>
          </Link>

          {/* Primary Top Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 ml-2">
            <Link
              to="/study"
              className="px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Study</span>
            </Link>

            <Link
              to="/courses/ai-tutor"
              className="px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>AI Tutor</span>
            </Link>

            <Link
              to="/courses/quiz"
              className="px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Practice</span>
            </Link>

            <Link
              to="/courses/formulas"
              className="px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Formulas &amp; Tools</span>
            </Link>

            <Link
              to="/pyq-papers"
              className="px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <Award className="w-4 h-4 text-rose-400" />
              <span>PYQ Papers</span>
            </Link>
          </nav>
        </div>

        {/* Right Tools (Search, Theme, User) */}
        <div className="flex items-center gap-3">
          {/* Quick Search Trigger */}
          <div className="relative hidden lg:block w-56">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Search chapters... ⌘K"
              value={chapterSearch}
              onChange={(e) => setChapterSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Theme switcher */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile / Dashboard Link */}
          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 pl-2 border-l border-slate-800 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'S'}
              </div>
              <span className="hidden xl:inline-block text-xs font-semibold text-slate-200">
                {user?.name || 'Student'}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* ── MAIN 2-COLUMN STUDY WORKSPACE ── */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        
        {/* ── LEFT COLUMN: CHAPTERS SIDEBAR (Mouse over to appear, mouse out to disappear) ── */}
        <aside
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          className={`border-r border-slate-800/80 bg-[#0b101d] flex flex-col transition-all duration-300 select-none relative z-20 ${
            isSidebarVisible ? 'w-80 lg:w-96 shadow-2xl' : 'w-14 items-center cursor-pointer'
          }`}
        >
          {/* Sidebar Top: Breadcrumb & Actions */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between w-full">
            {isSidebarVisible ? (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <span>Study</span>
                  <span>&gt;</span>
                  {/* Subject Dropdown Switcher */}
                  <div className="relative group inline-block">
                    <button className="font-bold text-emerald-400 flex items-center gap-1 hover:underline">
                      {currentSubjectData.name}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <div className="absolute left-0 mt-1 w-36 py-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl hidden group-hover:block z-50">
                      {Object.keys(STUDY_SUBJECTS).map((subKey) => (
                        <button
                          key={subKey}
                          onClick={() => handleSubjectChange(subKey)}
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-slate-800 capitalize ${
                            activeSubject === subKey ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-300'
                          }`}
                        >
                          {STUDY_SUBJECTS[subKey].name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <h2 className="font-extrabold text-lg text-white tracking-tight">
                    Chapters
                  </h2>
                  <span className="text-xs font-bold text-slate-400">
                    ({filteredChapters.length})
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-1 text-emerald-400" title="Mouse over to show chapters">
                <ChevronRight className="w-4 h-4 animate-pulse" />
                <span className="text-[9px] font-mono font-bold mt-1 text-slate-400 uppercase tracking-tighter">Menu</span>
              </div>
            )}

            {/* Pin Toggle Button */}
            {isSidebarVisible && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsSidebarPinned(!isSidebarPinned)}
                  title={isSidebarPinned ? "Sidebar is Pinned (click to auto-hide on mouse leave)" : "Auto-Hide Active (click to Pin open)"}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isSidebarPinned
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Pin className={`w-3.5 h-3.5 ${isSidebarPinned ? 'rotate-45 fill-current' : ''}`} />
                </button>
              </div>
            )}
          </div>

          {isSidebarVisible ? (
            <>
              {/* Class Filter Tabs: Class 11 vs Class 12 */}
              <div className="p-3 border-b border-slate-800/80 bg-slate-950/40">
                <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setSelectedClass(11)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedClass === 11
                        ? 'bg-[#142036] text-emerald-400 border border-emerald-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>Class 11</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                      {currentSubjectData.class11Count || 14}
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedClass(12)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedClass === 12
                        ? 'bg-[#142036] text-emerald-400 border border-emerald-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>Class 12</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                      {currentSubjectData.class12Count || 14}
                    </span>
                  </button>
                </div>
              </div>

              {/* Scrollable Chapter Cards List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                {filteredChapters.map((ch) => {
                  const isSelected = ch.id === selectedChapterId;
                  return (
                    <div
                      key={ch.id}
                      onClick={() => handleSelectChapter(ch)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 group ${
                        isSelected
                          ? 'bg-[#111c30] border-emerald-500/60 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                          : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700/80'
                      }`}
                    >
                      {/* Chapter Number Badge (Pill) */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 transition-transform group-hover:scale-105 font-mono ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                            : 'bg-slate-800/80 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {ch.code}
                      </div>

                      {/* Title & Metadata */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-bold text-sm tracking-tight truncate transition-colors ${
                            isSelected ? 'text-white font-extrabold' : 'text-slate-200 group-hover:text-emerald-300'
                          }`}
                        >
                          {ch.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                          {ch.sectionsCount} sections · {ch.exercisesCount} exercises
                        </p>
                      </div>

                      {/* Active Indicator Chevron */}
                      {isSelected && (
                        <div className="w-1.5 h-5 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
                      )}
                    </div>
                  );
                })}

                {filteredChapters.length === 0 && (
                  <div className="text-center py-10 px-4 text-slate-400 text-xs">
                    No chapters found matching "{chapterSearch}".
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Collapsed State Mini Column */
            <div className="flex-1 py-4 flex flex-col items-center gap-3">
              {filteredChapters.slice(0, 8).map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChapter(ch)}
                  title={`${ch.code}: ${ch.title}`}
                  className={`w-9 h-9 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all ${
                    ch.id === selectedChapterId
                      ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {ch.code}
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* ── RIGHT COLUMN: CHAPTER MASTER READER VIEW ── */}
        <main className="flex-1 overflow-y-auto bg-[#070b14] px-6 sm:px-10 lg:px-14 py-8 custom-scrollbar">
          
          {/* Breadcrumb Header */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
            <span className="text-emerald-400 font-semibold">{currentSubjectData.name}</span>
            <span>&gt;</span>
            <span>Class {activeChapter?.classLevel || 11}</span>
            <span>&gt;</span>
            <span className="text-slate-300 font-bold">{activeChapter?.title}</span>
          </div>

          {/* Chapter Main Title & Subtitle */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
              {activeChapter?.title}
            </h1>
            <p className="text-sm font-semibold text-slate-400">
              Chapter {activeChapter?.chapterNumber} · {currentSubjectData.name}
            </p>
          </div>

          {/* Primary Action Buttons Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('textbook')}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Reading</span>
            </button>

            <button
              onClick={() => navigate('/courses/ai-tutor', {
                state: {
                  subject: activeSubject,
                  autoQuery: `Explain ${activeChapter?.title || 'this chapter'} (Unit ${activeChapter?.chapterNumber || 1} in NEET ${currentCfg.title || activeSubject}): Comprehensive Textbook Chapter Masterclass. Cover ALL subtopics (${(activeChapter?.topics || []).join(', ')}), definitions, mathematical derivations, 2+ high-resolution 3D vector diagrams/infographics, comparison tables, 4+ worked examples with solved numericals, NEET traps, and practice MCQs.`
                }
              })}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/80 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>AI Tutor Masterclass</span>
            </button>

            <button
              onClick={() => setActiveTab('mcq')}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/80 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Practice Exercises</span>
            </button>

            <a
              href={currentSubjectData.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-800/60 hover:bg-slate-750 text-slate-300 border border-slate-700/60 flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Official PDF Guide</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          {/* ── CHAPTER CONTENT TABS (Overview, Sections, Textbook, Formulas, MCQs) ── */}
          <div className="border-b border-slate-800/90 mb-8 flex items-center gap-6 text-sm font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === 'overview' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Chapter Overview
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('sections')}
              className={`pb-3 transition-colors relative cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'sections' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Sections</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                {activeChapter?.sectionsCount || 8}
              </span>
              {activeTab === 'sections' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('textbook')}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === 'textbook' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Interactive Masterclass
              {activeTab === 'textbook' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('formulas')}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === 'formulas' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Formulas &amp; Traps
              {activeTab === 'formulas' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('mcq')}
              className={`pb-3 transition-colors relative cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'mcq' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Practice MCQs</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                NEET
              </span>
              {activeTab === 'mcq' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
              )}
            </button>
          </div>

          {/* ── TAB 1: OVERVIEW SECTION (Matches the user's uploaded screenshot) ── */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-4xl animate-fadeIn">
              {/* OVERVIEW Header & Text */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">
                  OVERVIEW
                </h4>
                <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 font-normal bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 shadow-sm">
                  {activeChapter?.overview?.split('\n\n').map((paragraph, pi) => (
                    <p key={pi}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Core NCERT High-Yield Takeaways */}
              {activeChapter?.keyTakeaways && (
                <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                  <h3 className="font-extrabold text-base text-emerald-400 flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" />
                    <span>NCERT High-Yield Core Takeaways</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {activeChapter.keyTakeaways.map((point, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-200 leading-relaxed font-medium">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Jump to Sections */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">
                  CHAPTER SECTIONS ({activeChapter?.sections?.length || 0})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeChapter?.sections?.map((sec) => (
                    <div
                      key={sec.id}
                      onClick={() => setActiveTab('textbook')}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-slate-800 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {sec.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors">
                          {sec.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 flex-shrink-0 font-mono">
                        {sec.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: CHAPTER SECTIONS BREAKDOWN ── */}
          {activeTab === 'sections' && (
            <div className="space-y-4 max-w-4xl animate-fadeIn">
              <h3 className="text-lg font-bold text-white mb-2">
                Detailed Topic Sections
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Curated step-by-step NCERT syllabus topics covered in {activeChapter?.title}.
              </p>

              <div className="space-y-3">
                {activeChapter?.sections?.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between hover:border-emerald-500/40 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold font-mono text-sm flex items-center justify-center">
                        {sec.id < 10 ? `0${sec.id}` : sec.id}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-100">
                          {sec.title}
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          Estimated reading: {sec.duration} · High-yield for NEET
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('textbook')}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Read Section</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 3: COMPLETE TEXTBOOK MASTERCLASS ── */}
          {activeTab === 'textbook' && (
            <div className="max-w-4xl animate-fadeIn space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-white">
                    {unitMasterclass?.title || activeChapter?.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Exhaustive textbook chapter with derivations, worked numericals &amp; 3D vector diagrams.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/courses/ai-tutor', {
                    state: {
                      subject: activeSubject,
                      autoQuery: `Explain ${activeChapter?.title || 'this chapter'} (Unit ${activeChapter?.chapterNumber || 1} in NEET ${currentCfg.title || activeSubject}): Comprehensive Textbook Chapter Masterclass. Cover ALL subtopics (${(activeChapter?.topics || []).join(', ')}), definitions, mathematical derivations, 2+ high-resolution 3D vector diagrams/infographics, comparison tables, 4+ worked examples with solved numericals, NEET traps, and practice MCQs.`
                    }
                  })}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI Tutor</span>
                </button>
              </div>

              {/* Formatted Markdown Content with ChatGPT / Claude Style Rendering & 3D Interactive Schematics */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-200">
                <FormattedMessageContent text={unitMasterclass?.content || (typeof unitMasterclass === 'string' ? unitMasterclass : '')} textSize="base" />
              </div>
            </div>
          )}

          {/* ── TAB 4: FORMULAS & CHEAT SHEET ── */}
          {activeTab === 'formulas' && (
            <div className="max-w-4xl animate-fadeIn space-y-6">
              <h3 className="text-lg font-bold text-white mb-2">
                Essential Formulas &amp; Dimensional Relations
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Rapid revision cheat sheet for NEET calculations and dimensional homogeneity.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCfg?.cheatSheet?.map((sheet, si) => (
                  <div key={si} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <h4 className="font-extrabold text-sm text-emerald-400 mb-3 pb-2 border-b border-slate-800">
                      {sheet.title}
                    </h4>
                    <ul className="space-y-2">
                      {sheet.formulas.map((f, fi) => (
                        <li key={fi} className="text-xs text-slate-200 font-mono bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 5: PRACTICE QUESTIONS & EXPLANATIONS ── */}
          {activeTab === 'mcq' && (
            <div className="max-w-4xl animate-fadeIn space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    NEET Practice Drill: {activeChapter?.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Authentic exam-pattern MCQs with complete step-by-step solutions and distractor breakdowns.
                  </p>
                </div>
              </div>

              {currentCfg?.sampleQuiz?.map((q, qIndex) => {
                const selectedOpt = userAnswers[qIndex];
                const isRevealed = revealedSolutions[qIndex];

                return (
                  <div
                    key={qIndex}
                    className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {qIndex + 1}
                      </span>
                      <p className="font-semibold text-sm text-slate-100 leading-relaxed">
                        {q.question}
                      </p>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {q.options.map((opt, oIndex) => {
                        const optLetter = String.fromCharCode(65 + oIndex);
                        const isChosen = selectedOpt === oIndex;
                        const isCorrect = q.correct === oIndex;

                        let optClasses = 'border-slate-800 bg-slate-950/60 text-slate-200 hover:border-slate-700';
                        if (isRevealed) {
                          if (isCorrect) optClasses = 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-bold';
                          else if (isChosen) optClasses = 'border-red-500 bg-red-500/15 text-red-300';
                        } else if (isChosen) {
                          optClasses = 'border-emerald-500/80 bg-emerald-500/10 text-emerald-300';
                        }

                        return (
                          <button
                            key={oIndex}
                            onClick={() => {
                              setUserAnswers({ ...userAnswers, [qIndex]: oIndex });
                            }}
                            className={`p-3 rounded-xl border text-left text-xs flex items-center gap-3 transition-all cursor-pointer ${optClasses}`}
                          >
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                              {optLetter}
                            </span>
                            <span className="flex-1 font-mono">{opt}</span>
                            {isRevealed && isCorrect && <Check className="w-4 h-4 text-emerald-400 ml-auto" />}
                            {isRevealed && isChosen && !isCorrect && <X className="w-4 h-4 text-red-400 ml-auto" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Reveal Solution Button */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
                      <button
                        onClick={() => setRevealedSolutions({ ...revealedSolutions, [qIndex]: !isRevealed })}
                        className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {isRevealed ? 'Hide Solution' : 'View Detailed Solution & Analysis →'}
                      </button>
                    </div>

                    {/* Exhaustive Solution Card */}
                    {isRevealed && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs leading-relaxed space-y-2">
                        <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Correct Answer: Option {String.fromCharCode(65 + q.correct)}</span>
                        </div>
                        <p className="text-slate-300">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>

    </div>
  );
}

