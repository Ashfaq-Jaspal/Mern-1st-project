import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployeeThunk } from '../../features/employees/employeeThunks';
import { getCurrentUserDataThunk } from '../../features/auth/authThunks';

function SignUp() {
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
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserDataThunk());
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        let user = {
            name,
            email,
            password,
            status: status.value,
        };

        dispatch(createEmployeeThunk(user));

        setName('');
        setEmail('');
        setPassword('');
        setStatus('');

        navigate('/employees');
    };

    useEffect(() => {
        console.log('create user page');
    }, []);

    return (
        <form
            action="/create-user"
            method="post"
            onSubmit={(e) => {
                submitHandler(e);
            }}
            className="flex flex-col text-2xl px-36 py-12 rounded-xl gap-4 border border-blue-600 items-center justify-center"
        >
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
                Create user
            </button>
        </form>
    );
}

export default SignUp;
