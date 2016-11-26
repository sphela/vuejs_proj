// @flow
'use strict';

const Rx = require('rxjs');

import type { RxObservable } from '../shared/interfaces/rx';
import type { FS } from '../shared/interfaces/file';

export default class File {

  _contents: ?string;
  _fs: FS;
  _path: string;

  constructor (path: string, fs: FS) {
    this._fs = fs;
    this._path = path;
    this._contents = null;
  }

  get (): RxObservable<string> {
    if (this._contents !== null) {
      return Rx.Observable.of(this._contents);
    }

    return Rx.Observable.create(observer => {
      this._fs.readFile(this._path, (err, data) => {
        if (err) {
          observer.error(err);
          return;
        }

        const contents = data.toString('utf8');

        this._contents = contents;

        observer.next(contents);
      });
    });
  }
}
