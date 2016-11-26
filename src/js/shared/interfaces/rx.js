// @flow
'use strict';

export interface RxObservable<T> {
  subscribe(cb: (x: T) => void): void;
}