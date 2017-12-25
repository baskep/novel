<template>
    <section class="recommend-books">
        <Backbar :backbarTitle="backbarTitle"></Backbar>
        <div class="book-info-detail" v-for="item in books" :key="item._id">
            <div class="book-img">
                <img :src="item.cover" alt="" style="width: 66px; height: 88px;">
            </div>
            <router-link :to="{ path: 'bookdetail', query: {id: item._id} }">
                <div class="book-introduction">
                    <h2><strong>{{item.title}}</strong></h2>
                    <div class="breif-introduction">
                        <p>{{item.shortIntro}}</p>                
                    </div>
                    <div class="book-bar">
                        <div class="book-author">
                            <img src="../../assets/icon/author.png" alt="" style="width:12px; height:12px;"> 
                            <p>{{item.author}}</p>
                        </div>
                        <div class="book-tag">
                            <span class="book-type">{{item.majorCate}}</span>
                            <span class="book-state">{{`${item.isSerial ? '连载中' : '已完结'}`}}</span>
                            <span class="book-popularity">{{item.latelyFollower}}</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
        <section v-show="!isLoadShow" class="recommend-end">
            <p>没有更多了</p>
        </section>
        <Load v-show="isLoadShow" style="width: 100%; margin: 20px 0px 0px;"></Load>
    </section>
</template>

<script>
import Backbar from '../Backbar/Backbar';
import Load from '../Load/Load';
import api from '../../api/api';
import util from '../../util/util';

export default {
    name: 'recommend',
    data() {
        return {
            backbarTitle: '',
            books: [],
            isLoadShow: true
        };
    },
    created() {
        this.backbarTitle = this.$route.query.backbarTitle;
        if (this.$route.query.moduleid === undefined || this.$route.query.moduleid === 'undefined') {
            this.getRecommendBooks();
        } else {
            this.getModuleAllBooks();
        }
    },
    methods: {
        getRecommendBooks: function() {
            api.getRecommend(this.$route.query.id)
                .then(data => {
                    this.books = data;
                    this.books.map((item) => {
                        item.cover = util.initImgURL(item.cover);
                    });
                    this.$nextTick(function() {
                        this.isLoadShow = false;
                    });
                });
        },
        getModuleAllBooks: function() {
            api.getBookList(this.$route.query.moduleid)
                .then(data => {
                    data.map(item => {
                        this.books.push(item.book);
                    });
                    this.$nextTick(function() {
                        this.isLoadShow = false;
                    });
                });
        }
    },
    components: {
        'Backbar': Backbar,
        'Load': Load
    }
};
</script>

<style lang="scss">
@import './Recommend.scss';
</style>
