import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/solid';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, resetMessage } from '../../features/projects/projectSlice';

const Projects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, projects } = useSelector((state) => state.auth);
    const { message, error } = useSelector((state) => state.projects);

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

    const handleProjectClick = async (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    useEffect(() => {
        console.log('projects page');
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="w-screen min-h-screen absolute top-10 -translate-x-1/2 p-5 flex flex-wrap gap-4 justify-center items-center">
            {projects?.length ? (
                projects.map((project) => (
                    <div key={project._id} onClick={() => handleProjectClick(project._id)} className="cursor-pointer">
                        <div className="w-64 h-[187px] p-6 rounded-lg bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-3 justify-center items-center border border-gray-700 hover:bg-gray-700 active:scale-95">
                            {/* Project Name */}
                            <h2 className="text-white text-center text-2xl mb-4 font-semibold tracking-wide">
                                {project.name}
                            </h2>

                            {/* Start Date */}
                            <p className="text-gray-300 text-md font-medium flex items-center gap-2">
                                <CalendarDaysIcon className="h-5 w-5 text-green-400" />
                                <span>
                                    <strong className="text-white">Start:</strong>{' '}
                                    {new Date(project.startDate).toDateString()}
                                </span>
                            </p>

                            {/* Due Date */}
                            <p className="text-gray-300 text-md font-medium flex items-center gap-2">
                                <ClockIcon className="h-5 w-5 text-red-400" />
                                <span>
                                    <strong className="text-white">Due:</strong> {new Date(project.endDate).toDateString()}
                                </span>
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-white text-4xl">No projects available</p>
            )}
        </div>
    );
};

export default Projects;
