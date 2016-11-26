// @flow
'use strict';

const Rx =  require('rxjs');

import type { $Application } from 'express';
import type { Config } from '../shared/interfaces/config';
import type { RxObservable } from '../shared/interfaces/rx';
import type { ExpressRx } from '../shared/interfaces/server';

export default class Server {

  _server: Server;
  _port: number;

  constructor (server: $Application, port: number) {
    this._server = server;
    this._port = port
  }

  listen (): RxObservable {
    this._server.listen(this._port);
  }

  get (path: string): RxObservable<ExpressRx> {
    return Rx.Observable.create((observe) => {
      this._server.get(path, (req, res) => {
        observe.next({ req, res });
      });
    });
  }
}