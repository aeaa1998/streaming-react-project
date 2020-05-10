/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ProgressLoader } from '../../utils/Loaders/ProgressLoader'
const image = { uri: "https://recoverit.wondershare.com/images/article/07/iphone-wallpapers-27.jpg" };
import { connect } from 'react-redux';
import { View, Text, Dimensions, ImageBackground, StyleSheet, TextInput, Button } from "react-native";
import * as actions from '../../../actions/auth';
import * as selectors from '../../../reducers';
import LoginForm from './LoginForm'

const LoginView = ({ navigation, onSubmit, isLoading }) => {
    const { width, height } = Dimensions.get('window');
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');
    return (
        <View style={styles.container, { height: height }}>
            <ImageBackground source={image} style={styles.image}>
                <ProgressLoader loadingLabel="Ingresando" visible={isLoading} />
                <View style={styles.card}>
                    <LoginForm navigation={navigation} onSubmit={onSubmit} />
                </View>
            </ImageBackground>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    card: {
        flex: 0.6,
        borderRadius: 12,
        backgroundColor: "white",
        marginVertical: 12,
        marginHorizontal: 24,
        padding: 16,
        paddingTop: 12,
    },
    row: {
        flexWrap: "wrap",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    }
});

export default connect(
    state => ({
        isLoading: selectors.getIsAuthenticating(state),
        //   error: selectors.getAuthenticatingError(state),
        //   isAuthenticated: selectors.isAuthenticated(state),
        //   authUsername: selectors.getAuthUsername(state),
    }),
    dispatch => ({
        onSubmit(username, password) {
            dispatch(actions.startLogin(username, password));
        },
    }))(
        LoginView
    );