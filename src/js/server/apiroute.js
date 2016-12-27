// @flow
'use string';

const Rx = require('rxjs');

import { httpStatus } from './server';

import type { RxObservable, RxObserve } from '../shared/interfaces/rx';
import type { APIRouteState } from '../shared/interfaces/apiroute';
import type { Server, ExpressRx } from '../shared/interfaces/server';

export default class ApiRoute {

  count ({ req, res }: ExpressRx): RxObservable<APIRouteState> {
    return Rx.Observable.create((observe: RxObserve<APIRouteState>) => {
      const result = 0;
      observe.next({ req, res, result });
    });
  }

  getCount (server: Server, path: string): RxObservable<APIRouteState> {
    return server.get(path)
      .mergeMap((msg: ExpressRx) => this.count(msg))
      .share();
  }

  send ({ res, result }: APIRouteState) {
    res.status(httpStatus.OK).send(JSON.stringify(result));
  }
}
