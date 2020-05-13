/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Settings from '../settings'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (

        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Favoritos" component={View} />
                <Tab.Screen name="Playlists" component={View} />
                <Tab.Screen name="Buscar" component={View} />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        </NavigationContainer>

    );
}

export default AppNavigator