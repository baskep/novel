<template>
    <section class="rank">
        <Headerbar :headtitle="headtitle" :show="show" :sex="sex" v-on:changeSex="changeSex"></Headerbar>
        <div class="rank-bar">
            <ul>
                <li v-for="rankCategory in rankCategories" :key="rankCategory._id" 
                :class="{'rank-active': rankCategory._id === rankCategoryID}"
                @click="changeCategory(rankCategory._id)"
                >
                    <span>{{rankCategory.shortTitle}}</span>
                </li>
            </ul>
        </div>
        <load v-show="isLoadShow"></load>
        <Rankbar :ranBooks="rankBooks" v-show="isRankBarShow"></Rankbar>
        <Toobar :index="3"></Toobar>
        <PageLoading v-show="isPageLoadingShow"></PageLoading>
    </section>
</template>

<script>
import Headerbar from './Header';
import Rankbar from './Rankbar';
import Toobar from './Toobar';
import PageLoading from './PageLoading';
import Load from './Load';

import api from './../api/api';

export default {
    name: 'rank',
    data() {
        return {
            headtitle: '精选',
            show: true,
            sex: 'boy',
            rankCategoryID: '',
            rankCategories: [],
            rankBooks: [],
            isPageLoadingShow: true,
            isLoadShow: false,
            isRankBarShow: false
        };
    },
    created() {
        this.headtitle = '排行榜';
        this.getRanks();
    },
    watch: {
        rankCategoryID: function () {
            this.isLoadShow = true;
            this.isRankBarShow = false;
            api.getRankBooks(this.rankCategoryID)
                .then(data => {
                    this.rankBooks = data.ranking.books;
                    this.isLoadShow = false;
                    this.isRankBarShow = true;
                });
        }
    },
    methods: {
        getRanks: function () {
            api.getRanks()
                .then(data => {
                    this.rankCategories = this.sex === 'boy' ? data.male : data.female;
                    this.rankCategoryID = this.rankCategories[0]._id;
                    this.$nextTick(function() {
                        this.isPageLoadingShow = false;
                        this.isRankBarShow = true;
                    });
                });
        },
        changeSex: function (sex) {
            this.sex = sex;
            this.getRanks();
        },
        changeCategory: function(id) {
            this.rankCategoryID = id;
        }
    },
    components: {
        'Headerbar': Headerbar,
        'Rankbar': Rankbar,
        'Toobar': Toobar,
        'PageLoading': PageLoading,
        'Load': Load
    }
};
</script>

<style lang="scss">
.rank-bar {
    position: fixed;
    top: 40px;
    left: 0;
    bottom: 71px;
    width: 25%;
    background-color: #f6f7f9;
    li {
        width: 100%;
        text-align: center;
        span {
            display:inline-block;
            padding: 12px;
        }
    }
    .rank-active {
        background-color: #fff !important;
        border-left: 1px solid #ed424b;
    }
}
</style>
