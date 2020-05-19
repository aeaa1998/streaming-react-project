/* eslint-disable prettier/prettier */
import { schema } from 'normalizr';

export const genre = new schema.Entity('genre');
export const genres = new schema.Array(genre)