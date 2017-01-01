// @flow
'use strict';

const Rx = require('rxjs');

import { httpStatus } from './server';

import type { RxObservable, RxObserve } from '../shared/interfaces/rx';
import type { APIRouteState } from '../shared/interfaces/apiroute';
import type { Server, ExpressRx } from '../shared/interfaces/server';
import type { ApplicationContext } from '../shared/interfaces/applicationcontext';

export default class ApiRoute {

  _context: ApplicationContext;

  constructor (context: ApplicationContext) {
    this._context = context;
  }

  count ({ req, res }: ExpressRx): RxObservable<APIRouteState> {
    return this._context.db.count.getCount()
    .mergeMap(result => Rx.Observable.create((observe: RxObserve<APIRouteState>) => {
      observe.next({ req, res, result });
    }));
  }

  getCount (server: Server, path: string): RxObservable<APIRouteState> {
    return server.get(path)
    .mergeMap((msg: ExpressRx) => this.count(msg))
    .share();
  }

  setCount ({ req, res }: ExpressRx): RxObservable<APIRouteState> {
    return this._context.db.count.increment()
    .mergeMap(result => Rx.Observable.create((observe: RxObserve<APIRouteState>) => {
      observe.next({ req, res, result });
    }));
  }

  postCount (server: Server, path: string): RxObservable<APIRouteState> {
    return server.post(path)
    .mergeMap((msg: ExpressRx) => this.setCount(msg))
    .share();
  }

  send ({ res, result }: APIRouteState) {
    res.status(httpStatus.OK).send(JSON.stringify(result));
  }
}
