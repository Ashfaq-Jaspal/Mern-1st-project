import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
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
        if (user === null) {
            fetchUser();
        } else if (user === false) {
            navigate('/login');
        } else if (user.isAdmin) {
            navigate('/admin-panel');
        } else {
            navigate('/employee-dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="p-6 bg-gray-950 min-h-screen min-w-full flex justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-100 mb-3">Loading...</h1>
        </div>
    );
};

export default Home;
