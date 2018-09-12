// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/router';
import store from './store/index';
import App from './App';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(VueRouter);

let router = new VueRouter({
    'linkActiveClass': 'active',
    routes
});

let app = new Vue({
    store,
    router: router,
    render: h => h(App)
}).$mount('#app');

export default app;
