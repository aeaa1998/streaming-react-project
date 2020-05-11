/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import * as actions from '../../../actions/auth';
import { View, Text, Button, TextInput } from "react-native";
import { Field, reduxForm, reset } from 'redux-form';
const isRequired = value => value ? undefined : 'Este campo es obligatorio'
const afterSubmit = (result, dispatch) => dispatch(reset('login-form'))
let LoginForm = ({ navigation, isLoading, ...props }) => {
    const formStates = ['asyncValidating', 'dirty', 'pristine', 'valid', 'invalid', 'submitting',
        'submitSucceeded', 'submitFailed'];
    return (
        <View style={{ flexDirection: "column", flex: 1 }}>
            <Text style={{ fontSize: 28, textAlign: 'center' }}>Login</Text>
            <View style={{ flex: 0.3, marginTop: 32 }}>
                <Text style={{ fontSize: 16, textAlign: "left" }} >Ususario</Text>
                <Field
                    validate={[isRequired]}
                    name='username'
                    placeholder="Ingrese su usuario"
                    style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                    component={TextInput}
                />
            </View>
            <View style={{ flex: 0.3, marginTop: 16 }}>
                <Text style={{ fontSize: 16, textAlign: "left" }} >Contraseña</Text>
                <Field
                    validate={[isRequired]}
                    name='password'
                    style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                    placeholder="Ingrese su contraseña"
                    component={TextInput}
                />

            </View>
            <View style={{ flex: 0.3 }}>
                <View style={{ marginTop: 32 }}>
                    <Button
                        disabled={props.submitting || isLoading}
                        onPress={props.handleSubmit}
                        title="Iniciar Sesion"
                        color="#841584"
                    />
                </View>
                <View style={{ marginTop: 16 }}>
                    <Button
                        disabled={props.submitting || isLoading}
                        onPress={() => navigation.navigate('Register')}
                        title="Registrarse"
                        color="#841584"
                    />
                </View>
            </View>
        </View >
    );
}


LoginForm = reduxForm({
    form: 'login-form',
    onSubmitSuccess: afterSubmit,
})(LoginForm)

export default LoginForm