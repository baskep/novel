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
        <Bookload v-show="isLoadShow"></Bookload>
        <Rankbooklist :bookdata="bookdata" v-show="isRankBarShow"></Rankbooklist>
        <Footer :index="3"></Footer>
        <Pageload v-show="isPageLoadingShow"></Pageload>
    </section>
</template>

<script>
import Rankbooklist from '../../components/Rankbooklist/Rankbooklist';
import Headerbar from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Pageload from '../../components/Pageload/Pageload';
import Bookload from '../../components/Bookload/Bookload';

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
        'Rankbooklist': Rankbooklist,
        'Footer': Footer,
        'Pageload': Pageload,
        'Bookload': Bookload
    }
};
</script>

<style lang="scss">
    @import './Rank.scss';
</style>
