/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import * as actions from '../../actions/auth'
import * as selectors from '../../reducers';
import { connect } from 'react-redux';
import { decisionDialog } from '../../components/utils/Alerts'
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
const DATA = [
    {
        id: 'Perfil',
        title: 'Perfil',
        route: 'Profile',
    },
    {
        id: '2',
        title: 'STRME Facts',
        route: 'Facts'
    },
    {
        id: 'Cerrar sesión',
        title: 'Cerrar sesión',
        route: 'Logout'
    },
];

function SettingsItem({ item, navigation, ...props }) {
    return (
        <TouchableOpacity style={styles.item} onPress=
            {() => {
                if (item.route !== 'Logout') {
                    navigation.navigate(item.route)
                } else {
                    decisionDialog("Cerrar sesión", "Estas seguro que deseas cerrar sesión",
                        () => props.logout(props.rootNavigator)
                    )
                }
            }
            }>
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );
}
const Settings = ({ rootNavigator, navigation, logout, decisionDialog }) => {
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
                        <SettingsItem decisionDialog={decisionDialog} rootNavigator={rootNavigator} logout={logout} navigation={navigation} item={item} />
                    }
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
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
        decisionDialog(title, message, callback) { decisionDialog(title, message, callback) },
        logout(rootNavigator) {
            dispatch(actions.logout());
            rootNavigator.navigate('Auth')
        },
    }))(Settings);