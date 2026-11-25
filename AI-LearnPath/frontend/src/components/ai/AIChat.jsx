import React, { useState, useRef, useEffect } from 'react'
import { Send, Loader } from 'lucide-react'
import ChatMessage from './ChatMessage'
import { ragService } from '../../services/ragService'

const SUGGESTED = [
  'Why do I need Statistics before Machine Learning?',
  'What should I study next?',
  'Explain standard deviation in simple terms.',
  'Why was this course recommended to me?',
  'What are my biggest skill gaps?',
]

export default function AIChat({ conversationId, messages: initialMessages = [], userContext = {} }) {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { setMessages(initialMessages) }, [initialMessages])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    const userMsg = { role: 'user', content: msg, created_at: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)
    try {
      const res = await ragService.sendChat(conversationId, msg, userContext)
      const data = res.data || res
      const aiMsg = { role: 'assistant', content: data.answer || 'Sorry, I could not generate a response.', sources: data.sources || [], created_at: new Date().toISOString() }
      setMessages(prev => [...prev, aiMsg])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I encountered an error. Please try again.', sources: [], created_at: new Date().toISOString() }])
    } finally { setLoading(false) }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/15 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-lg font-bold text-red-600 dark:text-red-400">AI</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5 text-base">AI Learning Assistant</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">Ask me anything about your learning path, concepts, or career skills.</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
              {SUGGESTED.map((q, i) => (
                <button key={i} onClick={() => send(q)}
                  className="text-[13px] px-3.5 py-2 bg-white dark:bg-[#151b23] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#1e2530] rounded-lg hover:border-red-300 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400 transition-colors text-left">{q}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0">AI</div>
            <div className="bg-white dark:bg-[#151b23] rounded-lg rounded-tl-sm border border-gray-200 dark:border-[#1e2530] px-4 py-3">
              <div className="flex items-center gap-1.5">
                {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      {messages.length > 0 && (
        <div className="px-6 pb-3">
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED.slice(0, 3).map((q, i) => (
              <button key={i} onClick={() => send(q)} className="text-[12px] px-2.5 py-1.5 bg-white dark:bg-[#151b23] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#1e2530] rounded-md hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-800 transition-colors">{q.slice(0, 40)}…</button>
            ))}
          </div>
        </div>
      )}
      <div className="border-t border-gray-200 dark:border-[#1e2530] p-4 bg-white/80 dark:bg-[#0f1419]/80 backdrop-blur-sm">
        <div className="flex gap-3 items-end">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Ask me anything about your learning path..."
            rows={1}
            className="flex-1 resize-none bg-gray-50 dark:bg-[#151b23] text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-[#1e2530] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 max-h-32 transition-all"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-40 transition-colors flex-shrink-0"
          >
            {loading ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
