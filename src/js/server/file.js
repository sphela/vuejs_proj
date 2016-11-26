// @flow
'use strict';

const Rx = require('rxjs');

import type { RxObservable } from '../shared/interfaces/rx';
import type { FS } from '../shared/interfaces/file';

export default class File {

  _files: Object;
  _fs: FS;

  constructor (fs: FS) {
    this._fs = fs;
    this._files = {};
  }

  get (path: string): RxObservable<string> {
    if (this._files.hasOwnProperty(path)) {
      return Rx.Observable.of(this._files[path]);
    }

    return Rx.Observable.create(observer => {
      this._fs.readFile(path, (err, data) => {
        if (err) {
          observer.error(err);
          return;
        }

        const contents = data.toString('utf8');

        this._files[path] = contents;

        observer.next(contents);
      });
    });
  }
}
