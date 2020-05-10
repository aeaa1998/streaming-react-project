/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import LottieView from 'lottie-react-native';
import { View, Text } from "react-native";
export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => (this.props.navigation.navigate('Login')), 1000);
    }
    render() {

        return (
            <View
                style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
                <LottieView
                    style={{
                        flex: 0.67,
                    }}
                    source={require('../../../assets/lottie/splashScreen.json')}
                    autoPlay
                    loop
                />
                <Text style={{ flex: 0.3, fontSize: 40, color: 'white', textAlign: 'center' }}>Streaming</Text>
            </ View>
        );
    }
}
