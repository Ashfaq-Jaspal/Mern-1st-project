import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProjectsOfEmployee, createProject, deleteProject, updateProject } from '../../api/internal';

export const fetchProjectsOfEmployeeThunk = createAsyncThunk('projects/fetchProjects', async (employeeId, thunkAPI) => {
    try {
        const res = await fetchProjectsOfEmployee(employeeId);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const createProjectThunk = createAsyncThunk('projects/create', async (project, thunkAPI) => {
    try {
        const res = await createProject(project);
        return res.data.message;
    } catch (err) {
        if (err.status === 401) {
            // unauthorized error
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
        if (err.status === 400) {
            // validation error
            return thunkAPI.rejectWithValue(err.response.data.errors[0]);
        }
    }
});

export const deleteProjectThunk = createAsyncThunk('projects/delete', async (projectId, thunkAPI) => {
    try {
        const res = await deleteProject(projectId);
        console.log(res);
        return res.data.message;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const updateProjectThunk = createAsyncThunk('projects/update', async ({ projectId, updatedData }, thunkAPI) => {
    try {
        const res = await updateProject(projectId, updatedData);
        return res.data.message;
    } catch (err) {
        if (err.status === 401) {
            // unauthorized error
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
        if (err.status === 400) {
            // validation error
            return thunkAPI.rejectWithValue(err.response.data.errors[0]);
        }
        if (err.status === 404) {
            // project not found error
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
});
