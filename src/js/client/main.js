// @flow
'use strict';

import { createApp } from '../shared/app';

const VueResource = require('vue-resource');

const Vue = require('vue');

function main () {
  Vue.use(VueResource);
  createApp(Vue);
}

main();
