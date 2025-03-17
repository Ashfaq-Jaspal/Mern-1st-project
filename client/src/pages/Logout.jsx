import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

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

    const logOutUser = async () => {
        try {
            const response = await fetch(`${backendUrl}/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            let data = await response.json();
            if (!response.ok) {
                console.log('res not ok');
            }
            if (response.ok) {
                console.log(data.message);
                setUser(null);
                // setLoading(true);
                console.log('res ok');
                navigate('/login');
            }
        } catch (error) {
            console.log('catch error');
            console.log(error);
        }
    };

    useEffect(() => {
        logOutUser();
    }, []);

    return <div>logging out...</div>;
};

export default Logout;
