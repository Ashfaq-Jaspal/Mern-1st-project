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
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const deleteProjectThunk = createAsyncThunk('projects/delete', async (projectId, thunkAPI) => {
    try {
        const res = await deleteProject(projectId);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const updateProjectThunk = createAsyncThunk('projects/update', async ({projectId, data}, thunkAPI) => {
    try {
        const res = await updateProject(projectId, data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
