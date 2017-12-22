<template>
    <div>
        <section class="book-info-detail" v-for="item in books" :key="item._id">
            <div class="book-img">
                <img :src="item.cover" alt="" >
            </div>
            <router-link :to="{ path: 'bookdetail', query: {id: item._id} }">
                <div class="book-introduction">
                    <h2><strong>{{item.title}}</strong></h2>
                    <div class="breif-introduction">
                        <p>{{item.shortIntro}}</p>                
                    </div>
                    <div class="book-bar">
                        <div class="book-author">
                            <img src="../../assets/icon/author.png" alt=""> 
                            <p>{{item.author}}</p>
                        </div>
                        <div class="book-tag">
                            <span class="book-type">{{item.majorCate}}</span>
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
import api from '../../api/api';

export default {
    name: 'booklist',
    data() {
        return {
            books: []
        };
    },
    props: {
        bookInfo: Object
    },
    created() {
        this.getBooks();
    },
    methods: {
        getBooks: function() {
            api.getBooks(this.bookInfo.id)
                .then(data => {
                    data = Array.from(data);
                    data.map(item => {
                        this.books.push(item.book);
                    });
                    this.$nextTick(function () {
                        this.$emit('load-result', this.bookInfo.id);
                    });
            });
        }
    }
};
</script>

<style lang="scss">
@import './Booklist.scss';
</style>
