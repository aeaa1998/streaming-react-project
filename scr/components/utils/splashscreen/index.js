/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as selectors from '../../../reducers';
import * as actions from '../../../actions/navigators'
const { height, width } = Dimensions.get('window')
class SplashScreen extends React.Component {

    componentDidMount() {
        this.props.setNavigation(this.props.navigation)
        setTimeout(() => (this.props.navigation.navigate(this.props.token ? 'App' : 'Auth')), 1000);
    }
    render() {

        return (
            <ImageBackground source={{ uri: 'https://wallpaperaccess.com/full/423515.jpg' }} style={styles.image}>
                <Text
                    style={{ flex: 0.3, fontSize: 56, color: 'white', textAlign: 'center', textAlignVertical: 'center' }}
                >STRME</Text>
                <LottieView
                    source={require('../../../assets/lottie/splashScreen.json')}
                    autoPlay
                    loop
                    style={{
                        height: height * 0.3,
                        alignSelf: 'center'
                    }}
                    resizeMode='contain'
                />

            </ImageBackground>

        );
    }
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-start',
    },

});

function mapStateToProps(state) {
    return {
        token: selectors.getAuthToken(state),
        tokenDecoded: selectors.getAuthDecoded(state),
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