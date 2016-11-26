// @flow
'use strict';

import type { RxObservable } from './rx';
import type { VueServerRenderer } from './vue';
import type { $Request, $Response } from 'express';

export interface Server {
  listen(): void;
  get(path: string): RxObservable<ExpressRx>;
}

export type ExpressRx = {
  req: $Request,
  res: $Response,
  renderer: VueServerRenderer,
};
