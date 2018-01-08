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
                        <p class="deep-grap">{{item.shortIntro}}</p>                
                    </div>
                    <div class="book-bar">
                        <div class="book-author">
                            <img src="../../assets/icon/author.png" alt=""> 
                            <p class="deep-grap">{{item.author}}</p>
                        </div>
                        <div class="book-tag">
                            <span class="book-type">{{item.majorCate}}</span>
                            <span class="book-state red">{{`${item.isSerial ? '连载中' : '已完结'}`}}</span>
                            <span class="book-popularity blue">{{item.latelyFollower}}人气</span>
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
        book: Object
    },
    created() {
        this.getBooks();
    },
    methods: {
        getBooks() {
            api.getBooks(this.book.id)
                .then(data => {
                    data = Array.from(data);
                    data.map(item => {
                        this.books.push(item.book);
                    });
                    this.$nextTick(() => {
                        this.$emit('load-result', this.book.id);
                    });
            });
        }
    }
};
</script>

<style lang="scss">
@import './Booklist.scss';
</style>
