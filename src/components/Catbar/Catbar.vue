<template>
    <div>
        <div>
            <div class="cat-bar" v-for="item in bookCategories" :key="item.type">
                <p>{{item.type}}</p>
                <ul>
                    <li v-for="category in item.categories" :Key="category.name">
                        <router-link :to="{ path: '/categorydetail', query: {gender: item.type, name: category.name}}">
                            <p>{{category.name}}</p>
                            <span>
                                {{category.bookCount}}本
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <PageLoading v-show="isPageLoadingShow"></PageLoading>
    </div>
</template>

<script>
import PageLoading from '../PageLoading/PageLoading';

import api from '../../api/api';

export default {
    name: 'catbar',
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
        this.getCategory();
    },
    methods: {
        getCategory: function() {
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
        'PageLoading': PageLoading
    }
};
</script>

<style lang="scss">
@import './Catbar.scss';
</style>
