import { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { autoLoginUser, getCurrentUserThunk } from '../features/auth/authThunks';

const ProtectedRoute = ({ allowedRoles }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(autoLoginUser());
    }, []);

    const { token, loading, error, user } = useSelector((state) => state.auth);



    useEffect(()=>{
        if (!loading) {
            if (user) {
                console.log(user);
            }
        }
    },[])

    // if (loading)
    //     return (
    //         <div>
    //             <Loader />
    //         </div>
    //     );

    // if (!user) return <Navigate to="/login" />;

    // const userRole = user.isAdmin ? 'admin' : 'employee';
    // if (!allowedRoles.includes(userRole)) {
    //     return <Navigate to="/login" />;
    // }

    // return <Outlet />;
};

export default ProtectedRoute;
