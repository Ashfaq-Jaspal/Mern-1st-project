import { createSlice } from '@reduxjs/toolkit';
import { fetchProjectsOfEmployeeThunk, createProjectThunk, deleteProjectThunk, updateProjectThunk } from './projectThunks';

const initialState = {
    loading: false,
    error: null,
    message: null,
    clickedEmployee: {},
    projectsOfEmployee: [],
};

const projectSlice = createSlice({
    name: 'projects',
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
            .addCase(fetchProjectsOfEmployeeThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjectsOfEmployeeThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.clickedEmployee = action.payload.employee[0];
                state.projectsOfEmployee = action.payload.projects || [];
            })
            .addCase(createProjectThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProjectThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(createProjectThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProjectThunk.fulfilled, (state, action) => {
                state.message = action.payload;
            })
            .addCase(updateProjectThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProjectThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(updateProjectThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetMessage, resetError } = projectSlice.actions;
export default projectSlice.reducer;
