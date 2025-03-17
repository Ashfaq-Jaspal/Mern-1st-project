import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { logout } from '../api/internal';

const Logout = () => {
    const navigate = useNavigate();
    const {
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
        fetchUser,
    } = useContext(AuthContext);

    useEffect(() => {
        const logOutUser = async () => {
            try {
                const response = await logout();
                navigate('/login');
                console.log(response);
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        logOutUser();
    }, []);

    return <div>logging out...</div>;
};

export default Logout;
