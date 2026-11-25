import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import AIChat from '../../components/ai/AIChat'
import ConversationSidebar from '../../components/ai/ConversationSidebar'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { ragService } from '../../services/ragService'

export default function AILearningAssistantPage() {
  const [conversations, setConversations] = useState([])
  const [activeConvId, setActiveConvId] = useState(null)
  const [messages, setMessages] = useState([])
  const [showSidebar, setShowSidebar] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      const list = await ragService.getConversations()
      setConversations(Array.isArray(list) ? list : [])
      if (list && list.length > 0) {
        await loadConversation(list[0].id)
      }
    } catch {
      setConversations([])
    } finally {
      setLoading(false)
    }
  }

  const loadConversation = async (id) => {
    setActiveConvId(id)
    try {
      const data = await ragService.getConversation(id)
      setMessages(data?.messages || [])
    } catch {
      setMessages([])
    }
  }

  const handleNew = async () => {
    try {
      const conv = await ragService.createConversation()
      if (conv) {
        setConversations(prev => [conv, ...prev])
        setActiveConvId(conv.id)
        setMessages([])
      }
    } catch {}
  }

  const handleDeleted = (id) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    if (activeConvId === id) {
      setActiveConvId(null)
      setMessages([])
    }
  }

  const handleRenamed = (id, title) => {
    setConversations(prev => prev.map(c => c.id === id ? { ...c, title } : c))
  }

  if (loading) return <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>

  return (
    <div className="flex h-[calc(100vh-4rem)] -mx-6 -my-6">
      {/* Sidebar */}
      <div className={`flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-200 overflow-hidden ${showSidebar ? 'w-64' : 'w-0'}`}>
        <div className="h-full p-4 w-64">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-white mb-4 px-1">Conversations</h2>
          <ConversationSidebar
            conversations={conversations}
            activeId={activeConvId}
            onSelect={loadConversation}
            onNew={handleNew}
            onDeleted={handleDeleted}
            onRenamed={handleRenamed}
          />
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#0c051a]">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 dark:border-nightviolet-800/40 bg-white/90 dark:bg-[#110724]/90 backdrop-blur-md flex-shrink-0">
          <button onClick={() => setShowSidebar(s => !s)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-nightviolet-800/60 text-slate-500 dark:text-purple-300 transition-colors">
            {showSidebar ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-dragonfruit-600 via-pink-600 to-nightviolet-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-dragonfruit-600/30">
              AI
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white">AI Learning Assistant</h1>
              <p className="text-xs text-slate-400 dark:text-purple-300/70">Powered by your learning knowledge base (RAG)</p>
            </div>
          </div>
          <div className="ml-auto">
            <span className="text-xs text-dragonfruit-600 dark:text-dragonfruit-300 bg-dragonfruit-500/10 dark:bg-dragonfruit-500/20 border border-dragonfruit-500/30 px-3 py-1 rounded-full font-bold">● Active</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden">
          <AIChat
            conversationId={activeConvId}
            messages={messages}
          />
        </div>
      </div>
    </div>
  )
}
