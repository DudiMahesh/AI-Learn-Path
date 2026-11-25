import React from 'react'
import { TrendingUp, Users, Sparkles, AlertTriangle } from 'lucide-react'

const TYPE_CONFIG = {
  performance: { icon: TrendingUp, color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50' },
  profile: { icon: Users, color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50' },
  recommendation: { icon: Sparkles, color: 'from-green-500 to-teal-500', bg: 'from-green-50 to-teal-50' },
  gap: { icon: AlertTriangle, color: 'from-orange-500 to-red-500', bg: 'from-orange-50 to-red-50' },
}

export default function AIInsightCard({ type = 'performance', title, value, description, badge }) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.performance
  const Icon = config.icon
  return (
    <div className={`bg-gradient-to-br ${config.bg} border border-white/60 rounded-2xl p-6`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 bg-gradient-to-br ${config.color} rounded-xl shadow-sm`}>
          <Icon size={20} className="text-white" />
        </div>
        {badge && <span className="text-xs font-semibold px-2.5 py-1 bg-white/70 rounded-full text-gray-700">{badge}</span>}
      </div>
      <h3 className="text-sm font-semibold text-gray-600 mb-1">{title}</h3>
      {value && <p className="text-2xl font-bold text-gray-900 mb-2 capitalize">{value}</p>}
      {description && <p className="text-sm text-gray-600 leading-relaxed">{description}</p>}
    </div>
  )
}
