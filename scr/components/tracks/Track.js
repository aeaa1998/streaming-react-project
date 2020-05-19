/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { View, Text, TouchableOpacity, TouchableHighlight, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import BaseLoaderView from '../utils/containers/Bases/BaseLoaderView';
import moment from 'moment'
import * as actions from '../../actions/tracks'
import * as favoriteActions from '../../actions/favorites'
import * as selectors from '../../reducers'
import { useHeaderHeight } from '@react-navigation/stack';
import AddTrackToPlaylist from './AddTrackToPlaylist'

const bg = 'rgb(40, 42, 54)'

const Track = ({ selectedTrack, navigation, isLoading, route, ...props }) => {
    const { width, height } = Dimensions.get('window')
    const [modalVisible, setModalVisible] = useState(false)
    const fetchCorrect = () => !_.isEqual(selectedTrack, {})
    useEffect(() => {
        props.fetchTrack()
    }, []);
    const computedTrackInfo = () => {
        if (fetchCorrect()) {
            return `${selectedTrack.album.artist.name} - ${selectedTrack.album.title}`
        } else {
            return ''
        }
    }
    const isFavorite = (selectedTrack) => props.favoriteTracks.some(favoriteTrack => favoriteTrack.track.id === selectedTrack.id)

    return (
        <BaseLoaderView
            fetchCorrectly={fetchCorrect()}
            isLoading={isLoading}
            style={{ backgroundColor: bg, flex: 1, flexDirection: 'column', paddingTop: useHeaderHeight() }}
            childrenView={() =>
                (<View
                    style={{ flex: 1 }}
                >
                    <AddTrackToPlaylist visible={modalVisible} setStateCallback={setModalVisible} />
                    <Image
                        source={{ uri: `https://picsum.photos/seed/${selectedTrack.name}/400` }}
                        style={{
                            flex: 0.5,
                            marginVertical: 10,
                            marginHorizontal: 15,
                        }}
                    />
                    <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableHighlight
                            onPress={() => setModalVisible(true)}
                            style={{ flex: 0.15, alignContent: 'center' }}
                        >
                            <Image
                                resizeMode="contain"
                                style={{
                                    width: undefined,
                                    marginHorizontal: 3,
                                    flex: 0.5,
                                }} source={require('../../assets/images/playlist.png')} />
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ flex: 0.15, alignContent: 'center' }}
                            onPress={() => !isFavorite(selectedTrack) ? props.addFavoriteTrack() : props.deleteFavoriteTrack()}
                        >
                            <Image
                                resizeMode="contain"
                                style={{
                                    width: undefined,
                                    marginHorizontal: 3,
                                    flex: 0.5,
                                }} source={
                                    isFavorite(selectedTrack) ? require('../../assets/images/isFavorite.png') : require('../../assets/images/favorite.png')
                                } />
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 0.35, paddingVertical: 10, flexDirection: 'column' }}>
                        <Text style={{ color: 'white', flex: 0.30, fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
                            {selectedTrack.name}
                            {selectedTrack.features.length > 0 ?
                                `ft ${selectedTrack.features.reduce((acc, artist) => `${acc}, ${artist.name}`, '')}`
                                : ''}
                        </Text>
                        <Text style={{ color: 'white', flex: 0.30, fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
                            {computedTrackInfo()}
                        </Text>
                        <Text style={{ color: 'white', flex: 0.15, fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
                            (Q) Precio: {Number(selectedTrack.price).toFixed(2)}
                        </Text>
                        <Text style={{ color: 'white', flex: 0.15, fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
                            Agregado el {moment(selectedTrack.created_at).locale('es').format('lll')}
                        </Text>

                    </View>
                </View>)
            }
        >
        </BaseLoaderView>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: selectors.getIsFetchingSelectedTrack(state),
        selectedTrack: selectors.getSelectedTrack(state),
        favoriteTracks: selectors.getFavoritesFilteredByType(state, 'TrackFavorite'),
    }
}

const mapDispatchToProps = (dispatch, { route, ...props }) => ({
    fetchTrack: () => {
        const { trackId } = route.params;
        dispatch(actions.startFetchSelectedTrack(trackId))
    },
    addFavoriteTrack: () => {
        const { trackId } = route.params;
        const type = 'TrackFavorite'
        dispatch(favoriteActions.startAddFavorites({ resourcetype: type, track: trackId }))
    },
    deleteFavoriteTrack: (favoriteTracks) => {
        const { trackId } = route.params;
        const favorite = favoriteTracks.find(favoriteTrack => favoriteTrack.track.id === trackId)
        dispatch(favoriteActions.startDeleteFavorites(favorite))
    },
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    deleteFavoriteTrack: () => {
        dispatchProps.deleteFavoriteTrack(stateProps.favoriteTracks)
    },
})
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Track);

