// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

import Bookshelf from './components/Bookshelf.vue';
import Featured from './components/Featured.vue';
import Classfication from './components/Cat.vue';
import Bookdetail from './components/Bookdetail.vue';
import Recommend from './components/Recommend.vue';
import Categorydetail from './components/Catgorydetail.vue';
import Rank from './components/Rank.vue';
import PageLoading from './components/PageLoading.vue';
import Search from './components/Search.vue';
import Searchresult from './components/Searchreuslt.vue';

// 安装 "VueRouter"这个插件
/* eslint-disable no-new */

Vue.use(VueRouter);

let routes = [{
        name: 'bookshelf',
        path: '/bookshelf',
        component: Bookshelf
    },
    {
        name: 'featured',
        path: '/featured',
        component: Featured
    },
    {
        name: 'classfication',
        path: '/classfication',
        component: Classfication
    },
    {
        name: 'bookdetail',
        path: '/bookdetail',
        component: Bookdetail
    },
    {
        name: 'recommend',
        path: '/recommend',
        component: Recommend
    },
    {
        name: 'categorydetail',
        path: '/categorydetail',
        component: Categorydetail
    },
    {
        name: 'rank',
        path: '/rank',
        component: Rank
    },
    {
        name: 'pageloading',
        path: '/pageloading',
        component: PageLoading
    },
    {
        name: 'search',
        path: '/search',
        component: Search
    },
    {
        name: 'searchresult',
        path: '/searchresult',
        component: Searchresult
    }
];

let router = new VueRouter({
    'linkActiveClass': 'active',
    routes // （缩写）相当于 routes: routes
});

let app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');

router.push('/bookshelf');

export default app;
