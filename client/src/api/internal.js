import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (data) => {
    try {
        const reponse = await api.post(`/login`, data);
        return reponse;
    } catch (error) {
        if (error.response) {
            // Server responded with an error (4xx, 5xx)
            return error.response;
        } else {
            // Any other error
            return error.message;
        }
    }
};
