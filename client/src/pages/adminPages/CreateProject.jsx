import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import { createProject } from '../../api/internal';
import { useNavigate } from 'react-router';

const CreateProject = () => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const { employees, user, loading, setLoading, fetchUser } = useContext(AuthContext);
    const navigate = useNavigate()
    let formattedEmployeesForReactSelect = [];
    let reFormattedEmployeesForBackend = [];

    // if (!loading) {
    //     if (!user?.isAdmin) {
    //         navigate('/employee-dashboard');
    //         toast.error('You are not an admin')
    //     }
    // }

    const submitHandler = async (e) => {
        e.preventDefault();

        reFormattedEmployeesForBackend = selectedEmployees.map((emp) => {
            return emp.value;
        });

        const createdProject = {
            name: projectName,
            description,
            startDate,
            endDate,
            employeeIds: reFormattedEmployeesForBackend,
        };

        try {
            const res = await createProject(createdProject);
            if (res.status === 201) {
                // success
                toast.success(res.data.message);
            }
            if (res.status === 401) {
                // unauthorized error
                toast.error(res.response.data.message);
            }
            if (res.status === 400) {
                // validation error
                toast.error(res.response.data.errors[0]);
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }

        setProjectName('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setSelectedEmployees([]);

        fetchUser();
    };

    {
        if (!loading && employees) {
            formattedEmployeesForReactSelect = employees.map((emp) => {
                return { value: emp._id, label: `${emp.name} > ${emp.status}` };
            });
        }
    }
    
    if (!loading) {
        return (
            <div className="items-center">
                <form
                    action="/create-project"
                    method="post"
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}
                    className="h-[80vh] text-2xl flex flex-col px-10  rounded-lg gap-2 border border-emerald-900 items-center justify-center"
                >
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-5 pt-8">
                            <input
                                onChange={(e) => {
                                    setProjectName(e.target.value);
                                }}
                                name="projectName"
                                value={projectName}
                                type="text"
                                required
                                placeholder="Project name"
                                className="text-gray-400 italic border border-emerald-900 outline-none bg-transparent px-3 py-2 rounded-lg w-80"
                            />
                            <textarea
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                name="description"
                                value={description}
                                required
                                placeholder="Project description"
                                className="text-gray-400 italic border border-emerald-900 outline-none bg-transparent px-3 max-h-32 min-h-32 py-1 rounded-lg w-80"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="text-green-500 text-lg">
                                Start date
                                <br />
                                <input
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                    }}
                                    name="startDate"
                                    value={startDate}
                                    type="date"
                                    required
                                    className="w-80 italic border border-emerald-900 text-gray-400 bg-transparent text-2xl p-1.5 rounded-lg focus:outline-none "
                                />
                            </label>
                            <label className="text-red-600 text-lg">
                                Due date
                                <br />
                                <input
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                    }}
                                    name="endDate"
                                    value={endDate}
                                    type="date"
                                    required
                                    className="w-80 italic border  border-emerald-900 text-gray-400 bg-transparent text-2xl p-1.5 rounded-lg focus:outline-none"
                                />
                            </label>
                            {loading ? (
                                <>
                                    <h1>Fetching...</h1>
                                </>
                            ) : (
                                <>
                                    <Select
                                        className="w-80 text-2xl"
                                        options={formattedEmployeesForReactSelect}
                                        value={selectedEmployees}
                                        placeholder="Select employees..."
                                        isMulti
                                        onChange={(selected) => setSelectedEmployees(selected)}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                fontSize: '1.5rem',
                                                background: 'transparent',
                                                borderColor: '#064e3b',
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
                                                fontSize: '1.25rem',
                                                backgroundColor: isSelected ? 'blue' : isFocused ? 'lightgray' : 'white',
                                                cursor: 'pointer',
                                            }),
                                        }}
                                    ></Select>
                                </>
                            )}
                        </div>
                    </div>
    
                    <div className="flex">
                        <button
                            type="submit"
                            className="px-3 text-2xl py-1.5 mt-2 w-80 text-gray-300 bg-emerald-900 border-none rounded-lg"
                        >
                            Create project
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};

export default CreateProject;
