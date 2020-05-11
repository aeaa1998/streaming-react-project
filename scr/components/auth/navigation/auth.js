/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
// authentication views
// import Register from './app/views/Register';
import LoginView from '../login';
import RegisterView from '../register';
const AuthNavigator = createStackNavigator(
    {
        Login: { screen: LoginView },
        Register: { screen: RegisterView },
    },
    {
        headerMode: 'none',
    },
);

export default AuthNavigator
