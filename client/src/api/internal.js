import axios from 'axios';

// api instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// login
export const login = async (data) => {
    try {
        const reponse = await api.post(`/login`, data);
        return reponse;
    } catch (error) {
        if (error.response.status === 400) {
            // validation error
            return error.response.data.error.details[0].message;
        } else if (error.response.status === 401) {
            // Authentication error
            return error.response.data.message;
        } else {
            // Any other error
            return error.message;
        }
    }
};

// logout
export const logout = async () => {
    try {
        const reponse = await api.post(`/logout`);
        return reponse.data.message;
    } catch (error) {
        return error;
    }
};
