/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth, * as authSelectors from './auth/auth';



const reducer = combineReducers({
    auth,
    form: formReducer,
});


export default reducer;

export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
