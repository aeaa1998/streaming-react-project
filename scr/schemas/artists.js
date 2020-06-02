/* eslint-disable prettier/prettier */
import { schema } from 'normalizr';

export const artist = new schema.Entity('artist');
export const artists = new schema.Array(artist);

export const genreWithArtists = new schema.Entity('genreWithArtists', {
    artists: artists,
});

export const genresWithArtists = new schema.Array(genreWithArtists);
