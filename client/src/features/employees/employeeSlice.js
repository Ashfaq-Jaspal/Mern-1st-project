import { createSlice } from '@reduxjs/toolkit';
import {
    fetchEmployeesOfProjectThunk,
    createEmployeeThunk,
    deleteEmployeeThunk,
    updateEmployeeThunk,
} from './employeeThunks';

const initialState = {
    employees: [],
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
                state.employees.push(action.payload);
            })
            .addCase(createEmployeeThunk.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })
            .addCase(deleteEmployeeThunk.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })
            .addCase(updateEmployeeThunk.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            });
    },
});

export default employeeSlice.reducer;
