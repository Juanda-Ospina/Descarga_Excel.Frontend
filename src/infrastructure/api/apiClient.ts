import axios from 'axios';

const apiClient = axios.create({
  
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Centralized request interceptor for auth (without localStorage)
apiClient.interceptors.request.use((config) => {
  // Logic to get token from a secure memory store or context
  return config;
});

export default apiClient;
