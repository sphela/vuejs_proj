// @flow
'use strict';

import { appCreator } from '../shared/app';

import type { RxObservable } from '../shared/interfaces/rx';

const VueResource = require('vue-resource');
const Vuex = require('vuex');
const Vue = require('vue');
const Rx = require('rxjs');

function main (context) {
  Vue.use(VueResource);
  Vue.use(Vuex);

  const storeCreator = (): () => RxObservable<Object> => {
    return Rx.Observable.from([ new Vuex.Store({
      state: context.initialData,
      mutations: {
        setCount (state, n) {
          state.count = n;
        }
      },
      actions: {
        increment (context) {
          return new Promise(resolve => {
            Vue.http.post('/api/count').then(response => {
              console.log('count updated');
              context.commit('setCount', response.body);
              resolve();
            });
          });
        },
        getCount (context) {
          Vue.http.get('/api/count').then(response => {
            context.commit('setCount', response.body);
          });
        }
      }
    }) ]);
  };
  appCreator(storeCreator)().subscribe();
}

main(window);
