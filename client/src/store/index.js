import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import employeeReducer from '../features/employees/employeeSlice'
import projectReducer from '../features/projects/projectSlice'
import adminReducer from '../features/admin/adminSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        employees: employeeReducer,
        projects: projectReducer,
        admin: adminReducer
    }
})

export default store