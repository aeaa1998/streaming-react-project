/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { View, Text, TouchableOpacity, TouchableHighlight, Image, Dimensions, ImageBackground } from 'react-native'
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


const TrackItem = ({ track, navigation, album }) => {
    
    const hasExplicitLyrics = (track) => {
        if(track.explicit_lyrics ===1) {
            return "Explicit Lyrics" 
        }
        else {
            return ""
        }
    }
    return (<TouchableHighlight
        underlayColor='rgba(52, 52, 52, 0.2)'
        style={{ paddingHorizontal: 5, height: 60, paddingVertical: 5, flexDirection: 'row', marginVertical: 5, borderBottomWidth: 0.3 }}
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
            <View style={{ flex: 0.8 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>{track.name}</Text>
                <Text style = {{fontSize : 12 ,color: "crimson" , fontWeight:' bold'}}> {hasExplicitLyrics(track)} </Text>
            </View>
        </>
    </TouchableHighlight>);
}

const Album = ({ selectedAlbum, navigation, isLoading, route, ...props }) => {
    const { width, height } = Dimensions.get('window')
    const [loading, setLoading] = useState(true)
    const fetchCorrect = () => !_.isEqual(selectedAlbum, {})
    const isFavorite = (selectedAlbum) => props.favoriteAlbums.some(favoriteTrack => favoriteTrack.id === selectedAlbum.id)
    const headerHeight = useHeaderHeight();
    useEffect(() => {
        props.fetchAlbum()
        setLoading(false)
    }, [])
    const additionalInfo =()=>{
        if(selectedAlbum.price || selectedAlbum.created_at){
            return `Price : Q ${selectedAlbum.price.toFixed(2)} \n Published on : ${moment(selectedAlbum.created_at).locale('es').format('lll')}`

        }
        else 
            return ""
        
    }
    return (
        <BaseLoaderView
            fetchCorrectly={fetchCorrect()}
            isLoading={isLoading || loading}
            style={{ backgroundColor: bg, minHeight: '100%', paddingTop: useHeaderHeight()}}
            childrenView={() =>
                (<ImageBackground
                    source={require('../../assets/images/gradientbg.png')}
                    style={{
                        minHeight: '100%',
                        resizeMode: 'cover',
                    }}>
                    <FlatList
                        ListHeaderComponent={() => (
                            <>
                                <View
                                // style={{ minHeight: (height - headerHeight) }}
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
                                        <Text style={{ color: 'white', flex: 1, fontSize: 15, fontWeight: '600', textAlign: 'center' }}>
                                           by : {selectedAlbum.artist.name} 
                                        </Text>
                                        <Text style={{ color: 'gray', fontSize: 12, textAlign: 'center' }}>
                                        {additionalInfo()}
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
                                </View>
                                <View style={{ padding: 20 }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
                                        Canciones del album
                        </Text>
                                </View>

                            </>
                        )}
                        ListEmptyComponent={() => <Text
                            style={{ width: width - 40, marginVertical: 10, paddingHorizontal: 20, fontSize: 18, color: 'white' }}>
                            No tiene Canciones disponibles por el momento :(</Text>}
                        horizontal={false}
                        keyExtractor={item => item.id.toString()}
                        data={selectedAlbum.tracks}
                        renderItem={({ item }) =>
                            <TrackItem navigation={navigation} track={item} album={selectedAlbum} />
                        }
                    />
                </ImageBackground>)
            }
        >
        </BaseLoaderView>
    )
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

