import { ArrowPathIcon } from '@heroicons/react/24/outline';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-20">
            <ArrowPathIcon className="w-12 h-12 animate-spin text-blue-500" />
        </div>
    );
};

export default Loader;
