/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import * as actions from '../../actions/auth'
import * as selectors from '../../reducers';
import { connect } from 'react-redux';
import { decisionDialog } from '../../components/utils/Alerts'
import { Image, View, FlatList, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
const DATA = [
    {
        id: 'profile',
        title: 'Perfil',
        route: 'Profile',
        icon: require('../../assets/images/profile.png'),
    },
    {
        id: 'facts',
        title: 'STRME Facts',
        route: 'Facts',
        icon: require('../../assets/images/facts.png'),
    },
    {
        id: 'logout',
        title: 'Cerrar sesión',
        route: 'Logout',
        icon: require('../../assets/images/logout.png'),
    },
];

function SettingsItem({ item, navigation, ...props }) {

    return (
        <TouchableOpacity style={styles.item} onPress=
            {() => {
                if (item.route !== 'Logout') {
                    navigation.navigate(item.route)
                } else {
                    alerts.decisionDialog("Cerrar sesión", "Estas seguro que deseas cerrar sesión",
                        () => props.logout()
                    )
                }
            }
            }>
            <Image
                resizeMode='contain'
                style={{
                    height: undefined,
                    width: undefined,
                    flex: 0.1,
                }} source={item.icon} />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );
}
const Settings = ({ rootNavigator, navigation, logout }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
            <ImageBackground
                source={{ uri: 'https://www.ticketclub.com/blog/wp-content/uploads/2018/12/rap-hip-hop-no-text-1200x600-unbounce-bg.jpg' }}
                style={styles.imageHeader}>

                <Text
                    style={{
                        flex: 1, fontSize: 44, color: 'white', textAlign: 'center', textAlignVertical: 'center'
                    }}
                >Ajustes</Text>
            </ImageBackground>
            <View style={{ flex: 0.7 }}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => item.route !== 'Logout' ?
                        <SettingsItem navigation={navigation} item={item} /> :
                        <SettingsItem rootNavigator={rootNavigator} logout={logout} navigation={navigation} item={item} />
                    }
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        paddingLeft: 20,
        flex: 0.9,
    },
    imageHeader: {
        flex: 0.3,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});
export default connect(
    state => ({
        rootNavigator: selectors.getRootNavigator(state),
    }),
    dispatch => ({
        logout() {
            dispatch(actions.logout());
            // rootNavigator.navigate('Auth')
        },
    }))(Settings);