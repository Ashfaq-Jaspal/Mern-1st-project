import { createSlice } from '@reduxjs/toolkit';
import {
    fetchEmployeesOfProjectThunk,
    createEmployeeThunk,
    deleteEmployeeThunk,
    updateEmployeeThunk,
} from './employeeThunks';

const initialState = {
    loading: false,
    error: null,
    message: null,
    clickedProject: {},
    employeesOnProject: [],
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeesOfProjectThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployeesOfProjectThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.employeesOnProject = action.payload.employees;
                state.clickedProject = action.payload.project[0];
            })
            .addCase(createEmployeeThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createEmployeeThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(createEmployeeThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteEmployeeThunk.fulfilled, (state, action) => {
                state.message = action.payload;
            })
            .addCase(updateEmployeeThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateEmployeeThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(updateEmployeeThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetMessage, resetError } = employeeSlice.actions;
export default employeeSlice.reducer;
