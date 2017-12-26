<template>
    <div>
        <section class="book-info-detail" v-for="item in books" :key="item._id">
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
                            <span class="book-type">{{item.cat}}</span>
                            <span class="book-state">{{`${item.isSerial ? '连载中' : '已完结'}`}}</span>
                            <span class="book-popularity">{{item.latelyFollower}}人气</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </section>
    </div>
</template>

<script>
import util from '../../util/util';

export default {
    name: 'homelist',
    data() {
        return {
            books: []
        };
    },
    props: {
        bookdata: Array
    },
    watch: {
        bookdata: function() {
            this.books = this.bookdata;
            this.books.map(item => {
                item.cover = util.initImgURL(item.cover);
            });
        }
    }
};
</script>

<style lang="scss">
@import './Homelist.scss';
</style>

