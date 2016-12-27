// @flow
'use strict';

const Rx = require('rxjs');

import type { $Application, $Request, $Response } from 'express';
import type { RxObserve, RxObservable } from '../shared/interfaces/rx';
import type { ExpressRx } from '../shared/interfaces/server';
import type { VueServerRendererCreator, VueServerRenderer } from '../shared/interfaces/vue';

export const httpStatus = {
  OK: 200,
};

export default class Server {

  _server: $Application;
  _port: number;
  _renderer: VueServerRenderer;

  constructor (server: $Application, port: number, middleware: Array<Array<any>>, rendererCreator: VueServerRendererCreator) {
    this._server = server;
    this._port = port;
    this._renderer = rendererCreator.createRenderer();

    for (let middlewareArgs of middleware) {
      this._server.use(...middlewareArgs);
    }
  }

  listen (): void {
    this._server.listen(this._port);
  }

  get (path: string): RxObservable<ExpressRx> {
    return Rx.Observable.create((observe: RxObserve<ExpressRx>) => {
      this._server.get(path, (req: $Request, res: $Response) => {
        observe.next({ req, res, renderer: this._renderer });
      });
    });
  }

  post (path: string): RxObservable<ExpressRx> {
    return Rx.Observable.create((observe: RxObserve<ExpressRx>) => {
      this._server.post(path, (req: $Request, res: $Response) => {
        observe.next({ req, res, renderer: this._renderer });
      });
    });
  }

}
