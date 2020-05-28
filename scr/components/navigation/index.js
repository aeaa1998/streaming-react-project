/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Settings from '../settings'
import TracksNavigation from '../tracks'
import ArtistsNavigator from '../artists'
import AlbumNavigator from '../albums'

import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (

        <NavigationContainer>
            <Tab.Navigator>

                <Tab.Screen name="Canciones" component={TracksNavigation} />

                <Tab.Screen name=" Albums" component= {View}/>
                <Tab.Screen name="Artist" component={ArtistsNavigator} />
                {/* <Tab.Screen name="Favoritos" component={ArtistsNavigator} /> */}
                <Tab.Screen name="Mi perfil" component={Settings} />
            </Tab.Navigator>
        </NavigationContainer>

    );
}

export default AppNavigator