import React from 'react'
import { BookOpen, ClipboardList, CheckCircle, Eye, MessageSquare } from 'lucide-react'

const ACTIVITY_CONFIG = {
  lesson_view: { icon: Eye, color: 'bg-blue-100 text-blue-600', label: 'Viewed lesson' },
  lesson_complete: { icon: CheckCircle, color: 'bg-green-100 text-green-600', label: 'Completed lesson' },
  topic_complete: { icon: BookOpen, color: 'bg-purple-100 text-purple-600', label: 'Completed topic' },
  assessment_start: { icon: ClipboardList, color: 'bg-yellow-100 text-yellow-600', label: 'Started assessment' },
  assessment_complete: { icon: ClipboardList, color: 'bg-green-100 text-green-600', label: 'Completed assessment' },
  resource_view: { icon: Eye, color: 'bg-indigo-100 text-indigo-600', label: 'Viewed resource' },
  ai_chat: { icon: MessageSquare, color: 'bg-pink-100 text-pink-600', label: 'AI chat session' },
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function ActivityFeed({ activities = [] }) {
  if (!activities.length) return (
    <div className="text-center py-8 text-gray-400">
      <BookOpen size={32} className="mx-auto mb-2 opacity-40" />
      <p className="text-sm">No activity yet. Start learning!</p>
    </div>
  )
  return (
    <div className="space-y-3">
      {activities.map((activity, i) => {
        const config = ACTIVITY_CONFIG[activity.activity_type] || ACTIVITY_CONFIG.lesson_view
        const Icon = config.icon
        return (
          <div key={i} className="flex items-start gap-3">
            <div className={`flex-shrink-0 p-2 rounded-xl ${config.color}`}><Icon size={15} /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800">{config.label}</p>
              {activity.topic_title && <p className="text-xs text-gray-500 truncate">{activity.topic_title}</p>}
            </div>
            {activity.created_at && <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(activity.created_at)}</span>}
          </div>
        )
      })}
    </div>
  )
}
