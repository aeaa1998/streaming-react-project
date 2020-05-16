/* eslint-disable prettier/prettier */
import * as types from '../types/profile';


export const startFetchUserProfile = () => (
    { type: types.FETCH_PROFILE_STARTED }
);

export const completeFetchUserProfile = profile => (
    {
        type: types.FETCH_PROFILE_COMPLETED,
        payload: { profile },
    }
);

export const failedFetchUserProfile = () => (
    {
        type: types.FETCH_PROFILE_FAILED,
    }
);


