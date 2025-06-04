import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';

const RedirectByRole = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (loading) return;
        if (!loading) {
            if (user) {
                // console.log(user);
                if (user.isAdmin) {
                    navigate('/admin-panel');
                } else {
                    navigate('/employee-dashboard');
                }
            } else {
                navigate('/login');
            }
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        console.log('RedirectByRole page');
    }, []);

    return <Loader />;
};

export default RedirectByRole;
