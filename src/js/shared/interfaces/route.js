// @flow
'use strict';

import type { $Request, $Response } from 'express';

export interface Route {

}

export type RouteState = {
  req: $Request,
  res: $Response,
  template: string,
};
