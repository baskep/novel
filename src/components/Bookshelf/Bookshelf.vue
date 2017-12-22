<template>
    <section class="bookshelf">
        <Headerbar :headtitle="headtitle"></Headerbar>
        <section class="empty" v-if="isEmptyShow">
            <router-link to="/featured">
                <div class="empty-icon">
                <img src="../../assets/icon/add_book.png" alt="">
                </div>
                <p class="empty-notice">快去添加你喜欢的小说吧</p>
            </router-link>
        </section>
        <section class="detail-books" v-show="!isPageLoadingShow">
            <div class="detail-book-item" v-for="book in bookShelf" :key="book._id">
                <img :src="book.cover" alt="">
                    <router-link :to="{ path: 'chapter', query: {id: book._id, title: book.title} }">
                        <div class="detail-book-intro">
                            <h4><b>{{book.title}}</b>
                                <span class="update-time">
                                    {{book.updated}}
                                </span>
                            </h4>
                            <p>{{book.author}} 著</p>
                            <p>
                                最新连载至: {{book.lastChapter}}
                            </p>
                        </div>     
                    </router-link>
                <div class="delete-book">
                    <img src="../../assets/icon/delete.png" alt="" @click="deleteBook(book._id)">
                </div>
            </div>
        </section>
        <Toobar :index="0"></Toobar>
        <PageLoading v-show="isPageLoadingShow"></PageLoading>
        <Popup v-show="options.isPopupShow" @deleteBookShelf="deleteBookShelf" @hidePopup="hidePopup" :options="options"></Popup>
    </section>
</template>

<script>
import Headerbar from '../Header/Header';
import Toobar from '../Toobar/Toobar';
import PageLoading from '../PageLoading/PageLoading';
import Popup from '../Popup/Popup';

import api from '../../api/api';

export default {
    name: 'bookshelf',
    data() {
        return {
            headtitle: '我的书架',
            isEmptyShow: true,
            isPageLoadingShow: true,
            id: '',
            bookID: [],
            bookShelf: [],
            options: {
                title: '确定要从书架中删除?',
                isPopupShow: false,
                determine: 'deleteBookShelf',
                cancel: 'hidePopup'
            }
        };
    },
    created() {
        let params = [];
        let localStorageData = window.localStorage.getItem('bookshelf');
        this.isPageLoadingShow = false;
        if (localStorageData !== null && localStorageData !== 'null') {
            this.isEmptyShow = false;
            params = JSON.parse(localStorageData);
        } else {
            return;
        }
        this.getBookShelf(params);
    },
    methods: {
        getBookShelf: function(params) {
            params.map(item => {
                api.getBook(item)
                    .then(data => {
                        data.cover = this.initImgSrc(data.cover);
                        data.updated = this.timeago(data.updated);
                        this.bookShelf.push(data);
                        this.bookID.push(data._id);
                    });
            });
            this.isPageLoadingShow = false;
        },
        deleteBook: function(id) {
            this.id = id;
            this.options.isPopupShow = true;
        },
        deleteBookShelf: function() {
            let index = this.bookID.indexOf(this.id);
            this.bookShelf.splice(index, 1);
            this.bookID.splice(index, 1);
            window.localStorage.setItem('bookshelf', JSON.stringify(this.bookID));
            if (this.bookShelf.length === 0 || this.bookShelf === null) {
                window.localStorage.removeItem('bookshelf');
                this.isEmptyShow = true;
            }
            this.hidePopup();
        },
        hidePopup: function() {
            this.options.isPopupShow = false;
        },
        initImgSrc: function(url) {
            return 'http://statics.zhuishushenqi.com' + url;
        },
        timeago: function(dateTimeStamp) {
            dateTimeStamp = new Date(dateTimeStamp).getTime();
            let result;
            let hour = 1000 * 60 * 60;
            let day = hour * 24;
            let week = day * 7;
            let month = day * 30;
            let year = month * 12;
            let now = new Date().getTime();
            let diffValue = now - dateTimeStamp;
            if (diffValue < 0) {
                return;
            }
            let hourC = diffValue / hour;
            let dayC = diffValue / day;
            let weekC = diffValue / week;
            let monthC = diffValue / month;
            let yearC = diffValue / year;
            if (yearC >= 1) {
                result = ' ' + parseInt(yearC) + '年前';
            } else if (monthC >= 1 && month <= 12) {
                result = ' ' + parseInt(monthC) + '月前';
            } else if (weekC >= 1 && weekC <= 5) {
                result = ' ' + parseInt(weekC) + '周前';
            } else if (dayC >= 1) {
                result = ' ' + parseInt(dayC) + '天前';
            } else if (hourC >= 1) {
                result = ' ' + parseInt(hourC) + '小时前';
            } else {
                result = '刚刚';
            }
            return result;
        }
    },
    components: {
        'Headerbar': Headerbar,
        'Toobar': Toobar,
        'PageLoading': PageLoading,
        'Popup': Popup
    }
};
</script>

<style lang="scss">
@import './Bookshelf.scss';
</style>
