import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
    measureResult: {
        isFetching: false,
        data: null,
        error: null,
    }
}

export const fetchMeasureResults = createAsyncThunk(
    'measureVote/fetch',
    async (id, thunkAPI) => {
        const response = await api.MeasureResultAPI.selectMeasureResults(id);
        if (!!response.error) {
            return thunkAPI.rejectWithValue(response.error?.Errors || response.error);
        }
        return response;
    }
);


const measureResultSlice = createSlice({
    name: 'measureResult',
    initialState: initialState,
    reducers: {
        resetMeasureResult(state) {
            state.measureResult = {
                ...state.measureResult,
                isFetching: false,
                error: null,
                data: null,
            };
        }
    },
    extraReducers: {
        [fetchMeasureResults.pending]: (state) => {
            state.measureResult.isFetching = true;
            state.measureResult.error = null;
            state.measureResult.data = null;
        },
        [fetchMeasureResults.fulfilled]: (state, action) => {
            state.measureResult.isFetching = false;
            state.measureResult.error = null;
            state.measureResult.data = action.payload.measureResult;
        },
        [fetchMeasureResults.rejected]: (state, action) => {
            state.measureResult.isFetching = false;
            state.measureResult.error = action.payload || action.error;
            state.measureResult.data = null;
        },

    }

});

export const { resetMeasureResult } = measureResultSlice.actions;
export default measureResultSlice.reducer;