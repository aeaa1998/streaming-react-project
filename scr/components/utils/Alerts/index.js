/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
export const acceptDialog = (title, message, okCallbak = () => { }) =>
    Alert.alert(
        title,
        message,
        [{ text: 'OK', onPress: () => okCallbak() }],
        { cancelable: false },
    );
