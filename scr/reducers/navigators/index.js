/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import * as types from '../../types/navigators';

const root = (state = null, action) => {
    switch (action.type) {
        case types.SET_ROOT_NAVIGATOR_STARTED: {
            return null;
        }
        case types.SET_ROOT_NAVIGATOR_SUCCEDED: {
            return action.payload.navigator;
        }
        case types.SET_ROOT_NAVIGATOR_FAILED: {
            return null;
        }
    }

    return state;
};




const navigators = combineReducers({
    root,
});

export default navigators;

export const getRootNavigator = (state) => state.root;
