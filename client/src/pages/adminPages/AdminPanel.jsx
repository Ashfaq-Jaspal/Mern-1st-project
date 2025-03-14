import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const AdminPanel = () => {
    const { user, setUser, employees, setEmployees, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const authenticate = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin-panel', {
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
                setUser(data.user.decodedToken);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal frontend side error');
        }
    };

    useEffect(() => {
            authenticate();
    }, []);

    return (
        <div className="p-6 bg-gray-950 min-h-screen min-w-full flex justify-around items-center gap-20">
            <Link to="/employees">
                <div className="w-64 p-5 rounded-lg bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-3 justify-center items-center cursor-pointer border border-gray-700 hover:bg-gray-700 active:scale-95">
                    {/* <div className='text-gray-950'>ICON</div> */}
                    <h2 className="text-white text-xl font-semibold tracking-wide">10</h2>
                    <p className="text-gray-300 text-sm font-medium">Employees</p>
                </div>
            </Link>
            <Link to="/projects">
                <div className="w-64 p-5 rounded-lg bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-3 justify-center items-center cursor-pointer border border-gray-700 hover:bg-gray-700 active:scale-95">
                    {/* <div className='text-gray-950'>ICON</div> */}
                    <h2 className="text-white text-xl font-semibold tracking-wide">20</h2>
                    <p className="text-gray-300 text-sm font-medium">Projects</p>
                </div>
            </Link>
        </div>
    );
};

export default AdminPanel;
