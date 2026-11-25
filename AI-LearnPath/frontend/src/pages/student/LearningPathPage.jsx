import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Map, RefreshCw, CheckCircle, Circle, Lock, Clock } from 'lucide-react'
import { learningPathService } from '../../services/learningPathService'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import Modal from '../../components/common/Modal'

const STATUS_CONFIG = {
  completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300', label: 'Completed' },
  in_progress: { icon: Circle, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300', label: 'In Progress' },
  not_started: { icon: Circle, color: 'text-gray-400', bg: 'bg-gray-100', border: 'border-gray-200', label: 'Not Started' },
  skipped: { icon: Circle, color: 'text-gray-300', bg: 'bg-gray-50', border: 'border-gray-100', label: 'Skipped' },
}
const PRIORITY_CONFIG = {
  critical: 'bg-red-100 text-red-700', high: 'bg-orange-100 text-orange-700',
  normal: 'bg-blue-100 text-blue-600', low: 'bg-gray-100 text-gray-500',
}

export default function LearningPathPage() {
  const navigate = useNavigate()
  const [path, setPath] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [regenerating, setRegenerating] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => { loadPath() }, [])

  const loadPath = async () => {
    try {
      const res = await learningPathService.getLearningPath()
      const data = res.data || res
      setPath(data.path || data)
      setItems(data.items || data.learning_path_items || [])
    } catch {}
    finally { setLoading(false) }
  }

  const handleRegenerate = async () => {
    setShowConfirm(false)
    setRegenerating(true)
    try {
      await learningPathService.regeneratePath()
      await loadPath()
    } finally { setRegenerating(false) }
  }

  const completed = items.filter(i => i.status === 'completed').length
  const inProgress = items.filter(i => i.status === 'in_progress').length

  if (loading) return <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Map size={22} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">My Learning Path</h1>
          </div>
          {path && <p className="text-sm text-gray-500">Version {path.version} · Generated {new Date(path.generated_at).toLocaleDateString()}</p>}
        </div>
        <button onClick={() => setShowConfirm(true)} disabled={regenerating}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-60 transition-colors">
          <RefreshCw size={15} className={regenerating ? 'animate-spin' : ''} />
          Regenerate
        </button>
      </div>

      {/* Stats */}
      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Completed', value: completed, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'In Progress', value: inProgress, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total Topics', value: items.length, color: 'text-gray-700', bg: 'bg-gray-50' },
          ].map(stat => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 text-center`}>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Path Items */}
      {!items.length ? (
        <EmptyState icon={Map} title="No Learning Path Yet"
          message="Select a target career in your profile to generate your personalized learning milestones."
          actionLabel="View Profile" onAction={() => navigate('/profile')} />
      ) : (
        <div className="relative">
          <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gray-200" />
          <div className="space-y-4">
            {items.map((item, idx) => {
              const config = STATUS_CONFIG[item.status] || STATUS_CONFIG.not_started
              const Icon = config.icon
              const locked = !item.is_unlocked && item.status === 'not_started'
              return (
                <div key={item.id || idx} className={`flex gap-4 ${locked ? 'opacity-60' : ''}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full ${config.bg} ${config.border} border-2 flex items-center justify-center z-10 bg-white`}>
                    {locked ? <Lock size={14} className="text-gray-400" /> : <Icon size={16} className={config.color} />}
                  </div>
                  <div className={`flex-1 bg-white rounded-2xl border ${config.border} border-opacity-50 border-gray-100 shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow ${
                    item.status === 'in_progress' ? 'ring-2 ring-blue-200' : ''
                  }`} onClick={() => !locked && navigate(`/courses/${item.topic?.course_id || '#'}`)}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-gray-400">#{item.order_index || idx + 1}</span>
                        <h3 className="font-semibold text-gray-900">{item.topic?.title || `Topic ${idx + 1}`}</h3>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {item.priority && item.priority !== 'normal' && (
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${PRIORITY_CONFIG[item.priority]}`}>{item.priority}</span>
                        )}
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.bg} ${config.color}`}>{config.label}</span>
                      </div>
                    </div>
                    {item.topic?.description && <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.topic.description}</p>}
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      {item.topic?.estimated_minutes && <span className="flex items-center gap-1"><Clock size={11} />{item.topic.estimated_minutes} min</span>}
                      {item.topic?.difficulty && <span className="capitalize">{item.topic.difficulty}</span>}
                    </div>
                    {item.status === 'in_progress' && item.progress_pct > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Progress</span><span>{item.progress_pct}%</span></div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${item.progress_pct}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Regenerate Learning Path?"
        footer={
          <div className="flex gap-3">
            <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600">Cancel</button>
            <button onClick={handleRegenerate} className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold">Regenerate</button>
          </div>
        }>
        <p className="text-gray-600 text-sm">This will archive your current path and generate a new one based on your latest skill data. Your progress won't be lost.</p>
      </Modal>
    </div>
  )
}
