/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import { View, FlatList, SectionList, StyleSheet, Dimensions, Text, ImageBackground, Image, ActivityIndicator } from 'react-native';
import BaseLoaderView from '../utils/containers/Bases/BaseLoaderView';
import { imageHeaderStyle } from '../../styles/images';
import { connect } from 'react-redux';
import * as actions from '../../actions/artists';
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
const getRandomColor = (seeder) => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(seeder * 16)];
    }
    return color;
};
const ArtistItem = ({ artist, navigation }) => {

    return (
        <TouchableOpacity
            style={{
                height: 210,
                width: 200,
                marginVertical: 5,
                flexDirection: 'column',
            }}
            onPress={() => {
                navigation.navigate('Artist.Detail'
                    , {
                        artistId: artist.id,
                    });
            }}
        >
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Image
                    source={{ uri: `https://picsum.photos/seed/${artist.name}/400` }}
                    style={{
                        flex: 1,
                        margin: 5,
                        padding: 5,
                        borderRadius: 5,
                    }}
                />
                <Text
                    style={{ flex: 0.1, color: 'black', fontSize: 13, paddingHorizontal: 10, fontWeight: '700', height: '100%', textAlign: 'left' }}
                >{artist.name}

                </Text>
            </View>
        </TouchableOpacity>
    );
};

const GenreItem = ({ genre, artistsByGenreId, navigation, callback }) => {
    return (
        <View
            style={{ marginVertical: 15, paddingHorizontal: 10 }}
        >
            <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => {
                    // callback(genre.id)
                }}
            >
                <Text style={{ width: '100%', fontSize: 18, textAlign: 'center', fontWeight: '100', color: 'teal' }}> Artistas de {genre.name}</Text>
            </TouchableOpacity >
            <FlatList
                data={genre.artists.map(id => artistsByGenreId[id])}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => `${item.name}.${genre.name}`}
                renderItem={({ item }) => <ArtistItem artist={item} navigation={navigation} />}
            />

        </View>
    );
};

const ArtistsHome = ({ isLoading, route, navigation, genresWithArtists, artistsByGenreId, fetchArtists, ...props }) => {

    useEffect(() => {
        fetchArtists();
    }, []);
    return (
        <BaseLoaderView
            isLoading={isLoading}
            style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', alignContent: 'center' }}
        >
            <FlatList

                showsVerticalScrollIndicator={false}
                horizontal={false}
                data={genresWithArtists}
                renderItem={({ item }) =>
                    <GenreItem navigation={navigation} genre={item} artistsByGenreId={artistsByGenreId} />
                }
                keyExtractor={item => item.id} />

        </BaseLoaderView>
    );
};
const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: selectors.getIsFetchingArtists(state),
        genresWithArtists: selectors.getGenresWithArtists(state),
        artistsByGenreId: selectors.getArtistsByGenreId(state),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchArtists: () => {
        dispatch(actions.startFetchArtistsByGenre());
    },
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ArtistsHome);

