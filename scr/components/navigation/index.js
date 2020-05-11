/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../settings'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Settings" component={Settings} />
                {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator