import { createSlice } from '@reduxjs/toolkit';
import { fetchProjectsOfEmployeeThunk, createProjectThunk, deleteProjectThunk, updateProjectThunk } from './projectThunks';

const initialState = {
    message: null,
    loading: false,
    clickedEmployee: {},
    projectsOfEmployee: [],
    error: null,
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectsOfEmployeeThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjectsOfEmployeeThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.message = 'fullfill';
                // state.user = action.payload.user;
                    state.projectsOfEmployee = action;
                    state.clickedEmployee = action.payload;
            })
            .addCase(createProjectThunk.fulfilled, (state, action) => {
                state.projects.push(action.payload);
            })
            .addCase(deleteProjectThunk.fulfilled, (state) => {
                state.message = 'project deleted'
            })
            .addCase(updateProjectThunk.fulfilled, (state, action) => {
                const index = state.projects.findIndex((proj) => proj._id === action.payload._id);
                if (index !== -1) state.projects[index] = action.payload;
            });
    },
});

export default projectSlice.reducer;
