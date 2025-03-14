import { createContext, useState } from 'react';
// Create context
export const AuthContext = createContext();
// Create provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [clickedEmployee, setClickedEmployee] = useState('');
    const [clickedProject, setClickedProject,] = useState('');
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);

    return (
        <AuthContext.Provider
            value={{
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
