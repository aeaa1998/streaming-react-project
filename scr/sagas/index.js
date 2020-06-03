/* eslint-disable prettier/prettier */
import { fork, all } from 'redux-saga/effects';

import { watchers as albumsWatchers} from './albums'
import { watchers as artistsWatchers } from './artists';
import { watchers as authWatchers } from './auth';
import { watchers as favoritesWatchers } from './favorites';
import { watchers as genresWatchers } from './genres';
import { watchers as playlistWatchers } from './playlists';
import { watchers as profileWatchers } from './profile';
import { watchers as tracksWatchers } from './tracks';

const forkWatchers = (watcher) => fork(watcher)
function* mainSaga() {
    yield all([
        ...albumsWatchers.map(forkWatchers),
        ...artistsWatchers.map(forkWatchers),
        ...authWatchers.map(forkWatchers),
        ...favoritesWatchers.map(forkWatchers),
        ...genresWatchers.map(forkWatchers),
        ...playlistWatchers.map(forkWatchers),
        ...profileWatchers.map(forkWatchers),
        ...tracksWatchers.map(forkWatchers),
    ]);
}

export default mainSaga;
