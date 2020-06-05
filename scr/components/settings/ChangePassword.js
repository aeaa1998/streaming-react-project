/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../reducers'
import { ProgressLoader } from '../utils/Loaders/ProgressLoader'
import * as authActions from '../../actions/auth'
import ImageHeader from '../utils/containers/Headers/ImageHeader';
import { View, StyleSheet, Text, TextInput, Button, Dimensions } from 'react-native';
import { imageHeaderStyle } from '../../styles/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useHeaderHeight } from '@react-navigation/stack';
//imageHeaderDefault 0.3 flex
const styles = StyleSheet.create({
    imageHeader: { ...imageHeaderStyle }
});


const ChangePassword = ({ changePasswordFunction, isChangingPassword, navigation, ...props }) => {
    const [actualPassword, setActualPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const size = Dimensions.get('window');
    const headerHeight = useHeaderHeight();
    const height = size.height - headerHeight


    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            style={{ backgroundColor: 'white', minHeight: height }}
        >
            <ProgressLoader loadingLabel="Cambiando contraseña" visible={isChangingPassword} />
            <ImageHeader
                style={{ ...styles.imageHeader, minHeight: height * 0.3 }}
                imgSrc={{ uri: 'https://i.pinimg.com/originals/44/80/c6/4480c6af707d0e13c7f66a9d6d378015.jpg' }}
                textTitle="Cambiar contraseña"
            />
            <View style={{ height: height * 0.7, paddingHorizontal: 20 }}>
                <View style={{ flex: 0.25, marginTop: 32 }}>
                    <Text style={{ fontSize: 16, textAlign: "left" }} >Contraseña actual</Text>
                    <TextInput
                        value={actualPassword} onChangeText={(text) => setActualPassword(text)}
                        placeholder="Ingrese su contraseña actual"
                        secureTextEntry={true}
                        style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                    />
                </View>
                <View style={{ flex: 0.25, marginTop: 32 }}>
                    <Text style={{ fontSize: 16, textAlign: "left" }} >Nueva contraseña</Text>
                    <TextInput
                        value={password} onChangeText={(text) => setPassword(text)}
                        placeholder="Inngrese su nueva constraseña"
                        secureTextEntry={true}
                        style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                    />
                </View>
                <View style={{ flex: 0.25, marginTop: 32 }}>
                    <Text style={{ fontSize: 16, textAlign: "left" }} >Confirme contraseña</Text>
                    <TextInput
                        value={passwordConfirm} onChangeText={(text) => setPasswordConfirm(text)}
                        placeholder="Confirme su contraseña"
                        secureTextEntry={true}
                        style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                    />
                </View>
                <View style={{ flex: 0.25, marginTop: 32, paddingHorizontal: 40 }}>
                    <Button
                        disabled={passwordConfirm == '' || password == '' || actualPassword == ''}
                        onPress={
                            () => {
                                changePasswordFunction({ oldPassword: actualPassword, newPassword: password, passwordConfirm: passwordConfirm }, () => { navigation.pop() })
                            }}
                        title="Cambiar contraseña"
                        color="#841584"
                    />
                </View>
            </View>
        </KeyboardAwareScrollView >
    );
};



const mapStateToProps = (state) => ({
    isChangingPassword: selectors.getIsChangingPassword(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changePasswordFunction: ({ oldPassword, newPassword, passwordConfirm }, callback) => {
        if (passwordConfirm != newPassword) {
            alerts.acceptDialog("Error", "Las contraseñas no coincidenn")
        } else {
            dispatch(authActions.changePasswordStarted({ oldPassword, newPassword }, callback))
        }
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChangePassword);
