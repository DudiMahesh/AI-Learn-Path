import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Database, BookOpen, Users, ChevronLeft, Brain, Crown, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/knowledge-base', label: 'Knowledge Base', icon: Database },
  { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  { to: '/admin/users', label: 'Users', icon: Users },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const { user, isSuperAdmin, logout } = useAuth()

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-60 bg-slate-900 flex flex-col flex-shrink-0 border-r border-slate-800">
        {/* Logo */}
        <div className="p-5 border-b border-slate-800 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-950/40">
              <Brain size={16} className="text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-sm block leading-tight">AI LearnPath</span>
              <span className="text-slate-400 text-[11px] block">Control Console</span>
            </div>
          </div>

          {/* Role Clearance Pill */}
          <div className="pt-1">
            {isSuperAdmin ? (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                <Crown size={11} className="text-amber-400" />
                <span>Super Administrator</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                <ShieldCheck size={11} className="text-emerald-400" />
                <span>Platform Admin</span>
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }>
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>

        {/* User Card & Back to App */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <div className="px-2 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
            <p className="text-[11px] text-slate-400 font-mono truncate">{user?.email || 'admin@ailearnpath.com'}</p>
          </div>
          <button onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-xs py-2 transition-colors w-full cursor-pointer px-2">
            <ChevronLeft size={14} /> Back to Student Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
