<template>
    <div class="rank-content">
        <div class="rank-content-book" v-for="book in books" :key="book._id">
            <router-link :to="{ path: 'bookdetail', query: {id: book._id} }">
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
                        <span class="rank-book-rest">{{book.retentionRatio}}%留存</span>
                        <span>|</span>
                        <span class="rank-book-like">{{book.latelyFollower}}万人气</span>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="rank-end">
            <p>没有更多了</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'rankbar',
    data() {
        return {
            books: []
        };
    },
    props: {
        ranBooks: Array
    },
    watch: {
        ranBooks: function() {
            this.books = this.ranBooks;
            this.books.map(item => {
                item.cover = this.initImgSrc(item.cover);
                item.latelyFollower = (item.latelyFollower / 10000).toFixed(2);
            });
        }
    },
    methods: {
        initImgSrc(url) {
            return 'http://statics.zhuishushenqi.com' + url;
        }
    }
};
</script>

<style lang="scss">
@import './Rankbar.scss';
</style>
