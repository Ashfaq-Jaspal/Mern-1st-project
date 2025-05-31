import axios from 'axios';
import { getToken, setToken } from '../utils/tokenService';

// api instance
export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// attach access token to every api call
api.interceptors.request.use((config) => {
    const accessToken = getToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// interceptor for access token
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 403 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/refresh')
        ) {
            originalRequest._retry = true;
            try {
                const res = await api.post('/refresh', {});
                const newAccessToken = res.data.accessToken;
                setToken(newAccessToken);
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                await logout();
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

// setting user globally
export const getCurrentUserData = async () => {
    try {
        const response = await api.get(`/current-user-data`);
        return response;
    } catch (error) {
        throw error;
    }
};

// login
export const login = async (data) => {
    try {
        const response = await api.post(`/login`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

// auto login
export const autoLogin = async () => {
    try {
        const res = await api.post('/refresh', {});
        return res;
    } catch (error) {
        throw error;
    }
};

// logout
export const logout = async () => {
    try {
        const response = await api.post(`/logout`);
        return response;
    } catch (error) {
        throw error;
    }
};

// clicked employee data
export const fetchProjectsOfEmployee = async (employeeId) => {
    try {
        const response = await api.get(`/employees/${employeeId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

// clicked project data
export const fetchEmployeesOfProject = async (projectId) => {
    try {
        const response = await api.get(`/projects/${projectId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

// create user
export const createEmployee = async (employee) => {
    try {
        const response = await api.post(`/create-user`, employee);
        return response;
    } catch (error) {
        throw error;
    }
};

// create project
export const createProject = async (project) => {
    try {
        const response = await api.post(`/create-project`, project);
        return response;
    } catch (error) {
        throw error;
    }
};

// delete user
export const deleteEmployee = async (employeeId) => {
    try {
        const response = await api.delete(`/delete-user/${employeeId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

// delete project
export const deleteProject = async (projectId) => {
    try {
        const response = await api.delete(`/delete-project/${projectId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

// update user
export const updateEmployee = async (userId, user) => {
    try {
        const response = await api.put(`/update-user/${userId}`, user);
        return response;
    } catch (error) {
        throw error;
    }
};

// update project
export const updateProject = async (projectId, updatedData) => {
    try {
        const response = await api.put(`/update-project/${projectId}`, updatedData);
        return response;
    } catch (error) {
        throw error;
    }
};
