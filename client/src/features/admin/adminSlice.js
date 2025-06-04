import { createSlice } from '@reduxjs/toolkit';
import { getAdminDataThunk } from './adminThunks';

const initialState = {
    projects: [],
    employees: [],
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdminDataThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAdminDataThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload.data.employees;
                state.projects = action.payload.data.projects;
            })
            .addCase(getAdminDataThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    },
});

export default adminSlice.reducer;
