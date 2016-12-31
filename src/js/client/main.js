// @flow
'use strict';

import { createApp } from '../shared/app';

const VueResource = require('vue-resource');
const Vuex = require('vuex');
const Vue = require('vue');

function main () {
  Vue.use(VueResource);
  Vue.use(Vuex);

  const store = new Vuex.Store({
    state: {
      count: 0
    },
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
  });

  createApp(Vue, store);
}

main();
