import api from './api';

export const recommendationService = {
  getRecommendations: () => api.get('/api/recommendations').then(r => r.data)
};
