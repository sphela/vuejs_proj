// @flow
'use strict';

export interface Sequelize {
  define(modelName: string, definition: Object): Model;
}

export interface Model {
  findOne(query: Object): Promise<any>;
  update(attributes: Object, query: Object): Promise<any>;
  create(attributes: Object): Promise<any>;
  sync(): void;
}
