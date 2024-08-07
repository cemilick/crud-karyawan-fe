import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_URL ?? 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}`
    },
    // You can add other default configurations here
});

export default api;