import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { UserIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, resetMessage } from '../../features/employees/employeeSlice';

const Employees = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, employees } = useSelector((state) => state.auth);
    const { message, error } = useSelector((state) => state.employees);

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(resetMessage());
        }
    }, [message]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(resetError());
        }
    }, [error]);

    const handleEmployeeClick = async (employeeId) => {
        navigate(`/employees/${employeeId}`);
    };

    useEffect(() => {
        console.log('employees page');
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="w-screen min-h-screen absolute top-14 -translate-x-1/2 p-5 flex flex-wrap gap-4 justify-center items-center">
            {employees?.length ? (
                employees.map((emp) => (
                    <div key={emp._id} onClick={() => handleEmployeeClick(emp._id)} className="cursor-pointer">
                        <div className="w-64 h-[187px] p-6 rounded-lg bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-3 justify-center items-center border border-gray-700 hover:bg-gray-700 active:scale-95">
                            {/* Employee Icon */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-16 w-16 flex items-center justify-center rounded-full shadow-lg">
                                <UserIcon className="h-8 w-8 text-white" />
                            </div>

                            {/* Employee Name */}
                            <h2 className="text-white text-xl font-semibold tracking-wide">{emp.name}</h2>

                            {/* Employee Status */}
                            <h3 className="text-gray-300 text-sm flex items-center gap-2">
                                <CheckBadgeIcon className="h-5 w-5 text-green-400" />
                                {emp.status}
                            </h3>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-white text-4xl">No Employees available</p>
            )}
        </div>
    );
};

export default Employees;
