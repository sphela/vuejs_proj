// @flow
'use strict';

import type { Count } from './interfaces/db';

export default class DB {

  _count: Count;

  constructor (count: Count) {
    this._count = count;
  }

  get count (): Count {
    return this._count;
  }
}
