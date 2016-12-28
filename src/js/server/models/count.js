// @flow
'use strict';

import type { Sequelize as SequelizeType, Model } from '../../shared/interfaces/sequelize';

const Sequelize = require('sequelize');

export default class Count {

  _count: Model;

  constructor (db: SequelizeType) {
    this._count = db.define('count', {
      data: Sequelize.JSONB
    });
    this._count.sync();
  }
}
