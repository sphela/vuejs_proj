// @flow
'use strict';

export interface RxObservable<T> {
  mergeMap(observable: (x: T) => RxObservable<any>): RxObservable<any>;
  subscribe(cb?: (x: T) => void): void;
  do(cb: (x: T) => void): RxObservable<T>;
  share(): RxObservable<T>;
  map(cb: (x: T) => any): RxObservable<any>;
}

export interface RxObserve<T> {
  error(e: any): void;
  next(x: T): void;
}
