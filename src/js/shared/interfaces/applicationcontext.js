// @flow
'use strict';

import type { DB } from './db';

export type ApplicationContext = {
  +db: DB,
};
