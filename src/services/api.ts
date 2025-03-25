import axios from 'axios';

const api = axios.create({
  baseURL: 'https://67e2dada97fc65f53537e22e.mockapi.io/tasks',
});

export default api;
