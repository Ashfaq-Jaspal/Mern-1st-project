import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import AdminPanel from './pages/adminPages/AdminPanel';
import EmployeeDashboard from './pages/employeePages/EmployeeDashboard';
import Error from './pages/Error';
import Employees from './pages/adminPages/Employees';
import Projects from './pages/adminPages/Projects';
import Navbar from './components/Navbar.jsx';
import Logout from './pages/Logout';
import EmployeeDetails from './pages/adminPages/EmployeeDetails';
import ProjectDetails from './pages/adminPages/ProjectDetails';
import CreateUser from './pages/adminPages/CreateUser';
import CreateProject from './pages/adminPages/CreateProject';
import UpdateUser from './pages/adminPages/UpdateUser';
import UpdateProject from './pages/adminPages/UpdateProject';
// import ProtectedRoute from './components/ProtectedRoute';
import RedirectByRole from './components/RedirectByRole';

function App() {

    return (
        <>
            <Toaster />
            <Navbar />
            <div className="mt-12">
                <Routes>
                    <Route path="/" element={<RedirectByRole />} />

                    <Route path="/login" element={<Login />} />

                    {/* <Route element={<ProtectedRoute allowedRoles={['admin', 'employee']} />}> */}
                        <Route path="/logout" element={<Logout />} />
                    {/* </Route> */}

                    {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}> */}
                        <Route path="/admin-panel" element={<AdminPanel />} />
                    {/* </Route> */}

                    {/* <Route element={<ProtectedRoute allowedRoles={['employee']} />}> */}
                        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                    {/* </Route> */}

                    {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}> */}
                        <Route path="/employees" element={<Employees />} />
                    {/* </Route> */}

                    {/* <Route element={<ProtectedRoute allowedRoles={['admin', 'employee']} />}> */}
                        <Route path="/projects" element={<Projects />} />
                    {/* </Route> */}

                    {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}> */}
                        <Route path="/create-user" element={<CreateUser />} />
                    {/* </Route> */}

                    {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}> */}
                        <Route path="/update-user/:userId" element={<UpdateUser />} />
                    {/* </Route> */}

                    {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}> */}
                        <Route path="/create-project" element={<CreateProject />} />
                    {/* </Route> */}

                    {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}> */}
                        <Route path="/update-project/:projectId" element={<UpdateProject />} />
                    {/* </Route> */}

                    {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}> */}
                        <Route path={`/employees/:employeeId`} element={<EmployeeDetails />} />
                    {/* </Route> */}

                    {/* <Route element={<ProtectedRoute allowedRoles={['admin', 'employee']} />}> */}
                        <Route path={`/projects/:projectId`} element={<ProjectDetails />} />
                    {/* </Route> */}

                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
