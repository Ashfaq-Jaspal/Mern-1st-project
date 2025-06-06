import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BriefcaseIcon, EnvelopeIcon, XCircleIcon, CalendarDaysIcon, UserIcon, FolderIcon } from '@heroicons/react/24/solid';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectsOfEmployeeThunk } from '../../features/projects/projectThunks';
import { deleteEmployeeThunk } from '../../features/employees/employeeThunks';

const EmployeeDetails = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, clickedEmployee, projectsOfEmployee } = useSelector((state) => state.projects);

    useEffect(() => {
        dispatch(fetchProjectsOfEmployeeThunk(employeeId));
    }, []);

    const handleDeleteUser = async () => {
        dispatch(deleteEmployeeThunk(clickedEmployee._id));
        navigate(`/employees`);
    };

    const handleUpdateUser = async (userId) => {
        navigate(`/update-user/${userId}`);
    };

    useEffect(() => {
        console.log('employee details page');
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white flex items-center justify-center p-6 w-full">
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-2xl rounded-lg p-8 w-full max-w-3xl relative">
                {/* Close Button */}
                <Link to={'/employees'} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
                    <XCircleIcon className="h-8 w-8" />
                </Link>

                {/* Employee Details */}
                <div className="flex justify-between items-center  mt-6 space-x-4 border-b border-gray-700 pb-4">
                    <div className="flex gap-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-16 w-16 flex items-center justify-center rounded-full text-2xl font-semibold shadow-lg">
                            {clickedEmployee?.name?.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{clickedEmployee?.name}</h1>
                            <p className="text-gray-400">{clickedEmployee?.status}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-3">
                        <button
                            onClick={() => handleUpdateUser(clickedEmployee?._id)}
                            className="px-10 py-1 text-white text-lg bg-blue-700 hover:bg-blue-800 border-none rounded-full"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDeleteUser}
                            className="px-10 py-1 text-white text-lg bg-red-700 hover:bg-red-800 border-none rounded-full"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                {/* Employee Email */}
                <div className="mt-4 flex items-center space-x-2">
                    <EnvelopeIcon className="h-5 w-5 text-green-400" />
                    <p className="text-gray-300">
                        <span className="font-semibold">Email:</span> {clickedEmployee?.email}
                    </p>
                </div>

                {/* Assigned Projects */}
                <h2 className="text-2xl font-semibold mt-6 border-b border-gray-700 pb-2 flex items-center">
                    <BriefcaseIcon className="h-6 w-6 text-blue-400 mr-2" />
                    Assigned Projects
                </h2>

                {projectsOfEmployee?.length > 0 ? (
                    <div className="mt-4 space-y-4">
                        {projectsOfEmployee?.map((project) => (
                            <div key={project._id} className="p-5 bg-gray-800 rounded-md shadow-md transition duration-300">
                                <h3 className="text-xl font-semibold text-blue-400 flex items-center space-x-2">
                                    <FolderIcon className="h-5 w-5 text-yellow-400" />
                                    <span>{project.name}</span>
                                </h3>
                                <p className="text-gray-300">{project.description}</p>
                                <p className="text-sm mt-2 text-gray-400 flex items-center space-x-2">
                                    <CalendarDaysIcon className="h-5 w-5 text-green-400" />
                                    <span>
                                        <strong>Start:</strong> {new Date(project.startDate).toDateString()}
                                    </span>
                                    <span className="mx-2">|</span>
                                    <CalendarDaysIcon className="h-5 w-5 text-red-500" />
                                    <span>
                                        <strong>End:</strong> {new Date(project.endDate).toDateString()}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-4 text-red-500 font-semibold">No projects assigned.</p>
                )}
            </div>
        </div>
    );
};

export default EmployeeDetails;
