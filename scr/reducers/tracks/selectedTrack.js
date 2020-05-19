/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import * as types from '../../types/tracks';

const selectedTrack = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_SELECTED_TRACK_STARTED: {
            return {};
        }
        case types.FETCH_SELECTED_TRACK_SUCCEDED: {
            return action.payload.track;
        }
        case types.FETCH_SELECTED_TRACK_FAILED: {
            return {};
        }
    }

    return state;
};

const isFetchingSelectedTrack = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_SELECTED_TRACK_STARTED: {
            return true;
        }
        case types.FETCH_SELECTED_TRACK_SUCCEDED: {
            return false;
        }
        case types.FETCH_SELECTED_TRACK_FAILED: {
            return false;
        }
    }

    return state;
};




const trackSelected = combineReducers({
    selectedTrack,
    isFetchingSelectedTrack,
});

export default trackSelected;


export const getSelectedTrack = (state) => state.selectedTrack;
export const getIsFetchingSelectedTrack = (state) => state.isFetchingSelectedTrack;
