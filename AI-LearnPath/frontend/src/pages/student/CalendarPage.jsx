import React, { useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Mock study activity for current month (would come from API in production)
const MOCK_ACTIVITY = {
  1: 1.5, 3: 2, 4: 0.5, 7: 3, 8: 2.5, 9: 1, 10: 2, 14: 4, 15: 2, 16: 1.5,
  21: 3, 22: 2, 23: 1, 28: 2, 29: 1.5, 30: 3,
}

function getIntensity(hours) {
  if (!hours) return ''
  if (hours >= 3) return 'bg-blue-600 text-white'
  if (hours >= 2) return 'bg-blue-400 text-white'
  if (hours >= 1) return 'bg-blue-200 text-blue-800'
  return 'bg-blue-100 text-blue-600'
}

export default function CalendarPage() {
  const today = new Date()
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const firstDay = new Date(current.year, current.month, 1).getDay()
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate()
  const isCurrentMonth = current.year === today.getFullYear() && current.month === today.getMonth()

  const prev = () => setCurrent(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 })
  const next = () => setCurrent(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 })

  const isToday = (d) => isCurrentMonth && d === today.getDate()
  const isFuture = (d) => {
    const date = new Date(current.year, current.month, d)
    return date > today
  }

  const totalHours = Object.values(MOCK_ACTIVITY).reduce((sum, h) => sum + h, 0)
  const activeDays = Object.keys(MOCK_ACTIVITY).length

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Calendar size={24} className="text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Calendar</h1>
          <p className="text-sm text-gray-500">Track your study consistency over time.</p>
        </div>
      </div>

      {/* Stats Row */}
      {isCurrentMonth && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Active Days', value: activeDays, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total Hours', value: `${totalHours.toFixed(1)}h`, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Avg / Day', value: `${(totalHours / activeDays).toFixed(1)}h`, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Month Navigation */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <button onClick={prev} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
            <ChevronLeft size={18} />
          </button>
          <h2 className="font-semibold text-gray-900">{MONTHS[current.month]} {current.year}</h2>
          <button onClick={next} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="p-5">
          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-3">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1
              const isT = isToday(d)
              const isFut = isFuture(d)
              const hours = isCurrentMonth ? MOCK_ACTIVITY[d] : null

              return (
                <div key={d}
                  title={hours ? `${hours}h study` : undefined}
                  className={`aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all cursor-default ${
                    isT ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md ring-2 ring-blue-300' :
                    isFut ? 'text-gray-300' :
                    hours ? `${getIntensity(hours)} font-semibold` :
                    'text-gray-600 hover:bg-gray-50'
                  }`}>
                  {d}
                  {hours && !isT && <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60 mt-0.5" />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 flex-wrap">
          <span className="text-xs text-gray-500 font-medium mr-2">Study intensity:</span>
          {[
            { color: 'bg-blue-100', label: '< 1h' },
            { color: 'bg-blue-200', label: '1–2h' },
            { color: 'bg-blue-400', label: '2–3h' },
            { color: 'bg-blue-600', label: '3h+' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded ${color}`} />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="mt-6 bg-blue-50 rounded-2xl p-5">
        <p className="text-sm font-semibold text-blue-800 mb-1">Stay Consistent!</p>
        <p className="text-sm text-blue-700 leading-relaxed">
          Calendar data will reflect your actual learning activity as you complete lessons and log study sessions.
          Aim for at least 30 minutes every day to maintain momentum.
        </p>
      </div>
    </div>
  )
}
