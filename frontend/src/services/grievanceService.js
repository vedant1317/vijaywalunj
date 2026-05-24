import api from './api.js';

export const submitGrievance = (formData) =>
  api.post('/grievances', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const trackGrievance = (referenceId) => api.get(`/grievances/track/${referenceId}`);
export const getMyGrievances = () => api.get('/grievances/my');
