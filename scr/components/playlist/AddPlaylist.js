/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack';
import { Dimensions, View, Button, StyleSheet, Text, TextInput, ImageBackground, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { imageHeaderStyle } from '../../styles/images';
import { ProgressLoader } from '../utils/Loaders/ProgressLoader';
import ImageHeader from '../utils/containers/Headers/ImageHeader';
import * as selectors from '../../reducers';
import * as actions from '../../actions/playlists';

const styles = StyleSheet.create({
    imageHeader: { ...imageHeaderStyle }
});
const AddPlaylist = ({ isCreatingPlaylist, navigation, addPlaylist, ...props }) => {
    const size = Dimensions.get('window');
    const headerHeight = useHeaderHeight();
    const height = size.height - headerHeight;
    const [playlistName, setPlaylistName] = useState('');

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            style={{ backgroundColor: 'white', minHeight: height }}
        >
            <ProgressLoader loadingLabel="Agregando playlist" visible={isCreatingPlaylist} />
            <ImageHeader
                style={{ ...styles.imageHeader, minHeight: height * 0.3 }}
                imgSrc={{ uri: 'https://besthqwallpapers.com/Uploads/5-4-2019/86121/thumb2-j-cole-4k-american-singer-artwork-jermaine-lamar-cole.jpg' }}
                textTitle="Agregar playlist"
            />
            <View style={{ height: height * 0.7, paddingHorizontal: 20 }}>
                <View style={{ flex: 0.25, marginTop: 32 }}>
                    <Text style={{ fontSize: 16, textAlign: "left" }} >Nombre playlist</Text>
                    <TextInput
                        value={playlistName} onChangeText={(text) => setPlaylistName(text)}
                        placeholder="Ingrese el nombre de su playlist"
                        style={{ marginTop: 8, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                    />
                </View>

                <View style={{ flex: 0.25, marginTop: 32, paddingHorizontal: 40 }}>
                    <Button
                        disabled={playlistName == ''}
                        onPress={
                            () => {
                                addPlaylist(playlistName, () => { navigation.pop(); });
                            }}
                        title="Agregar"
                        color="#841584"
                    />
                </View>
            </View>
        </KeyboardAwareScrollView >
    );
};

const mapStateToProps = (state) => ({
    isCreatingPlaylist: selectors.getIsAddingPlaylists(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    addPlaylist: (playlistName, callback) => {
        dispatch(actions.startAddPlaylists({ name: playlistName }, callback));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddPlaylist);
