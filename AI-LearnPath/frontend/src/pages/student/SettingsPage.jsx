import React, { useState } from 'react'
import { Settings, Bell, Moon, Sun, Globe, Shield, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

function Toggle({ on, onChange, label }) {
  return (
    <button onClick={() => onChange(!on)}
      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`}
      aria-label={label}>
      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow ${on ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )
}

function SettingRow({ icon: Icon, iconBg, iconColor, label, desc, children }) {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-slate-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`p-2.5 rounded-xl ${iconBg} flex-shrink-0`}>
          <Icon size={16} className={iconColor} />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-800 dark:text-slate-100 text-sm">{label}</p>
          <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5 truncate">{desc}</p>
        </div>
      </div>
      <div className="ml-4 flex-shrink-0">{children}</div>
    </div>
  )
}

export default function SettingsPage() {
  const { logout } = useAuth()
  const { darkMode, setDarkMode } = useTheme()
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    emailReminders: true,
    weeklyReport: true,
    assessmentAlerts: true,
    compactMode: false,
  })

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout()
      navigate('/login')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Settings size={24} className="text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Settings</h1>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/60">
          <h2 className="font-semibold text-gray-700 dark:text-slate-300 text-sm uppercase tracking-wide">Notifications</h2>
        </div>
        <SettingRow icon={Bell} iconBg="bg-blue-50 dark:bg-blue-900/30" iconColor="text-blue-600 dark:text-blue-400"
          label="Email Reminders" desc="Daily learning reminders and study schedule nudges">
          <Toggle on={settings.emailReminders} onChange={v => setSettings(s => ({ ...s, emailReminders: v }))} label="Email Reminders" />
        </SettingRow>
        <SettingRow icon={Bell} iconBg="bg-purple-50 dark:bg-purple-900/30" iconColor="text-purple-600 dark:text-purple-400"
          label="Weekly Progress Report" desc="Weekly summary of your learning achievements">
          <Toggle on={settings.weeklyReport} onChange={v => setSettings(s => ({ ...s, weeklyReport: v }))} label="Weekly Report" />
        </SettingRow>
        <SettingRow icon={Shield} iconBg="bg-orange-50 dark:bg-orange-900/30" iconColor="text-orange-600 dark:text-orange-400"
          label="Assessment Due Alerts" desc="Notifications when new assessments are available">
          <Toggle on={settings.assessmentAlerts} onChange={v => setSettings(s => ({ ...s, assessmentAlerts: v }))} label="Assessment Alerts" />
        </SettingRow>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/60">
          <h2 className="font-semibold text-gray-700 dark:text-slate-300 text-sm uppercase tracking-wide">Appearance</h2>
        </div>
        <SettingRow icon={darkMode ? Moon : Sun}
          iconBg={darkMode ? "bg-slate-800 text-amber-400" : "bg-yellow-50"}
          iconColor={darkMode ? "text-amber-400" : "text-yellow-600"}
          label="Dark Mode" desc="Switch between light and dark interface themes">
          <Toggle on={darkMode} onChange={setDarkMode} label="Dark Mode" />
        </SettingRow>
        <SettingRow icon={Globe} iconBg="bg-green-50 dark:bg-green-900/30" iconColor="text-green-600 dark:text-green-400"
          label="Compact View" desc="Show more content with reduced card padding">
          <Toggle on={settings.compactMode} onChange={v => setSettings(s => ({ ...s, compactMode: v }))} label="Compact Mode" />
        </SettingRow>
      </div>

      {/* Logout */}
      <button onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-semibold rounded-xl border border-red-100 dark:border-red-900/40 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm">
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  )
}
