import axios from 'axios';

const apiClient = axios.create({
  // Replace with your real API endpoint later
  baseURL: 'http://localhost:8000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;