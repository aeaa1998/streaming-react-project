/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';
import Settings from '../settings'
import TracksNavigation from '../tracks'
import ArtistsNavigator from '../artists'
import AlbumNavigator from '../albums'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (

        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#e91e63',
                    showIcon: true,
                }}
            >

                <Tab.Screen name="Canciones" component={TracksNavigation}
                    options={{
                        tabBarLabel: 'Canciones',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../../assets/images/music-tab.png')} style={{ height: size, width: size }} />
                        ),
                    }}
                />

                <Tab.Screen name=" Albums" component={AlbumNavigator}
                    options={{
                        tabBarLabel: 'Albums',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../../assets/images/album-tab.png')} style={{ height: size, width: size }} />
                        ),
                    }}
                />
                <Tab.Screen name="Artist" component={ArtistsNavigator}
                    options={{
                        tabBarLabel: 'Artist',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../../assets/images/artist-tab.png')} style={{ height: size, width: size }} />
                        ),
                    }}
                />
                <Tab.Screen name="Mi perfil" component={Settings}
                    options={{
                        tabBarLabel: 'Mi perfil',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../../assets/images/black-playlist.png')} style={{ height: size, width: size }} />
                        ),
                    }} />
            </Tab.Navigator>
        </NavigationContainer>

    );
}

export default AppNavigator