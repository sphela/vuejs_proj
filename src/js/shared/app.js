// @flow
'use strict';

const App = require('../../vue/app.vue');
const VueJs = require('vue');

import type { RxObservable } from '../shared/interfaces/rx';
import type { Vue } from '../shared/interfaces/vue';

export function appCreator (storeCreator: () => RxObservable<Object>): () => RxObservable<Vue> {
  return () => {
    const el = '#app';
    const render = h => h(App);

    return storeCreator()
    .map(store => new VueJs({ el, render, store }));
  };
}
