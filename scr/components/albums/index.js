/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react'
import { View } from 'react-native'
import Main from './Main'
import Album from './Album'
import { createStackNavigator, TransitionPresets, TransitionSpecs, HeaderStyleInterpolators, Header } from '@react-navigation/stack';
const Stack = createStackNavigator();
const AlbumNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Albums.Home"
            headerMode="float"
            screenOptions={{
                headerTransparent: true,
                gestureEnabled: true,
                headerTintColor: 'white',
                ...TransitionPresets.SlideFromRightIOS,
            }}

        >
            <Stack.Screen name="Albums.Home" component={Main}
                options={{
                    title: '',
                }} />
            <Stack.Screen name="Album.Detail" component={Album}
                options={{
                    title: 'Detalle del Album',
                }} />
        </Stack.Navigator>
    )
}



export default AlbumNavigator
