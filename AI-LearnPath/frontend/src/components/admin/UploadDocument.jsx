import React, { useState, useRef } from 'react'
import { Upload, File, X, CheckCircle } from 'lucide-react'
import { ragService } from '../../services/ragService'

export default function UploadDocument({ onUploaded }) {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const ref = useRef()

  const allowed = ['pdf', 'txt', 'md', 'html']
  const handleFile = (f) => {
    const ext = f.name.split('.').pop().toLowerCase()
    if (!allowed.includes(ext)) { setError('Allowed types: PDF, TXT, MD, HTML'); return }
    if (f.size > 10 * 1024 * 1024) { setError('File too large (max 10MB)'); return }
    setFile(f); setError('')
    if (!title) setTitle(f.name.replace(/\.[^.]+$/, ''))
  }
  const handleDrop = (e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }
  const handleSubmit = async () => {
    if (!file || !title.trim()) { setError('File and title are required'); return }
    setUploading(true); setError('')
    try {
      const fd = new FormData(); fd.append('file', file); fd.append('title', title)
      await ragService.uploadDocument(fd)
      setDone(true); setFile(null); setTitle('')
      if (onUploaded) onUploaded()
    } catch (e) { setError(e.response?.data?.message || 'Upload failed') }
    finally { setUploading(false) }
  }

  if (done) return (
    <div className="text-center py-6">
      <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
      <p className="font-semibold text-gray-800">Document uploaded & indexed!</p>
      <button onClick={() => setDone(false)} className="mt-4 text-sm text-blue-600 hover:underline">Upload another</button>
    </div>
  )
  return (
    <div className="space-y-4">
      <div onDrop={handleDrop} onDragOver={e => e.preventDefault()}
        className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
        onClick={() => ref.current?.click()}>
        <Upload size={32} className="text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-500">Drag & drop or <span className="text-blue-600 font-medium">browse</span></p>
        <p className="text-xs text-gray-400 mt-1">PDF, TXT, MD, HTML — max 10MB</p>
        <input ref={ref} type="file" accept=".pdf,.txt,.md,.html" className="hidden" onChange={e => e.target.files[0] && handleFile(e.target.files[0])} />
      </div>
      {file && (
        <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
          <File size={18} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-800 flex-1 truncate">{file.name}</span>
          <button onClick={() => setFile(null)}><X size={16} className="text-blue-400" /></button>
        </div>
      )}
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Document title"
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button onClick={handleSubmit} disabled={uploading || !file}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity">
        {uploading ? 'Uploading & Indexing...' : 'Upload Document'}
      </button>
    </div>
  )
}
