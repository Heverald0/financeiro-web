import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/financeiro',
  auth: {
    username: 'heveraldo',
    password: 'admin123'
  }
});

export default api;