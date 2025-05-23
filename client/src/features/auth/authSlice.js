import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, autoLoginUser, getCurrentUserDataThunk } from './authThunks';
import { setToken } from '../../utils/tokenService';

const initialState = {
    user: null,
    projects: [],
    employees: [],
    token: null,
    loading: true,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                (state.loading = true), (state.error = null);
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                (state.loading = false), (state.user = action.payload.data.user), setToken(action.payload.data.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload);
            })
            .addCase(autoLoginUser.pending, (state) => {
                (state.loading = true), (state.error = null);
            })
            .addCase(autoLoginUser.fulfilled, (state, action) => {
                (state.loading = false),
                    (state.user = action.payload.data.user),
                    (state.token = action.payload.data.accessToken);
            })
            .addCase(autoLoginUser.rejected, (state, acion) => {
                (state.loading = false), (state.error = acion.payload.message);
            })
            .addCase(getCurrentUserDataThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUserDataThunk.fulfilled, (state, action) => {
                state.user = action.payload.userData.user;
                state.employees = action.payload.userData.employees;
                state.projects = action.payload.userData.projects;
                state.loading = false;
            })
            .addCase(getCurrentUserDataThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export default authSlice.reducer;
