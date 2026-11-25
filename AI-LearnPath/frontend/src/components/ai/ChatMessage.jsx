import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import SourceReference from './SourceReference'

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

  // Check if content contains an SVG block
  const hasSvg = message.content && message.content.includes('<svg') && message.content.includes('</svg>')
  let textBeforeSvg = message.content
  let svgCode = null
  let textAfterSvg = ''

  if (hasSvg) {
    const sIdx = message.content.indexOf('<svg')
    const eIdx = message.content.lastIndexOf('</svg>')
    textBeforeSvg = message.content.slice(0, sIdx).replace(/```(?:svg)?/g, '').trim()
    svgCode = message.content.slice(sIdx, eIdx + 6)
    textAfterSvg = message.content.slice(eIdx + 6).replace(/```/g, '').trim()
  }

  return (
    <div className="flex gap-3 max-w-[85%]">
      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white text-[11px] font-semibold">AI</div>
      <div className="flex-1 min-w-0">
        <div className="bg-white dark:bg-[#151b23] rounded-lg rounded-tl-sm border border-gray-200 dark:border-[#1e2530] px-4 py-3 relative group">
          {textBeforeSvg && (
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">{textBeforeSvg}</p>
          )}

          {svgCode && (
            <div className="my-3 p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-lg overflow-x-auto">
              <div className="text-[11px] font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                <span>📊 Graphical 3D Vector Diagram</span>
              </div>
              <div
                className="w-full max-w-lg mx-auto"
                style={{
                  filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.5))'
                }}
                dangerouslySetInnerHTML={{ __html: svgCode }}
              />
            </div>
          )}

          {textAfterSvg && (
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap mt-2">{textAfterSvg}</p>
          )}

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
