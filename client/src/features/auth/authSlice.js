import { createSlice } from '@reduxjs/toolkit';
import { loginUser, getCurrentUserThunk, logoutUser, autoLoginUser } from './authThunks';

const initialState = {
    user: null,
    token: null,
    loading: false,
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
                (state.loading = false), (state.user = action.payload.res.data.user), (state.token = action.payload.res.data.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload)
            })
            .addCase(autoLoginUser.pending, (state) => {
                (state.loading = true), (state.error = null)
            })
            .addCase(autoLoginUser.fulfilled, (state, action) => {
                (state.loading = false), (state.token = action.payload.data.accessToken), (state.user = action.payload.data.user)
            })
            .addCase(autoLoginUser.rejected, (state, acion) => {
                (state.loading = false), (state.error = acion.payload.message)
            })
            .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export default authSlice.reducer;
