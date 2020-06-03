/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { acceptDialog } from '../../../components/utils/Alerts'
import React, { useState } from 'react';
import { ProgressLoader } from '../../utils/Loaders/ProgressLoader'
import LoginForm from './LoginForm'
const image = { uri: "https://i.imgur.com/UuDQFWd.jpg" };
import { connect } from 'react-redux';
import { View, Text, Dimensions, ImageBackground, StyleSheet, TextInput, Button } from "react-native";
import * as actions from '../../../actions/auth';
import * as selectors from '../../../reducers';

const LoginView = ({ navigation, onSubmit, isLoading }) => {
    const { width, height } = Dimensions.get('window');
    // const [username, changeUsername] = useState('');
    // const [password, changePassword] = useState('');
    return (
        <View style={styles.container, { height: height }}>
            <ImageBackground source={image} style={styles.image}>
                <ProgressLoader loadingLabel="Ingresando" visible={isLoading} />
                <View style={styles.card}>
                    <LoginForm onSubmit={onSubmit} navigation={navigation} />
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
        backgroundColor: "rgba(255, 255, 255, 0.9)",
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
    }),
    dispatch => ({
        onSubmit(username, password) {
            if (username == '' || password == '') {
                acceptDialog("Campos faltantes", "Debe de llenar todos los campos")
                return
            }
            dispatch(actions.startLogin(username, password));
        },
    }))(LoginView);

