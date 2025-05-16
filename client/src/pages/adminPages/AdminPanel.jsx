import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router';
// import { AuthContext } from '../../context/AuthContext';
import { FolderIcon, UsersIcon } from '@heroicons/react/24/solid';
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserDataThunk } from '../../features/auth/authThunks';

const AdminPanel = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserDataThunk());
    }, []);

    // const { employees, user, loading, projects } = useContext(AuthContext);
    const { loading, employees, projects } = useSelector((state) => state.auth);

    // useEffect(() => {
    console.log('amin panel page');
    // }, []);

    if (!loading) {
        console.log('loading ==> ', loading);
        console.log('user ==>', user);
        console.log('employees ==>', employees);
        console.log('projects ==> ', projects);
    }
    //     return (
    //         <div className="p-6 bg-gray-950 min-h-screen min-w-full flex justify-around items-center gap-20">
    //         <Link to="/employees">
    //             <Card Icon={UsersIcon} count={employees.length} label='Employees'/>
    //         </Link>
    //         <Link to="/projects">
    //             <Card Icon={FolderIcon} count={projects.length} label='Projects'/>
    //         </Link>
    //     </div>
    // );
};

export default AdminPanel;
