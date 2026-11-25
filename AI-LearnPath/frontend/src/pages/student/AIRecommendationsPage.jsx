import React, { useState, useEffect } from 'react'
import { Sparkles, Info } from 'lucide-react'
import RecommendationCard from '../../components/learning/RecommendationCard'
import EmptyState from '../../components/common/EmptyState'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { recommendationService } from '../../services/recommendationService'

export default function AIRecommendationsPage() {
  const [recs, setRecs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    recommendationService.getRecommendations()
      .then(data => setRecs(Array.isArray(data) ? data : []))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-start gap-3 mb-3">
        <Sparkles size={24} className="text-purple-600 mt-0.5 flex-shrink-0" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Recommendations</h1>
          <p className="text-gray-500 text-sm">Personalized for your career goal and current skill gaps.</p>
        </div>
      </div>

      {recs.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-3 mb-8 mt-4">
          <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700 leading-relaxed">
            Recommendations are generated using <strong>TF-IDF + Cosine Similarity</strong> matching your skill gaps
            against course topics. Each is ranked by relevance to your personalized learning profile.
          </p>
        </div>
      )}

      {recs.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No Recommendations Yet"
          message="Complete your diagnostic assessment to receive AI-powered personalized recommendations based on your skill gaps and career goal."
        />
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-6">{recs.length} recommendation{recs.length !== 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recs.map((rec, i) => (
              <RecommendationCard key={rec.id || i} recommendation={rec} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
