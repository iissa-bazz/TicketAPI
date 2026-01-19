import axios from 'axios';

const apiClient = axios.create({
  // Using /api prefix, nginx will proxy to backend container
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;