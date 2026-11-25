import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Map, BookOpen, ClipboardList, 
  Sparkles, MessageSquare, Brain, Target, 
  BarChart3, Lightbulb, Calendar, Settings,
  GraduationCap, FileText, Award, Pin
} from 'lucide-react';
import clsx from 'clsx';

const navSections = [
  {
    title: 'Core Learning',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Chapter Study (Notes)', path: '/study', icon: BookOpen, badge: 'New' },
      { name: 'My Learning Path', path: '/learning-path', icon: Map, badge: 'Active' },
      { name: 'Courses & Guides', path: '/courses', icon: GraduationCap },
      { name: 'Formula Sheets', path: '/courses/formulas', icon: FileText },
      { name: 'Practice Quizzes', path: '/courses/quiz', icon: Sparkles },
      { name: 'Assessments', path: '/assessments', icon: ClipboardList },
      { name: 'NEET PYQ Papers', path: '/pyq-papers', icon: Award, badge: 'PYQ' },
    ]
  },
  {
    title: 'AI Intelligence',
    items: [
      { name: 'AI Recommendations', path: '/recommendations', icon: Sparkles, highlight: true },
      { name: 'AI Assistant', path: '/ai-assistant', icon: MessageSquare, badge: 'AI' },
      { name: 'AI Insights', path: '/ai-insights', icon: Brain },
      { name: 'What-If Learning', path: '/what-if', icon: Lightbulb },
      { name: 'Career Readiness', path: '/career-readiness', icon: Target },
    ]
  },
  {
    title: 'Performance & Tools',
    items: [
      { name: 'Analytics', path: '/analytics', icon: BarChart3 },
      { name: 'Calendar', path: '/calendar', icon: Calendar },
      { name: 'Settings', path: '/settings', icon: Settings },
    ]
  }
];

const Sidebar = ({ isPinned = false, onTogglePin = null, onClose = null }) => {
  return (
    <aside className="flex flex-col w-64 bg-white dark:bg-[#111113] h-full overflow-y-auto custom-scrollbar border-r border-zinc-200 dark:border-[#27272a] select-none shadow-lg">

      {/* Brand Header */}
      <div className="p-4 pb-3 flex items-center justify-between border-b border-zinc-100 dark:border-[#1e2025]">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              AI LearnPath
            </h1>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
              NEET Preparation Hub
            </p>
          </div>
        </div>

        {/* Pin / Auto-Hide Indicator & Toggle */}
        {onTogglePin && (
          <button
            type="button"
            onClick={onTogglePin}
            title={isPinned ? "Sidebar is Pinned (click to enable Auto-Hide on mouse out)" : "Auto-Hide Active (click to Pin open)"}
            className={clsx(
              "p-1.5 rounded-lg text-xs transition-colors cursor-pointer",
              isPinned
                ? "bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            <Pin className={clsx("w-3.5 h-3.5 transition-transform", isPinned ? "rotate-45 fill-current" : "")} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-5 pt-1 pb-4">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-0.5">
            <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {section.title}
            </p>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => clsx(
                    'group flex items-center justify-between px-3 py-2 text-[13px] font-medium rounded-lg transition-colors duration-150',
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-[#19191d]'
                  )}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center min-w-0">
                        <Icon className={clsx(
                          'mr-2.5 h-4 w-4 flex-shrink-0',
                          isActive 
                            ? 'text-emerald-600 dark:text-emerald-400' 
                            : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-500 dark:group-hover:text-zinc-400'
                        )} />
                        <span className="truncate">{item.name}</span>
                      </div>

                      {item.badge && (
                        <span className={clsx(
                          'text-[10px] font-semibold px-1.5 py-0.5 rounded',
                          isActive
                            ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : 'bg-zinc-100 dark:bg-[#27272a] text-zinc-500 dark:text-zinc-500'
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Status Card */}
      <div className="p-3 mt-auto">
        <div className="rounded-lg p-3.5 bg-zinc-50 dark:bg-[#19191d] border border-zinc-100 dark:border-[#27272a]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                AI Learning Engine
              </p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                Personalizing your learning path
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Online</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
