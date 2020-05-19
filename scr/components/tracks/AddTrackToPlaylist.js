/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React, { Component, useState, useEffect } from "react";
import { connect } from 'react-redux'
import * as actions from '../../actions/playlists'
import * as selectors from '../../reducers'
import BaseLoaderView from '../utils/containers/Bases/BaseLoaderView';
import { View, Text, TouchableOpacity, TouchableHighlight, Image, Dimensions, Modal, StyleSheet, TouchableWithoutFeedback, FlatList } from 'react-native'
const { width, height } = Dimensions.get('window')
const PlaylistItem = ({ playlist, callback }) => (
    <TouchableOpacity style={{
        width: '100%', paddingHorizontal: 5, paddingVertical: 10,
        borderBottomColor: 'black', borderBottomWidth: 0.3
    }}>
        <Text style={{ fontSize: 16, fontWeight: '400', textAlignVertical: 'center', height: '100%' }}>{playlist.name}</Text>
    </TouchableOpacity>)

const AddTrackToPlaylist = ({ visible, playlists, setStateCallback, isLoading, ...props }) => {
    useEffect(() => {
        props.fetchPlaylists()
    }, []);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => { setStateCallback(false) }}
        >
            <TouchableOpacity
                onPressOut={() => setStateCallback(false)}
                style={styles.container}
                activeOpacity={1}
            >
                <TouchableWithoutFeedback style={{
                }}>
                    <BaseLoaderView isLoading={isLoading} style={styles.modalView}>
                        <View style={{
                            flex: 0.1,
                            flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: 'gray'
                        }}>
                            <Text style={{ paddingHorizontal: 12, textAlign: 'left', textAlignVertical: 'center', fontSize: 18, flex: 0.85 }} >Escoge una playlist</Text>
                            <TouchableHighlight
                                underlayColor='rgba(52, 52, 52, 0.3)'
                                onPress={() => setStateCallback(false)}
                                style={{ flex: 0.15, alignContent: 'center', }}
                            >
                                <Image
                                    resizeMode="contain"
                                    style={{
                                        width: undefined,
                                        marginHorizontal: 3,
                                        marginVertical: 10,
                                        flex: 0.8,
                                    }} source={require('../../assets/images/close.png')} />
                            </TouchableHighlight>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <FlatList
                                horizontal={false}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={() =>
                                    (<View style={{ flex: 1 }}>
                                        <Text
                                            style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 22 }}
                                        >No se encontro resultados :C</Text>
                                    </View>)
                                }
                                data={playlists}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) =>
                                    <PlaylistItem playlist={item} />
                                }
                            />
                        </View>
                    </BaseLoaderView>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        borderRadius: 10,
        flex: 0.6, flexDirection: 'column', width: '80%', backgroundColor: 'white', padding: 10,
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: selectors.getIsFetchingPlaylists(state),
        selectedTrack: selectors.getSelectedTrack(state),
        playlists: selectors.getPlaylists(state),
    }
}

const mapDispatchToProps = (dispatch, { route, ...props }) => ({
    fetchPlaylists: () => {
        dispatch(actions.startFetchPlaylists())
    },
    addTrackToPlaylist: (playlist, track) => {
        dispatch(actions.startAddTrackToPlaylist(playlist, track))
    }
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    addTrackToPlaylist: (playlist) => {
        dispatchProps.addTrackToPlaylist(playlist, stateProps.selectedTrack)
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(AddTrackToPlaylist);
