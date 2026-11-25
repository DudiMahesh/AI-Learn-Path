import React, { useState, useEffect } from 'react'
import { Database, Trash2, RefreshCw, FileText } from 'lucide-react'
import UploadDocument from '../../components/admin/UploadDocument'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { ragService } from '../../services/ragService'

const STATUS_STYLES = {
  indexed: 'bg-green-100 text-green-700',
  processing: 'bg-yellow-100 text-yellow-700',
  failed: 'bg-red-100 text-red-700',
  pending: 'bg-gray-100 text-gray-600',
}

const TYPE_ICONS = {
  pdf: '📄', txt: '📝', md: '📋', html: '🌐',
}

export default function AdminKnowledgeBasePage() {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [reindexing, setReindexing] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => { loadDocs() }, [])

  const loadDocs = async () => {
    try {
      const data = await ragService.getDocuments()
      setDocs(Array.isArray(data) ? data : [])
    } catch {
      setDocs([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document? It will be removed from the RAG index.')) return
    setDeletingId(id)
    try {
      await ragService.deleteDocument(id)
      setDocs(prev => prev.filter(d => d.id !== id))
    } catch {}
    finally { setDeletingId(null) }
  }

  const handleReindex = async () => {
    if (!window.confirm('Reindex all documents? This may take a few minutes.')) return
    setReindexing(true)
    try {
      await ragService.reindexDocuments()
      await loadDocs()
    } catch {}
    finally { setReindexing(false) }
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-sm text-gray-500 mt-1">Manage documents for the RAG AI Learning Assistant</p>
        </div>
        <button onClick={handleReindex} disabled={reindexing}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-60 transition-colors">
          <RefreshCw size={15} className={reindexing ? 'animate-spin' : ''} />
          {reindexing ? 'Reindexing...' : 'Reindex All'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Database size={18} className="text-blue-600" /> Upload Document
            </h2>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Upload PDF, TXT, MD, or HTML files. Documents are automatically chunked and indexed for RAG retrieval.
            </p>
            <UploadDocument onUploaded={loadDocs} />
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileText size={18} className="text-gray-500" />
                Indexed Documents
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{docs.length}</span>
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center py-12"><LoadingSpinner /></div>
            ) : docs.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Database size={36} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium text-sm">No documents uploaded yet</p>
                <p className="text-xs mt-1">Upload a document to get started</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {docs.map(doc => (
                  <div key={doc.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                    <div className="text-xl flex-shrink-0">
                      {TYPE_ICONS[doc.source_type] || '📄'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">{doc.title}</p>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        {doc.source_type && (
                          <span className="text-xs text-gray-400 uppercase font-medium">{doc.source_type}</span>
                        )}
                        {doc.chunk_count > 0 && (
                          <span className="text-xs text-gray-400">{doc.chunk_count} chunks</span>
                        )}
                        {doc.created_at && (
                          <span className="text-xs text-gray-400">
                            {new Date(doc.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[doc.status] || STATUS_STYLES.pending}`}>
                        {doc.status || 'pending'}
                      </span>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        disabled={deletingId === doc.id}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40">
                        {deletingId === doc.id ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
