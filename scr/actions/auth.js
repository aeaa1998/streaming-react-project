/* eslint-disable prettier/prettier */
import * as types from '../types/auth';


export const startLogin = (username, password) => (
    {
        type: types.AUTHENTICATION_STARTED,
        payload: { username, password },
    }
);

export const completeLogin = token => ({
    type: types.AUTHENTICATION_COMPLETED,
    payload: { token },
});

export const failLogin = error => ({
    type: types.AUTHENTICATION_FAILED,
});

export const logout = () => ({
    type: types.AUTHENTICATION_IDENTITY_CLEARED,
});

export const registerStarted = (payload) => (
    {
        type: types.REGISTRATION_STARTED,
        payload: payload,
    }
);


export const registerSucceded = () => (
    { type: types.REGISTRATION_SUCCEDED, }
);

export const registerFailed = () => (
    { type: types.REGISTRATION_FAILED, }
);


export const changePasswordStarted = ({ oldPassword, newPassword }, callback) => (
    {
        type: types.CHANGE_PASSWORD_STARTED,
        payload: { oldPassword, newPassword },
        callback: callback,
    }
);

export const changePasswordFailed = () => (
    {
        type: types.CHANGE_PASSWORD_FAILED,
    }
);

export const changePasswordSucceded = () => (
    {
        type: types.CHANGE_PASSWORD_COMPLETED,
    }
);

