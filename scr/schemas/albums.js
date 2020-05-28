/* eslint-disable prettier/prettier */
import { schema } from 'normalizr';

export const album = new schema.Entity('album');
export const albums = new schema.Array(album);

export const genreWithAlbums = new schema.Entity(
	'genreWithAlbums', {
    albums: albums,
	}
);
export const genresWithAlbums = new schema.Array(genreWithAlbums);
