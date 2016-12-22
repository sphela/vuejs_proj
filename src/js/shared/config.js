// @flow
'use strict';

export const SERVER_PORT: number = parseInt(process.env.SERVER_PORT, 10) || 8000;

export const STATIC_ROOT: string = process.env.STATIC_ROOT || '';
