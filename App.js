/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { configureStore } from './scr/store';
import AuthNavigator from './scr/components/auth/navigation';
import SplashScreen from "./scr/components/utils/splashscreen";
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './scr/components/navigation'

import * as NavigationService from './scr/services/navigator'
// create switch navigation with authentication flow and main app
// [fragmento , ]
export const { store, persistor } = configureStore();
const SwitchNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthNavigator,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Splash',
  }
);

const AppNav = createAppContainer(SwitchNavigator);
export default class App extends Component {
  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }
  render() {
    return (<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNav ref={nav => {
          this.navigator = nav;
        }} />
      </PersistGate>
    </Provider>)
  };
}



