import { createContext, useEffect, useState } from 'react';
// Create context
export const AuthContext = createContext();
// Create provider
export const AuthProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [clickedEmployee, setClickedEmployee] = useState('');
    const [clickedProject, setClickedProject] = useState('');
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);

    return (
        <AuthContext.Provider
            value={{
                backendUrl,
                user,
                setUser,
                loading,
                setLoading,
                employees,
                setEmployees,
                projects,
                setProjects,
                clickedEmployee,
                setClickedEmployee,
                clickedProject,
                setClickedProject,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
