// @flow
'use strict';

const App = require('../../vue/app.vue');
const VueJs = require('vue');

import type { AppContext } from '../shared/interfaces/appcontext';

export function createApp (appContext: ?AppContext) {
  // Global mixin, all components will have access to these properties.
  VueJs.mixin({
    created: function () {
      this.appContext = appContext;
    }
  });

  const el = '#app';
  const render = h => h(App);

  return new VueJs({ el, render });
}
