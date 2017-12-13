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
                            <img src="./../assets/icon/author.png" alt="" style="width:12px; height:12px;"> 
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
        }
    }
};
</script>

<style lang="scss">
.book-info-detail {
    margin-bottom: 10px;
    border-bottom: .5px solid #E8E8E8;
    padding-bottom: 12px; 
    min-height: 88px;
    & > div {
        float: left;
    }
    .book-introduction {
        margin-right: 10px;
        p, span {
            color: #999;
        }
    }
    .book-img {
        margin: 0 10px;
    }
    .breif-introduction {
        margin-top: 8px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        p {
            line-height: 1.6;
        }
    }
    .book-bar {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        .book-author {
            display: flex;
            img {
                padding: 0 2px;
            }
        }
        .book-tag {
            span {
                padding: 1px;
            }
            .book-type {
                border: 1px solid #999;
            }
            .book-state {
                border: 1px solid #ed424b;
                color: #ed424b;
            }
            .book-popularity {
                border: 1px solid #4284ed;
                color: #4284ed;
            }
        }
    }
}
</style>

