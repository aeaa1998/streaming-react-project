/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Dimensions, View, FlatList, StyleSheet, Text, TouchableHighlight, ImageBackground, Image } from 'react-native';
import BaseLoaderView from '../utils/containers/Bases/BaseLoaderView';
import { elevation } from '../../styles/shadows';
import * as selectors from '../../reducers';
import { connect } from 'react-redux';
// import * as actions from '../../actions/auth'
import { imageHeader } from '../../styles/images';


const AlbumRow = ({ album, navigation, props }) => {
    return (<TouchableHighlight
        underlayColor="rgba(52, 52, 52, 0.2)"
        style={{ paddingHorizontal: 5, height: 60, paddingVertical: 5, flexDirection: 'row', marginVertical: 5, borderBottomWidth: 0.3 }}
        onPress={() => {
            navigation.navigate('Album.Detail', {
                albumId: album.id,
            });
        }}
    >
        <>
            <Image
                resizeMode="contain"
                source={{ uri: `https://picsum.photos/seed/${album.title}/40` }}
                style={{
                    flex: 0.2,
                }}
            />
            <View style={{ flex: 0.8 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>{album.title}</Text>
            </View>
        </>
    </TouchableHighlight>);
};


const FavoriteAlbums = ({ isLoading, favoriteAlbums, profile, navigation, ...props }) => {
    const onPageLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setParentSize(height);
        setsquareImageSize(height * 0.7);
    };
    const { height, width } = Dimensions.get('window');
    const [parentSize, setParentSize] = useState(100);
    const [squareImage, setsquareImageSize] = useState(100);
    return (
        <BaseLoaderView
            isLoading={isLoading}
            childrenView={() => (
                <View>
                    <FlatList
                        ListHeaderComponent={() => (<>
                            <ImageBackground
                                source={{ uri: 'https://f4.bcbits.com/img/0015978885_10.jpg' }}
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
                                />
                            </ImageBackground>
                            <Text style={{ marginTop: (squareImage / 2) + 30, fontSize: 20, marginBottom: 4, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
                                Albums favoritos
                            </Text>
                            <Text style={{ fontSize: 18, marginBottom: 4, width: '100%', textAlign: 'center' }}>
                                {profile.user.first_name} {profile.user.last_name}
                            </Text>
                        </>)}
                        data={favoriteAlbums}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <AlbumRow album={item} navigation={navigation} />
                        }
                        keyExtractor={item => item.id}
                    />

                </View>
            )}
        />
    );
};
const styles = StyleSheet.create(
    {
        imageHeader: { ...imageHeader },
        profilePicElevation: elevation['12'],
        modalView: {
            height: 150, width: '80%', backgroundColor: 'white', padding: 10,
        },
    }
);

function mapStateToProps(state) {
    return {
        favoriteAlbums: selectors.getFavoritesFilteredByType(state, 'AlbumFavorite').map(favorite => favorite.album),
        isLoading: selectors.getIsFetchingFavorites(state),
        profile: selectors.getUserProfile(state),
    };
}

export default connect(
    mapStateToProps,
    undefined,
)(FavoriteAlbums);

