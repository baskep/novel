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
import PageLoading from './PageLoading';

import api from './../api/api';

export default {
    name: 'catbar',
    data() {
        return {
            bookCategories: [],
            loadModules: [],
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
                    const transformName = {
                        'male': '男',
                        'female': '女',
                        'picture': '类型',
                        'press': '出版'
                    };
                    for (let item in data) {
                        let obj = {};
                        obj.type = transformName[item];
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
.cat-bar {
    margin-top: 60px;
    overflow: hidden;
    p {
        margin: 10px auto;
        width: 90%;
        font-size: 15px;
        font-family: '微软雅黑';
        color: #000;
    }
    li {
        float: left;
        padding: 10px 0;
        border-right: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        width: 33%;
        line-height: 1.6;
        text-align: center;
        p {
            padding: 3px;
            font-size: 16px;
        }
        span {
            font-size: 13px;
            color: #999;
        }
    }
    li:nth-child(1),
    li:nth-child(2),
    li:nth-child(3) {
        border-top: 1px solid #f0f0f0;
    }
    li:nth-child(3n+3) {
        border-right: none;
    }
}
.cat-bar:nth-child(2),
.cat-bar:nth-child(3),
.cat-bar:nth-child(4) {
    margin-top: 20px;
}

</style>
