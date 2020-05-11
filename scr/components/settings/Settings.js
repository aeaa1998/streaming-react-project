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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default Settings