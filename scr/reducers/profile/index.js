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
        case types.UPDATE_PROFILE_COMPLETED: {
            return { ...state, ...action.payload.profileUpdated }
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

const isUpdatingProfile = (state = false, action) => {
    switch (action.type) {
        case types.UPDATE_PROFILE_STARTED: {
            return true;
        }
        case types.UPDATE_PROFILE_COMPLETED: {
            return false;
        }
        case types.UPDATE_PROFILE_FAILED: {
            return false;
        }
    }

    return state;
};




const profile = combineReducers({
    userProfile,
    isFetchingProfile,
    isUpdatingProfile,
});

export default profile;

export const getUserProfile = (state) => state.userProfile;
export const getIsFetchingProfile = (state) => state.isFetchingProfile;
export const getIsUploadingProfile = (state) => state.isUpdatingProfile;
