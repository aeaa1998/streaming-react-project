/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { acceptDialog } from '../../../components/utils/Alerts'
import React, { useState } from 'react';
import { ProgressLoader } from '../../utils/Loaders/ProgressLoader'
const image = { uri: "https://recoverit.wondershare.com/images/article/07/iphone-wallpapers-27.jpg" };
import { connect } from 'react-redux';
import { View, Text, Dimensions, ImageBackground, StyleSheet, TextInput, Button } from "react-native";
import * as actions from '../../../actions/auth';
import * as selectors from '../../../reducers';

const LoginView = ({ navigation, onSubmit, isLoading }) => {
    const { width, height } = Dimensions.get('window');
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');
    return (
        <View style={styles.container, { height: height }}>
            <ImageBackground source={image} style={styles.image}>
                <ProgressLoader loadingLabel="Ingresando" visible={isLoading} />
                <View style={styles.card}>

                    <View style={{ flexDirection: "column", flex: 1 }}>
                        <Text style={{ fontSize: 28, textAlign: "center" }} >Login</Text>
                        <View style={{ flex: 0.3, marginTop: 32 }} >
                            <Text style={{ fontSize: 16, textAlign: "left" }} >Usuario</Text>
                            <TextInput value={username} onChangeText={(text) => changeUsername(text)} placeholder="Ingrese su usuario" style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                            />
                        </View>
                        <View style={{ flex: 0.3, marginTop: 16 }} >
                            <Text style={{ fontSize: 16, textAlign: "left" }} >Contraseña</Text>
                            <TextInput value={password} onChangeText={(text) => changePassword(text)} secureTextEntry={true} placeholder="Ingrese su contraseña" style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                            />
                        </View>
                        <View style={{ flex: 0.3 }}>
                            <View style={{ marginTop: 32 }} >
                                <Button
                                    disabled={isLoading}
                                    onPress={() => onSubmit(username, password)}
                                    title="Iniciar Sesion"
                                    color="#841584"
                                />
                            </View>
                            <View style={{ marginTop: 16 }} >
                                <Button
                                    disabled={isLoading}
                                    onPress={() => navigation.navigate('Register')}
                                    title="Registrarse"
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

