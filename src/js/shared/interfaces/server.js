// @flow
'use strict';

import type { RxObservable } from './rx';
import type { $Request, $Response } from 'express';

export interface Server {
  listen(): void;
  get(path: string): RxObservable;
}

export type ExpressRx = {
  req: $Request,
  res: $Response,
};