import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, loading } = useContext(AuthContext);

    if (!loading) {
        if (user?.isAdmin) {
            return (
                <nav className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-lg shadow-md border-b border-gray-700 px-12 py-2 flex justify-between items-center z-50">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-wide">Logo</h1>
                    </div>
                    <div className="flex items-center gap-8">
                        {[
                            { to: '/admin-panel', text: 'Dashboard' },
                            { to: '/create-project', text: 'New Project' },
                            { to: '/create-user', text: 'Add User' },
                            { to: '/employees', text: 'Team' },
                            { to: '/projects', text: 'Projects' },
                        ].map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `relative text-lg font-medium text-gray-300 transition-all duration-300 hover:text-blue-400 ${
                                        isActive
                                            ? "text-blue-500 after:absolute after:content-[''] after:w-full after:h-[2px] after:bg-blue-500 after:left-0 after:-bottom-1"
                                            : ''
                                    }`
                                }
                            >
                                {link.text}
                            </NavLink>
                        ))}
                        <NavLink
                            to="/logout"
                            className="px-4 py-1 text-lg font-semibold text-white bg-red-600 rounded-full shadow-md transition-all duration-300 hover:bg-red-700"
                        >
                            Sign Out
                        </NavLink>
                    </div>
                </nav>
            );
        }

        if (user && !user.isAdmin) {
            return (
                <nav className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-lg shadow-md border-b border-gray-700 px-12 py-2 flex justify-between items-center z-50">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-wide">Logo</h1>
                    </div>
                    <div className="flex items-center gap-8">
                        <NavLink
                            to="/employee-dashboard"
                            className={({ isActive }) =>
                                `relative text-lg font-medium text-gray-300 transition-all duration-300 hover:text-blue-400 ${
                                    isActive
                                        ? "text-blue-500 after:absolute after:content-[''] after:w-full after:h-[2px] after:bg-blue-500 after:left-0 after:-bottom-1"
                                        : ''
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/logout"
                            className="px-4 py-1 text-lg font-semibold text-white bg-red-600 rounded-full shadow-md transition-all duration-300 hover:bg-red-700"
                        >
                            Sign Out
                        </NavLink>
                    </div>
                </nav>
            );
        }
    }
};

export default Navbar;
