import React, { useState } from 'react'
import { Sparkles, ChevronRight, ChevronDown, Target } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PRIORITY_STYLES = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  normal: 'bg-blue-100 text-blue-700 border-blue-200',
  low: 'bg-gray-100 text-gray-600 border-gray-200',
}

export default function RecommendationCard({ recommendation, index = 0 }) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  const { item_id, item_type, title, recommendation_score, reason, skill_gap_addressed, priority } = recommendation

  const score = Math.round((recommendation_score || 0) * 100)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
            <Sparkles size={18} className="text-purple-600" />
          </div>
          <span className="text-xs font-medium text-gray-500 capitalize">{item_type}</span>
        </div>
        {priority && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${PRIORITY_STYLES[priority] || PRIORITY_STYLES.normal}`}>
            {priority}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title || `Recommendation #${index + 1}`}</h3>
      {skill_gap_addressed && (
        <div className="flex items-center gap-1.5 mb-3">
          <Target size={13} className="text-blue-500" />
          <span className="text-xs text-blue-600 font-medium">Addresses: {skill_gap_addressed}</span>
        </div>
      )}
      {score > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Match score</span><span className="font-semibold">{score}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${score}%` }} />
          </div>
        </div>
      )}
      {reason && (
        <div className="mb-3">
          <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
            Why recommended? {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </button>
          {expanded && <p className="mt-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-3 leading-relaxed">{reason}</p>}
        </div>
      )}
      <button
        onClick={() => item_type === 'course' ? navigate(`/courses/${item_id}`) : null}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
      >
        Start Learning <ChevronRight size={15} />
      </button>
    </div>
  )
}
