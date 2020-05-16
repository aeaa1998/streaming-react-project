/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import * as selectors from '../../reducers';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ImageBackground, StyleSheet, Text } from 'react-native';
import { imageHeader } from '../../styles/images'
import { elevation } from '../../styles/shadows'
import { TouchableOpacity } from 'react-native-gesture-handler';
const Profile = ({ profile }) => {
    const onPageLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setParentSize(height)
        setCircleSize(height * 0.7)
    };
    const [circeSize, setCircleSize] = useState(100)
    const [parentSize, setParentSize] = useState(100)

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
            <ImageBackground
                source={{ uri: 'https://webdesigntips.blog/wp-content/uploads/2018/06/20-Free-Abstract-Material-Design-Backgrounds.jpg' }}
                onLayout={onPageLayout}
                style={{ backgroundColor: 'gray', flex: 0.3, }}>
                <Text style={{ flex: 0.8, fontSize: 36, color: 'white', textAlignVertical: 'center', fontWeight: '600', textAlign: 'center' }}>
                    {profile.user.first_name} {profile.user.last_name}
                </Text>
                <ImageBackground
                    source={{ uri: 'https://secureservercdn.net/198.71.233.141/21d.041.myftpupload.com/wp-content/uploads/2017/06/placeholder-profile-male-500x500-300x300.png' }}
                    imageStyle={{ borderRadius: circeSize / 2 }}
                    style={{
                        position: 'absolute',
                        top: (parentSize) - (circeSize * 0.5),
                        backgroundColor: 'white',
                        resizeMode: 'cover',
                        justifyContent: 'center',
                        ...computedShapes.computedCircle(circeSize),
                        ...styles.profilePicElevation,
                        alignSelf: 'center',

                    }}
                >
                </ImageBackground>
            </ImageBackground>
            <View style={{ marginTop: (circeSize / 2) + 30, flex: 0.6, padding: 15 }}>
                <Text style={{ fontSize: 20, marginBottom: 8, fontWeight: 'bold' }}>
                    Username
                    </Text>
                <Text style={{ fontSize: 18, marginBottom: 12, borderBottomWidth: 1, paddingVertical: 5 }}>
                    {profile.user.username}
                </Text>
                <Text style={{ fontSize: 20, marginBottom: 8, fontWeight: 'bold' }}>
                    Email
                    </Text>
                <Text style={{ fontSize: 18, marginBottom: 12, borderBottomWidth: 1, paddingVertical: 5 }}>
                    {profile.user.email}
                </Text>
                <Text style={{ fontSize: 20, marginBottom: 8, fontWeight: 'bold' }}>
                    Telefono
                    </Text>
                <Text style={{ fontSize: 18, marginBottom: 12, borderBottomWidth: 1, paddingVertical: 5 }}>
                    {profile.phonenumber ?? 'No tiene seteado el telefono'}
                </Text>

            </View>
            <View style={{ flex: 0.1 }}>
                <TouchableOpacity >
                    <Text style={{ fontSize: 18, marginBottom: 8, fontWeight: 'bold', textAlign: 'right', paddingHorizontal: 15 }}>
                        Cambiar contraseña
                </Text>

                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create(
    {
        imageHeader: { ...imageHeader },
        profilePicElevation: elevation['12'],
    }
)
function mapStateToProps(state) {
    return {
        profile: selectors.getUserProfile(state),
    }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         fetchUserProfile: () => {
//             dispatch(profileActions.startFetchUserProfile())
//         },
//         setNavigation: navigator => {
//             dispatch(actions.startPutRootNavigation())
//             try {
//                 dispatch(actions.completeSetRootNavigator(navigator))
//             } catch{
//                 dispatch(actions.failedSetRootNavigator())
//             }
//         },
//     }
// }
export default connect(
    mapStateToProps,
    undefined,
)(Profile);
