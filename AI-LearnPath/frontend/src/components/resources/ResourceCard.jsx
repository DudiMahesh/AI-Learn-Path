import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Video, FileText, BookOpen, ExternalLink, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'

const TYPE_CONFIG = {
  video: { icon: Video, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300', label: 'Video' },
  article: { icon: FileText, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300', label: 'Revision' },
  book: { icon: BookOpen, color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300', label: 'Book' },
  documentation: { icon: FileText, color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300', label: 'NCERT' },
  practice: { icon: CheckCircle2, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300', label: 'Practice' },
}

export default function ResourceCard({ resource }) {
  const navigate = useNavigate()
  const config = TYPE_CONFIG[resource.type] || TYPE_CONFIG.article
  const Icon = config.icon

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-3">
          <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${config.color}`}>
            <Icon size={12} />
            {config.label}
          </span>
          {resource.difficulty && (
            <span className="text-xs text-slate-400 capitalize bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              {resource.difficulty}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
          {resource.title}
        </h3>
        {resource.desc && (
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-3 line-clamp-3 leading-relaxed">
            {resource.desc}
          </p>
        )}
        <div className="flex items-center gap-3 mb-4">
          {resource.minutes && (
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={12} />
              {resource.minutes} min
            </span>
          )}
        </div>
      </div>

      {resource.isInternal ? (
        <button
          onClick={() => navigate(resource.url)}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 transition-colors cursor-pointer"
        >
          <span>Open in App</span>
          <ArrowRight size={14} />
        </button>
      ) : (
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
        >
          <span>Open Resource</span>
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  )
}
