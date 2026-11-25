import React from 'react'
import { Target, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CareerReadinessCard({ career, readiness = 0, topSkills = [] }) {
  const navigate = useNavigate()
  const color = readiness >= 70 ? 'text-green-600' : readiness >= 40 ? 'text-yellow-600' : 'text-red-500'
  const ring = readiness >= 70 ? 'stroke-green-500' : readiness >= 40 ? 'stroke-yellow-500' : 'stroke-red-500'
  const r = 36, circ = 2 * Math.PI * r
  const offset = circ - (readiness / 100) * circ
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target size={18} className="text-blue-600" />
        <h3 className="font-semibold text-gray-800">Career Readiness</h3>
      </div>
      {career && <p className="text-sm text-gray-500 mb-4">{career}</p>}
      <div className="flex items-center gap-4 mb-4">
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" />
          <circle cx="44" cy="44" r={r} fill="none" className={ring} strokeWidth="8"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round" transform="rotate(-90 44 44)" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
          <text x="44" y="48" textAnchor="middle" className={`text-lg font-bold fill-current ${color}`} fontSize="16" fontWeight="700">{readiness}%</text>
        </svg>
        <div className="flex-1 space-y-2">
          {topSkills.slice(0, 3).map(s => (
            <div key={s.skill}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-gray-600 truncate">{s.skill}</span>
                <span className="text-gray-500 ml-1">{Math.round(s.current || 0)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1">
                <div className={`h-1 rounded-full ${
                  (s.current || 0) >= (s.required || 70) ? 'bg-green-500' : 'bg-yellow-400'
                }`} style={{ width: `${Math.min(s.current || 0, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => navigate('/career-readiness')} className="w-full flex items-center justify-center gap-1 text-sm text-blue-600 font-semibold hover:underline">
        View Full Report <ChevronRight size={14} />
      </button>
    </div>
  )
}
