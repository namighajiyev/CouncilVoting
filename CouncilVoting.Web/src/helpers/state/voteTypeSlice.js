import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
    list: {
        isFetching: false,
        error: null,
        data: null
    }
}

export const fetchVoteTypes = createAsyncThunk(
    'voteType/list',
    async (_, thunkAPI) => {
        const response = await api.VoteTypeAPI.selectVoteTypes();
        if (!!response.error) {
            return thunkAPI.rejectWithValue(response.error?.Errors || response.error);
        }
        return response;
    }
);

const voteTypeSlice = createSlice({
    name: 'voteType',
    initialState: initialState,
    extraReducers: {
        [fetchVoteTypes.pending]: (state) => {
            state.list.isFetching = true;
            state.list.error = null;
            state.list.data = null;
        },
        [fetchVoteTypes.fulfilled]: (state, action) => {
            state.list.isFetching = false;
            state.list.error = null;
            state.list.data = action.payload.voteTypes;
        },
        [fetchVoteTypes.rejected]: (state, action) => {
            state.list.isFetching = false;
            state.list.error = action.payload || action.error;
            state.list.data = null;
        }
    }

});


export default voteTypeSlice.reducer;