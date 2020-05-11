/* eslint-disable prettier/prettier */
import * as types from '../types/navigators';


export const startPutRootNavigation = () => (
    {
        type: types.SET_ROOT_NAVIGATOR_STARTED,
    }
);

export const completeSetRootNavigator = navigator => ({
    type: types.SET_ROOT_NAVIGATOR_SUCCEDED,
    payload: { navigator: navigator },
});

export const failedSetRootNavigator = () => ({
    type: types.SET_ROOT_NAVIGATOR_FAILED,
});

