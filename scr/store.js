/* eslint-disable prettier/prettier */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import reducer from './reducers';
import mainSaga from './sagas';

export const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const persistedReducer = persistReducer(
        {
            key: 'root',
            storage: AsyncStorage,
            whitelist: ['auth', 'navigators'],
        },
        reducer,
    );

    const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
    // const store = createStore(reducer, applyMiddleware(sagaMiddleware));

    const persistor = persistStore(store);

    sagaMiddleware.run(mainSaga);

    // return { store };
    return { store, persistor };
};
