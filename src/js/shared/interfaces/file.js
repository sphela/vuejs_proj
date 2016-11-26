// @flow
'use strict';

import { RxObservable } from './rx';

export interface FS {
  readFile(path: string, cb: Function): void;
}

export interface File {
  get(): RxObservable<string>;
}
