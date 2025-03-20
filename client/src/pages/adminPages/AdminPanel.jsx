import React, { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { FolderIcon, UsersIcon } from '@heroicons/react/24/solid';
import Card from '../../components/Card';

const AdminPanel = () => {
    const navigate = useNavigate()
    const { employees, user, projects } = useContext(AuthContext);

useEffect(()=>{
    if (!user?.isAdmin) {
        navigate('/employee-dashboard');
        toast.error('You are not an admin')
    }
},[])
    

    return (
        <div className="p-6 bg-gray-950 min-h-screen min-w-full flex justify-around items-center gap-20">
            <Link to="/employees">
                <Card Icon={UsersIcon} count={employees.length} label='Employees'/>
            </Link>
            <Link to="/projects">
                <Card Icon={FolderIcon} count={projects.length} label='Projects'/>
            </Link>
        </div>
    );
};

export default AdminPanel;
