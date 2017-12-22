<template>
    <section class="book-detail" ref="bookDetail">
        <Backbar :backbarTitle="backbarTitle"></Backbar>
        <div class="book-wrapper">
            <div class="book-meta">
                <div class="book-meta-img">
                    <img :src="bookdata.imgSrc" alt="">
                </div>
                <div class="book-meta-info">
                    <h4>{{bookdata.title}}</h4>
                    <p class="book-meta-author">{{bookdata.author}}</p>
                    <p>{{bookdata.majorCate}}/{{bookdata.minorCate}}</p>
                    <p><span>{{this.bookdata.wordCount}}万字</span> | <span>{{bookdata._gg ? '已完结' : '连载中'}}</span></p>
                </div>
            </div>
            <hr>
        </div>
        <div class="book-read-info">
            <div class="reader-popularity">
                <h5>追人气</h5>
                <p>{{bookdata.serializeWordCount}}</p>
            </div>
            <div class="reader-rest">
                <h5>读者留存率</h5>
                <p>{{bookdata.retentionRatio}}%</p>
            </div>
            <div class="book-update">
                <h5>日更新字数/天</h5>
                <p>{{bookdata.serializeWordCount}}</p>
            </div>
        </div>
        <div class="all-introduction">
            <p>
                {{bookdata.longIntro}}
            </p>
        </div>
        <div class="book-detail-catalog">
            <div class="catalog-title">
                <span>目录</span>
            </div>
            <div class="current-catalog">
                <router-link :to="{ path: '/chapter', query: {id: this.id, title: bookdata.title} }">
                    <div class="current-detail-catalog">
                        <span>{{bookdata.updated}} · {{bookdata.lastChapter}}</span>
                    </div>
                    <div class="turn-to-article">
                        <img src="../../assets/icon/font.png" alt="">
                    </div>
                </router-link>
            </div>
        </div>

        <div class="hot-comment">
            <div class="hot-com-title">
                <h4>热门书评</h4>
            </div>
            <div class="hot-com" v-for="recommend in recommends" :key="recommend.author._id">
                <div class="hot-com-avatar">
                    <img :src="recommend.author.avatar" alt="">
                </div>
                <div class="hot-com-content">
                    <div class="hot-com-title">
                        <span class="name">{{recommend.author.nickname}}</span> 
                        <span class="time">{{recommend.updated}}</span>
                    </div>
                    <div class="com-short">
                        <b><span>{{recommend.title}}</span></b>
                    </div>
                    <div class="com-content">
                        <p class="detail-content">
                            {{recommend.content}}
                        </p>
                    </div>
                    <div class="com-like">
                        <img src="../../assets/icon/like.png" alt="">
                        <span>{{recommend.likeCount}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="recommend">
            <div class="recommend-title">
                <div style="margin-left: 20px;">
                    <h4>同类推荐</h4>
                </div>
                <div class="recommend-more">
                    <router-link class="recommend-more-link" :to="{ path: 'recommend', query: {id: this.id,  backbarTitle: '同类推荐'} }">
                        更多 >>
                    </router-link>
                </div>
            </div>
            <div class="recommend-detail">
                <div class="recommend-detail-books" v-for="comment in comments" :key="comment._id">
                    <router-link :to="{ path: 'bookdetail', query: {id: comment._id} }">
                        <img :src="comment.cover">
                        <p>{{comment.title}}</p>
                    </router-link>
                </div>
           
            </div>
        </div>
        <Bookbar :bookdata="bookdata" @read="read"></Bookbar>
    </section>
</template>

<script>
import Backbar from '../Backbar/Backbar';
import Bookbar from '../Bookbar/Bookbar';

import api from '../../api/api';

export default {
    name: 'bookdetail',
    data() {
        return {
            id: '',
            backbarTitle: '书籍详情',
            bookdata: {},
            recommends: [],
            comments: [],
            isPageLoadingShow: true
        };
    },
    props: {
        book: {
            type: Object
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.getBookInfo();
    },
    methods: {
        getBookInfo: function () {
            api.getBook(this.id)
                .then(data => {
                    this.bookdata = data;
                    this.bookdata.imgSrc = this.initImgSrc(this.bookdata.cover);
                    this.bookdata.wordCount = Math.floor(parseInt(this.bookdata.wordCount) / 10000);
                    let updated = new Date(this.bookdata.updated);
                    this.bookdata.updated = this.initDate(updated);
                });
            api.getReview(this.id)
                .then(data => {
                    this.recommends = data;
                    this.recommends.map((item) => {
                        let updated = new Date(item.updated);
                        item.updated = this.initDate(updated);
                        item.author.avatar = this.initImgSrc(item.author.avatar);
                    });
                });
            api.getRecommend(this.id)
                .then((data) => {
                    this.comments = data.slice(0, 4);
                    this.comments.map((item) => {
                        item.cover = this.initImgSrc(item.cover);
                    });
                });
        },
        initImgSrc(url) {
            return 'http://statics.zhuishushenqi.com' + url;
        },
        initDate(dateTime) {
            return dateTime.getUTCFullYear() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getDate();
        },
        read: function() {
            this.$router.push({path: 'chapter', query: {id: this.id, title: this.bookdata.title}});
        }
    },
    components: {
        'Backbar': Backbar,
        'Bookbar': Bookbar
    }
};
</script>

<style lang="scss">
@import './Bookdetail.scss';
</style>
