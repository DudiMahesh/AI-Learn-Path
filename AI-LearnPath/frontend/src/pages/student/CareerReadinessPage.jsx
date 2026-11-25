import React, { useState, useEffect } from 'react'
import { Target, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import { progressService } from '../../services/progressService'

function SkillStatus(current, required) {
  const ratio = (current || 0) / (required || 1)
  if (ratio >= 1) return { label: 'Strong', cls: 'bg-green-100 text-green-700 border-green-200' }
  if (ratio >= 0.7) return { label: 'Developing', cls: 'bg-yellow-100 text-yellow-700 border-yellow-200' }
  return { label: 'Needs Work', cls: 'bg-red-100 text-red-700 border-red-200' }
}

export default function CareerReadinessPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    progressService.getCareerReadiness()
      .then(d => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>

  if (!data || (!data.diagnostic_completed && !(data.skills || []).length)) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-3 mb-8">
          <Target size={24} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Career Readiness</h1>
        </div>
        <EmptyState
          icon={Target}
          title="Career Readiness Not Available Yet"
          message="Complete your diagnostic assessment to get your career readiness score and see how your skills compare to what your target career requires."
        />
      </div>
    )
  }

  const readiness = Math.round(data.overall_readiness || 0)
  const skills = data.skills || []
  const career = data.career || ''
  const strongSkills = skills.filter(s => (s.current || 0) >= (s.required || 70))
  const criticalGaps = skills
    .filter(s => (s.required || 0) - (s.current || 0) > 20)
    .sort((a, b) => ((b.required || 0) - (b.current || 0)) - ((a.required || 0) - (a.current || 0)))

  const r = 60
  const circ = 2 * Math.PI * r
  const offset = circ - (readiness / 100) * circ
  const svgColor = readiness >= 70 ? '#22c55e' : readiness >= 40 ? '#f59e0b' : '#ef4444'

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Target size={24} className="text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Career Readiness</h1>
          {career && <p className="text-sm text-gray-500">Target: <strong className="text-gray-700">{career}</strong></p>}
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white mb-8 flex flex-col md:flex-row items-center gap-8">
        {/* Circular Progress */}
        <div className="flex-shrink-0">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
            <circle
              cx="80" cy="80" r={r} fill="none" stroke={svgColor} strokeWidth="12"
              strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
              transform="rotate(-90 80 80)"
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
            <text x="80" y="76" textAnchor="middle" fontSize="32" fontWeight="800" fill="white">{readiness}%</text>
            <text x="80" y="98" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.6)">Readiness</text>
          </svg>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">
            {readiness >= 70 ? '🎉 Job Ready!' : readiness >= 40 ? '📈 Getting There' : '📚 Early Stage'}
          </h2>
          <p className="text-sm opacity-80 mb-6 leading-relaxed max-w-md">
            {readiness >= 70
              ? 'You have strong coverage of the required skills. Consider applying for entry-level positions while continuing to deepen your expertise.'
              : readiness >= 40
              ? 'Good foundation! Focus on the critical skill gaps below to accelerate your career readiness.'
              : 'You have significant skill gaps to address. Follow your personalized learning path to build each required skill systematically.'}
          </p>
          <div className="flex flex-wrap gap-6 text-center justify-center md:justify-start">
            <div>
              <p className="text-2xl font-bold text-green-400">{strongSkills.length}</p>
              <p className="text-xs opacity-60">Strong Skills</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-400">{criticalGaps.length}</p>
              <p className="text-xs opacity-60">Critical Gaps</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{skills.length}</p>
              <p className="text-xs opacity-60">Total Required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Table */}
      {skills.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" /> Skills Overview
            </h2>
            <span className="text-sm text-gray-400">{skills.length} skills required</span>
          </div>
          <div className="divide-y divide-gray-50">
            {skills.map((s, i) => {
              const st = SkillStatus(s.current, s.required)
              const pct = Math.min(Math.round(s.current || 0), 100)
              const req = Math.min(Math.round(s.required || 70), 100)
              return (
                <div key={i} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      {pct >= req
                        ? <CheckCircle size={15} className="text-green-500 flex-shrink-0" />
                        : <AlertCircle size={15} className="text-orange-400 flex-shrink-0" />}
                      <span className="font-medium text-gray-800 text-sm">{s.skill}</span>
                      {s.importance && (
                        <span className="text-xs text-gray-400 capitalize bg-gray-100 px-2 py-0.5 rounded-full">{s.importance}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${st.cls}`}>{st.label}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative bg-gray-100 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full transition-all duration-700 ${pct >= req ? 'bg-green-500' : 'bg-blue-400'}`}
                        style={{ width: `${pct}%` }} />
                      {/* Required line */}
                      <div className="absolute top-0 h-2.5 w-0.5 bg-slate-500 rounded-full"
                        style={{ left: `${req}%` }} />
                    </div>
                    <div className="flex-shrink-0 text-right min-w-[100px]">
                      <span className="text-xs text-gray-500">{pct}% / <span className="font-semibold text-gray-700">{req}% needed</span></span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Critical Gaps */}
      {criticalGaps.length > 0 && (
        <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
          <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-4">
            <AlertCircle size={18} /> Priority Skill Gaps to Address
          </h3>
          <div className="space-y-3">
            {criticalGaps.slice(0, 5).map((g, i) => (
              <div key={i} className="flex items-center justify-between bg-white rounded-xl p-4 border border-red-50">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{g.skill}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Current: {Math.round(g.current || 0)}% → Required: {Math.round(g.required || 0)}%</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-red-600">
                    -{Math.round((g.required || 0) - (g.current || 0))} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
