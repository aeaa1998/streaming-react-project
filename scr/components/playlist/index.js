/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Dimensions, View, FlatList, StyleSheet, Text, TouchableHighlight, ImageBackground, Image } from 'react-native';
import BaseLoaderView from '../utils/containers/Bases/BaseLoaderView'
import { ProgressLoader } from '../utils/Loaders/ProgressLoader'
import { elevation } from '../../styles/shadows';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/playlists'
import { imageHeader } from '../../styles/images';

const PlaylistRow = ({ playlist, navigation, callback, ...props }) => {
    return (<TouchableHighlight
        underlayColor='rgba(52, 52, 52, 0.2)'
        style={{ paddingHorizontal: 5, height: 60, paddingVertical: 5, flexDirection: 'row', marginVertical: 5, borderBottomWidth: 0.3 }}
        onPress={() => {
            navigation.navigate('Playlist.Detail'
                , {
                    playlistId: playlist.id,
                });
        }}
    >
        <>
            <Image
                resizeMode="contain"
                source={{ uri: `https://picsum.photos/seed/${playlist.name}/40` }}
                style={{
                    flex: 0.2,
                }}
            />
            <View style={{ flex: 0.7 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>{playlist.name}</Text>
                <Text style={{ fontSize: 16 }} numberOfLines={1} ellipsizeMode={'tail'}>Cantidad de canciones: {playlist.tracks.length}</Text>
            </View>
            <TouchableHighlight
                underlayColor='rgba(52, 52, 52, 0.05)'
                style={{ flex: 0.05, borderRadius: 15, padding: 15 }}
                onPress={() => {
                    alerts.decisionDialog('Alto!', `Estas seguro que deseas eliminar la playlist ${playlist.name}`, () => {
                        callback(playlist)
                    })
                }}
            >
                <Image
                    resizeMode="contain"
                    source={require('../../assets/images/close.png')}
                    style={{
                        height: undefined,
                        width: undefined,
                        flex: 1,
                    }}
                />
            </TouchableHighlight>
        </>
    </TouchableHighlight>);
}

const Playlists = ({ isLoading, playlists, profile, navigation, ...props }) => {
    const { height, width } = Dimensions.get('window')
    useEffect(() => {
        props.fetchPlaylists()
    }, [])
    return (
        <BaseLoaderView
            isLoading={isLoading}
            style={{ minHeight: height }}
            childrenView={() => (
                <View>
                    <ProgressLoader loadingLabel="Borrando playlist" visible={props.isDeleting} />
                    <FlatList
                        ListEmptyComponent={() => (
                            <View style={{ height: 300, width: '100%' }}>
                                <Text style={{ fontSize: 26, fontWeight: 'bold', padding: 10, textAlign: 'center' }}>
                                    Aun no has creado playlists.
                                </Text>
                            </View>
                        )}
                        ListHeaderComponent={() => (<>
                            <ImageBackground
                                source={{ uri: 'https://wallpaperaccess.com/full/628807.jpg' }}
                                style={{
                                    backgroundColor: 'gray', height: height * 0.30, resizeMode: 'cover',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{ fontSize: 30, color: 'white', textAlign: 'center', textAlignVertical: 'center' }}
                                >Playlists</Text>
                                <Text
                                    style={{ fontSize: 18, color: 'white', textAlign: 'center', textAlignVertical: 'center' }}
                                >de {profile.user.first_name} {profile.user.last_name}</Text>
                            </ImageBackground>
                        </>)}
                        data={playlists}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <PlaylistRow playlist={item} navigation={navigation} callback={props.deletePlayList} />
                        }
                        keyExtractor={item => item.id}
                    />

                </View>
            )}
        />
    );
}
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
        playlists: selectors.getPlaylists(state),
        isLoading: selectors.getIsFetchingPlaylists(state),
        profile: selectors.getUserProfile(state),
        isDeleting: selectors.getIsDeletingPlaylist(state),
    };
}
const mapDispatchToProps = (dispatch, { route, ...props }) => ({
    fetchPlaylists: () => {
        dispatch(actions.startFetchPlaylists())
    },
    deletePlayList: (playlist) => {
        dispatch(actions.startDeletePlaylists(playlist))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Playlists);

