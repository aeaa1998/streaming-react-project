/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
function SettingsItem({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}
const Settings = (props) => {
    return (
        <SafeAreaView>
        </SafeAreaView>
    )
}
export default Settings