// @flow
'use strict';

import type { Sequelize as SequelizeType, Model } from '../../shared/interfaces/sequelize';
import type { RxObservable } from '../../shared/interfaces/rx';

const Sequelize = require('sequelize');
const Rx = require('rxjs');

export default class Count {

  _count: Model;

  constructor (db: SequelizeType) {
    this._count = db.define('count', {
      data: Sequelize.JSONB
    });
    this._count.sync();
  }

  setInitialCount (): void {
    this._count.create({ data: { count: 0 } });
  }

  getCount (): RxObservable<number> {
    return Rx.Observable.from(this._count.findOne({}))
      .map(result => {
        if (result === null) {
          this.setInitialCount();
        }
        return result && result.getDataValue('data').count || 0;
      });
  }

  increment (): RxObservable<number> {
    return this.getCount()
      .mergeMap(result => Rx.Observable.from(this._count.update({
        data: { count: result + 1 }
      }, { where: {} })))
      .mergeMap(() => this.getCount());
  }
}
