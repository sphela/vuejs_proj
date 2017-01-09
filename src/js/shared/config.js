// @flow
'use strict';

export const SERVER_PORT: number = parseInt(process.env.SERVER_PORT, 10) || 8000;

export const POSTGRES_URI: string = process.env.POSTGRES_URI || 'db';
export const POSTGRES_PORT: number = parseInt(process.env.POSTGRES_PORT) || 5432;
export const POSTGRES_DB_NAME: string = process.env.POSTGRES_DB_NAME || 'sphela';
export const POSTGRES_USERNAME: string = process.env.POSTGRES_USERNAME || 'sphela';
export const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD || '';
