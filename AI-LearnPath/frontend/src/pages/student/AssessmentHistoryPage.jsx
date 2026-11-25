import React, { useState, useEffect } from 'react'
import { History, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { assessmentService } from '../../services/assessmentService'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'

export default function AssessmentHistoryPage() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    assessmentService.getHistory()
      .then(data => setHistory(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <History size={24} className="text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessment History</h1>
          <p className="text-sm text-gray-500">Your past assessment attempts and score trends.</p>
        </div>
      </div>

      {history.length === 0 ? (
        <EmptyState
          icon={History}
          title="No Assessment History"
          message="You haven't taken any assessments yet. Start with your diagnostic assessment to establish your skill profile."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Assessment', 'Type', 'Date', 'Score', 'Attempt', 'Trend'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {history.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800 text-sm">{item.assessment_title || 'Assessment'}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                        item.assessment_type === 'diagnostic' ? 'bg-purple-100 text-purple-700' :
                        item.assessment_type === 'topic' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{item.assessment_type}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {item.completed_at ? new Date(item.completed_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${
                          (item.score || 0) >= 75 ? 'text-green-600' :
                          (item.score || 0) >= 50 ? 'text-yellow-600' : 'text-red-500'
                        }`}>
                          {item.score !== null && item.score !== undefined ? `${Math.round(item.score)}%` : '—'}
                        </span>
                        <div className="w-16 bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${
                            (item.score || 0) >= 75 ? 'bg-green-500' :
                            (item.score || 0) >= 50 ? 'bg-yellow-400' : 'bg-red-400'
                          }`} style={{ width: `${Math.min(item.score || 0, 100)}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      #{item.attempt_number || 1}
                    </td>
                    <td className="px-5 py-4">
                      {item.improvement !== undefined && item.improvement !== null ? (
                        <span className={`flex items-center gap-1 text-xs font-semibold ${
                          item.improvement > 0 ? 'text-green-600' :
                          item.improvement < 0 ? 'text-red-500' : 'text-gray-400'
                        }`}>
                          {item.improvement > 0 ? <TrendingUp size={13} /> :
                           item.improvement < 0 ? <TrendingDown size={13} /> :
                           <Minus size={13} />}
                          {item.improvement !== 0 ? `${item.improvement > 0 ? '+' : ''}${Math.round(item.improvement)}%` : 'Same'}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300">First attempt</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
