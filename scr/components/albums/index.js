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
            <Stack.Screen name="Albums.Home" component={View}
                options={{
                    title: ' ALBUMS HOME',
                }} />
            <Stack.Screen name="Album.Detail" component={View}
                options={{
                    title: 'Detalle del Album',
                }} />
        </Stack.Navigator>
    )
}



export default AlbumNavigator
