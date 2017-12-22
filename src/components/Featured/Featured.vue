<template>
    <div class="featured">
        <Headerbar :headtitle="headtitle" :show="show" :sex="sex" v-on:changeSex="changeSex"></Headerbar>
        <div class="featured-books" v-show="isPageShow">
            <section class="swiper-banner">
                <swiper :options="swiperOption">
                    <swiper-slide class="native" v-for="slide in swiperSlides" :key="slide._id" >
                        <img :src="slide.img" >
                    </swiper-slide>
                </swiper>
            </section>
    
            <section class="book-info" v-for="module in modules" v-if="module.type === 0" :key="module._id">
                <div class="book-head">
                    <h2 class="book-title">{{ module.title }}</h2>
                    <router-link class="book-more" :to="{ path: 'Recommend', query: {moduleid: module._id, backbarTitle: module.title} }">
                        更多 >>
                    </router-link>
                </div>
                <Booklist :bookInfo="{ id: module._id }" :bookdata="bookdata" @load-result="loadResult"></Booklist>
            </section>
        </div>
        <Toobar :index="1"></Toobar>
        <PageLoading v-show="isPageLoadingShow"></PageLoading>
    </div>
</template>

<script>
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper';

import Headerbar from '../Header/Header';
import Booklist from '../Booklist/Booklist';
import Toobar from '../Toobar/Toobar';
import PageLoading from '../PageLoading/PageLoading';

import api from '../../api/api';

export default {
    name: 'featured',
    data() {
        return {
            headtitle: '精选',
            show: true,
            sex: 'boy',
            bookdata: [],
            isPageLoadingShow: true,
            isPageShow: false,
            loadModules: [],
            modules: [],
            swiperSlides: [],
            swiperOption: {
            pagination: '.swiper-pagination',
            notNextTick: true,
            initialSlide: 0,
            autoplay: 5000,
            grabCursor: true,
            setWrapperSize: true,
            paginationClickable: true
            }
        };
    },
    watch: {
        loadModules: function () {
            if (this.loadModules.length === 0) {
                this.isPageLoadingShow = false;
                this.isPageShow = true;
            }
        }
    },
    created() {
        this.getSwiperPictures();
        this.getModules();
    },
    methods: {
        getSwiperPictures: function() {
            api.getSwiperPictures()
                .then(data => {
                    this.swiperSlides = data;
                });
        },
        getModules: function() {
            api.getFeaturedData()
                .then(data => {
                    data = Array.from(data).sort((a, b) => {
                        return a.order - b.order;
                    });
                    let sexOrder = this.sex === 'boy' ? [2, 5, 7, 9] : [1, 4, 6, 8];
                    data = data.filter((obj) => {
                        return sexOrder.includes(obj.order) && obj.type === 0;
                    });
                    this.modules = data;
                    this.loadModules = Array.from(data, value => value._id);
            });
        },
        changeSex: function(sex) {
            this.isPageLoadingShow = true;
            this.isPageShow = false;
            this.sex = sex;
            this.getModules();
        },
        loadResult: function (id) {
            this.loadModules.splice(this.loadModules.indexOf(id), 1);
        }
    },
    components: {
        'Headerbar': Headerbar,
        'Booklist': Booklist,
        'Toobar': Toobar,
        'PageLoading': PageLoading,
        swiper,
        swiperSlide
    }
  };
</script>

<style lang="scss">
@import '../../../node_modules/vue-awesome-swiper/node_modules/swiper/dist/css/swiper.min.css';
@import './Featured.scss';
</style>
