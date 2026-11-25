import api from './api';

const unwrap = (r) => (r.data?.data !== undefined ? r.data.data : r.data);

export const courseService = {
  getCourses: (params) => api.get('/api/courses', { params }).then(unwrap),
  getCourse: (id) => api.get(`/api/courses/${id}`).then(unwrap),
  createCourse: (data) => api.post('/api/courses', data).then(unwrap),
  deleteCourse: (id) => api.delete(`/api/courses/${id}`).then(unwrap),
  getTopic: (id) => api.get(`/api/topics/${id}`).then(unwrap),
  completeLesson: (id) => api.post(`/api/lesson/${id}/complete`).then(unwrap),
  completeTopic: (id) => api.post(`/api/topic/${id}/complete`).then(unwrap)
};
