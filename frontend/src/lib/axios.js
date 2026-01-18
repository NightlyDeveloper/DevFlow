import axios from 'axios';

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : '/api';

const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    // ⚠️ CRITICAL: You MUST return config here!
    // If you forget this line, the request is blocked.
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;