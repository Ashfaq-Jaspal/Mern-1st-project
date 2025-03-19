import React from 'react';

const Card = ({Icon, count, label}) => {
    return (
        <div>
            <div className="w-72 h-40 p-5 rounded-lg bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-1.5 justify-center items-center cursor-pointer border border-gray-700 hover:bg-gray-700 active:scale-95">
                <Icon className="h-10 w-10 text-blue-400  flex-shrink-0" />
                <h2 className="text-white text-4xl font-semibold tracking-wide">{count}</h2>
                <p className="text-gray-300 text-2xl font-medium">{label}</p>
            </div>
        </div>
    );
};

export default Card;
