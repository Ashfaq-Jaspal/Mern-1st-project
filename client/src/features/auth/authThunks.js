import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser, login, logout, autoLogin } from '../../api/internal';

export const getCurrentUserThunk = createAsyncThunk('auth/getCurrentUser', async (_, thunkAPI) => {
    try {
        const res = await getCurrentUser();
        return { user: res.data.user };
    } catch (err) {
        return thunkAPI.rejectWithValue({
            message: 'user nhi mila',
            status: err.response.status
        });
    }
});

export const autoLoginUser = createAsyncThunk('auth/autoLogin', async (_, thunkAPI) => {

    try {
        const res = await autoLogin();
        return { data: res.data };
    } catch (err) {
        return thunkAPI.rejectWithValue({
            message: 'No token',
            status: err.response.status
        });
    }
});
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, thunkAPI) => {
    try {
        const res = await login(userData);
        if (res.data) {
            return { res };
        } else if (res.response.status === 400) {
            // validation error
            return thunkAPI.rejectWithValue(res.response.data.error.details[0].message);
        } else if (res.response.status === 401) {
            // Authentication error
            return thunkAPI.rejectWithValue(res.response.data.message);
        } else {
            // Any other error
            return thunkAPI.rejectWithValue(res.message);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.data);
    }
});
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
    try {
        await logout();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
