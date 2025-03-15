import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
    const {backendUrl,  user, setUser, employees, setEmployees, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

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
                toast.success(data.message);
                setUser(null);
                setLoading(true);
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal frontend side error');
        }
    };

    useEffect(() => {
        logOutUser();
    }, []);

    return <div>logging out...</div>;
};

export default Logout;
