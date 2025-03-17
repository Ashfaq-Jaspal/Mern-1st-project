import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { logout } from '../api/internal';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logOutUser = async () => {
            try {
                const response = await logout();
                navigate('/login');
                toast.success(response.data.message);
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        logOutUser();
    }, []);

    return <div>logging out...</div>;
};

export default Logout;
