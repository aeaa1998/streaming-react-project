/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux'

import { reducer as form } from 'redux-form'
import auth, * as authGetters from './auth/auth';
import navigators, * as navGetters from './navigators'
import profile, * as profileGetters from './profile'
import track, * as trackGetters from './tracks'
import trackSelected, * as selectedTrackGetters from './tracks/selectedTrack'
import genre, * as genreGetters from './genres'
import favoritesReducer, * as favoritesGetters from './favorites'
import playlistsReducer, * as playlistsGetters from './playlists'




const reducer = combineReducers({
    auth,
    navigators,
    profile,
    track,
    genre,
    playlistsReducer,
    favoritesReducer,
    trackSelected,
    form,
});


export default reducer;


//Auth Getters
export const getAuthToken = state => authGetters.getAuthToken(state.auth);
export const getIsAuthenticating = state => authGetters.getIsAuthenticating(state.auth);
export const getIsRegistering = state => authGetters.getIsRegistering(state.auth);
export const getIsChangingPassword = state => authGetters.getIsChangingPassword(state.auth);

export const isAuthenticated = state => getAuthToken(state.auth) != null;
export const getAuthUserID = state => authGetters.getAuthUserID(state.auth);
export const getAuthExpiration = state => authGetters.getAuthExpiration(state.auth);
export const getAuthUsername = state => authGetters.getAuthUsername(state.auth);
export const getAuthDecoded = state => authGetters.getAuthDecoded(state.auth);

//Nav Getters
export const getRootNavigator = state => navGetters.getRootNavigator(state.navigators);

// Profile  Getters
export const getUserProfile = state => profileGetters.getUserProfile(state.profile)
export const getIsFetchingProfile = state => profileGetters.getIsFetchingProfile(state.profile)

// Tracks  Getters
export const getTracks = state => trackGetters.getTracks(state.track)
export const getSelectedTrack = state => selectedTrackGetters.getSelectedTrack(state.trackSelected)
export const getIsFetchingSelectedTrack = state => selectedTrackGetters.getIsFetchingSelectedTrack(state.trackSelected)
export const getTracksByGenre = state => trackGetters.getTracksByGenre(state.track)
export const getIsFetchingTracks = state => trackGetters.getIsFetchingTracks(state.track)
export const getIsFetchingTracksByGenre = state => trackGetters.getIsFetchingTracksByGenre(state.track)

// Genres  Getters
export const getGenres = state => genreGetters.getGenres(state.genre)
export const getIsFetchingGenres = state => genreGetters.getIsFetchingGenres(state.genre)

//favorites Getters
export const getFavorite = (state) => favoritesGetters.getFavorite(state.favoritesReducer)
export const getFavorites = (state) => favoritesGetters.getFavorites(state.favoritesReducer)
export const getFavoritesByType = (state) => favoritesGetters.getFavoritesByType(state.favoritesReducer)
export const getFavoritesFilteredByType = (state, type) => favoritesGetters.getFavoritesFilteredByType(state.favoritesReducer, type)
export const getIsFetchingFavorites = (state) => favoritesGetters.getIsFetchingFavorites(state.favoritesReducer)


//playlists Getters
export const getPlaylist = (state) => playlistsGetters.getPlaylist(state.playlistsReducer)
export const getPlaylists = (state) => playlistsGetters.getPlaylists(state.playlistsReducer)
export const getIsFetchingPlaylists = (state) => playlistsGetters.getIsFetchingPlaylists(state.playlistsReducer)
export const getIsAddingPlaylists = (state, type) => playlistsGetters.getIsAddingPlaylists(state.playlistsReducer, type)
