// @flow
'use strict';

import type { $Request, $Response } from 'express';

export interface APIRoute {

}

export type APIRouteState = {
  req: $Request,
  res: $Response,
  result: any,
};
