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

    // Fetching user details
    const fetchUser = async () => {
        try {
            const response = await fetch(`${backendUrl}/`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) {
                setUser(false);
            }
            if (response.ok) {
                setUser(data.user.decodedToken);
            }
        } catch (error) {
            console.error(error);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
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
                fetchUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
