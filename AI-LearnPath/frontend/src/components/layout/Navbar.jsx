import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Menu, Search, Bell, Sun, Moon, User as UserIcon, 
  Settings, LogOut, Shield, ChevronDown, CheckCheck, 
  Sparkles, BookOpen, Compass, Map, BarChart2,
  MessageSquare, FileText, Calendar, TrendingUp, X
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';

// ─── Static suggestion catalogue ─────────────────────────────────────────────
const SEARCH_CATALOGUE = [
  { label: 'Dashboard',          path: '/dashboard',              category: 'Pages',     icon: BarChart2 },
  { label: 'My Courses',         path: '/courses',                category: 'Pages',     icon: BookOpen },
  { label: 'Learning Path',      path: '/learning-path',          category: 'Pages',     icon: Map },
  { label: 'AI Learning Assistant', path: '/ai-assistant',        category: 'Pages',     icon: MessageSquare },
  { label: 'AI Insights',        path: '/ai-insights',            category: 'Pages',     icon: Sparkles },
  { label: 'AI Recommendations', path: '/ai-recommendations',     category: 'Pages',     icon: Sparkles },
  { label: 'Assessments',        path: '/assessments',            category: 'Pages',     icon: FileText },
  { label: 'Assessment History', path: '/assessment-history',     category: 'Pages',     icon: FileText },
  { label: 'Career Readiness',   path: '/career-readiness',       category: 'Pages',     icon: TrendingUp },
  { label: 'Progress Analytics', path: '/progress',               category: 'Pages',     icon: BarChart2 },
  { label: 'Calendar',           path: '/calendar',               category: 'Pages',     icon: Calendar },
  { label: 'What-If Learning',   path: '/what-if',                category: 'Pages',     icon: Sparkles },
  { label: 'My Profile',         path: '/profile',                category: 'Account',   icon: UserIcon },
  { label: 'Account Settings',   path: '/settings',               category: 'Account',   icon: Settings },
  { label: 'Formula & Cheat Sheets', path: '/courses/formulas',   category: 'Study Tools', icon: FileText },
  { label: 'Practice MCQ Quiz',      path: '/courses/quiz',       category: 'Study Tools', icon: Sparkles },
  { label: 'AI Study Assistant',     path: '/courses/ai-tutor',   category: 'Study Tools', icon: MessageSquare },
  { label: 'NEET Physics Guide',     path: '/courses/pdf-viewer?file=%2Fmaterials%2FNEET_UG_2026_Physics_Expanded_Study_Guide.pdf', category: 'Materials', icon: BookOpen },
  { label: 'NEET Chemistry Guide',   path: '/courses/pdf-viewer?file=%2Fmaterials%2FNEET_UG_2026_Chemistry_Expanded_Study_Guide.pdf', category: 'Materials', icon: BookOpen },
  { label: 'NEET Biology Guide',     path: '/courses/pdf-viewer?file=%2Fmaterials%2FNEET_UG_2026_Biology_Complete_Study_Guide.pdf', category: 'Materials', icon: BookOpen },
  { label: 'Kinematics & Mechanics', path: '/courses/pdf-viewer?file=%2Fmaterials%2FNEET_UG_2026_Physics_Expanded_Study_Guide.pdf', category: 'Physics', icon: BookOpen },
  { label: 'Electrostatics & Current Electricity', path: '/courses/pdf-viewer?file=%2Fmaterials%2FNEET_UG_2026_Physics_Expanded_Study_Guide.pdf', category: 'Physics', icon: BookOpen },
  { label: 'Optics & Modern Physics', path: '/courses/pdf-viewer?file=%2Fmaterials%2FNEET_UG_2026_Physics_Expanded_Study_Guide.pdf', category: 'Physics', icon: BookOpen },
  { label: 'Chemical Thermodynamics & Equilibrium', path: '/courses/pdf-viewer?file=%2Fmaterials%2FNEET_UG_2026_Chemistry_Expanded_Study_Guide.pdf', category: 'Chemistry', icon: BookOpen },
  { label: 'Organic Chemistry Mechanisms', path: '/courses/pdf-viewer?file=%2Fmaterials%2FNEET_UG_2026_Chemistry_Expanded_Study_Guide.pdf', category: 'Chemistry', icon: BookOpen },
  { label: 'Genetics & Molecular Biology', path: '/courses/pdf-viewer?file=%2Fmaterials%2FNEET_UG_2026_Biology_Complete_Study_Guide.pdf', category: 'Biology', icon: BookOpen },
  { label: 'Human & Plant Physiology', path: '/courses/pdf-viewer?file=%2Fmaterials%2FNEET_UG_2026_Biology_Complete_Study_Guide.pdf', category: 'Biology', icon: BookOpen },
];

// ─── SearchBar ───────────────────────────────────────────────────────────────
const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const getSuggestions = useCallback((val) => {
    if (!val.trim()) return [];
    const lower = val.toLowerCase();
    return SEARCH_CATALOGUE.filter(item => item.label.toLowerCase().includes(lower)).slice(0, 7);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    const results = getSuggestions(val);
    setSuggestions(results);
    setIsOpen(results.length > 0);
    setActiveIndex(-1);
  };

  const handleSelect = (item) => { setQuery(''); setIsOpen(false); setSuggestions([]); setActiveIndex(-1); navigate(item.path); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) handleSelect(suggestions[activeIndex]);
    else if (suggestions.length > 0) handleSelect(suggestions[0]);
    else if (query.trim()) { navigate(`/courses?q=${encodeURIComponent(query.trim())}`); setQuery(''); setIsOpen(false); }
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, -1)); }
    else if (e.key === 'Escape') { setIsOpen(false); setActiveIndex(-1); inputRef.current?.blur(); }
  };

  const handleClear = () => { setQuery(''); setSuggestions([]); setIsOpen(false); setActiveIndex(-1); inputRef.current?.focus(); };

  useEffect(() => {
    const handler = (e) => { if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const grouped = suggestions.reduce((acc, item) => { if (!acc[item.category]) acc[item.category] = []; acc[item.category].push(item); return acc; }, {});
  let globalIndex = -1;

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-zinc-400" />
        </div>
        <input ref={inputRef} type="text" value={query} onChange={handleChange} onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(suggestions.length > 0)}
          className="block w-full pl-9 pr-8 py-2 border border-zinc-200 dark:border-[#27272a] rounded-lg text-sm bg-zinc-50 dark:bg-[#19191d] text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:bg-white dark:focus:bg-[#19191d] focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          placeholder="Search courses, topics, pages…" autoComplete="off" aria-label="Search" aria-autocomplete="list" aria-expanded={isOpen} />
        {query && (
          <button type="button" onClick={handleClear} className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#19191d] rounded-lg shadow-lg border border-zinc-200 dark:border-[#27272a] z-50 overflow-hidden">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <p className="px-3 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{category}</p>
              {items.map((item) => {
                globalIndex++;
                const idx = globalIndex; const Icon = item.icon; const isActive = idx === activeIndex;
                return (
                  <button key={`${item.path}-${item.label}`} type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleSelect(item); }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
                      isActive ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#232329]'
                    }`}>
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'}`} />
                    <span className="truncate">{item.label}</span>
                    <span className={`ml-auto text-[11px] flex-shrink-0 ${isActive ? 'text-emerald-500' : 'text-zinc-400'}`}>{item.category}</span>
                  </button>
                );
              })}
            </div>
          ))}
          {query && (
            <button type="button"
              onMouseDown={(e) => { e.preventDefault(); navigate(`/courses?q=${encodeURIComponent(query)}`); setIsOpen(false); setQuery(''); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 border-t border-zinc-100 dark:border-[#27272a] text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/5 transition-colors">
              <Search className="w-3.5 h-3.5" />Search for "<span className="font-medium ml-0.5">{query}</span>"
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = ({ onMenuClick }) => {
  const { user, logout, isAdmin } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome to AI LearnPath!', desc: 'Your personalized learning path has been generated based on your diagnostic assessment.', time: 'Just now', read: false, type: 'welcome' },
    { id: 2, title: 'New AI Recommendation', desc: 'Explore the recommended modules tailored to fast-track your career readiness.', time: '1 hour ago', read: false, type: 'ai' },
    { id: 3, title: 'Weekly Learning Goal', desc: 'Keep up your daily streak! Complete 1 more lesson today.', time: '1 day ago', read: true, type: 'goal' }
  ]);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setIsNotificationsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => { setIsProfileOpen(false); logout(); navigate('/login'); };
  const markAllRead = () => { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); };

  return (
    <header className="bg-white/95 dark:bg-[#111113]/95 backdrop-blur-sm border-b border-zinc-200 dark:border-[#27272a] h-14 flex items-center px-4 sm:px-6 z-20 sticky top-0 transition-colors duration-150">
      <button type="button" className="md:hidden text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 p-1.5 -ml-1.5 rounded-md" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1 flex justify-between items-center ml-3 md:ml-0 gap-4">
        {/* Navigation Tabs (Study & Course Bar) */}
        <div className="hidden lg:flex items-center gap-1.5 mr-2">
          <Link
            to="/study"
            className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            <span>Study</span>
          </Link>
          <Link
            to="/courses/ai-tutor"
            className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>AI Tutor</span>
          </Link>
          <Link
            to="/courses/quiz"
            className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
          >
            <BarChart2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Practice</span>
          </Link>
          <Link
            to="/courses/formulas"
            className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-500" />
            <span>Formulas</span>
          </Link>
        </div>

        <div className="flex-1 flex max-w-md"><SearchBar /></div>

        <div className="flex items-center space-x-1">
          <button onClick={toggleDarkMode} title={darkMode ? 'Light Mode' : 'Dark Mode'}
            className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#19191d] transition-colors" aria-label="Toggle theme">
            {darkMode ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>

          <div className="relative" ref={notificationRef}>
            <button onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); }}
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 relative rounded-lg hover:bg-zinc-100 dark:hover:bg-[#19191d] transition-colors" aria-label="Notifications">
              <Bell className="h-[18px] w-[18px]" />
              {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#111113]"></span>}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-1.5 w-80 sm:w-96 bg-white dark:bg-[#19191d] rounded-lg shadow-lg border border-zinc-200 dark:border-[#27272a] py-1 z-50">
                <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-[#27272a] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Notifications</span>
                    {unreadCount > 0 && <span className="bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold px-1.5 py-0.5 rounded">{unreadCount} new</span>}
                  </div>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCheck className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-zinc-50 dark:divide-[#27272a] custom-scrollbar">
                  {notifications.map((n) => (
                    <div key={n.id} className={`px-4 py-3 hover:bg-zinc-50 dark:hover:bg-[#232329] transition-colors flex items-start gap-3 ${!n.read ? 'bg-emerald-50/40 dark:bg-emerald-500/5' : ''}`}>
                      <div className="mt-0.5 p-1.5 rounded-md bg-zinc-100 dark:bg-[#27272a] text-zinc-500 dark:text-zinc-400">
                        {n.type === 'ai' ? <Sparkles className="w-3.5 h-3.5" /> : n.type === 'goal' ? <Compass className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100 truncate">{n.title}</p>
                        <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">{n.desc}</p>
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-zinc-100 dark:border-[#27272a]">
                  <Link to="/dashboard" onClick={() => setIsNotificationsOpen(false)} className="text-[12px] text-emerald-600 dark:text-emerald-400 font-medium hover:underline">View all activity →</Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative ml-1" ref={profileRef}>
            <button onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }}
              className="flex items-center gap-2 cursor-pointer pl-3 border-l border-zinc-200 dark:border-[#27272a] focus:outline-none group">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">{user?.name || 'Student'}</p>
                <p className="text-[11px] text-zinc-400 font-medium capitalize leading-tight">{user?.is_admin ? 'Admin' : (user?.role || 'Student')}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || 'S'}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-150 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-1.5 w-52 bg-white dark:bg-[#19191d] rounded-lg shadow-lg border border-zinc-200 dark:border-[#27272a] py-1 z-50">
                <div className="px-3.5 py-2.5 border-b border-zinc-100 dark:border-[#27272a]">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{user?.name || 'Student'}</p>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{user?.email || ''}</p>
                </div>
                <div className="py-0.5">
                  <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center px-3.5 py-2 text-[13px] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#232329] transition-colors font-medium">
                    <UserIcon className="w-4 h-4 mr-2.5 text-zinc-400" /> Profile
                  </Link>
                  <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center px-3.5 py-2 text-[13px] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#232329] transition-colors font-medium">
                    <Settings className="w-4 h-4 mr-2.5 text-zinc-400" /> Settings
                  </Link>
                  <Link to="/learning-path" onClick={() => setIsProfileOpen(false)} className="flex items-center px-3.5 py-2 text-[13px] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#232329] transition-colors font-medium">
                    <Compass className="w-4 h-4 mr-2.5 text-zinc-400" /> Learning Path
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsProfileOpen(false)} className="flex items-center px-3.5 py-2 text-[13px] text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors font-medium">
                      <Shield className="w-4 h-4 mr-2.5" /> Admin Panel
                    </Link>
                  )}
                </div>
                <div className="border-t border-zinc-100 dark:border-[#27272a] pt-0.5">
                  <button onClick={handleLogout} className="w-full flex items-center px-3.5 py-2 text-[13px] text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-zinc-50 dark:hover:bg-[#232329] transition-colors text-left font-medium">
                    <LogOut className="w-4 h-4 mr-2.5" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
