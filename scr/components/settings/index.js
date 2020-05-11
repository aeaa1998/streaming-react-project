/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './Settings'
const Stack = createStackNavigator();

const SettingsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsList"
            headerMode="screen"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'green' },
            }}
        >
            <Stack.Screen name="SettingsList" component={Settings} options={{ title: 'Settings', }} />
        </Stack.Navigator>
    );
}


export default SettingsStack
