import { createSlice } from '@reduxjs/toolkit';
import {
    fetchEmployeesOfProjectThunk,
    createEmployeeThunk,
    deleteEmployeeThunk,
    updateEmployeeThunk,
} from './employeeThunks';

const initialState = {
    user: null,
    message: null,
    clickedProject: {},
    employeesOnProject: [],
    loading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeesOfProjectThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployeesOfProjectThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.employeesOnProject = action.payload.employees;
                state.clickedProject = action.payload.project[0];
            })
            .addCase(createEmployeeThunk.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })
            .addCase(deleteEmployeeThunk.fulfilled, (state) => {
                state.message = 'User deleted';
            })
            .addCase(updateEmployeeThunk.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            });
    },
});

export default employeeSlice.reducer;
