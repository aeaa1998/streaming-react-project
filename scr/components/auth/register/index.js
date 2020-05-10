/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

const image = { uri: "https://recoverit.wondershare.com/images/article/07/iphone-wallpapers-27.jpg" };

import { View, Text, Dimensions, ImageBackground, StyleSheet, TextInput, Button } from "react-native";
const RegisterView = ({ navigation }) => {
    const { width, height } = Dimensions.get('window');
    return (
        <View style={styles.container, { height: height }}>
            <ImageBackground source={image} style={styles.image}>
                <View style={styles.card}>
                    <Text style={{ fontSize: 28, textAlign: "center" }} >Registrarse</Text>
                    <View style={{ flexDirection: "column", flex: 0.9 }}>
                        <View style={{ flex: 1, marginTop: 32 }} >
                            <Text style={{ fontSize: 16, textAlign: "left" }} >Nombre</Text>
                            <TextInput placeholder="Ingrese su nombre" style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                            />
                        </View>
                        <View style={{ flex: 1, marginTop: 16 }} >
                            <Text style={{ fontSize: 16, textAlign: "left" }} >Usuario</Text>
                            <TextInput secureTextEntry={true} placeholder="Ingrese su contraseña" style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                            />
                        </View>
                        <View style={{ flex: 1, marginTop: 16 }} >
                            <Text style={{ fontSize: 16, textAlign: "left" }} >Contraseña</Text>
                            <TextInput secureTextEntry={true} placeholder="Ingrese su contraseña" style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                            />
                        </View>
                        <View style={{ flex: 1, marginTop: 16 }} >
                            <Text style={{ fontSize: 16, textAlign: "left" }} >Confirmación Contraseña</Text>
                            <TextInput secureTextEntry={true} placeholder="Confirme su contraseña" style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 32 }} >
                                <Button
                                    title="Registrarse"
                                    color="#841584"
                                />
                            </View>
                            <View style={{ marginTop: 16 }} >
                                <Button
                                    onPress={() => navigation.goBack()}
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
        flexDirection: "column",
    },
    card: {
        flex: 0.8,
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

export default RegisterView