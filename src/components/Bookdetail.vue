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
                <div class="current-detail-catalog">
                    <span>{{bookdata.updated}} · {{bookdata.lastChapter}}</span>
                </div>
                <div class="turn-to-article">
                    <img src="./../assets/icon/font.png" alt="" style="width: 18px; height: 18px;">
                </div>
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
                        <img src="./../assets/icon/like.png" alt="">
                        <span>{{recommend.likeCount}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="placeholder">
        </div>
        <div class="recommend">
            <div class="recommend-title">
                <div style="margin-left: 20px;">
                    <h4>同类推荐</h4>
                </div>
                <div class="recommend-more">
                    <router-link class="recommend-more-link" :to="{ path: 'recommend', query: {id: this.bookid,  backbarTitle: '同类推荐'} }">
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
        <Bookbar :bookdata="bookdata"></Bookbar>
    </section>
</template>

<script>
import Backbar from './Backbar';
import Bookbar from './Bookbar';
import api from './../api/api';

export default {
    name: 'bookdetail',
    data() {
        return {
            bookdata: {},
            recommends: [],
            comments: [],
            bookid: '',
            backbarTitle: '书籍详情'
        };
    },
    props: {
        book: {
            type: Object
        }
    },
    created() {
        this.bookid = this.$route.query.id;
        this.getBookInfo();
    },
    methods: {
        getBookInfo: function () {
            api.getBook(this.bookid)
                .then(data => {
                    this.bookdata = data;
                    this.bookdata.imgSrc = this.initImgSrc(this.bookdata.cover);
                    this.bookdata.wordCount = Math.floor(parseInt(this.bookdata.wordCount) / 10000);
                    let updated = new Date(this.bookdata.updated);
                    this.bookdata.updated = this.initDate(updated);
                });
            api.getReview(this.bookid)
                .then(data => {
                    this.recommends = data;
                    this.recommends.map((item) => {
                        let updated = new Date(item.updated);
                        item.updated = this.initDate(updated);
                        item.author.avatar = this.initImgSrc(item.author.avatar);
                    });
                });
            api.getRecommend(this.bookid)
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
        }
    },
    components: {
        'Backbar': Backbar,
        'Bookbar': Bookbar
    }
};
</script>

<style lang="scss">
.book-detail {
    min-height: 667px;
}
.book-wrapper {
    margin-top: 45px;
    border-bottom: 1px solid #dadada;
    .book-meta {
        margin: 0 auto;
        margin-top: 20px;
        width: 90%;
        .book-meta-img {
            float: left;
            img{
                width: 66px;
                height: 88px;
            }
        }
        .book-meta-info {
            margin-left: 80px;
            h4 {
                margin: 0 0 8px 0px;
                line-height: 1;
                font-size: 16px;
                font-weight: normal;
                font-family: '微软雅黑';
            }
            p {
                line-height: 1.8;
            }
            .book-meta-author {
                font-size: 14px;
                color: #ed424b;
            }
        }
    }
}
.book-read-info {
    display: flex;
    border-bottom: 1px solid #dadada;
    justify-content: space-between;
    div {
        margin: 20px 0;
        width: 33%;
        text-align: center;
        h5 {
            font-size: 12px;
            color: #999;
        }
        p {
            margin-top: 10px;
            font-size: 16px;
        }
    }
}
.all-introduction {
    margin: 10px auto;
    width: 90%;
    p {
        font-size: 14px;
        line-height: 1.5;
        font-family: '微软雅黑';
    }
    
}

@mixin border($position) {
    border-#{$position} : 1px solid #dadada;
}

@mixin textoverflow($line) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: $line;
    -webkit-box-orient: vertical;
}

.book-detail-catalog {
    height: 40px;
    @include border(top);
    @include border(bottom);
    span {
          line-height: 40px;
          vertical-align: middle;
    }
    .catalog-title {
        float: left;
        width: 20%;
        height: 40px;
        text-align: center;
        span {
            font-size: 16px;
        }
    }
    .current-catalog {
        float: right;
        width: 80%;
        height: 40px;
    }

    .current-detail-catalog {
        float: left;
        width: 80%;
        height: 100%;
        text-align: right;
        @include textoverflow(2);
        span { 
            color: #999;
        }
    }

    .turn-to-article {
        position: relative;
        float: right;
        width: 20%;
        height: 100%;
        img {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -9px;
            margin-left: -9px;
        }
    }
}

.hot-comment {
    margin: 10px 20px;
    h4 {
        font-size: 16px;
        font-family: '微软雅黑'
    }
    .hot-com {
        margin-top: 15px;
        padding: 5px 0;
        @include border(bottom);
        height: 110px;
        display: flex;
        .hot-com-avatar {
            width: 20%;
            height: auto;
            img {
                width: 40px;
                height: 40px;
            }
        }
        .hot-com-title {
            display: flex;
            justify-content: space-between;
            .name {
                color: #a58d5e;
            }
        }
        .hot-com-content {
            width: 80%;
            .com-content {
                @include textoverflow(2);
            }
            .detail-content {
                line-height: 1.5;
            }
            &>div {
                margin-top:5px;
            }
            .com-like {
                img {
                    float: left;
                    width: 20px;
                    height: 20px;
                }
                span {
                    margin-top: 4px;
                    display: inline-block;
                }
            }
        }
    }
}

.placeholder {
    height: 10px;
    background-color: rgb(246, 247, 249);
}

.recommend {
    margin-bottom: 70px;
    .recommend-title {
        margin-top: 15px;
        border-left: 2px solid #ed424b;
        h4 {
            font-size: 16px;
            font-family: '\5FAE\8F6F\96C5\9ED1';
        }
    }
    &>div,
    .recommend-detail {
        display: flex;
        justify-content: space-between;
    }
    .recommend-more-link {
        margin-right: 10px;
        font-size: 14px;
        color: #ed424b;
    }
    .recommend-detail {
        margin-top: 20px;
        .recommend-detail-books {
            width: 25%;
            text-align: center;
            img {
                width: 60px;
                height: 80px;
            }
            p {
                margin-top: 10px;
            }
        }
    }
}
</style>
