import { createContext, useEffect, useState } from 'react';
import { api, getCurrentUser } from '../api/internal';
import { useNavigate } from 'react-router';
// Create context
export const AuthContext = createContext();
// Create provider
export const AuthProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const [clickedEmployee, setClickedEmployee] = useState('');
    const [clickedProject, setClickedProject] = useState('');
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [projectsOfEmployee, setProjectsOfEmployee] = useState([]);
    const [employeesOnProject, setEmployeesOnProject] = useState([]);
    const [numOfEmployees, setNumOfEmployees] = useState(0);
    const [numOfProjects, setNumOfProjects] = useState(0);
    const [accessToken, setAccessToken] = useState('');
    const navigate = useNavigate()

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
        (async function autoLoginApiCall() {
            try {
                const res = await api.post('/refresh', {});
                if (res.status === 200) {
                    console.log(res.data.accessToken);
                    fetchUser();
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    console.log('no refresh token');
                    console.log(error);
                    navigate('/login')
                } else {
                    console.log('Some other error');
                    console.log(error);
                }
            }
        })();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                backendUrl,
                user,
                setUser,
                loading,
                setLoading,
                token,
                setToken,
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
                accessToken,
                setAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
