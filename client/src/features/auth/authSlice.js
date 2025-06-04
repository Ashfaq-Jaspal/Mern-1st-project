import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, autoLoginUser } from './authThunks';
import { setToken } from '../../utils/tokenService';

const initialState = {
    user: null,
    projects: [],
    employees: [],
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                (state.loading = false), (state.user = action.payload.data.user);
            })
            .addCase(loginUser.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload);
            })
            .addCase(autoLoginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(autoLoginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                setToken(action.payload.data.accessToken);
            })
            .addCase(autoLoginUser.rejected, (state, acion) => {
                (state.loading = false), (state.error = acion.payload.message);
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            });
    },
});

export const { resetUser } = authSlice.actions;
export default authSlice.reducer;
