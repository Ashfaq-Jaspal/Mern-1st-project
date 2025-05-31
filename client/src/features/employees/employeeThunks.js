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
        return res.data.message;
    } catch (err) {
        if (err.status === 401) {
            // unauthorized error
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
        if (err.status === 409) {
            // email already exists error
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
        if (err.status === 400) {
            // validation error
            return thunkAPI.rejectWithValue(err.response.data.error.details[0].message);
        }
    }
});

export const deleteEmployeeThunk = createAsyncThunk('employees/delete', async (employeeId, thunkAPI) => {
    try {
        const res = await deleteEmployee(employeeId);
        console.log(res);
        return res.data.message;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const updateEmployeeThunk = createAsyncThunk('employees/update', async ({ userId, user }, thunkAPI) => {
    try {
        const res = await updateEmployee(userId, user);
        return res.data.message;
    } catch (err) {
        if (err.status === 401) {
            // unauthorized error
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
        if (err.status === 404) {
            // user not found error
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
        if (err.status === 400) {
            // validation error
            return thunkAPI.rejectWithValue(err.response.data.error.details[0].message);
        }
    }
});
