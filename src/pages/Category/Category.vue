<template>
    <section>  
        <Headerbar></Headerbar>
        <section>
            <div class="cat-bar" v-for="item in bookCategories" :key="item.type">
                <p class="black">{{item.type}}</p>
                <ul>
                    <li v-for="category in item.categories" :Key="category.name">
                        <router-link :to="{ path: '/categorydetail', query: { gender: item.type, name: category.name }}">
                            <p>{{category.name}}</p>
                            <span class="deep-grap">
                                {{category.bookCount}}本
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </section>
        <Footer :index="2"></Footer>
        <Pageload v-show="isPageLoadingShow"></Pageload>
    </section>
</template>

<script>
import Headerbar from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Pageload from '../../components/Pageload/Pageload';

import api from '../../api/api';

import {mapMutations} from 'vuex';

export default {
    name: 'category',
    data() {
        return {
            bookCategories: [],
            loadModules: [],
            transformName: {
                'male': '男',
                'female': '女',
                'picture': '类型',
                'press': '出版'
            },
            isPageLoadingShow: true,
            isPageShow: false
        };
    },
    created() {
        this.SET_HEADTITLE('分类');
        this.getCategory();
    },
    methods: {
        ...mapMutations([
            'SET_HEADTITLE'
        ]),
        getCategory() {
            api.getCategory()
                .then(data => {
                    for (let item in data) {
                        let obj = {};
                        obj.type = this.transformName[item];
                        obj.categories = data[item];
                        this.bookCategories.push(obj);
                    }
                    this.bookCategories.splice(this.bookCategories.length - 1, 1);
                });
        }
    },
    components: {
        'Headerbar': Headerbar,
        'Pageload': Pageload,
        'Footer': Footer
    }
};
</script>

<style lang="scss">
    @import './Category.scss';
</style>
