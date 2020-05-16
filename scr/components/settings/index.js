/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Animated } from 'react-native';
import { createStackNavigator, TransitionPresets, TransitionSpecs, HeaderStyleInterpolators, Header } from '@react-navigation/stack';
import Profile from './Profile'
import Settings from './Settings'
import Facts from './Facts'

const Stack = createStackNavigator();

const SettingsStack = ({ rootNavigator, logout }) => {
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
            <Stack.Screen name="SettingsList" component={Settings} options={{
                headerTransparent: true,
                title: '',
            }} />
            <Stack.Screen name="Profile" component={Profile} options={{ title: '', }} />
            <Stack.Screen name="Facts" component={Facts}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}
export default SettingsStack;

