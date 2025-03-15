import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const navigate = useNavigate();
    const { backendUrl, setUser, setLoading, setEmployees } = useContext(AuthContext);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${backendUrl}/`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) {
                console.log('res not ok');
                navigate('/login');
            }
            if (response.ok) {
                console.log('res ok');
                if (data.user.decodedToken.isAdmin) {
                    navigate('/admin-panel');
                } else {
                    navigate('/employee-dashboard');
                }
                setUser(data.user.decodedToken);
                setEmployees(data.employees);
                setEmployees(false);
            }
        } catch (error) {
            console.error(error);
            toast.error('Internal frontend side error');
        }
    };

    fetchUserData();

    return (
        <div className="p-6 bg-gray-950 min-h-screen min-w-full flex justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-100 mb-3">Fetching data...</h1>
        </div>
    );
};

export default Home;
