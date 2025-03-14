import React, { useContext } from 'react';
import { Route, Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import CreateUser from './pages/adminPages/CreateUser';
import Login from './pages/Login';
import AdminPanel from './pages/adminPages/AdminPanel';
import EmployeeDashboard from './pages/employeePages/EmployeeDashboard';
import Error from './pages/Error';
import Employees from './pages/adminPages/Employees';
import Projects from './pages/adminPages/Projects';
import CreateProject from './pages/adminPages/CreateProject';
import Navbar from './components/Navbar.jsx';
import Logout from './pages/Logout';
import EmployeeDetails from './pages/adminPages/employeeDetails';
import ProjectDetails from './pages/adminPages/ProjectDetails';

function App() {
    return (
        <>
            <Toaster />
            <Navbar />
            <div className='mt-12'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<CreateUser />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/admin-panel" element={<AdminPanel />} />
                    <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/create-project" element={<CreateProject />} />
                    <Route path="*" element={<Error />} />
                    <Route path={`/employees/:employeeId`} element={<EmployeeDetails />} />
                    <Route path={`/projects/:projectId`} element={<ProjectDetails />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
