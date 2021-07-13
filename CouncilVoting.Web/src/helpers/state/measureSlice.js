import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
    list: {
        isFetching: false,
        error: null,
        data: null,
        params: {
            includeVotes: false,
            includeRequiredUserNames: false
        }
    },
    add: {
        isSaving: false,
        error: null,
        data: null
    },
    details: {
        isFetching: false,
        error: null,
        data: null,
        params: {
            includeVotes: true,
            includeRequiredUserNames: false
        }
    },
}

export const createMeasure = createAsyncThunk(
    'measure/create',
    async (data, thunkAPI) => {
        const response = await api.MeasureAPI.createMeasure(data);
        if (!!response.error) {
            return thunkAPI.rejectWithValue(response.error.Errors || response.error);
        }
        return response;
    }
);

export const fetchMeasure = createAsyncThunk(
    'measure/fetch',
    async (id, thunkAPI) => {
        const state = thunkAPI.getState();
        const params = state.measure.details.params;
        const response = await api.MeasureAPI.selectMeasure(id, params);
        if (!!response.error) {
            return thunkAPI.rejectWithValue(response.error?.Errors || response.error);
        }
        return response;
    }
);
export const fetchMeasures = createAsyncThunk(
    'measure/list',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const params = state.measure.list.params;
        const response = await api.MeasureAPI.selectMeasures(params);
        if (!!response.error) {
            return thunkAPI.rejectWithValue(response.error?.Errors || response.error);
        }
        return response;
    }
);


const measureSlice = createSlice({
    name: 'measure',
    initialState: initialState,
    reducers: {
        setMeasuresFetchParams(state, action) {
            state.list.params = action.payload;
        },
        resetMeasureSave(state) {
            state.add = {
                isSaving: false,
                error: null,
                data: null
            };
        },
        resetMeasure(state) {
            state.details = {
                ...state.details,
                isFetching: false,
                error: null,
                data: null,
            };
        },
    },
    extraReducers: {
        [fetchMeasures.pending]: (state) => {
            state.list.isFetching = true;
            state.list.error = null;
            state.list.data = null;
        },
        [fetchMeasures.fulfilled]: (state, action) => {
            state.list.isFetching = false;
            state.list.error = null;
            state.list.data = action.payload.measures;
        },
        [fetchMeasures.rejected]: (state, action) => {
            state.list.isFetching = false;
            state.list.error = action.payload || action.error;
            state.list.data = null;
        },

        //createMeasure
        [createMeasure.pending]: (state) => {
            state.add.isSaving = true;
            state.add.error = null;
            state.add.data = null;
        },
        [createMeasure.fulfilled]: (state, action) => {
            state.add.isSaving = false;
            state.add.error = null;
            state.add.data = action.payload.measure;
        },
        [createMeasure.rejected]: (state, action) => {
            state.add.isSaving = false;
            state.add.error = action.payload || action.error;
            state.add.data = null;
        },

        //fetchMeasure
        [fetchMeasure.pending]: (state) => {
            state.details.isFetching = true;
            state.details.error = null;
            state.details.data = null;
        },
        [fetchMeasure.fulfilled]: (state, action) => {
            state.details.isFetching = false;
            state.details.error = null;
            state.details.data = action.payload.measure;
        },
        [fetchMeasure.rejected]: (state, action) => {
            state.details.isFetching = false;
            state.details.error = action.payload || action.error;
            state.details.data = null;
        },
    }

});

export const { setMeasuresFetchParams, resetMeasureSave, resetMeasure } = measureSlice.actions;
export default measureSlice.reducer;