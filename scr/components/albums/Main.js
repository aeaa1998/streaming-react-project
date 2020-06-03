/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import { View, FlatList, SectionList, StyleSheet, Dimensions, Text, ImageBackground, Image, ActivityIndicator } from 'react-native';
import BaseLoaderView from '../utils/containers/Bases/BaseLoaderView';
import { imageHeaderStyle } from '../../styles/images';
import { connect } from 'react-redux';
import * as actions from '../../actions/albums';
import ImageHeader from '../utils/containers/Headers/ImageHeader';
import * as selectors from '../../reducers';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// console.log(imageHeaderStyle)
const styles = StyleSheet.create({
    imageHeader: imageHeaderStyle,
});
const headerGenre = {
    id: 0,
    name: 'Todos'
};
const { width, height } = Dimensions.get('window');

const AlbumItem = ({ album, navigation }) => {

    return (
        <TouchableOpacity
            style={{
                height: 210,
                width: 200,
                marginVertical: 5,
                flexDirection: 'column',
            }}
            onPress={() => {
                navigation.navigate('Album.Detail'
                    , {
                        albumId: album.id,
                    });
            }}
        >
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Image
                    source={{ uri: `https://picsum.photos/seed/${album.title}/400` }}
                    style={{
                        flex: 1,
                        margin: 5,
                        padding: 5,
                        borderRadius: 5,
                    }}
                />
                <Text
                    style={{ flex: 0.1, color: 'black', fontSize: 13, paddingHorizontal: 10, fontWeight: '700', height: '100%', textAlign: 'left' }}
                >{album.title} - {album.artist.name}

                </Text>

            </View>
        </TouchableOpacity>
    );
};

const GenreItem = ({ genre, albumsByGenreId, navigation, callback }) => {
    return (
        <View
            style={{ marginVertical: 5, paddingHorizontal: 0 }}
        >
            <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => {
                    // callback(genre.id)
                }}
            >
                <Text style={{ fontSize: 18, textAlign: 'left', fontWeight: '500', color: 'gray', marginLeft: 8, marginTop: 16 }}>
                    Albums de genero {genre.name}</Text>
            </TouchableOpacity >
            <FlatList
                data={genre.albums.map(id => albumsByGenreId[id])}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => `${item.id}.${genre.id}`}
                renderItem={({ item }) => <AlbumItem album={item} navigation={navigation} />}
            />

        </View>
    );
};

const AlbumsHome = ({ isLoading, route, navigation, genresWithAlbums, albumsByGenreId, fetchAlbums, ...props }) => {

    useEffect(() => {
        fetchAlbums();
    }, []);
    return (
        <BaseLoaderView
            isLoading={isLoading}
            style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', alignContent: 'center' }}
        >
            <FlatList

                showsVerticalScrollIndicator={false}
                horizontal={false}
                data={genresWithAlbums}
                renderItem={({ item }) =>
                    <GenreItem navigation={navigation} genre={item} albumsByGenreId={albumsByGenreId} />
                }
                keyExtractor={item => item.id} />

        </BaseLoaderView>
    );
};
const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: selectors.getIsFetchingAlbums(state),
        genresWithAlbums: selectors.getGenresWithAlbums(state),
        albumsByGenreId: selectors.getAlbumsByGenreId(state),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchAlbums: () => {
        dispatch(actions.startFetchAlbumsByGenre());
    },
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AlbumsHome);

