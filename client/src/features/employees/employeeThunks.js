import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEmployeesOfProject, createEmployee, deleteEmployee, updateEmployee } from '../../api/internal';

export const fetchEmployeesOfProjectThunk = createAsyncThunk('employees/fetchEmployees', async (projectId, thunkAPI) => {
    try {
        const res = await fetchEmployeesOfProject(projectId);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const createEmployeeThunk = createAsyncThunk('employees/create', async (employee, thunkAPI) => {
    try {
        const res = await createEmployee(employee);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const deleteEmployeeThunk = createAsyncThunk('employees/delete', async (employeeId, thunkAPI) => {
    try {
        await deleteEmployee(employeeId);
        return id;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const updateEmployeeThunk = createAsyncThunk('employees/update', async ({ employeeId, data }, thunkAPI) => {
    try {
        const res = await updateEmployee(employeeId, data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
