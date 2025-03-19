import { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../api/internal';
// Create context
export const AuthContext = createContext();
// Create provider
export const AuthProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [clickedEmployee, setClickedEmployee] = useState('');
    const [clickedProject, setClickedProject] = useState('');
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [projectsOfEmployee, setProjectsOfEmployee] = useState([]);
    const [employeesOnProject, setEmployeesOnProject] = useState([]);
    const [numOfEmployees, setNumOfEmployees] = useState(0);
    const [numOfProjects, setNumOfProjects] = useState(0);

    const fetchUser = async () => {
        try {
            const res = await getCurrentUser();
            if (res.status === 200) {
                setUser(res.data.user);
                if (res.data.user.isAdmin) {
                    // all projects and employees (for admin)
                    setEmployees(res.data.employees);
                    setProjects(res.data.projects);
                } else if (!res.data.user.isAdmin) {
                    // user's projects (for employee)
                    setProjects(res.data.projects);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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
                projectsOfEmployee,
                setProjectsOfEmployee,
                employeesOnProject,
                setEmployeesOnProject,
                clickedEmployee,
                setClickedEmployee,
                clickedProject,
                setClickedProject,
                numOfEmployees,
                setNumOfEmployees,
                numOfProjects,
                setNumOfProjects,
                fetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
