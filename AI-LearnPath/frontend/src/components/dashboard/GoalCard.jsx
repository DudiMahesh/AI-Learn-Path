import React from 'react'
import { Target, BookOpen, Map, Compass } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function GoalCard({ career }) {
  const navigate = useNavigate()
  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-2 mb-2">
        <Target size={18} className="opacity-80" />
        <span className="text-sm font-medium opacity-80">Your Goal</span>
      </div>
      <h2 className="text-2xl font-bold mb-6">{career || 'Set Your Career Goal'}</h2>
      <div className="flex flex-wrap gap-3">
        <button onClick={() => navigate('/courses')} className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition-colors backdrop-blur-sm">
          <BookOpen size={15} /> Continue Learning
        </button>
        <button onClick={() => navigate('/learning-path')} className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition-colors backdrop-blur-sm">
          <Map size={15} /> View My Path
        </button>
        <button onClick={() => navigate('/courses')} className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition-colors backdrop-blur-sm">
          <Compass size={15} /> Explore Courses
        </button>
      </div>
    </div>
  )
}
