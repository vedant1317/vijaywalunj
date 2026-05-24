import api from './api.js';

export const getTestimonials = () => api.get('/testimonials');
export const submitTestimonial = (formData) =>
  api.post('/testimonials', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
