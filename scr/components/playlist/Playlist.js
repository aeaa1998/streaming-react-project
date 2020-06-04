/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

import { ProgressLoader } from '../utils/Loaders/ProgressLoader'
import { Dimensions, View, FlatList, StyleSheet, Text, TouchableHighlight, ImageBackground, Image } from 'react-native';
import BaseLoaderView from '../utils/containers/Bases/BaseLoaderView'
import { elevation } from '../../styles/shadows';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import * as actions from '../../actions/playlists'
import { imageHeader } from '../../styles/images';
import Alerts from '../utils/Alerts';

const PlaylistTrackRow = ({ track, navigation, callback, ...props }) => {
    return (<TouchableHighlight
        underlayColor='rgba(52, 52, 52, 0.2)'
        style={{ paddingHorizontal: 5, height: 60, paddingVertical: 5, flexDirection: 'row', borderBottomWidth: 0.3 }}
        onPress={() => {
            navigation.navigate('Tracks.Detail'
                , {
                    trackId: track.id,
                });
        }}
    >
        <>
            <Image
                resizeMode="contain"
                source={{ uri: `https://picsum.photos/seed/${track.name}/40` }}
                style={{
                    flex: 0.2,
                }}
            />
            <View style={{ flex: 0.75 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>{track.name}</Text>
                <Text style={{ fontSize: 16 }}>Cancion por: {track.album.artist.name}</Text>
            </View>
            <TouchableHighlight
                underlayColor='rgba(52, 52, 52, 0.05)'
                style={{ flex: 0.05, borderRadius: 15, padding: 15 }}
                onPress={() => {
                    alerts.decisionDialog('Alto!', `Estas seguro que deseas eliminar la canción ${track.name}`, () => {
                        callback(track.id)
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

const Playlist = ({ isLoading, playlist, profile, navigation, playlistTracks, ...props }) => {
    const onPageLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setParentSize(height);
        setsquareImageSize(height * 0.7);
    };
    const { height, width } = Dimensions.get('window')
    const [parentSize, setParentSize] = useState(100);
    const [squareImage, setsquareImageSize] = useState(100);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        props.fetchSelectedPlaylist()
        setLoading(false)
    }, [])
    return (
        <BaseLoaderView
            isLoading={isLoading || loading}
            style={{ minHeight: height }}
            childrenView={() => (
                <View>
                    <ProgressLoader loadingLabel="Borrando cancion" visible={props.isDeleting} />
                    <FlatList
                        ListEmptyComponent={() => (
                            <View style={{ height: 300, width: '100%' }}>
                                <Text style={{ fontSize: 26, fontWeight: 'bold', padding: 10, textAlign: 'center' }}>
                                    Aun no se han agregado canciones a la playlist 
                                </Text>
                            </View>
                        )}
                        ListHeaderComponent={() => (<>
                            <ImageBackground
                                source={{ uri: 'https://wallpaperaccess.com/full/1078877.jpg' }}
                                onLayout={onPageLayout}
                                style={{
                                    backgroundColor: 'gray', height: height * 0.25, resizeMode: 'cover',
                                    justifyContent: 'center',
                                }}>
                                <ImageBackground
                                    source={{ uri: 'https://secureservercdn.net/198.71.233.141/21d.041.myftpupload.com/wp-content/uploads/2017/06/placeholder-profile-male-500x500-300x300.png' }}
                                    style={{
                                        position: 'absolute',
                                        top: (parentSize) - (squareImage * 0.5),
                                        backgroundColor: 'white',
                                        resizeMode: 'cover',
                                        justifyContent: 'center',
                                        ...computedShapes.computedSquare(squareImage),
                                        ...styles.profilePicElevation,
                                        alignSelf: 'center',

                                    }}
                                >
                                </ImageBackground>
                            </ImageBackground>
                            <Text style={{ marginTop: (squareImage / 2) + 30, fontSize: 20, marginBottom: 4, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
                                {playlist.name}
                            </Text>
                            <Text style={{ fontSize: 18, marginBottom: 4, width: '100%', textAlign: 'center' }}>
                                - {profile.user.first_name} {profile.user.last_name}
                            </Text>
                        </>)}
                        data={playlist.tracks}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <PlaylistTrackRow track={item} navigation={navigation} callback={props.deleteTrackFromPlaylist} />
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
        playlist: selectors.getSelectedPlaylist(state),
        isLoading: selectors.getIsFetchingSelectedPlaylist(state),
        profile: selectors.getUserProfile(state),
        isDeleting: selectors.getIsDeletingTrackFromPlaylist(state),
    };
}
const mapDispatchToProps = (dispatch, { route, ...props }) => ({
    fetchSelectedPlaylist: () => {
        const { playlistId } = route.params;
        dispatch(actions.startFetchSelectedPlaylist(playlistId))
    },
    deleteTrackFromPlaylist: (trackId) => {
        const { playlistId } = route.params;
        dispatch(actions.startDeleteTrackFromPlaylist(playlistId, trackId))
    },
})
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Playlist);

