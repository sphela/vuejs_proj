// @flow
'use strict';

import router from './router';

import type { RxObservable } from '../shared/interfaces/rx';
import type { Vue } from '../shared/interfaces/vue';

const App = require('../../vue/app.vue');
const VueJs = require('vue');

export function appCreator (storeCreator: () => RxObservable<Object>): () => RxObservable<Vue> {
  return (url?: string) => {
    const el = '#app';
    const render = h => h(App);

    const appSource = storeCreator()
    .map(store => new VueJs({ el, render, router, store }))
    .share();

    if (url) {
      appSource.subscribe(app => {
        app.$router.push(url);
      });
    }

    return appSource;
  };
}
