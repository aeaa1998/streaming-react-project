/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react'
import { View } from 'react-native'
import Main from './Main'
import Artist from './Artist'
import Album from '../albums/Album'
import { createStackNavigator, TransitionPresets, TransitionSpecs, HeaderStyleInterpolators, Header } from '@react-navigation/stack';
const Stack = createStackNavigator();
const ArtistsNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Artists.Home"
            headerMode="float"
            screenOptions={{
                headerTransparent: true,
                gestureEnabled: true,
                headerTintColor: 'white',
                ...TransitionPresets.SlideFromRightIOS,
            }}

        >
            <Stack.Screen name="Artists.Home" component={Main}
                options={{
                    title: '',
                }} />
            <Stack.Screen name="Artist.Detail" component={Artist}
                options={{
                    title: 'Detalle del artista',
                }} />
            <Stack.Screen name="Album.Detail" component={Album}
                options={{
                    title: 'Detalle del album',
                }} />
        </Stack.Navigator>
    )
}

export default ArtistsNavigator
