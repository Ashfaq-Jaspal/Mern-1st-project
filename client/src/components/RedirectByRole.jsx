import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { useSelector } from 'react-redux';

const RedirectByRole = () => {
    // const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const { token, loading } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (loading) return;
    //     if (!user) {
    //         navigate('/login');
    //     } else if (user.isAdmin) {
    //         navigate('/admin-panel');
    //     } else {
    //         navigate('/employee-dashboard');
    //     }
    // }, [user, loading, navigate]);

    useEffect(() => {
        console.log('RedirectByRole page');
    }, []);
    
    if (!loading) {
        console.log(token);
    }

    return <Loader />;
};

export default RedirectByRole;
