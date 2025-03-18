import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    if (user?.isAdmin) {
        navigate('/admin-panel');
    } else {
        navigate('/employee-dashboard');
    }

    return (
        <div className="p-6 bg-gray-950 min-h-screen min-w-full flex justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-100 mb-3">Loading...</h1>
        </div>
    );
};

export default Home;
