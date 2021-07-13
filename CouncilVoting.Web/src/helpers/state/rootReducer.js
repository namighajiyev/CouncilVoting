import { combineReducers } from '@reduxjs/toolkit';
import measureReducer from './measureSlice';
import measureVoteReducer from './measureVoteSlice';
import voteTypeReducer from './voteTypeSlice';
import measureResultReducer from './measureResultSlice';

const rootReducer = combineReducers({
    measure: measureReducer,
    measureVote: measureVoteReducer,
    voteType: voteTypeReducer,
    measureResult: measureResultReducer
});

export default rootReducer;