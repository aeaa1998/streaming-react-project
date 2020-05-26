/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import * as selectors from '../../reducers';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ImageBackground, StyleSheet, Text, Image, TouchableHighlight, TextInput } from 'react-native';
import { imageHeader } from '../../styles/images';
import { elevation } from '../../styles/shadows';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as profileActions from '../../actions/profile';
import DismissableModal from '../utils/containers/Modals/DismissableModal';
const Profile = ({ navigation, profile, updateProfilePhone }) => {
    const onPageLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setParentSize(height);
        setCircleSize(height * 0.7);
    };
    const [circeSize, setCircleSize] = useState(100);
    const [parentSize, setParentSize] = useState(100);
    const [modalVisible, setModalVisible] = useState(false);
    const [phone, setPhone] = useState('');
    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
            <DismissableModal
                visible={modalVisible}
                setVisibleState={setModalVisible}
            >
                <View style={styles.modalView}>
                    <View style={{ flex: 0.75, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: 16, textAlign: 'left' }}>Ingrese su telefono</Text>
                        <TextInput value={phone} onChangeText={(text) => setPhone(text)} placeholder="Ingrese el número de telefono"
                            style={{ marginTop: 8, fontSize: 16, borderColor: 'gray', borderWidth: 1 }}
                        />
                    </View>
                    <View style={{ flex: 0.25, flexDirection: 'row', alignSelf: 'center' }}>
                        <TouchableHighlight
                            underlayColor={'rgba(52, 52, 52, 0.2)'}
                            disabled={phone == ''}
                            onPress={() => {
                                updateProfilePhone(phone, () => { setModalVisible(false) })
                            }}
                            style={{ flex: 0.5, backgroundColor: 'rgba(52, 52, 52, 0.1)' }}>
                            <Text style={{ fontSize: 16, textAlign: 'center', textAlignVertical: 'center' }}>Cambiar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </DismissableModal>
            <ImageBackground
                source={{ uri: 'https://webdesigntips.blog/wp-content/uploads/2018/06/20-Free-Abstract-Material-Design-Backgrounds.jpg' }}
                onLayout={onPageLayout}
                style={{
                    backgroundColor: 'gray', flex: 0.3, resizeMode: 'cover',
                    justifyContent: 'center',
                }}>
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
            <View style={{ flex: 0.6, paddingHorizontal: 15 }}>
                <Text style={{ marginTop: (circeSize / 2) + 30, fontSize: 20, marginBottom: 8, fontWeight: 'bold' }}>
                    Username
                    </Text>
                <Text style={{ fontSize: 16, marginBottom: 12, borderBottomWidth: 1, paddingVertical: 5 }}>
                    {profile.user.username}
                </Text>
                <Text style={{ fontSize: 20, marginBottom: 8, fontWeight: 'bold' }}>
                    Email
                    </Text>
                <Text style={{ fontSize: 16, marginBottom: 12, borderBottomWidth: 1, paddingVertical: 5 }}>
                    {profile.user.email}
                </Text>
                <Text style={{ fontSize: 20, marginBottom: 8, fontWeight: 'bold' }}>
                    Telefono
                </Text>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 5, }}>
                    <Text style={{ fontSize: 16, flex: profile.phonenumber ? 1 : 0.8 }}>
                        {profile.phonenumber ?? 'Sin definir'}
                    </Text>
                    {profile.phonenumber == null &&
                        <TouchableHighlight
                            underlayColor={'rgba(52, 52, 52, 0.05)'}
                            style={{ flex: 0.2, height: 25, alignContent: 'center' }}
                            onPress={() => { setModalVisible(true) }}
                        >
                            <Image
                                resizeMode="contain"
                                source={require('../../assets/images/edit.png')}
                                style={{
                                    width: undefined,
                                    marginHorizontal: 3,
                                    flex: 1,
                                }} />
                        </TouchableHighlight>
                    }
                </View>

            </View>
            <View style={{ flex: 0.1 }}>
                <TouchableOpacity onPress={() => navigation.push('ChangePassword')} >
                    <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: 'bold', textAlign: 'right', paddingHorizontal: 15 }}>
                        Cambiar contraseña
                </Text>

                </TouchableOpacity>
            </View>
        </View >
    );
};
const styles = StyleSheet.create(
    {
        imageHeader: { ...imageHeader },
        profilePicElevation: elevation['12'],
        modalView: {
            height: 150, width: '80%', backgroundColor: 'white', padding: 10,
        }
    }
);
function mapStateToProps(state) {
    return {
        profile: selectors.getUserProfile(state),
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProfilePhone: (phone, callback) => {
            if (phone.match(/[1-9]{1}[0-9]{7}$/) && phone.length < 10) {
                dispatch(profileActions.startUpdateProfile({ phonenumber: phone }));
                callback()
            } else {
                alerts.acceptDialog("Error", 'Ingrese un numero de telefono válido');
            }

        },
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Profile);
