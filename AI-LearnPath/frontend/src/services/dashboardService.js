import api from './api';

export const dashboardService = {
  getDashboard: () => api.get('/api/dashboard').then(r => r.data)
};
