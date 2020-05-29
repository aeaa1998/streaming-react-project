
import * as actions from '../actions/albums';
import * as selectors from '../reducers';
import * as types from '../types/albums';
import { albums as albumsSchema, album as albumSchema, genresWithAlbums } from '../schemas/albums';
import { create, deleteAction, list, handleResponse, retrieve} from '../components/utils/Api'
import { Platform , Toast, ToastAndroid } from 'react-native'
import {call, delay, put, select, takeEvery} from 'redux-saga/effects';
import {normalize} from 'normalizr'


//SAGA DE FETCHALBUMS

function* fetchAlbums(action) {
    const errorMsg = 'Error al cargar los albums'
    try {
        const onSuccess = function* (data, code) {
            const { entities: albums, result: order } = normalize(data, albumsSchema)
            yield put(actions.completeFetchAlbums({ entities: albums, result: order }));
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedFetchAlbums());
        }
        yield handleResponse(list, 'albums', onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedFetchAlbums());
    }
}
const watchFetchAlbums = function* () {
    yield takeEvery(
        types.FETCH_ALBUMS_STARTED,
        fetchAlbums,
    );
};



//SAGA DE FETCHALBUMSBYGENRE
function* fetchAlbumsByGenre(action){
	const errorMsg = 'Error al cargar los artistas x Genero'
    try {
        const onSuccess = function* (data, code) {
            yield put(actions.completeFetchAlbumsByGenre(normalize(data, genresWithAlbums)));
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedFetchAlbumsByGenre());
        }
        yield handleResponse(list, 'albums/by/genres', onSuccess, onError)
    } catch (error) {
        ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        yield put(actions.failedFetchAlbumsByGenre());
    }

}

const watchFetchAlbumsByGenre = function* () {
	yield takeEvery (
		types.FETCH_ALBUMS_BY_GENRE_STARTED,
		fetchAlbumsByGenre,
		);

};

//SAGA DE FETCHSELECTEDALBUM
function* fetchSelectedAlbum(action) {
	const errorMsg= "No se pudo cargar este Album";
	try{
		const onSuccess = function* (album, code) {
            yield put(actions.completeFetchSelectedAlbums(album));
        }
        const onError = function* (response) {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
            yield put(actions.failedFetchSelectedAlbums());
        }
        yield handleResponse(retrieve, { url : 'albums', id : action.payload.albumId}, onSuccess, onError)

	} catch(error){
		ToastAndroid.show(errorMsg, ToastAndroid.LONG);
		yield put(actions.failedFetchSelectedAlbum())

	}

}


const watchFetchSelectedAlbum = function* (){
	yield takeEvery(
		types.FETCH_SELECTED_ALBUM_STARTED,
		fetchSelectedAlbum,
		);

}


//SAGA PRINCIPAL
export const watchers = [
	watchFetchAlbums,
	watchFetchAlbumsByGenre,
	watchFetchSelectedAlbum,

];