/* eslint-disable prettier/prettier */
import { schema } from 'normalizr';

export const track = new schema.Entity('track');
export const tracks = new schema.Array(track) 