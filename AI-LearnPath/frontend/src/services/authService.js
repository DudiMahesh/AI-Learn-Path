import api from './api';

export const authService = {
  register: async (data) => {
    const res = await api.post('/api/auth/register', data);
    // Backend returns { success, message, data: { token, user } }
    return res.data.data || res.data;
  },

  login: async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });
    // Backend returns { success, message, data: { token, user } }
    return res.data.data || res.data;
  },

  getMe: async () => {
    const res = await api.get('/api/auth/me');
    return res.data.data || res.data;
  },

  logout: async () => {
    try { await api.post('/api/auth/logout'); } catch {}
  }
};
