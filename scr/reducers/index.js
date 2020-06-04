/* eslint-disable semi */
/* eslint-disable prettier/prettier */
// import { combineReducers } from 'redux'
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
import selectedPlaylistReducer, * as selectedPlaylistGetters from './playlists/selectedPlaylist'
import artistsReducer, * as artistsGetters from './artists'
import albumsReducer, * as albumsGetters from './albums'




const reducer = combineReducers({
    albumsReducer,
    artistsReducer,
    auth,
    favoritesReducer,
    genre,
    navigators,
    playlistsReducer,
    profile,
    selectedPlaylistReducer,
    track,
    trackSelected,
    form: form,

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
export const getIsUploadingProfile = state => profileGetters.getIsUploadingProfile(state.profile)

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
export const getPlaylist = (state, id) => playlistsGetters.getPlaylist(state.playlistsReducer, id)
export const getPlaylists = (state) => playlistsGetters.getPlaylists(state.playlistsReducer)
export const getIsDeletingPlaylist = (state) => playlistsGetters.getIsDeletingPlaylist(state.playlistsReducer)
export const getIsFetchingPlaylists = (state) => playlistsGetters.getIsFetchingPlaylists(state.playlistsReducer)
export const getIsAddingPlaylists = (state, type) => playlistsGetters.getIsAddingPlaylists(state.playlistsReducer, type)

//Artists Getters
export const getArtist = (state, id) => artistsGetters.getArtist(state.artistsReducer, id)
export const getArtists = (state) => artistsGetters.getArtists(state.artistsReducer)
export const getIsFetchingArtists = (state) => artistsGetters.getIsFetchingArtists(state.artistsReducer)
export const getArtistsByGenreId = (state) => artistsGetters.getArtistsByGenreId(state.artistsReducer);
export const getGenreWithArtists = (state, id) => artistsGetters.getGenre(state.artistsReducer);
export const getGenresWithArtists = (state) => artistsGetters.getGenres(state.artistsReducer)
export const getIsFetchingSelectedArtist = (state) => artistsGetters.getIsFetchingSelectedArtist(state.artistsReducer)
export const getSelectedArtist = (state) => artistsGetters.getSelectedArtist(state.artistsReducer)

//selected playlists Getters
export const getSelectedPlaylist = (state) => selectedPlaylistGetters.getSelectedPlaylist(state.selectedPlaylistReducer)
export const getSelectedPlaylistTracks = (state) => selectedPlaylistGetters.getSelectedPlaylistTracks(state.selectedPlaylistReducer)
export const getIsFetchingSelectedPlaylist = (state) => selectedPlaylistGetters.getIsFetchingSelectedPlaylist(state.selectedPlaylistReducer)
export const getIsDeletingTrackFromPlaylist = (state) => selectedPlaylistGetters.getIsDeletingTrackFromPlaylist(state.selectedPlaylistReducer)

// Albums Getters

export const getAlbum = (state, id) => albumsGetters.getAlbum(state.albumsReducer, id)
export const getAlbums = (state) => albumsGetters.getAlbums(state.albumsReducer)
export const getIsFetchingAlbums = (state) => albumsGetters.getIsFetchingAlbums(state.albumsReducer)
export const getAlbumsByGenreId = (state) => albumsGetters.getAlbumsByGenreId(state.albumsReducer);
export const getGenreWithAlbums = (state, id) => albumsGetters.getGenre(state.albumsReducer);
export const getGenresWithAlbums = (state) => albumsGetters.getGenres(state.albumsReducer)
export const getIsFetchingSelectedAlbum = (state) => albumsGetters.getIsFetchingSelectedAlbum(state.albumsReducer)
export const getSelectedAlbum = (state) => albumsGetters.getSelectedAlbum(state.albumsReducer)








