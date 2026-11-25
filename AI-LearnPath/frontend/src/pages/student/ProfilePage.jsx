import React, { useState, useEffect } from 'react'
import { User, Save, RefreshCw, AlertTriangle, CheckCircle, Camera } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'

export default function ProfilePage() {
  const { user, login } = useAuth()
  const [form, setForm] = useState({
    name: '',
    preferred_language: 'English',
    skill_level: 'beginner',
    daily_study_time: 2,
    learning_preference: 'visual',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        preferred_language: user.preferred_language || 'English',
        skill_level: user.skill_level || 'beginner',
        daily_study_time: user.daily_study_time || 2,
        learning_preference: user.learning_preference || 'visual',
      })
    }
  }, [user])

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Name is required'); return }
    setSaving(true)
    setError('')
    try {
      const res = await api.put('/api/profile', form)
      // Update local auth state
      const updatedUser = { ...user, ...res.data?.user, ...form }
      localStorage.setItem('user_data', JSON.stringify(updatedUser))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to save profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const initials = (user?.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <User size={24} className="text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {initials}
            </div>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{user?.name}</p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            {user?.career && (
              <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full mt-1 inline-block">
                🎯 {user.career}
              </span>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Language</label>
            <select value={form.preferred_language} onChange={e => update('preferred_language', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Bengali'].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Skill Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Self-Assessed Skill Level</label>
            <div className="grid grid-cols-3 gap-3">
              {['beginner', 'intermediate', 'advanced'].map(level => (
                <button key={level} onClick={() => update('skill_level', level)}
                  className={`py-3 rounded-xl text-sm font-semibold capitalize border-2 transition-all ${
                    form.skill_level === level
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-gray-50'
                  }`}>
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Study Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Daily Study Goal: <span className="text-blue-600 font-bold">{form.daily_study_time}h / day</span>
            </label>
            <input
              type="range" min="0.5" max="8" step="0.5" value={form.daily_study_time}
              onChange={e => update('daily_study_time', parseFloat(e.target.value))}
              className="w-full accent-blue-600 h-2 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>30 min</span><span>4h</span><span>8h</span>
            </div>
          </div>

          {/* Learning Preference */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Learning Style</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'visual', label: 'Visual', desc: 'Diagrams, charts, videos' },
                { key: 'reading', label: 'Reading', desc: 'Articles, docs, books' },
                { key: 'practice', label: 'Practice', desc: 'Hands-on exercises' },
                { key: 'mixed', label: 'Mixed', desc: 'A bit of everything' },
              ].map(p => (
                <button key={p.key} onClick={() => update('learning_preference', p.key)}
                  className={`py-3 px-4 rounded-xl text-left border-2 transition-all ${
                    form.learning_preference === p.key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                  }`}>
                  <p className={`text-sm font-semibold ${form.learning_preference === p.key ? 'text-blue-700' : 'text-gray-800'}`}>{p.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700 flex items-center gap-2">
            <AlertTriangle size={14} /> {error}
          </div>
        )}

        {/* Save Button */}
        <button onClick={handleSave} disabled={saving}
          className={`mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
            saved
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-md shadow-blue-200 disabled:opacity-60'
          }`}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : saving ? <><RefreshCw size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {/* Account Info (read-only) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Account Information</h3>
        <div className="space-y-3">
          {[
            { label: 'Email', value: user?.email },
            { label: 'Role', value: user?.is_admin ? 'Administrator' : 'Student' },
            { label: 'Member Since', value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A' },
            { label: 'Diagnostic Status', value: user?.diagnostic_completed ? '✅ Completed' : '⚠️ Pending' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-sm font-medium text-gray-800">{value || '—'}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
