import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { login } from '../api/internal';

function Login() {
    const navigate = useNavigate();
    const {
        backendUrl,
        // user,
        setUser,
        loading,
        setLoading,
        employees,
        setEmployees,
        projects,
        setProjects,
        clickedEmployee,
        setClickedEmployee,
        clickedProject,
        setClickedProject,
        fetchUser,
    } = useContext(AuthContext);
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);

    let user = {
        email,
        password,
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const response = await login(user)

        if (response.status === 200) {
            // success
            console.log("success", response);
            // navigate('/')
        } else if (response.status === 400) {
            // validation error
            console.log("validation", response.data.error.details[0].message);
        } else if (response.status === 401) {
            // Authentication error
            console.log("Authentication", response);
        } else {
            // Any other error
            console.log("other", response);
        }

        // setEmail('');
        // setPassword('');
    };

    return (
        <>
            <form
                action="/login"
                method="post"
                onSubmit={(e) => {
                    handleLogin(e);
                }}
                className="flex flex-col text-2xl px-36 py-12 rounded-xl gap-4 border border-emerald-900 items-center justify-center"
            >
                <input
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    name="email"
                    value={email}
                    type="email"
                    required
                    placeholder="Enter email"
                    className="text-white border border-emerald-900 outline-none text-md bg-transparent px-3 py-2 rounded-lg w-96"
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
                    className="text-white border border-emerald-900 outline-none text-md bg-transparent px-3 py-2 rounded-lg w-96"
                />
                <button type="submit" className="px-3 py-1.5 mt-5 w-80 text-white bg-emerald-900 border-none rounded-full">
                    Log in
                </button>
            </form>
        </>
    );
}

export default Login;
