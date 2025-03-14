import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, setUser, setLoading, loading } = useContext(AuthContext);

    if (!loading) {
        if (user.isAdmin) {
            return (
                <nav className="bg-gray-400 shadow-md fixed w-full top-0 left-0 z-50 flex justify-around py-2 text-black border border-gray-600">
                    <div>
                        <h1>Logo</h1>
                    </div>
                    <div className="flex justify-between gap-4">
                        <NavLink
                            to="/admin-panel"
                            className={({ isActive }) =>
                                ` hover:text-blue-600 ${isActive ? 'font-semibold border-b-2 border-blue-800' : ''}`
                            }
                        >
                            admin-panel
                        </NavLink>
                        <NavLink
                            to="/create-project"
                            className={({ isActive }) =>
                                ` hover:text-blue-600 ${isActive ? 'font-semibold border-b-2 border-blue-800' : ''}`
                            }
                        >
                            create-project
                        </NavLink>
                        <NavLink
                            to="/create"
                            className={({ isActive }) =>
                                ` hover:text-blue-600 ${isActive ? 'font-semibold border-b-2 border-blue-800' : ''}`
                            }
                        >
                            CreateUser
                        </NavLink>
                        <NavLink
                            to="/employees"
                            className={({ isActive }) =>
                                ` hover:text-blue-600 ${isActive ? 'font-semibold border-b-2 border-blue-800' : ''}`
                            }
                        >
                            employees
                        </NavLink>
                        <NavLink
                            to="/projects"
                            className={({ isActive }) =>
                                ` hover:text-blue-600 ${isActive ? 'font-semibold border-b-2 border-blue-800' : ''}`
                            }
                        >
                            projects
                        </NavLink>
                        <NavLink
                            to="/logout"
                            className="px-2 pb-1 bg-gray-400 text-red-800 font-medium shadow-md transition-all duration-300 hover:text-blue-600 border-b-2 border-b-red-800 hover:border-b-blue-800"
                        >
                            logout
                        </NavLink>
                    </div>
                </nav>
            );
        }
        if (!user.isAdmin) {
            return (
                <nav className="bg-gray-400 shadow-md fixed w-full top-0 left-0 z-50 flex justify-around py-2 text-black border border-gray-600">
                    <div>
                        <h1>Logo</h1>
                    </div>
                    <div className="flex justify-between gap-4">
                        <NavLink
                            to="/employee-dashboard"
                            className={({ isActive }) =>
                                ` hover:text-blue-600 ${isActive ? 'font-semibold border-b-2 border-blue-800' : ''}`
                            }
                        >
                            employee-dashboard
                        </NavLink>

                        <NavLink
                            to="/logout"
                            className="px-2 pb-1 bg-gray-400 text-red-800 font-medium shadow-md transition-all duration-300 hover:text-blue-600 border-b-2 border-b-red-800 hover:border-b-blue-800"
                        >
                            logout
                        </NavLink>
                    </div>
                </nav>
            );
        }
    }
};

export default Navbar;
