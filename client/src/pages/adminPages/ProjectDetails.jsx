import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate, useParams } from 'react-router';
import { toast } from 'react-hot-toast';
import { BriefcaseIcon, UsersIcon, XCircleIcon, UserIcon } from '@heroicons/react/24/solid';
import { deleteProject, fetchEmployeesOnClickedProject } from '../../api/internal';
import Loader from '../../components/Loader';

const ProjectDetails = () => {
    const {
        user,
        setUser,
        employeesOnProject,
        setEmployeesOnProject,
        loading,
        setLoading,
        clickedProject,
        setClickedProject,
        fetchUser,
    } = useContext(AuthContext);
    const { projectId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClickedProjectData = async () => {
            try {
                const response = await fetchEmployeesOnClickedProject(projectId);
                console.log(response);
                setUser(response.data.user);
                setEmployeesOnProject(response.data.employees);
                setClickedProject(response.data.project[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchClickedProjectData();
    }, []);

    const handleDeleteProject = async () => {
        navigate(`/projects`);
        try {
            const res = await deleteProject(clickedProject._id);
            if (res.status === 200) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        fetchUser();
    };

    const handleUpdateProject = async (projectId) => {
        navigate(`/update-project/${projectId}`);
    };

    useEffect(()=>{
        console.log('project details page');
    },[])

    return (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white flex items-center justify-center p-6 w-full">
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-2xl rounded-lg p-8 w-full max-w-3xl">
                {/* Close Button */}
                <Link
                    to={user.isAdmin ? '/projects' : '/employee-dashboard'}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                >
                    <XCircleIcon className="h-8 w-8" />
                </Link>

                {/* Project Details */}
                <div className="flex justify-between gap-6 mt-9">
                    <div className="flex items-center w-[70%] flex-grow space-x-4 border-b border-gray-700 pb-4">
                        <BriefcaseIcon className="h-10 w-10 text-blue-400" />
                        <div>
                            <h1 className="text-3xl font-bold">{clickedProject?.name}</h1>
                            <p className="text-gray-400">{clickedProject?.description}</p>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => handleUpdateProject(clickedProject._id)}
                            className="px-3 py-1 mt-3 w-full text-white text-lg bg-blue-700 hover:bg-blue-800 border-none rounded-full"
                        >
                            Update project
                        </button>
                        <button
                            onClick={handleDeleteProject}
                            className="px-3 py-1 mt-3 w-full text-white text-lg bg-red-700 hover:bg-red-800 border-none rounded-full"
                        >
                            Delete project
                        </button>
                    </div>
                </div>

                {/* Assigned Employees */}
                <h2 className="text-2xl font-semibold mt-6 border-b border-gray-700 pb-2 flex items-center">
                    <UsersIcon className="h-6 w-6 text-green-400 mr-2" />
                    Employees on this project
                </h2>

                <div className="mt-4 space-y-4">
                    {employeesOnProject.length > 0 ? (
                        employeesOnProject.map((employee) => (
                            <div
                                key={employee._id}
                                className="p-5 bg-gray-800 rounded-md shadow-md transition duration-300 flex items-center space-x-4"
                            >
                                <UserIcon className="h-8 w-8 text-blue-400" />
                                <div>
                                    <h3 className="text-xl font-semibold text-blue-400">{employee.name}</h3>
                                    <p className="text-gray-300">{employee.status}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-red-600">No employees on this project</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
