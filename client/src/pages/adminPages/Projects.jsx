import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/solid";

const Projects = () => {
    const navigate = useNavigate()
    const { backendUrl, user, setUser, employees, setEmployees, loading, setLoading, projects, setProjects } = useContext(AuthContext);
    const fetchData = async () => {
        try {
            const response = await fetch(`${backendUrl}/projects`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                navigate('/');
                toast.error(data.message);
            }
            if (response.ok) {
                setLoading(false);
                setUser(data.user.decodedToken);
                setProjects(data.projects);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal frontend side error');
        }
    };

    const handleProjectClick = async (projectId) => {
        setLoading(true)
        navigate(`/projects/${projectId}`);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!loading) {
    return (
        <div className="w-screen min-h-screen absolute top-10 -translate-x-1/2 p-5 flex flex-wrap gap-4 justify-center items-center mt-16">
            {projects && projects.length > 0 ? (
                projects.map((project) => (
                    <div key={project._id} onClick={() => handleProjectClick(project._id)} className="cursor-pointer">
                        <div className="w-64 p-6 rounded-lg bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-3 justify-center items-center border border-gray-700 hover:bg-gray-700 active:scale-95">
                            
                            {/* Project Name */}
                            <h2 className="text-white text-center text-xl mb-4 font-semibold tracking-wide">{project.name}</h2>

                            {/* Start Date */}
                            <p className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                <CalendarDaysIcon className="h-5 w-5 text-green-400" />
                                <span>
                                    <strong className="text-white">Start:</strong> {new Date(project.startDate).toLocaleDateString()}
                                </span>
                            </p>

                            {/* Due Date */}
                            <p className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                <ClockIcon className="h-5 w-5 text-red-400" />
                                <span>
                                    <strong className="text-white">Due:</strong> {new Date(project.endDate).toLocaleDateString()}
                                </span>
                            </p>

                        </div>
                    </div>
                ))
            ) : (
                <p className="text-white text-lg">No projects available</p>
            )}
        </div>
    );
};
};

export default Projects;
