/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import _ from 'lodash'
import * as types from '../../types/favorites';

const favoritesById = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_FAVORITES_STARTED: {
            return state;
        }
        case types.FETCH_FAVORITES_COMPLETED: {
            const { entities, result } = action.payload
            return entities.favorite ?? {};
        }
        case types.ADD_FAVORITES_COMPLETED: {
            let newState = { ...state }
            newState[action.payload.favorite.id] = action.payload.favorite
            return { ...newState }
        }
        case types.FETCH_FAVORITES_FAILED: {
            return state;
        }
        case types.DELETE_FAVORITES_COMPLETED: {
            return _.omit(state, [action.payload.favorite.id])
        }
    }

    return state;
};

const order = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_FAVORITES_STARTED: {
            return state;
        }
        case types.FETCH_FAVORITES_COMPLETED: {
            const { entities, result } = action.payload
            return result;
        }
        case types.FETCH_FAVORITES_FAILED: {
            return state;
        }
        case types.ADD_FAVORITES_COMPLETED: {
            return [...state, action.payload.favorite.id]
        }
        case types.DELETE_FAVORITES_COMPLETED: {
            return state.map(id => id != action.payload.favorite.id)
        }
    }

    return state;
};
const isFetchingFavorites = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_FAVORITES_STARTED: {
            return true;
        }
        case types.FETCH_FAVORITES_COMPLETED: {
            return false;
        }
        case types.FETCH_FAVORITES_FAILED: {
            return false;
        }
    }

    return state;
};

const isAddingFavorite = (state = false, action) => {
    switch (action.type) {
        case types.ADD_FAVORITES_STARTED: {
            return true;
        }
        case types.ADD_FAVORITES_COMPLETED: {
            return false;
        }
        case types.ADD_FAVORITES_FAILED: {
            return false;
        }
    }

    return state;
};




const favoritesReducer = combineReducers({
    favoritesById,
    order,
    isFetchingFavorites,
    isAddingFavorite,
});

export default favoritesReducer;
export const favoriteTypes = ['TrackFavorite', 'AlbumFavorite', 'ArtistFavorite', 'Favorite']
export const getFavorite = (state, id) => state.favoritesById[id];
export const getFavorites = (state) => state.order.map(id => getFavorite(state, id)).filter(favorite => favorite != undefined);
export const getFavoritesByType = (state) => favoriteTypes.order.map(type => getFavorites(state).filter(favorite => favorite.resourcetype == type));
export const getFavoritesFilteredByType = (state, type) => getFavorites(state).filter(favorite => favorite.resourcetype == type);
export const getIsFetchingFavorites = (state) => state.isFetchingFavorites;
