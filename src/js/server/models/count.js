// @flow
'use strict';

import type { Sequelize } from '../../shared/interfaces/sequelize';

export default class Count {

  _db: Sequelize;

  constructor (db: Sequelize) {
    this._db = db;
  }
}
