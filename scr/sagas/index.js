/* eslint-disable prettier/prettier */
import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted, watchRegisterStarted } from './auth';

function* mainSaga() {
    yield all([
        fork(watchLoginStarted),
        fork(watchRegisterStarted),
    ]);
}

export default mainSaga;
