import axios from 'axios';

// api instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// setting user globally
export const getCurrentUser = async () => {
    try {
        const response = await api.get(`current-user`);
        return response;
    } catch (error) {
        return error;
    }
};

// login
export const login = async (data) => {
    try {
        const response = await api.post(`/login`, data);
        return response;
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
        const response = await api.post(`/logout`);
        return response;
    } catch (error) {
        return error;
    }
};

// clicked employee data
export const fetchProjectsOfClickedEmployee = async (employeeId) => {
    try {
        const response = await api.get(`/employees/${employeeId}`);
        return response;
    } catch (error) {
        return error;
    }
};

// clicked project data
export const fetchEmployeesOnClickedProject = async (projectId) => {
    try {
        const response = await api.get(`/projects/${projectId}`);
        return response;
    } catch (error) {
        return error;
    }
};

// create user
export const createUser = async (user) => {
    try {
        const response = await api.post(`/create-user`, user);
        return response;
    } catch (error) {
        return error;
    }
};

// create project
export const createProject = async (project) => {
    try {
        const response = await api.post(`/create-project`, project);
        return response;
    } catch (error) {
        return error;
    }
};

// delete user
export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/delete-user/${userId}`);
        return response;
    } catch (error) {
        return error;
    }
};

// delete project
export const deleteProject = async (projectId) => {
    try {
        const response = await api.delete(`/delete-project/${projectId}`);
        return response;
    } catch (error) {
        return error;
    }
};

// update user
export const updateUser = async (userId, data) => {
    try {
        const response = await api.put(`/update-user/${userId}`, data);
        return response;
    } catch (error) {
        return error;
    }
};

// update project
export const updateProject = async (projectId, data) => {
    try {
        const response = await api.put(`/update-project/${projectId}`, data);
        return response;
    } catch (error) {
        return error;
    }
};