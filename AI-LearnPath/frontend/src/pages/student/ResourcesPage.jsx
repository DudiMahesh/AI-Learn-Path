import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Library,
  Search,
  ExternalLink,
  Clock,
  Video,
  FileText,
  BookOpen,
  Code,
  Database,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Tag,
  CheckCircle2
} from 'lucide-react'
import {
  NEET_RESOURCES,
  NEET_RESOURCE_CATEGORIES,
  NEET_RESOURCE_TYPES
} from '../../data/neetResourcesData'

const ICON_MAP = {
  documentation: FileText,
  book: BookOpen,
  practice: CheckCircle2,
  article: FileText,
  video: Video,
  dataset: Database,
}

const CATEGORY_COLORS = {
  'Official NTA & NCERT': 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30',
  'Biology': 'border-teal-500/30 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30',
  'Physics': 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30',
  'Chemistry': 'border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30',
  'PYQ & Mock Tests': 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30',
  'Revision & Formulas': 'border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30',
}

export default function ResourcesPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')

  const types = Object.keys(NEET_RESOURCE_TYPES)

  const filtered = NEET_RESOURCES.filter(r => {
    const matchSearch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.desc?.toLowerCase().includes(search.toLowerCase()) ||
      r.category?.toLowerCase().includes(search.toLowerCase()) ||
      r.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
      r.recommendedFor?.toLowerCase().includes(search.toLowerCase())

    const matchType = typeFilter === 'all' || r.type === typeFilter
    const matchCat = categoryFilter === 'All Categories' || r.category === categoryFilter
    return matchSearch && matchType && matchCat
  })

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950/40 via-slate-900/40 to-slate-900/60 p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-3.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
            <GraduationCap size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Official & Curated
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                NEET (UG) 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              NEET Exam Preparation Resources
            </h1>
            <p className="text-sm text-slate-600 dark:text-zinc-300 max-w-2xl mt-1.5 leading-relaxed">
              Curated official NCERT digital textbooks, standard reference handbooks (HC Verma, OP Tandon, MTG), NTA test portals, authentic 10-year PYQ archives, and high-yield revision vaults.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => navigate('/pyq-papers')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>Past 10-Year PYQs</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => navigate('/courses/formulas')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer"
          >
            <span>Formula Vault</span>
          </button>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by subject, author, NCERT chapter, formula, or exam topic (e.g., 'Genetics', 'HC Verma', 'Mechanics', 'PYQ')..."
          className="w-full pl-11 pr-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* ── Category Filters ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            Filter by Subject & Focus
          </span>
          <span className="text-xs text-slate-500 dark:text-zinc-400">
            Showing <strong className="text-slate-900 dark:text-white">{filtered.length}</strong> of {NEET_RESOURCES.length} resources
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {NEET_RESOURCE_CATEGORIES.map(category => {
            const isSelected = categoryFilter === category
            return (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/30'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-zinc-300 hover:border-emerald-500/50 hover:text-emerald-500'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Resource Type Filters ── */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 mr-2">
          Format:
        </span>
        {types.map(t => {
          const typeConfig = NEET_RESOURCE_TYPES[t]
          const isSelected = typeFilter === t
          return (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {typeConfig.label}
            </button>
          )
        })}
      </div>

      {/* ── Resources Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Library size={44} className="mx-auto text-slate-400 opacity-50" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No NEET resources matched "{search}"
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
            Try searching for terms like "NCERT", "HC Verma", "Biology", "Formulas", or reset your filters.
          </p>
          <button
            onClick={() => {
              setSearch('')
              setCategoryFilter('All Categories')
              setTypeFilter('all')
            }}
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-500 cursor-pointer transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(resource => {
            const Icon = ICON_MAP[resource.type] || FileText
            const categoryColor = CATEGORY_COLORS[resource.category] || 'border-slate-500/30 text-slate-400 bg-slate-50 dark:bg-slate-800'

            return (
              <div
                key={resource.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Category & Difficulty */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${categoryColor}`}>
                      {resource.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 capitalize bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      {resource.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed mb-4 line-clamp-3">
                    {resource.desc}
                  </p>

                  {/* Recommended Target Pill */}
                  {resource.recommendedFor && (
                    <div className="flex items-center gap-1.5 mb-3 text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      <Sparkles size={12} className="flex-shrink-0" />
                      <span className="truncate">Best for: {resource.recommendedFor}</span>
                    </div>
                  )}

                  {/* Tags & Duration */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    {resource.tags?.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-zinc-400 px-2 py-0.5 rounded-md flex items-center gap-1"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                    {resource.minutes && (
                      <span className="text-[10px] font-medium text-slate-500 dark:text-zinc-400 flex items-center gap-1 ml-auto">
                        <Clock size={11} />
                        {resource.minutes >= 60 ? `${Math.round(resource.minutes / 60)} hrs` : `${resource.minutes} mins`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button: In-App route vs External URL */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  {resource.isInternal ? (
                    <button
                      onClick={() => navigate(resource.url)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      <span>Open in AI-LearnPath</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl transition-all cursor-pointer"
                    >
                      <span>Access Official Portal</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
