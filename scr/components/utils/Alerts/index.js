/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
export const acceptDialog = () =>
    Alert.alert(
        'Error',
        'No se ha podido ingresar sesion',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
    );
