import api from './api';

export const learningPathService = {
  getLearningPath: () => api.get('/api/learning-path').then(r => r.data),
  generatePath: () => api.post('/api/learning-path/generate').then(r => r.data),
  regeneratePath: () => api.post('/api/learning-path/regenerate').then(r => r.data)
};
