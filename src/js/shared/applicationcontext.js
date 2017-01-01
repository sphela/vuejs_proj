// @flow
'use strict';

import type { DB } from './interfaces/db';

export default class ApplicationContext {

  _db: DB;

  constructor (db: DB) {
    this._db = db;
  }

  get db (): DB {
    return this._db;
  }
}
