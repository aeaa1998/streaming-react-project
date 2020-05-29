/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { View, Text, TouchableOpacity, TouchableHighlight, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import BaseLoaderView from '../utils/containers/Bases/BaseLoaderView';
import moment from 'moment'
//import * as actions from '../../actions/artists'
import * as actions from '../../actions/albums'

import * as favoriteActions from '../../actions/favorites'
import * as selectors from '../../reducers'
import { useHeaderHeight } from '@react-navigation/stack';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

const bg = 'rgb(40, 42, 54)'


const TrackItem = ({ track , navigation }) => {

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Track.Detail'
                    , {
                        trackId: track.id,
                    });
            }}
        >
        <View>
        <Text style= {{ color : 'white' , borderColor: 'teal', borderWidth: 1, fontSize: 18, padding: 10, textAlign : 'center'}}>  {track.name} </Text>
        </View>

        </TouchableOpacity>

        );
}

const AlbumDetail = ({ selectedAlbum, navigation, isLoading, route, ...props }) => {
    const { width, height } = Dimensions.get('window')

    const fetchCorrect = () => !_.isEqual(selectedAlbum, {})
    // useEffect(() => {
    //     props.fetchArtist()
    // }, []);

    const isFavorite = (selectedAlbum) => props.favoriteAlbums.some(favoriteTrack => favoriteTrack.album.id === selectedAlbum.id)

    return (
        <BaseLoaderView
            fetchCorrectly={fetchCorrect()}
            isLoading={isLoading}
            style={{ backgroundColor: bg, minHeight: '100%', paddingTop: useHeaderHeight() }}
            childrenView={() =>
                (<ScrollView
                >
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={{ uri: `https://picsum.photos/seed/${selectedAlbum.title}/400` }}

                            style={{
                                height: 300,
                                width: 300,

                                marginVertical: 10,
                                marginHorizontal: 15,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 25, flexDirection: 'column' }}>
                        <Text style={{ color: 'white', flex: 1, fontSize: 20, fontWeight: '600', textAlign: 'center' }}>
                            {selectedAlbum.title}
                        </Text>
                    </View>
                    <View style={{ height: 30, marginVertical: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableHighlight
                            style={{ flex: 0.15, alignContent: 'center' }}
                            onPress={() => !isFavorite(selectedAlbum) ? props.addFavoriteAlbum() : props.deleteFavoriteAlbum()}
                        >
                            <Image
                                resizeMode="contain"
                                style={{
                                    width: undefined,
                                    marginHorizontal: 3,
                                    flex: 1,
                                }} source={
                                    isFavorite(selectedAlbum) ? require('../../assets/images/isFavorite.png') : require('../../assets/images/favorite.png')
                                } />
                        </TouchableHighlight>
                    </View>

                    <View style={{ padding: 20 }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
                            CANCIONES
                        </Text>
                    </View>

                    <FlatList
                        ListEmptyComponent={() => <Text
                            numberOfColumns={1}
                            style={{ width: width - 40, marginVertical: 10, paddingHorizontal: 20, fontSize: 18, color: 'white' }}>
                            No tiene Canciones disponibles por el momento :(</Text>}
                        data={_.sampleSize(selectedAlbum.tracks, 5)}
                        horizontal={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <TrackItem navigation={navigation} track={item} />
                        }
                    />
                </ScrollView>)
            }
        >
        </BaseLoaderView>
    )
}

class Album extends React.Component {
    componentWillMount() {
        this.props.fetchAlbum()
    }
    render() {
        return (<AlbumDetail {...this.props} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: selectors.getIsFetchingSelectedAlbum(state),
        selectedAlbum: selectors.getSelectedAlbum(state),
        favoriteAlbums: selectors.getFavoritesFilteredByType(state, 'AlbumFavorite'),
    }
}

const mapDispatchToProps = (dispatch, { route, ...props }) => ({
    fetchAlbum: () => {
        const { albumId } = route.params;
        dispatch(actions.startFetchSelectedAlbums(albumId))
    },
    addFavoriteAlbum: () => {
        const { albumId } = route.params;
        const type = 'AlbumFavorite'
        dispatch(favoriteActions.startAddFavorites({ resourcetype: type, album: albumId }))
    },
    deleteFavoriteAlbum: (favoriteAlbums) => {
        const { albumId } = route.params;
        const favorite = favoriteAlbums.find(f => f.album.id === albumId)
        dispatch(favoriteActions.startDeleteFavorites(favorite))
    },
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    deleteFavoriteAlbum: () => {
        dispatchProps.deleteFavoriteAlbum(stateProps.favoriteAlbums)
    },
})
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Album);

