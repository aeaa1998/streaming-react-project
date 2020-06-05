/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import { View, FlatList, SectionList, StyleSheet, Dimensions, Text, ImageBackground, Image, ActivityIndicator } from 'react-native';
import BaseLoaderView from '../utils/containers/Bases/BaseLoaderView';
import { imageHeaderStyle } from '../../styles/images';
import { connect } from 'react-redux';
import * as actions from '../../actions/tracks'
import * as genresActions from '../../actions/genres'
import ImageHeader from '../utils/containers/Headers/ImageHeader';
import * as selectors from '../../reducers'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const styles = StyleSheet.create({
    imageHeader: imageHeaderStyle,
});
const headerGenre = {
    id: 0,
    name: 'Todos'
}
const { width, height } = Dimensions.get('window')
const getRandomColor = (seeder) => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(seeder * 16)];
    }
    return color;
}
const COLORS = ['#ff0000', '#ffed00', '#00c7f2', '#ffaaaa', '#c1f1fc']
const GenreItem = ({ genre, isSelected, navigation, callback }) => {
    return (
        <TouchableOpacity
            disabled={isSelected}
            style={{
                height: height * 0.12,
                alignSelf: 'center',
                width: width * 0.40,
                marginHorizontal: 5,
                marginVertical: 10,
                backgroundColor: isSelected ? 'gray' : COLORS[genre.id % 5],
                borderRadius: 10,
            }}
            onPress={() => {
                callback(genre.id)
            }}
        >
            <Text
                style={{ color: 'white', fontSize: 20, paddingHorizontal: 10, fontWeight: '700', height: '100%', textAlign: 'center', textAlignVertical: 'center' }}
            >{genre.name}</Text>
        </TouchableOpacity >
    );
}

const SongItem = ({ song, navigation }) => {
    return (
        <TouchableOpacity
            style={{
                height: width * 0.7,
                width: width * 0.5,
                flexDirection: 'column',
                borderRadius: 5,
            }}
            onPress={() => {
                navigation.push('Tracks.Detail'
                    , {
                        trackId: song.id,
                    });
            }}
        >
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Image
                    source={{ uri: `https://picsum.photos/seed/${song.name}/400` }}
                    style={{
                        flex: 1,
                        margin: 5,
                        padding: 5,
                        borderRadius: 5,
                    }}
                />
                <Text
                    style={{ flex: 0.1, color: 'black', fontSize: 13, paddingHorizontal: 10, fontWeight: '700', height: '100%', textAlign: 'left' }}
                >{song.name}

                </Text>
                <Text
                    style={{ flex: 0.1, color: 'black', fontSize: 10, paddingHorizontal: 10, fontWeight: '700', height: '100%', textAlign: 'left' }}
                >Artista: {song.album.artist.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
const header = (title) => (
    <View style={{ paddingVertical: 10 }}>
        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 18, marginTop: 20, textAlign: 'left', fontWeight: '100', color: 'gray' }}>{title}</Text>
    </View>
)
const TracksHome = ({ isLoadingTracks, isLoadingGenres, tracks, genres = [], route, navigation, tracksByGenre, isLoadingTracksByGenre, ...props }) => {
    const [selectedGenre, setGenreId] = useState(0)
    const [title, setTitle] = useState('Canciones')
    const [loadingRows, setLoadingRows] = useState(true)
    const changeLoadingRows = () => setTimeout(() => { setLoadingRows(false) }, 1200)
    useEffect(() => {
        props.fetchGenres()
        props.fetchTracks(selectedGenre)
    }, []);
    return (
        <BaseLoaderView
            isLoading={isLoadingTracks && isLoadingGenres}
            fetchCorrectly={tracks != undefined}
            style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', alignContent: 'center' }}
        >


            <FlatList
                ListHeaderComponent={
                    () => {
                        return (<>
                            <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 18, marginTop: 20, textAlign: 'left', fontWeight: '100', color: 'gray' }}>Géneros</Text>
                            <FlatList
                                ListHeaderComponent={() => <GenreItem genre={headerGenre} navigation={navigation} isSelected={selectedGenre == headerGenre.id} callback={(genre) => {
                                    props.fetchTracks(genre)
                                    setGenreId(genre)
                                    setTitle('Canciones')
                                    setLoadingRows(true)
                                }} />}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                data={genres}
                                style={{ paddingLeft: 5 }}
                                renderItem={({ item }) =>
                                    <GenreItem genre={item} navigation={navigation} isSelected={selectedGenre == item.id} callback={(genre) => {
                                        props.fetchTracks(genre)
                                        setGenreId(genre)
                                        setTitle('Canciones filtradas por genero')
                                        setLoadingRows(true)
                                    }} />
                                }
                                keyExtractor={item => item.id.toString()} />
                            {header(title)}
                        </>)
                    }
                }
                showsVerticalScrollIndicator={false}
                data={isLoadingTracks || loadingRows ? [1] : (selectedGenre == 0 ? tracks : tracksByGenre)}
                numColumns={2}
                horizontal={false}
                onEndReached={changeLoadingRows}
                refreshing={isLoadingTracks}
                renderItem={({ item }) =>
                    isLoadingTracks || loadingRows ?
                        <ActivityIndicator
                            style={{ alignSelf: 'center', width: '100%', height: 200 }}
                            size={'large'} />
                        : <SongItem navigation={navigation} song={item} />}
                keyExtractor={item => item.id}
            />
            {/* </BaseLoaderView> */}
            {/* </View> */}
        </BaseLoaderView>
    );
};
const mapStateToProps = (state, ownProps) => {
    const { selectedGenre, title } = ownProps.route.params
    return {
        isLoadingTracks: selectors.getIsFetchingTracks(state),
        tracks: selectors.getTracks(state),
        tracksByGenre: selectors.getTracksByGenre(state),
        isLoadingGenres: selectors.getIsFetchingGenres(state),
        genres: selectors.getGenres(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchTracks: (genre) => {
        if (genre != 0) {
            dispatch(actions.startFetchTracksByGenre(genre))
        } else {
            dispatch(actions.startFetchTracks())
        }
    },
    fetchGenres: () => {
        dispatch(genresActions.startFetchGenres())
    },
})
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TracksHome);

