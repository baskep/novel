<template>
    <section class="rank">
        <Headerbar :headTitle="headTitle" :show="show" :sex="sex" v-on:changeSex="changeSex"></Headerbar>
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
        <Rankbar :bookdata="bookdata" v-show="isRankBarShow"></Rankbar>
        <Toobar :index="3"></Toobar>
        <PageLoading v-show="isPageLoadingShow"></PageLoading>
    </section>
</template>

<script>
import Headerbar from '../Header/Header';
import Rankbar from '../Rankbar/Rankbar';
import Toobar from '../Toobar/Toobar';
import PageLoading from '../PageLoading/PageLoading';
import Load from '../Load/Load';

import api from '../../api/api';

export default {
    name: 'rank',
    data() {
        return {
            headTitle: '排行榜',
            show: true,
            sex: 'boy',
            rankCategoryID: '',
            rankCategories: [],
            bookdata: [],
            isPageLoadingShow: true,
            isLoadShow: false,
            isRankBarShow: false
        };
    },
    created() {
        this.getRanks();
    },
    watch: {
        rankCategoryID: function () {
            this.isLoadShow = true;
            this.isRankBarShow = false;
            api.getRankBooks(this.rankCategoryID)
                .then(data => {
                    this.bookdata = data.ranking.books;
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
@import './Rank.scss';
</style>
