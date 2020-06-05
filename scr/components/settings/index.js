/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, View, FlatList, Image, Text, TouchableHighlight } from 'react-native';
import { createStackNavigator, TransitionPresets, TransitionSpecs, HeaderStyleInterpolators, Header } from '@react-navigation/stack';
import Profile from './Profile'
import ChangePassword from './ChangePassword'
import Settings from './Settings'
import Facts from './Facts'
import Track from '../tracks/Track'
import Playlists from '../playlist'
import Playlist from '../playlist/Playlist'
import AddPlaylist from '../playlist/AddPlaylist'
import Artist from '../artists/Artist'
import Album from '../albums/Album'
import FavoriteTracks from '../favorites/FavoriteTracks'
import FavoriteAlbums from '../favorites/FavoriteAlbums'
import FavoriteArtists from '../favorites/FavoriteArtists'

const Stack = createStackNavigator();

const SettingsStack = (props) => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsList"
            headerMode="float"
            screenOptions={{
                headerTransparent: true,
                gestureEnabled: true,
                headerTintColor: 'white',
                // headerStyle: { backgroundColor: 'rgb(53, 54, 58)' },
                // headerStyleInterpolator: HeaderStyleInterpolators.forStatic,
                ...TransitionPresets.SlideFromRightIOS,
            }}

        >
            <Stack.Screen name="SettingsList" component={Settings} options={{
                headerTransparent: true,
                title: '',
            }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: '', }} />
            <Stack.Screen name="Profile" component={Profile} options={{ title: '', }} />
            <Stack.Screen name="Facts" component={Facts}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen name="Playlists" component={Playlists}

                options={({ navigation, screenProps }) => ({
                    title: '',
                    headerTransparent: true,
                    headerRight: () => (
                        <TouchableHighlight
                            underlayColor={'rgba(52, 52, 52, 0.1)'}
                            style={{ height: 30, width: 30 }}
                            onPress={(p) => {
                                navigation.push('Add.Playlist')
                            }}
                        >
                            <Image
                                resizeMode="contain"
                                source={require('../../assets/images/edit_white.png')}
                                style={{
                                    width: 20,
                                    height: 30,
                                }} />
                        </TouchableHighlight>
                    ),
                })}
            />
            <Stack.Screen name="Playlist.Detail" component={Playlist}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen name="Add.Playlist" component={AddPlaylist}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen name="Favorite.Songs" component={FavoriteTracks}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen name="Track.Detail" component={Track}
                options={{
                    title: 'Detalle de la canción',
                }} />

            <Stack.Screen name="Favorite.Artists" component={FavoriteArtists}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen name="Artist.Detail" component={Artist}
                options={{
                    title: 'Detalle del artista',
                }} />
            <Stack.Screen name="Favorite.Albums" component={FavoriteAlbums}
                options={{
                    title: '',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen name="Album.Detail" component={Album}
                options={{
                    title: 'Detalle del album',
                    headerTransparent: true,
                }}
            />

        </Stack.Navigator>
    );
}
export default SettingsStack;

