import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logoutUser } from '../features/auth/authThunks';
import { resetUser } from '../features/auth/authSlice';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUser());
        dispatch(resetUser())
        console.log('cleared user');
        navigate('/login');
    }, []);

    useEffect(() => {
        console.log('logout page');
    }, []);

    return <div>logging out...</div>;
};

export default Logout;
