/* eslint-disable prettier/prettier */
import { schema } from 'normalizr';

export const favorite = new schema.Entity('favorite');
export const favorites = new schema.Array(favorite)