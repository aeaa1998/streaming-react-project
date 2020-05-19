/* eslint-disable prettier/prettier */
import { fork, all } from 'redux-saga/effects';

import { watchers as authWatchers } from './auth';
import { watchers as tracksWatchers } from './tracks';
import { watchers as genresWatchers } from './genres';
import { watchers as favoritesWatchers } from './favorites';
import { watchers as playlistWatchers } from './playlists';
import { watchProfileFetchStarted } from './profile';
const forkWatchers = (watcher) => fork(watcher)
function* mainSaga() {
    yield all([
        ...authWatchers.map(forkWatchers),
        ...playlistWatchers.map(forkWatchers),
        ...tracksWatchers.map(forkWatchers),
        ...genresWatchers.map(forkWatchers),
        ...favoritesWatchers.map(forkWatchers),
        fork(watchProfileFetchStarted),
    ]);
}

export default mainSaga;
