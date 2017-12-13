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
                        <img src="./../assets/icon/author.png" alt="">
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
.rank-content {
    float: right;
    margin-top: 40px;
    margin-bottom: 71px;
    width: 75%;
    .rank-content-book {
        margin-top: 5px; 
        padding: 0 0 10px 0;
        border-bottom: 1px solid #dadada;
        overflow: hidden;
    }
    .rank-book-img {
        float: left;
        margin: 5px 0 0 10px;   
        img {
            width: 66px;
            height: 88px;
        }
    }
    .rank-book-detail {
        float: left;   
        margin-top: 6px;
        margin-left: 8px;
        width: 65%;
        line-height: 1.4;
        .rank-book-author {
            span {
                color: #969ba3;
            }
        }
        img {
            width: 16px;
            height: 16px;
        }
        p {
            font-size: 12px;
        }
        & div {
            margin-top: 8px;
        }
        .rank-book-rest {
            color: #ed424b;
        }
        .rank-book-like {
            color: #4284ed;
        }
    }
    .rank-book-popularity {
        span {
            display: inline-block;
            margin-left: 5px;
        }
        & span:first-child {
            margin-left: 0;
        }
    }
    .rank-book-introduction {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        p {
            color: #969ba3;
        }
    }
}
.rank-end {
    margin: 10px 0; 
    text-align: center;
    font-size: 12px;
    font-family: '微软雅黑';
}
</style>
