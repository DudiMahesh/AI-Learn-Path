import React, { useState, useEffect } from 'react'
import { Users, BookOpen, Database, ClipboardList, TrendingUp, Activity } from 'lucide-react'
import { adminService } from '../../services/adminService'
import LoadingSpinner from '../../components/common/LoadingSpinner'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getStats()
      .then(d => setStats(d))
      .catch(() => setStats({ users: 0, courses: 0, documents: 0, assessments: 0 }))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>

  const cards = [
    { label: 'Total Users', value: stats?.users || 0, icon: Users, color: 'text-blue-600', bg: 'from-blue-50 to-blue-100', border: 'border-blue-100' },
    { label: 'Active Courses', value: stats?.courses || 0, icon: BookOpen, color: 'text-green-600', bg: 'from-green-50 to-green-100', border: 'border-green-100' },
    { label: 'RAG Documents', value: stats?.documents || 0, icon: Database, color: 'text-purple-600', bg: 'from-purple-50 to-purple-100', border: 'border-purple-100' },
    { label: 'Assessment Attempts', value: stats?.assessments || 0, icon: ClipboardList, color: 'text-orange-600', bg: 'from-orange-50 to-orange-100', border: 'border-orange-100' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map(c => (
          <div key={c.label} className={`bg-gradient-to-br ${c.bg} border ${c.border} rounded-2xl p-6 shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <c.icon size={22} className={c.color} />
              <TrendingUp size={16} className="text-gray-300" />
            </div>
            <p className={`text-3xl font-bold ${c.color} mb-1`}>{c.value}</p>
            <p className="text-sm text-gray-600 font-medium">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity size={18} className="text-blue-600" /> Platform Status
          </h2>
          <div className="space-y-3">
            {[
              { label: 'API Server', status: 'Online', color: 'text-green-600', bg: 'bg-green-100' },
              { label: 'ML Models', status: 'Loaded', color: 'text-green-600', bg: 'bg-green-100' },
              { label: 'RAG Pipeline', status: 'Active', color: 'text-green-600', bg: 'bg-green-100' },
              { label: 'Vector Database', status: 'Connected', color: 'text-green-600', bg: 'bg-green-100' },
            ].map(({ label, status, color, bg }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-600">{label}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${bg} ${color}`}>● {status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Upload Knowledge Document', path: '/admin/knowledge-base' },
              { label: 'View All Users', path: '/admin/users' },
              { label: 'Manage Courses', path: '/admin/courses' },
            ].map(({ label, path }) => (
              <a key={label} href={path}
                className="flex items-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
