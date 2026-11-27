import api from './api';

export const ragService = {
  sendChat: (conversationId, message, context = {}) => 
    api.post('/api/rag/chat', { conversation_id: conversationId, message, context }).then(r => r.data),
  createConversation: () => api.post('/api/rag/conversations').then(r => r.data),
  getConversations: () => api.get('/api/rag/conversations').then(r => r.data),
  getConversation: (id) => api.get(`/api/rag/conversations/${id}`).then(r => r.data),
  deleteConversation: (id) => api.delete(`/api/rag/conversations/${id}`).then(r => r.data),
  renameConversation: (id, title) => api.put(`/api/rag/conversations/${id}/rename`, { title }).then(r => r.data),
  uploadDocument: (formData) => api.post('/api/rag/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(r => r.data),
  getDocuments: () => api.get('/api/rag/documents').then(r => r.data),
  deleteDocument: (id) => api.delete(`/api/rag/documents/${id}`).then(r => r.data),
  reindexDocuments: () => api.post('/api/rag/documents/reindex').then(r => r.data),
  generateVisual: (question, subject = '', answer = '', regenerate = false) =>
    api.post('/api/visual/generate', { question, subject, answer, regenerate }).then(r => r.data)
};
