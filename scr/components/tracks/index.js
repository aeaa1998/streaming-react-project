/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react'
import { View } from 'react-native'
import { createStackNavigator, TransitionPresets, TransitionSpecs, HeaderStyleInterpolators, Header } from '@react-navigation/stack';
import TracksHome from './Main'
import Track from './Track'
const Stack = createStackNavigator();
const TracksNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsList"
            headerMode="float"
            screenOptions={{
                headerTransparent: true,
                gestureEnabled: true,
                headerTintColor: 'white',
                // headerStyle: { backgroundColor: 'rgb(53, 54, 58)' },
                // headerStyleInterpolator: HeaderStyleInterpolators.forStatic,
                ...TransitionPresets.SlideFromRightIOS,
            }}

        >
            <Stack.Screen name="Tracks.Home" component={TracksHome}
                initialParams={{ selectedGenre: 0, title: 'Canciones' }}
                options={{
                    title: '',
                }} />
            <Stack.Screen name="Tracks.Detail" component={Track}
                options={{
                    title: 'Detalle de la canción',
                }} />

        </Stack.Navigator>
    )
}

export default TracksNavigation
