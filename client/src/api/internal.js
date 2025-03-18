import axios from 'axios';

// api instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// set user globally
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

// home
// export const fetchUser = async () => {
//     try {
//         const response = await api.get('/');
//         return response;
//     } catch (error) {
//         return error;
//     }
// };

// employee dashboard
export const fetchUsersProjects = async () => {
    try {
        const response = await api.get('/employee-dashboard');
        return response;
    } catch (error) {
        return error;
    }
};

// // admin dashboard
// export const fetchUsersAndProjects = async () => {
//     try {
//         const response = await api.get('/admin-panel');
//         return response;
//     } catch (error) {
//         return error;
//     }
// };    

// employees
export const fetchEmployees = async () => {
    try {
        const response = await api.get('/employees');
        return response;
    } catch (error) {
        return error;
    }
};    

// projects
export const fetchProjects = async () => {
    try {
        const response = await api.get('/projects');
        return response;
    } catch (error) {
        return error;
    }
};    

// clicked employee
export const fetchProjectsOfClickedEmployee = async (employeeId) => {
    try {
        const response = await api.get(`/employees/${employeeId}`);
        return response;
    } catch (error) {
        return error;
    }
};  

// clicked project
export const fetchEmployeesOnClickedProject = async (projectId) => {
    try {
        const response = await api.get(`/projects/${projectId}`);
        return response;
    } catch (error) {
        return error;
    }
};