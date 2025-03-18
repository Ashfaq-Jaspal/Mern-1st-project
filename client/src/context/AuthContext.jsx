import { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../api/internal';
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
    const [numOfEmployees, setNumOfEmployees] = useState(0);
    const [projects, setProjects] = useState([]);
    const [numOfProjects, setNumOfProjects] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getCurrentUser(); // Fetch user from API
                setUser(res.data.user);
                setEmployees(res.data.employees);
                setProjects(res.data.projects);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser(); // Call API on first render
    }, []);

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
                numOfEmployees,
                setNumOfEmployees,
                numOfProjects,
                setNumOfProjects,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
