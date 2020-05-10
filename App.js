/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigator from './scr/components/auth/navigation';
import SplashScreen from "./scr/components/utils/splashscreen";
// create switch navigation with authentication flow and main app
const SwitchNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Login: AuthNavigator,

  },
  {
    initialRouteName: 'Splash',
  }
);

const App = createAppContainer(SwitchNavigator);
export default App;
