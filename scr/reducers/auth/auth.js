/* eslint-disable prettier/prettier */
import jwtDecode from 'jwt-decode';
import { combineReducers } from 'redux';

import * as types from '../../types/auth';

const isChangingPassword = (state = false, action) => {
    switch (action.type) {
        case types.CHANGE_PASSWORD_STARTED: {
            return true;
        }
        case types.CHANGE_PASSWORD_COMPLETED: {
            return false;
        }
        case types.CHANGE_PASSWORD_FAILED: {
            return false;
        }
    }

    return state;
};

const token = (state = null, action) => {
    switch (action.type) {
        case types.AUTHENTICATION_STARTED: {
            return null;
        }
        case types.AUTHENTICATION_COMPLETED: {
            return action.payload.token;
        }
        case types.AUTHENTICATION_FAILED: {
            return null;
        }
        case types.AUTHENTICATION_IDENTITY_CLEARED: {
            return null;
        }
    }

    return state;
};

const decoded = (state = null, action) => {
    switch (action.type) {
        case types.AUTHENTICATION_STARTED: {
            return null;
        }
        case types.AUTHENTICATION_COMPLETED: {
            return jwtDecode(action.payload.token);
        }
        case types.AUTHENTICATION_FAILED: {
            return null;
        }
        case types.AUTHENTICATION_IDENTITY_CLEARED: {
            return null;
        }
    }

    return state;
};

const isAuthenticating = (state = false, action) => {
    switch (action.type) {
        case types.AUTHENTICATION_STARTED: {
            return true;
        }
        case types.AUTHENTICATION_COMPLETED: {
            return false;
        }
        case types.AUTHENTICATION_FAILED: {
            return false;
        }
    }

    return state;
};

const isRegistering = (state = false, action) => {
    switch (action.type) {
        case types.REGISTRATION_STARTED: {
            return true;
        }
        default: {
            return false;
        }
    }
};



const auth = combineReducers({
    token,
    decoded,
    isAuthenticating,
    isRegistering,
    isChangingPassword,
});

export default auth;

export const getAuthToken = (state) => state.token;
export const getIsAuthenticating = (state) => state.isAuthenticating;
export const getIsRegistering = (state) => state.isRegistering;
export const getAuthenticatingError = (state) => state.error;
export const getAuthUserID = (state) =>
    state.decoded ? state.decoded.user_id : null;
export const getAuthExpiration = (state) =>
    state.decoded ? state.decoded.exp : null;
export const getAuthUsername = (state) =>
    state.decoded ? state.decoded.username : null;
export const getAuthDecoded = (state) => state.decoded
export const getIsChangingPassword = (state) => state.isChangingPassword
