import axios from 'axios';

const HOST = import.meta.env.VITE_API_URL || 'http://localhost';
const PORT = import.meta.env.VITE_API_PORT || 3333;

const api = axios.create({
  baseURL: `${HOST}:${PORT}`,
});

export default api;
