/* eslint-disable prettier/prettier */
import { schema } from 'normalizr';

export const playlist = new schema.Entity('playlist');
export const playlists = new schema.Array(playlist)