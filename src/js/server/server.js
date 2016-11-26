// @flow
'use strict';

const Rx = require('rxjs');

import type { $Application, $Request, $Response } from 'express';
import type { RxObservable } from '../shared/interfaces/rx';
import type { ExpressRx } from '../shared/interfaces/server';

export default class Server {

  _server: $Application;
  _port: number;

  constructor (server: $Application, port: number, middlewares: Array<Object>) {
    this._server = server;
    this._port = port;

    for (let middleware of middlewares) {
      this._server.use(middleware);
    }
  }

  listen (): void {
    this._server.listen(this._port);
  }

  get (path: string): RxObservable<ExpressRx> {
    return Rx.Observable.create((observe) => {
      this._server.get(path, (req: $Request, res: $Response) => {
        observe.next({ req, res });
      });
    });
  }
}
