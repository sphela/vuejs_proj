// @flow
'use strict';

const VueJs = require('vue');

import type { Vue } from './interfaces/vue';

export function createApp (): Vue {
  return new VueJs({
    template: '<div id="app">Hello {{ world }}!</div>',
    data: {
      world: 'Vue App World'
    },
  });
}
