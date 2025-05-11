import { createContext, useEffect, useState } from 'react';
import { api, getCurrentUser } from '../api/internal';
// import { useNavigate } from 'react-router';
// import Loader from '../components/Loader';
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
    // const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const res = await getCurrentUser();
            if (res.status === 200) {
                // console.log(res);
                setUser(res.data.user);
                setProjects(res.data.projects);
                if (res.data.user.isAdmin) {
                    setEmployees(res.data.employees);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function autoLoginApiCall() {
        try {
            const res = await api.post('/refresh', {});
            if (res.status === 200) {
                await fetchUser();
            }
        } catch (error) {
            // console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        autoLoginApiCall();
    }, []);

    // if (loading) {
    //     return <Loader />;
    // }

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
