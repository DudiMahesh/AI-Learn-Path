import React, { useState } from 'react'
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react'

export default function SourceReference({ sources = [] }) {
  const [open, setOpen] = useState(false)
  if (!sources.length) return null
  return (
    <div className="mt-3">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors">
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        Sources ({sources.length})
      </button>
      {open && (
        <div className="mt-2 space-y-1.5 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
          {sources.map((src, i) => (
            <div key={i} className="flex items-center gap-2">
              <BookOpen size={12} className="text-blue-400 flex-shrink-0" />
              <span className="text-xs text-slate-500 dark:text-slate-400">{src.title || src.source || `Source ${i + 1}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
