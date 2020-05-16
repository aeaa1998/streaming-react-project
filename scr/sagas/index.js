/* eslint-disable prettier/prettier */
import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted, watchRegisterStarted } from './auth';
import { watchProfileFetchStarted } from './profile';

function* mainSaga() {
    yield all([
        fork(watchLoginStarted),
        fork(watchRegisterStarted),
        fork(watchProfileFetchStarted),
    ]);
}

export default mainSaga;
