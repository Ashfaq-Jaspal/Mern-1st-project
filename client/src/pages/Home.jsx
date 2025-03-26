import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Home = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) {
            navigate('/login');
        } else if (user.isAdmin) {
            navigate('/admin-panel');
        } else {
            navigate('/employee-dashboard');
        }
    }, [user, loading, navigate]);

    return (
        <Loader />
    );
};

export default Home;
