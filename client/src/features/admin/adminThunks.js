import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAdminData } from '../../api/internal';

export const getAdminDataThunk = createAsyncThunk('admin/getAdminData', async (_, thunkAPI) => {
    try {
        const res = await getAdminData();
        console.log(res.data);
        return { data: res.data };
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.data);
    }
});