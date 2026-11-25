import api from './api';

export const adminService = {
  getAdminStats: () => api.get('/api/admin/stats').then(r => r.data),
  getStats: () => api.get('/api/admin/stats').then(r => r.data),
  getUsers: () => api.get('/api/admin/users').then(r => r.data),
  getUserCount: () => api.get('/api/admin/users').then(r => r.data?.length || 0),
};
