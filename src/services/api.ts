import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  auth: {
    username: 'heveraldo',
    password: 'admin123'
  }
});

export default api;