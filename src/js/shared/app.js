'use strict';

const App = require('../../vue/app.vue');
const VueJs = require('vue');

export function createApp () {
  return new VueJs({ el: '#app',
    render: h => h(App)
  });
}
