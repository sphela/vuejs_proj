// @flow
'use strict';

export interface RxObservable<T> {
  mergeMap(observable: (x: T) => RxObservable<any>): RxObservable<any>;
  subscribe(cb: (x: T) => void): void;
}
