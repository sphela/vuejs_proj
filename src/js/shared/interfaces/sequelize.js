// @flow
'use strict';

export interface Sequelize {
  define(modelName: string, definition: Object): Model;
}

export interface Model {
  sync(): void;
}
