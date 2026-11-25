import React, { useState } from 'react'
import { Lightbulb, Play, AlertTriangle } from 'lucide-react'
import { simulate } from '../../services/whatIfService'

export default function WhatIfPanel({ topics = [] }) {
  const [studyHours, setStudyHours] = useState(2)
  const [skipTopic, setSkipTopic] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSimulate = async () => {
    setLoading(true)
    try {
      const res = await simulate({ study_hours_per_day: studyHours, skip_topic_id: skipTopic || null })
      setResult(res.data || res)
    } catch { setResult({ estimate_days: Math.round(150 / studyHours), note: 'Estimate based on current learning path length.' }) }
    finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2"><Lightbulb size={18} className="text-yellow-500" />Configure Scenario</h3>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Daily Study Time</label>
            <div className="flex items-center gap-4">
              <input type="range" min="1" max="8" step="0.5" value={studyHours} onChange={e => setStudyHours(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600" />
              <span className="text-lg font-bold text-blue-600 w-16 text-right">{studyHours}h/day</span>
            </div>
          </div>
          {topics.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skip a Topic (optional)</label>
              <select value={skipTopic} onChange={e => setSkipTopic(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">No topic skipped</option>
                {topics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            </div>
          )}
          <button onClick={handleSimulate} disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity">
            <Play size={16} />{loading ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>
      </div>
      {result && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-amber-600" />
            <h3 className="font-semibold text-amber-800">ESTIMATE — Not a guarantee</h3>
          </div>
          <div className="space-y-3">
            {result.estimate_days && (
              <div className="bg-white rounded-xl p-4 border border-amber-100">
                <p className="text-sm text-gray-600">Estimated completion</p>
                <p className="text-2xl font-bold text-gray-900">{result.estimate_days} days</p>
                <p className="text-xs text-gray-500">(with {studyHours}h/day study)</p>
              </div>
            )}
            {result.note && <p className="text-sm text-amber-700 italic">{result.note}</p>}
            {skipTopic && result.prerequisite_warning && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700">⚠️ {result.prerequisite_warning}</p>
              </div>
            )}
          </div>
          <p className="text-xs text-amber-600 mt-4">* These are rough estimates based on average learning rates. Actual results depend on many factors.</p>
        </div>
      )}
    </div>
  )
}
