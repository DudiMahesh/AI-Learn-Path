import api from './api';

export const progressService = {
  getProgress: () => api.get('/api/progress').then(r => r.data),
  getAnalytics: () => api.get('/api/analytics').then(r => r.data),
  getActivity: () => api.get('/api/activity').then(r => r.data),
  getCareerReadiness: () => api.get('/api/career-readiness').then(r => r.data)
};
