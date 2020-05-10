/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { configureStore } from './scr/store';
import AuthNavigator from './scr/components/auth/navigation';
import SplashScreen from "./scr/components/utils/splashscreen";
// create switch navigation with authentication flow and main app
// [fragmento , ]
const { store } = configureStore();
const SwitchNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthNavigator,


  },
  {
    initialRouteName: 'Splash',
  }
);

const AppNav = createAppContainer(SwitchNavigator);
const App = () => {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
}
export default App;
