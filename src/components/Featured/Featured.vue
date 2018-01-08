<template>
    <section class="featured">
        <Headerbar :show="show" :sex="sex" v-on:changeSex="changeSex"></Headerbar>
        <section class="featured-books" v-show="isPageShow">
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
                    <a class="book-more red" @click="redirect(module)">
                        更多 >>
                    </a>
                </div>
                <Booklist :book="{ id: module._id }" @load-result="loadResult"></Booklist>
            </section>
        </section>
        <Toobar :index="1"></Toobar>
        <PageLoading v-show="isPageLoadingShow"></PageLoading>
    </section>
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

import {mapMutations} from 'vuex';

export default {
    name: 'featured',
    data() {
        return {
            show: true,
            sex: 'boy',
            bookdata: [],
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
            },
            isPageLoadingShow: true,
            isPageShow: false
        };
    },
    watch: {
        loadModules() {
            if (this.loadModules.length === 0) {
                this.isPageLoadingShow = false;
                this.isPageShow = true;
            }
        }
    },
    created() {
        this.SET_HEADTITLE('精选');
        this.getSwiperPictures();
        this.getModules();
    },
    methods: {
        ...mapMutations([
            'SET_HEADTITLE'
        ]),
        getSwiperPictures() {
            api.getSwiperPictures()
                .then(data => {
                    this.swiperSlides = data;
                });
        },
        getModules() {
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
        changeSex(sex) {
            this.isPageLoadingShow = true;
            this.isPageShow = false;
            this.sex = sex;
            this.getModules();
        },
        redirect(module) {
            this.SET_HEADTITLE(module.title);
            this.$router.push({path: 'Recommend', query: {moduleid: module._id}});
        },
        loadResult(id) {
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
