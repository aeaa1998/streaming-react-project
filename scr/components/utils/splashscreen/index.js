/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import LottieView from 'lottie-react-native';
import { View, Text } from "react-native";
import { connect } from 'react-redux';
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/navigators'
class SplashScreen extends React.Component {

    componentDidMount() {
        this.props.setNavigation(this.props.navigation)
        setTimeout(() => (this.props.navigation.navigate(this.props.token ? 'App' : 'Auth')), 1000);
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

function mapStateToProps(state) {
    return {
        token: selectors.getAuthToken(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setNavigation: navigator => {
            dispatch(actions.startPutRootNavigation())
            try {
                dispatch(actions.completeSetRootNavigator(navigator))
            } catch{
                dispatch(actions.failedSetRootNavigator())
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SplashScreen);