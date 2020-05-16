/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux'

import { reducer as form } from 'redux-form'
import auth, * as authSelectors from './auth/auth';
import navigators, * as navSelectors from './navigators'
import profile, * as profileGetters from './profile'




const reducer = combineReducers({
    auth,
    navigators,
    profile,
    form,
});


export default reducer;


//Auth Getters
export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getIsRegistering = state => authSelectors.getIsRegistering(state.auth);

export const isAuthenticated = state => getAuthToken(state.auth) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getAuthDecoded = state => authSelectors.getAuthDecoded(state.auth);

//Nav Getters
export const getRootNavigator = state => navSelectors.getRootNavigator(state.navigators);

// Profile  Getters
export const getUserProfile = state => profileGetters.getUserProfile(state.profile)
export const getIsFetchingProfile = state => profileGetters.getIsFetchingProfile(state.profile)