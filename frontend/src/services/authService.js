import api from './api.js';

export const loginUser = (email, password) => api.post('/auth/login', { email, password });
export const signupUser = (data) => api.post('/auth/signup', data);
export const getMe = () => api.get('/auth/me');
