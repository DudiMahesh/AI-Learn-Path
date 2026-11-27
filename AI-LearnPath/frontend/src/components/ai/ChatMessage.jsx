import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import SourceReference from './SourceReference'
import { synthesizeVectorDiagram } from '../../utils/vectorDiagramSynthesizer'
import { renderMathPart } from '../../utils/mathUtils'

export default function ChatMessage({ message }) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isUser) return (
    <div className="flex justify-end">
      <div className="max-w-[75%] bg-red-600 text-white rounded-lg rounded-tr-sm px-4 py-2.5">
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
    </div>
  )

  // Split content into alternating text and <svg>...</svg> segments (supports multiple diagrams)
  const raw = (message.content || '').replace(/```svg\s*/gi, '').replace(/```/g, '')
  const segments = raw.split(/(<svg[\s\S]*?<\/svg>)/gi).filter(Boolean)

  return (
    <div className="flex gap-3 max-w-[90%]">
      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white text-[11px] font-semibold">AI</div>
      <div className="flex-1 min-w-0">
        <div className="bg-white dark:bg-[#151b23] rounded-lg rounded-tl-sm border border-gray-200 dark:border-[#1e2530] px-4 py-3 relative group space-y-3">
          {segments.map((seg, idx) => {
            const trimmed = seg.trim()
            if (trimmed.toLowerCase().startsWith('<svg') && trimmed.toLowerCase().endsWith('</svg>')) {
              const enhancedSvg = synthesizeVectorDiagram(trimmed, raw)
              return (
                <div key={idx} className="my-3 p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-lg overflow-x-auto">
                  <div className="text-[11px] font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                    <span>📊 Graphical 3D Vector Diagram</span>
                  </div>
                  <div
                    className="w-full max-w-2xl mx-auto"
                    style={{ filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.5))' }}
                    dangerouslySetInnerHTML={{ __html: enhancedSvg }}
                  />
                </div>
              )
            }

            // Render text lines cleanly with math formatting
            return (
              <div key={idx} className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                {trimmed.split('\n').map((line, li) => (
                  <div key={li} className={line.startsWith('#') ? 'font-bold text-emerald-600 dark:text-emerald-400 mt-2 mb-1' : ''}>
                    {renderMathPart(line, `l-${idx}-${li}`, false)}
                  </div>
                ))}
              </div>
            )
          })}

          <button onClick={handleCopy}
            className="absolute top-2.5 right-2.5 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:hover:bg-[#1e2530] text-gray-400">
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
          </button>
        </div>
        {message.sources && message.sources.length > 0 && (
          <div className="pl-1"><SourceReference sources={message.sources} /></div>
        )}
        {message.created_at && (
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 pl-1">{new Date(message.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
        )}
      </div>
    </div>
  )
}
