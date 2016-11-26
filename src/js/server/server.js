// @flow
'use strict';

const Rx = require('rxjs');

import type { $Application, $Request, $Response } from 'express';
import type { RxObservable } from '../shared/interfaces/rx';
import type { ExpressRx } from '../shared/interfaces/server';
import type { File } from '../shared/interfaces/file';

export default class Server {

  _server: $Application;
  _port: number;
  _file: File;

  constructor (server: $Application, port: number, middlewares: Array<Object>, file: File) {
    this._server = server;
    this._port = port;
    this._file = file;

    for (let middleware of middlewares) {
      this._server.use(middleware);
    }
  }

  listen (): void {
    this._server.listen(this._port);
  }

  get (path: string, templatePath: string): RxObservable<ExpressRx> {
    return this._file.get(templatePath)
    .mergeMap((template) => Rx.Observable.create((observe) => {
      this._server.get(path, (req: $Request, res: $Response) => {
        observe.next({ req, res, template });
      });
    }));
  }
}
