import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import { Link, useNavigate, useParams } from 'react-router';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployeeThunk } from '../../features/employees/employeeThunks';

function UpdateUser() {
    const [name, setName] = useState(``);
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [status, setStatus] = useState(null);
    const [statusOptions, setStatusOptions] = useState([
        { label: 'Android Developer', value: 'Android Developer' },
        { label: 'Web Developer', value: 'Web Developer' },
        { label: 'UI/UX Designer', value: 'UI/UX Designer' },
        { label: 'Video Editor', value: 'Video Editor' },
        { label: 'Project Manager', value: 'Project Manager' },
    ]);
    const { clickedEmployee } = useSelector((state) => state.projects);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        setName(clickedEmployee.name);
        setEmail(clickedEmployee.email);
    }, []);

    const userId = params.userId;

    const submitHandler = async (e) => {
        e.preventDefault();

        let user = {
            name,
            email,
            password,
            status: status.value,
        };

        dispatch(updateEmployeeThunk({ userId, user }));

        setName('');
        setEmail('');
        setPassword('');
        setStatus('');

        navigate('/employees');
    };

    // useEffect(() => {
    //     if (!name) {
    //         navigate('/')
    //     }
    //     console.log('update user page');
    // }, []);

    return (
        <form
            onSubmit={(e) => {
                submitHandler(e);
            }}
            className="flex flex-col relative text-2xl px-36 py-12 rounded-xl gap-4 border border-blue-600 items-center justify-center"
        >
            {/* Close Button */}
            <Link to={`/employees/${userId}`} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
                <XCircleIcon className="h-8 w-8" />
            </Link>
            <input
                onChange={(e) => {
                    setName(e.target.value);
                }}
                name="name"
                value={name}
                type="text"
                required
                placeholder="Enter full name"
                className="text-white border border-blue-600 outline-none text-md bg-transparent px-3 py-2 rounded-lg w-96"
            />
            <input
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                name="email"
                value={email}
                type="email"
                required
                placeholder="Enter email"
                className="text-white border border-blue-600 outline-none text-md bg-transparent px-3 py-2 rounded-lg w-96"
            />
            <input
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                name="password"
                value={password}
                type="password"
                required
                placeholder="Enter password"
                className="text-white border border-blue-600 outline-none text-md bg-transparent px-3 py-2 rounded-lg w-96"
            />

            <Select
                className="w-full"
                options={statusOptions}
                value={status}
                placeholder="Select status..."
                onChange={(selected) => setStatus(selected)}
                styles={{
                    control: (base) => ({
                        ...base,
                        background: 'transparent',
                        borderColor: '#2563eb',
                        padding: '2px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: '#9ca3af',
                        fontStyle: 'italic',
                    }),
                    dropdownIndicator: (base) => ({
                        ...base,
                        color: 'gray',
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: 'white',
                        border: '1px solid gray',
                    }),
                    option: (base, { isFocused, isSelected }) => ({
                        ...base,
                        backgroundColor: isSelected ? 'blue' : isFocused ? 'lightgray' : 'white',
                        cursor: 'pointer',
                    }),
                }}
            ></Select>
            <button type="submit" className="px-3 py-2 mt-5 w-80 text-white bg-blue-700 border-none rounded-lg">
                Edit
            </button>
        </form>
    );
}

export default UpdateUser;
