import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
// import { AuthContext } from '../../context/AuthContext';
// const { user, setUser, employees, setEmployees, loading, setLoading } = useContext(AuthContext);
// if (response.ok) {
//     setUser(data.user.decodedToken)
// }

const EmployeeDashboard = () => {
    const { user, setUser, employees, setEmployees, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const authenticate = async () => {
        try {
            const response = await fetch('http://localhost:5000/employee-dashboard', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) {
                navigate('/login');
                toast.error(data.message);
            }
            if (response.ok) {
                    setUser(data.user.decodedToken)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error);
                toast.error('Internal frontend side error');
            }
    };

    useEffect(()=>{
        if (!user) {
            authenticate();
        }
    },[])

    return (
        <div className="p-6 bg-gray-100 min-h-screen min-w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Employee Dashboard</h1>
        </div>
    );
};

export default EmployeeDashboard;
