import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { fetchUser } from '../api/internal';
import { toast } from 'react-hot-toast';

const Home = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchUser();
                if (response.status === 200) {
                    // valid user
                    setUser(response.data.user);
                    if (response.data.user.isAdmin) {
                        navigate('/admin-panel');
                    } else {
                        navigate('/employee-dashboard');
                    }
                }
                if (response.status === 401) {
                    // invalid user
                    setUser(null);
                    navigate('/login')
                    toast.error(response.response.data.message);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 bg-gray-950 min-h-screen min-w-full flex justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-100 mb-3">Loading...</h1>
        </div>
    );
};

export default Home;
