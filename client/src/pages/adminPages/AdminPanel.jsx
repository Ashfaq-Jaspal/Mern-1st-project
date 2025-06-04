import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { FolderIcon, UsersIcon } from '@heroicons/react/24/solid';
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { getAdminDataThunk } from '../../features/admin/adminThunks';

const AdminPanel = () => {
    const dispatch = useDispatch()
    const { loading, employees, projects, error } = useSelector((state) => state.admin);

    useEffect(() => {
        if (!(projects && employees && error)) {
            dispatch(getAdminDataThunk())
        }
        console.log('amin panel page');
    }, []);

    if (!loading) {
        return (
            <div className="p-6 bg-gray-950 min-h-screen min-w-full flex justify-around items-center gap-20">
                <Link to="/employees">
                    <Card Icon={UsersIcon} count={employees.length} label="Employees" />
                </Link>
                <Link to="/projects">
                    <Card Icon={FolderIcon} count={projects.length} label="Projects" />
                </Link>
            </div>
        );
    }

    return <Loader />;
};

export default AdminPanel;
