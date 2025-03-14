import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops!</h1>
                <p className="text-gray-600 text-lg mb-6">
                    Something went wrong. The page you are looking for might be missing or unavailable.
                </p>
                <NavLink to="/login">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all">
                        Go Home
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default Error;
