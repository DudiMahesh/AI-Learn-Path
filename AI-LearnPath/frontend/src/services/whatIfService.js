import api from './api';

export const whatIfService = {
  simulate: (scenario) => api.post('/api/what-if', scenario).then(r => r.data)
};
