/* eslint-disable prettier/prettier */
import { schema } from 'normalizr';
import { tracks } from './tracks'
export const playlist = new schema.Entity('playlist');
export const playlists = new schema.Array(playlist)

export const playlistWithTrack = new schema.Entity('playlistWithTrack', {
    tracks: tracks,
});
export const playlistWithTracks = new schema.Array(playlistWithTrack)
