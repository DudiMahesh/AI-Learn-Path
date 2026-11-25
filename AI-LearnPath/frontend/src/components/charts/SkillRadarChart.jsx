import React from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts'

export default function SkillRadarChart({ skills = [] }) {
  if (!skills.length) return <div className="h-48 flex items-center justify-center text-sm text-gray-400">No skill data yet</div>
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={skills}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#64748b' }} />
        <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
        <Radar name="Required" dataKey="required" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeDasharray="4 4" />
        <Legend formatter={(v) => <span className="text-xs text-gray-600">{v}</span>} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
