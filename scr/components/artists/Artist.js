/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { View, Text, TouchableOpacity, TouchableHighlight, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import BaseLoaderView from '../utils/containers/Bases/BaseLoaderView';
import moment from 'moment'
import * as actions from '../../actions/artists'

import * as favoriteActions from '../../actions/favorites'
import * as selectors from '../../reducers'
import { useHeaderHeight } from '@react-navigation/stack';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

const bg = 'rgb(40, 42, 54)'
const AlbumItem = ({ album, navigation }) => {
    return (
        <TouchableOpacity
            style={{
                height: 240,
                width: 200,
                marginVertical: 10,
                flexDirection: 'column',
            }}
            onPress={() => {
                navigation.navigate('Album.Detail', {
                    albumId: album.id,
                });
            }}
        >
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Image
                    source={{ uri: `https://picsum.photos/seed/${album.title}/400` }}
                    style={{
                        flex: 0.8,
                        margin: 5,
                        padding: 5,
                        borderRadius: 5,
                    }}
                />
                <Text
                    style={{ flex: 0.2, color: 'white', fontSize: 16, paddingHorizontal: 10, fontWeight: '700', textAlign: 'left' }}
                >{album.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
const Artist = ({ selectedArtist, navigation, isLoading, route, ...props }) => {
    const { width, height } = Dimensions.get('window')
    const [loading, setLoading] = useState(true)
    const fetchCorrect = () => !_.isEqual(selectedArtist, {})
    useEffect(() => {
        props.fetchArtist()
        setLoading(false)
    }, []);

    const isFavorite = (selectedArtist) => props.favoriteArtists.some(favoriteTrack => favoriteTrack.artist.id === selectedArtist.id)

    return (
        <BaseLoaderView
            fetchCorrectly={fetchCorrect()}
            isLoading={isLoading || loading}
            style={{ backgroundColor: bg, minHeight: '100%', paddingTop: useHeaderHeight() }}
            childrenView={() =>
                (<ScrollView
                >
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={{ uri: `https://picsum.photos/seed/${selectedArtist.name}/400` }}

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
                            {selectedArtist.name}
                        </Text>
                    </View>
                    <View style={{ height: 30, marginVertical: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableHighlight
                            style={{ flex: 0.15, alignContent: 'center' }}
                            onPress={() => !isFavorite(selectedArtist) ? props.addFavoriteArtist() : props.deleteFavoriteArtist()}
                        >
                            <Image
                                resizeMode="contain"
                                style={{
                                    width: undefined,
                                    marginHorizontal: 3,
                                    flex: 1,
                                }} source={
                                    isFavorite(selectedArtist) ? require('../../assets/images/isFavorite.png') : require('../../assets/images/favorite.png')
                                } />
                        </TouchableHighlight>
                    </View>

                    <View style={{ padding: 20 }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
                            Biografia
                        </Text>
                        <Text style={{ color: 'white', fontSize: 16, marginVertical: 20, fontWeight: '600', textAlign: 'center' }}>
                            {selectedArtist.bio}
                        </Text>
                    </View>
                    <Text style={{ marginLeft: 15, fontSize: 18, color: 'white' }}>Albumes que te podrian interesar</Text>
                    <FlatList
                        ListEmptyComponent={() => <Text
                            numberOfLines={2}
                            style={{ width: width - 40, marginVertical: 10, paddingHorizontal: 20, fontSize: 18, color: 'white' }}>
                            No tiene albumes disponibles por el momento :(</Text>}
                        data={_.sampleSize(selectedArtist.albums, 5)}
                        horizontal={true}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <AlbumItem navigation={navigation} album={item} />
                        }
                    />

                </ScrollView>)
            }
        >
        </BaseLoaderView>
    )
}



const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: selectors.getIsFetchingSelectedArtist(state),
        selectedArtist: selectors.getSelectedArtist(state),
        favoriteArtists: selectors.getFavoritesFilteredByType(state, 'ArtistFavorite'),
    }
}

const mapDispatchToProps = (dispatch, { route, ...props }) => ({
    fetchArtist: () => {
        const { artistId } = route.params;
        dispatch(actions.startFetchSelectedArtists(artistId))
    },
    addFavoriteArtist: () => {
        const { artistId } = route.params;
        const type = 'ArtistFavorite'
        dispatch(favoriteActions.startAddFavorites({ resourcetype: type, artist: artistId }))
    },
    deleteFavoriteArtist: (favoriteArtists) => {
        const { artistId } = route.params;
        const favorite = favoriteArtists.find(f => f.artist.id === artistId)
        dispatch(favoriteActions.startDeleteFavorites(favorite))
    },
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    deleteFavoriteArtist: () => {
        dispatchProps.deleteFavoriteArtist(stateProps.favoriteArtists)
    },
})
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Artist);

