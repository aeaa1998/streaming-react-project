/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { acceptDialog } from '../../utils/Alerts'
import React, { useState } from 'react';
import * as actions from '../../../actions/auth';
const image = { uri: 'https://recoverit.wondershare.com/images/article/07/iphone-wallpapers-27.jpg' };
import { connect } from 'react-redux';
import { View, Text, Dimensions, ImageBackground, StyleSheet, TextInput, Button } from 'react-native';
import { ProgressLoader } from '../../utils/Loaders/ProgressLoader'
import * as selectors from '../../../reducers';
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
                    <Text style={{ fontSize: 28, textAlign: 'center' }} >Registrarse</Text>
                    <View style={{ flexDirection: 'column', flex: 0.9 }}>
                        <View style={{ flex: 1, marginTop: 16 }} >
                            <Text style={{ fontSize: 16, textAlign: 'left' }} >Nombre</Text>
                            <TextInput value={name} onChangeText={(text) => setName(text)} placeholder="Ingrese su nombre" style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                            />
                        </View>
                        <View style={{ flex: 1, marginTop: 32 }} >
                            <Text style={{ fontSize: 16, textAlign: 'left' }} >Email</Text>
                            <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Ingrese su correo" style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                            />
                        </View>
                        <View style={{ flex: 1, marginTop: 32 }} >
                            <Text style={{ fontSize: 16, textAlign: 'left' }} >Usuario</Text>
                            <TextInput value={username} onChangeText={(text) => setUsername(text)} placeholder="Ingrese su usuario" style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                            />
                        </View>
                        <View style={{ flex: 1, marginTop: 32 }} >
                            <Text style={{ fontSize: 16, textAlign: 'left' }} >Contraseña</Text>
                            <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder="Ingrese su contraseña" style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                            />
                        </View>
                        <View style={{ flex: 1, marginTop: 32 }} >
                            <Text style={{ fontSize: 16, textAlign: 'left' }} >Confirmación Contraseña</Text>
                            <TextInput value={passwordConfirmation} onChangeText={(text) => setPasswordConfirmation(text)} secureTextEntry={true} placeholder="Confirme su contraseña" style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 32 }} >
                                <Button
                                    onPress={() => onSubmit(username, password, passwordConfirmation, name, email)}
                                    title="Registrarse"
                                    color="#841584"
                                />
                            </View>
                            <View style={{ marginTop: 16 }} >
                                <Button
                                    onPress={() => navigation.navigate('Login')}
                                    title="Volver"
                                    color="#841584"
                                />
                            </View>
                        </View>

                    </View>

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
        flex: 0.9,
        borderRadius: 12,
        backgroundColor: 'white',
        marginVertical: 12,
        marginHorizontal: 24,
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
        onSubmit(username, password, passwordConfirmation, name, email) {
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
