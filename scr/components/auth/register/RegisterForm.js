/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TextInput } from "react-native";
import { Field, reduxForm, reset, getFormValues } from 'redux-form';
import TextInputWrapper from '../../utils/Inputs/TextInputWrapper'
const isRequired = value => value ? undefined : 'Este campo es obligatorio'
const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) ? undefined : 'El campo debe de ser un correo electronico válido.';
}
const afterSubmit = (result, dispatch) => dispatch(reset('register-form'))
let RegisterForm = ({ navigation, all, invalid, isLoading, ...props }) => {
    return (
        <View style={{ flexDirection: "column", flex: 1 }}>
            <Text style={{ fontSize: 28, textAlign: 'center' }}>Registrarse</Text>
            <View style={{ flexDirection: 'column', flex: 0.9 }}>
                <View style={{ flex: 1, marginTop: 16 }} >
                    <Text style={{ fontSize: 16, textAlign: 'left' }} >Nombre</Text>
                    <Field
                        validate={[isRequired]}
                        name={'name'}
                        placeholder="Ingrese su usuario"
                        style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                        component={TextInputWrapper}
                    />

                </View>
                <View style={{ flex: 1, marginTop: 10 }} >
                    <Text style={{ fontSize: 16, textAlign: 'left' }} >Email</Text>
                    <Field
                        validate={[isRequired, validateEmail]}
                        name={'email'}
                        placeholder="Ingrese su correo"
                        style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                        component={TextInputWrapper} />
                </View>
                <View style={{ flex: 1, marginTop: 10 }} >
                    <Text style={{ fontSize: 16, textAlign: 'left' }} >Usuario</Text>
                    <Field
                        validate={[isRequired]}
                        name={'username'}
                        placeholder="Ingrese su usuario"
                        style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                        component={TextInputWrapper} />
                </View>
                <View style={{ flex: 1, marginTop: 10 }} >
                    <Text style={{ fontSize: 16, textAlign: 'left' }} >Contraseña</Text>
                    <Field
                        validate={[isRequired]}
                        name={'password'}
                        secureTextEntry={true}
                        placeholder="Ingrese su contraseña"
                        style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                        component={TextInputWrapper} />
                </View>
                <View style={{ flex: 1, marginTop: 10 }} >
                    <Text style={{ fontSize: 16, textAlign: 'left' }} >Confirmación Contraseña</Text>
                    <Field
                        validate={[isRequired]}
                        name={'passwordConfirmation'}
                        secureTextEntry={true}
                        placeholder="Ingrese su contraseña"
                        style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                        component={TextInputWrapper} />
                </View>

                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: 32 }} >
                        <Button
                            disabled={invalid || isLoading}
                            onPress={() => props.onSubmit(all)}
                            title="Registrarse"
                            color="#841584"
                        />
                    </View>
                    <View style={{ marginTop: 16 }} >
                        <Button
                            disabled={isLoading}
                            onPress={() => navigation.navigate('Login')}
                            title="Volver"
                            color="#841584"
                        />
                    </View>
                </View>
            </View>
        </View >
    );
}


RegisterForm = reduxForm({
    form: 'register-form',
    onSubmitSuccess: afterSubmit,
    enableReinitialize: true,
})(RegisterForm)

RegisterForm = connect(state => ({
    all: getFormValues('register-form')(state),
}))(RegisterForm);

export default RegisterForm;
