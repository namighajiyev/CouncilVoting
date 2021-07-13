import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
    measure: {
        isFetching: false,
        data: null,
        error: null,
        params: {
            includeVotes: false,
            includeRequiredUserNames: false
        }
    },

    measureVote: {
        isSaving: false,
        error: null,
        data: null
    }
}

export const fetchMeasure = createAsyncThunk(
    'measureVote/fetch',
    async (id, thunkAPI) => {
        const state = thunkAPI.getState();
        const params = state.measureVote.measure.params;
        const response = await api.MeasureAPI.selectMeasure(id, params);
        if (!!response.error) {
            return thunkAPI.rejectWithValue(response.error?.Errors || response.error);
        }
        return response;
    }
);

export const createMeasureVote = createAsyncThunk(
    'measureVote/create',
    async (data, thunkAPI) => {
        const response = await api.MeasureVoteAPI.createMeasureVote(data);
        if (!!response.error) {
            return thunkAPI.rejectWithValue(response.error.Errors || response.error);
        }
        return response;
    }
);

const measureVoteSlice = createSlice({
    name: 'measureVote',
    initialState: initialState,
    reducers: {
        setMeasureFetchParams(state, action) {
            state.measure.params = action.payload;
        },
        resetMeasureVoteSave(state) {
            state.measureVote = {
                isSaving: false,
                error: null,
                data: null
            };
        },

    },
    extraReducers: {
        [fetchMeasure.pending]: (state) => {
            state.measure.isFetching = true;
            state.measure.error = null;
            state.measure.data = null;
        },
        [fetchMeasure.fulfilled]: (state, action) => {
            state.measure.isFetching = false;
            state.measure.error = null;
            state.measure.data = action.payload.measure;
        },
        [fetchMeasure.rejected]: (state, action) => {
            state.measure.isFetching = false;
            state.measure.error = action.payload || action.error;
            state.measure.data = null;
        },

        //createMeasureVote
        [createMeasureVote.pending]: (state) => {
            state.measureVote.isSaving = true;
            state.measureVote.error = null;
            state.measureVote.data = null;
        },
        [createMeasureVote.fulfilled]: (state, action) => {
            state.measureVote.isSaving = false;
            state.measureVote.error = null;
            state.measureVote.data = action.payload.measureVote;
        },
        [createMeasureVote.rejected]: (state, action) => {
            state.measureVote.isSaving = false;
            state.measureVote.error = action.payload || action.error;
            state.measureVote.data = null;
        },

    }

});

export const { setMeasureFetchParams, resetMeasureVoteSave } = measureVoteSlice.actions;
export default measureVoteSlice.reducer;