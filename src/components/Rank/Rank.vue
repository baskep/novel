<template>
    <section class="rank">
        <Headerbar :show="show" :sex="sex" v-on:changeSex="changeSex"></Headerbar>
        <section class="rank-bar">
            <ul>
                <li v-for="rankCategory in rankCategories" :key="rankCategory._id" 
                :class="{'rank-active': rankCategory._id === rankCategoryID}"
                @click="changeCategory(rankCategory._id)"
                >
                    <span>{{rankCategory.shortTitle}}</span>
                </li>
            </ul>
        </section>
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

import {mapMutations} from 'vuex';

export default {
    name: 'rank',
    data() {
        return {
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
        this.SET_HEADTITLE('排行榜');
        this.getRanks();
    },
    watch: {
        rankCategoryID() {
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
        ...mapMutations([
            'SET_HEADTITLE'
        ]),
        getRanks() {
            api.getRanks()
                .then(data => {
                    this.rankCategories = this.sex === 'boy' ? data.male : data.female;
                    this.rankCategoryID = this.rankCategories[0]._id;
                    this.$nextTick(() => {
                        this.isPageLoadingShow = false;
                        this.isRankBarShow = true;
                    });
                });
        },
        changeSex(sex) {
            this.sex = sex;
            this.getRanks();
        },
        changeCategory(id) {
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
