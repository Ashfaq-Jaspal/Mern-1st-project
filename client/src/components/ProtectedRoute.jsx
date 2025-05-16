// import { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
    const { loading, user } = useSelector((state) => state.auth);

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
