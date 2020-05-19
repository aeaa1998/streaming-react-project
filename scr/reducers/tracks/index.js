/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import * as types from '../../types/tracks';

const tracks = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_TRACKS_STARTED: {
            return state;
        }
        case types.FETCH_TRACKS_SUCCEDED: {
            const { entities, result } = action.payload
            return entities.track ?? {};
        }
        case types.FETCH_TRACKS_FAILED: {
            return state;
        }
    }

    return state;
};
const tracksByGenre = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_TRACKS_BY_GENRE_STARTED: {
            return state;
        }
        case types.FETCH_TRACKS_BY_GENRE_SUCCEDED: {
            const { entities, result } = action.payload
            return entities.track ?? {};
        }
        case types.FETCH_TRACKS_BY_GENRE_FAILED: {
            return state;
        }
    }

    return state;
};
const order = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_TRACKS_STARTED: {
            return state;
        }
        case types.FETCH_TRACKS_SUCCEDED: {
            const { entities, result } = action.payload
            return result;
        }
        case types.FETCH_TRACKS_FAILED: {
            return state;
        }
    }

    return state;
};

const orderByGenre = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_TRACKS_BY_GENRE_STARTED: {
            return state;
        }
        case types.FETCH_TRACKS_BY_GENRE_SUCCEDED: {
            const { entities, result } = action.payload
            return result;
        }
        case types.FETCH_TRACKS_BY_GENRE_FAILED: {
            return state;
        }
    }

    return state;
};

const isFetchingTracks = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_TRACKS_STARTED || types.FETCH_TRACKS_BY_GENRE_STARTED: {
            return true;
        }
        case types.FETCH_TRACKS_SUCCEDED || types.FETCH_TRACKS_BY_GENRE_SUCCEDED: {
            return false;
        }
        case types.FETCH_TRACKS_FAILED || types.FETCH_TRACKS_BY_GENRE_FAILED: {
            return false;
        }
    }

    return state;
};




const track = combineReducers({
    tracks,
    isFetchingTracks,
    tracksByGenre,
    order,
    orderByGenre,
});

export default track;

export const getTrack = (state, id) => state.tracks[id];
export const getTracks = (state) => state.order.map(id => getTrack(state, id));
export const getTrackByGenre = (state, id) => state.tracksByGenre[id];
export const getTracksByGenre = (state) => state.orderByGenre.map(id => getTrackByGenre(state, id));
export const getIsFetchingTracks = (state) => state.isFetchingTracks;
export const getIsFetchingTracksByGenre = (state) => state.isFetchingTracks; 
