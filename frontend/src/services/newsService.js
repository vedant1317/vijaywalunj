import api from './api.js';

export const getNews = (page = 1, limit = 6) => api.get(`/news?page=${page}&limit=${limit}`);
export const getNewsById = (slug) => api.get(`/news/${slug}`);
