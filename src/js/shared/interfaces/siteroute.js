// @flow
'use strict';

import type { $Request, $Response } from 'express';

export interface SiteRoute {

}

export type SiteRouteState = {
  req: $Request,
  res: $Response,
  template: string,
};
