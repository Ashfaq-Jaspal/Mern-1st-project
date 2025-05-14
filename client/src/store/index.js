import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import employeeReducer from '../features/employees/employeeSlice'
import projectReducer from '../features/projects/projectSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        employees: employeeReducer,
        projects: projectReducer
    }
})

export default store