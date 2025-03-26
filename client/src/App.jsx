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
import EmployeeDetails from './pages/adminPages/EmployeeDetails';
import ProjectDetails from './pages/adminPages/ProjectDetails';
import UpdateUser from './pages/adminPages/UpdateUser';
import UpdateProject from './pages/adminPages/UpdateProject';

function App() {
    return (
        <>
            <Toaster />
            <Navbar />
            <div className="mt-12">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/admin-panel" element={<AdminPanel />} />
                    <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/update-user/:userId" element={<UpdateUser />} />
                    <Route path="/create-project" element={<CreateProject />} />
                    <Route path="/update-project/:projectId" element={<UpdateProject />} />
                    <Route path={`/employees/:employeeId`} element={<EmployeeDetails />} />
                    <Route path={`/projects/:projectId`} element={<ProjectDetails />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
