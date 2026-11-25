import api from './api';

export const assessmentService = {
  getDiagnosticAssessment: () => api.get('/api/assessment/diagnostic').then(r => r.data),
  startDiagnostic: () => api.post('/api/assessment/diagnostic/start').then(r => r.data),
  submitDiagnostic: (payload) => {
    const body = Array.isArray(payload) ? { answers: payload } : payload;
    return api.post('/api/assessment/diagnostic/submit', body).then(r => r.data);
  },
  getAssessmentHistory: () => api.get('/api/assessment/history').then(r => r.data),
  getHistory: () => api.get('/api/assessment/history').then(r => r.data),
  getAssessment: (id) => api.get(`/api/assessment/${id}/questions`).then(r => r.data),
  startAssessment: (id) => api.post(`/api/assessment/${id}/start`).then(r => r.data),
  submitAssessment: (id, answers) => api.post(`/api/assessment/${id}/submit`, { answers }).then(r => r.data),
  getAttemptReview: (attemptId) => api.get(`/api/assessment/attempt/${attemptId}/review`).then(r => r.data)
};


