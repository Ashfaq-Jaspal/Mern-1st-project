import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, loading } = useContext(AuthContext);

    if (!loading) {
        if (user?.isAdmin) {
            return (
                <nav className="bg-gray-400 text-[22px] shadow-md fixed w-full top-0 left-0 z-50 flex  justify-between px-24 py-2 text-black border border-gray-600">
                    <div>
                        <h1 className="text-3xl">Logo</h1>
                    </div>
                    <div className="flex justify-between gap-4">
                        <NavLink
                            to="/admin-panel"
                            className={({ isActive }) =>
                                ` hover:text-blue-600 ${isActive ? 'font-semibold border-b-2 border-blue-800' : ''}`
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/create-project"
                            className={({ isActive }) =>
                                ` hover:text-blue-600 ${isActive ? 'font-semibold border-b-2 border-blue-800' : ''}`
                            }
                        >
                            New Project
                        </NavLink>
                        <NavLink
                            to="/create"
                            className={({ isActive }) =>
                                ` hover:text-blue-600 ${isActive ? 'font-semibold border-b-2 border-blue-800' : ''}`
                            }
                        >
                            Add User
                        </NavLink>
                        <NavLink
                            to="/employees"
                            className={({ isActive }) =>
                                ` hover:text-blue-600 ${isActive ? 'font-semibold border-b-2 border-blue-800' : ''}`
                            }
                        >
                            Team
                        </NavLink>
                        <NavLink
                            to="/projects"
                            className={({ isActive }) =>
                                ` hover:text-blue-600 ${isActive ? 'font-semibold border-b-2 border-blue-800' : ''}`
                            }
                        >
                            Projects
                        </NavLink>
                        <NavLink
                            to="/logout"
                            className="px-2 pb-1 bg-gray-400 text-red-800 font-medium shadow-md transition-all duration-300 hover:text-blue-600 border-b-2 border-b-red-800 hover:border-b-blue-800"
                        >
                            Sign Out
                        </NavLink>
                    </div>
                </nav>
            );
        }
        if (user) {
            if (!user.isAdmin) {
                return (
                    <nav className="bg-gray-400 text-[22px] shadow-md fixed w-full top-0 left-0 z-50 flex justify-between px-24 py-2 text-black border border-gray-600">
                        <div>
                            <h1 className="text-3xl">Logo</h1>
                        </div>
                        <div className="flex justify-between gap-4">
                            <NavLink
                                to="/employee-dashboard"
                                className={({ isActive }) =>
                                    ` hover:text-blue-600 ${isActive ? 'font-semibold mr-5 border-b-2 border-blue-800' : ''}`
                                }
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/logout"
                                className="px-2 pb-1 bg-gray-400 text-red-800 font-medium shadow-md transition-all duration-300 hover:text-blue-600 border-b-2 border-b-red-800 hover:border-b-blue-800"
                            >
                                Sign Out
                            </NavLink>
                        </div>
                    </nav>
                );
            }
        }
    }
};

export default Navbar;
