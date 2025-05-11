import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading)
        return (
            <div>
                <Loader />
            </div>
        );

    if (!user) return <Navigate to="/login" />;

    const userRole = user.isAdmin ? 'admin' : 'employee';
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
