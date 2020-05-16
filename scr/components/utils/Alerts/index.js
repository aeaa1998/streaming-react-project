/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
export const acceptDialog = (title, message, okCallbak = () => { }) =>
    Alert.alert(
        title,
        message,
        [{ text: 'OK', onPress: () => okCallbak() }],
        { cancelable: false },
    );

export const decisionDialog = (title, message, okCallbak = () => { }) =>
    Alert.alert(
        title,
        message,
        [{
            text: "Cancelar",
            style: "cancel"
        },
        { text: 'OK', onPress: () => okCallbak() }
        ],
        { cancelable: true },
    );

export default { acceptDialog, decisionDialog }
