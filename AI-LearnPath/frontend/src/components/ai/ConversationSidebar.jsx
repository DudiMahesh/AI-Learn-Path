import React, { useState } from 'react'
import { Plus, MessageSquare, Trash2, Edit3, Check, X } from 'lucide-react'
import { ragService } from '../../services/ragService'

export default function ConversationSidebar({ conversations, activeId, onSelect, onNew, onDeleted, onRenamed }) {
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    if (!window.confirm('Delete this conversation?')) return
    await ragService.deleteConversation(id)
    if (onDeleted) onDeleted(id)
  }

  const handleRename = async (id) => {
    if (!editTitle.trim()) return
    await ragService.renameConversation(id, editTitle)
    if (onRenamed) onRenamed(id, editTitle)
    setEditId(null)
  }

  return (
    <div className="h-full flex flex-col">
      <button onClick={onNew}
        className="flex items-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity mb-4">
        <Plus size={16} /> New Chat
      </button>
      <div className="flex-1 overflow-y-auto space-y-1">
        {conversations.length === 0 && (
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">No conversations yet</p>
        )}
        {conversations.map(conv => (
          <div key={conv.id}
            className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
              activeId === conv.id
                ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
            onClick={() => onSelect(conv.id)}>
            <MessageSquare size={15} className="flex-shrink-0 opacity-60" />
            {editId === conv.id ? (
              <div className="flex items-center gap-1 flex-1" onClick={e => e.stopPropagation()}>
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)}
                  className="flex-1 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-blue-400 rounded px-2 py-1 focus:outline-none" autoFocus
                  onKeyDown={e => { if (e.key === 'Enter') handleRename(conv.id); if (e.key === 'Escape') setEditId(null) }} />
                <button onClick={() => handleRename(conv.id)} className="text-emerald-500"><Check size={12} /></button>
                <button onClick={() => setEditId(null)} className="text-slate-400"><X size={12} /></button>
              </div>
            ) : (
              <span className="flex-1 text-xs font-medium truncate">{conv.title}</span>
            )}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={(e) => { e.stopPropagation(); setEditId(conv.id); setEditTitle(conv.title) }}
                className="p-1 hover:text-blue-600 dark:hover:text-blue-400 text-slate-400"><Edit3 size={11} /></button>
              <button onClick={(e) => handleDelete(e, conv.id)} className="p-1 hover:text-red-500 text-slate-400"><Trash2 size={11} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
