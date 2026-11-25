import api from './api';

export const searchService = {
  search: (q) => api.get('/api/search', { params: { q } }).then(r => r.data)
};
