import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import About from '../../vue/about.vue';
import Counter from '../../vue/counter.vue';

const routes = [
  { path: '/', component: Counter },
  { path: '/about', component: About },
  { path: '*', redirect: '/' } // 404
];

export default new Router({
  mode: 'history',
  routes,
});
