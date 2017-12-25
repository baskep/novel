<template>
    <section class="bookshelf">
        <Headerbar :headTitle="headTitle"></Headerbar>
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
import util from '../../util/util';

export default {
    name: 'bookshelf',
    data() {
        return {
            headTitle: '我的书架',
            id: '',
            bookID: [],
            bookShelf: [],
            options: {
                title: '确定要从书架中删除?',
                isPopupShow: false,
                determine: 'deleteBookShelf',
                cancel: 'hidePopup'
            },
            isPageLoadingShow: true,
            isEmptyShow: true
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
                        data.cover = util.initImgURL(data.cover);
                        data.updated = util.timeAgo(data.updated);
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
