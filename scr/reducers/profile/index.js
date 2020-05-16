/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import * as types from '../../types/profile';

const userProfile = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_PROFILE_STARTED: {
            return null;
        }
        case types.FETCH_PROFILE_COMPLETED: {
            return action.payload.profile;
        }
        case types.FETCH_PROFILE_FAILED: {
            return null;
        }
    }

    return state;
};
const isFetchingProfile = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_PROFILE_STARTED: {
            return true;
        }
        case types.FETCH_PROFILE_COMPLETED: {
            return false;
        }
        case types.FETCH_PROFILE_FAILED: {
            return false;
        }
    }

    return state;
};




const profile = combineReducers({
    userProfile,
    isFetchingProfile,
});

export default profile;

export const getUserProfile = (state) => state.userProfile;
export const getIsFetchingProfile = (state) => state.isFetchingProfile;
