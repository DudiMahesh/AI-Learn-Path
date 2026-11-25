import React, { useState } from 'react'
import { Lightbulb, Play, AlertTriangle, Clock, SkipForward } from 'lucide-react'
import { whatIfService } from '../../services/whatIfService'

export default function WhatIfLearningPage() {
  const [studyHours, setStudyHours] = useState(2)
  const [skipWeakAreas, setSkipWeakAreas] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSimulate = async () => {
    setLoading(true)
    setResult(null)
    try {
      const data = await whatIfService.simulate({
        study_hours_per_day: studyHours,
        skip_weak_areas: skipWeakAreas,
      })
      setResult(data)
    } catch {
      // Fallback estimate
      const baseDays = 150
      const adjustedDays = Math.round(baseDays / studyHours)
      setResult({
        estimate_days: adjustedDays,
        estimate_weeks: Math.round(adjustedDays / 7),
        completion_date: new Date(Date.now() + adjustedDays * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        note: 'Estimate based on average path length at your current pace.',
        prerequisite_warning: skipWeakAreas ? 'Skipping weak areas may create gaps that affect later topics.' : null,
      })
    } finally { setLoading(false) }
  }

  const riskColor = result?.risk === 'high' ? 'border-red-200 bg-red-50' :
                    result?.risk === 'medium' ? 'border-amber-200 bg-amber-50' : 'border-green-200 bg-green-50'

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-2">
        <Lightbulb size={24} className="text-yellow-500" />
        <h1 className="text-2xl font-bold text-gray-900">What-If Learning</h1>
      </div>
      <p className="text-gray-500 mb-8 ml-1">
        Explore how different study habits could affect your learning timeline.
        <strong className="text-amber-600"> All results are estimates only.</strong>
      </p>

      {/* Configuration Panel */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Play size={16} className="text-blue-600" /> Configure Your Scenario
        </h2>

        <div className="space-y-8">
          {/* Study Hours Slider */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Daily Study Time
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range" min="0.5" max="8" step="0.5" value={studyHours}
                onChange={e => setStudyHours(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
              />
              <div className="w-20 text-right">
                <span className="text-2xl font-bold text-blue-600">{studyHours}</span>
                <span className="text-sm text-gray-500 ml-1">h/day</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>30 min</span>
              <span>4h (recommended)</span>
              <span>8h</span>
            </div>
          </div>

          {/* Skip Weak Areas Toggle */}
          <div className="flex items-center justify-between py-4 border-t border-gray-100">
            <div>
              <p className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                <SkipForward size={15} className="text-orange-500" />
                Skip Weak Skill Areas
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Focus only on critical gaps, skipping foundational topics.</p>
            </div>
            <button onClick={() => setSkipWeakAreas(s => !s)}
              className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${skipWeakAreas ? 'bg-orange-500' : 'bg-gray-200'}`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow ${skipWeakAreas ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <button onClick={handleSimulate} disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity text-sm">
            <Play size={16} />
            {loading ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className={`rounded-2xl border p-6 ${riskColor}`}>
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle size={18} className="text-amber-600" />
            <h2 className="font-semibold text-amber-800">Simulation Results — Estimate Only</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            {result.estimate_days && (
              <div className="bg-white rounded-xl p-4 border border-white/60 text-center">
                <Clock size={20} className="text-blue-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">{result.estimate_days}</p>
                <p className="text-xs text-gray-500">Days to complete</p>
              </div>
            )}
            {result.estimate_weeks && (
              <div className="bg-white rounded-xl p-4 border border-white/60 text-center">
                <p className="text-3xl font-bold text-gray-900">{result.estimate_weeks}</p>
                <p className="text-xs text-gray-500">Weeks</p>
              </div>
            )}
            {result.completion_date && (
              <div className="bg-white rounded-xl p-4 border border-white/60 text-center">
                <p className="text-lg font-bold text-gray-900">{result.completion_date}</p>
                <p className="text-xs text-gray-500">Estimated finish date</p>
              </div>
            )}
          </div>

          {result.note && (
            <div className="bg-white/60 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-700 italic">{result.note}</p>
            </div>
          )}

          {skipWeakAreas && result.prerequisite_warning && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <p className="text-sm text-red-700 flex items-start gap-2">
                <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" /> {result.prerequisite_warning}
              </p>
            </div>
          )}

          <p className="text-xs text-amber-700 mt-2 italic">
            * These are rough estimates based on average learning rates and your current path length.
            Actual time depends on prior knowledge, consistency, and topic difficulty.
          </p>
        </div>
      )}
    </div>
  )
}
