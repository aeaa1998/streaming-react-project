/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { acceptDialog } from '../../utils/Alerts'
import React, { useState } from 'react';
import * as actions from '../../../actions/auth';
const image = { uri: 'https://i.imgur.com/UuDQFWd.jpg' };
import { connect } from 'react-redux';
import { View, Text, Dimensions, ImageBackground, StyleSheet, TextInput, Button } from 'react-native';
import { ProgressLoader } from '../../utils/Loaders/ProgressLoader'
import * as selectors from '../../../reducers';
import RegisterForm from './RegisterForm'
const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const RegisterView = ({ navigation, isLoading, onSubmit }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { width, height } = Dimensions.get('window');
    return (
        <View style={styles.container, { height: height }}>
            <ImageBackground source={image} style={styles.image}>
                <ProgressLoader loadingLabel="Registrando usuario" visible={isLoading} />
                <View style={styles.card}>
                    <RegisterForm navigation={navigation} isLoading={isLoading} onSubmit={onSubmit} />
                </View>
            </ImageBackground>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    card: {
        flex: 0.99,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginVertical: 8,
        marginHorizontal: 10,
        padding: 16,
        paddingTop: 12,
    },
    row: {
        flexWrap: 'wrap',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default connect(
    state => ({
        isLoading: selectors.getIsRegistering(state),
    }),
    dispatch => ({
        onSubmit({ username, password, passwordConfirmation, name, email }) {
            if (username == '' || password == '' || passwordConfirmation == '' || name == '' || email == '') {
                acceptDialog('Campos faltantes', 'Debe de llenar todos los campos');
                return;
            }
            if (!validateEmail(email)) {
                acceptDialog('Email inválido', 'El correo electronico no es valido');
                return;
            }
            if (passwordConfirmation !== password) {
                acceptDialog('Error', 'Las contraseñas no coinciden');
                return;
            }
            dispatch(actions.registerStarted({
                username: username, password: password, first_name: name, email: email
            }));
        },
    }))(RegisterView);
