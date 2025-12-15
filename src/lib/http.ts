import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_APP_ENV !== 'production') {
    console.log('Http Client initializing with API_URL:', API_URL);
}

const http = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 30000, // 30 seconds timeout
});

// Response interceptor for unified error handling
http.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log error for debugging only in development
        if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_APP_ENV !== 'production') {
            console.error('API Error:', error.response?.data || error.message);
        }

        // Standardize error object
        const customError = {
            message: error.response?.data?.message || error.message || 'An unexpected error occurred',
            status: error.response?.status,
            data: error.response?.data,
        };

        return Promise.reject(customError);
    }
);

export default http;
