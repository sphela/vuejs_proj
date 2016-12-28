// @flow
'use strict';

import type { RxObservable } from './rx';

export interface Count {
  getCount(): RxObservable<number>;
  increment(): RxObservable<number>;
}
