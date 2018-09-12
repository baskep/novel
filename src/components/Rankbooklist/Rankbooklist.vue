<template>
    <section class="rank-content">
        <div class="rank-content-book" v-for="book in books" :key="book._id">
            <router-link :to="{ path: 'bookdetail', query: { id: book._id } }">
                <div class="rank-book-img">
                    <img :src="book.cover" alt="">
                </div>
                <div class="rank-book-detail">
                    <h3><b>{{book.title}}</b></h3>
                    <div class="rank-book-author">
                        <img src="../../assets/icon/author.png" alt="">
                        <span>{{book.author}}</span>
                    </div>
                    <div class="rank-book-introduction">
                        <p>
                            {{book.shortIntro}}
                        </p>
                    </div>
                    <div class="rank-book-popularity">
                        <span class="rank-book-rest red">{{book.retentionRatio}}%留存</span>
                        <span>|</span>
                        <span class="rank-book-like blue">{{book.latelyFollower}}万人气</span>
                    </div>
                </div>
            </router-link>
        </div>
    </section>
</template>

<script>
import util from '../../util/util';

export default {
    name: 'rankbooklist',
    data() {
        return {
            books: []
        };
    },
    props: {
        bookdata: Array
    },
    watch: {
        bookdata() {
            this.books = this.bookdata;
            this.books.map(item => {
                item.cover = util.initImgURL(item.cover);
                item.latelyFollower = (item.latelyFollower / 10000).toFixed(2);
            });
        }
    }
};
</script>

<style lang="scss">
    @import './Rankbooklist.scss';
</style>
