<template>
    <section class="bookshelf">
        <Headerbar></Headerbar>
        <section class="empty" v-if="isEmptyShow">
            <router-link to="/featured">
                <div class="empty-icon">
                <img src="../../assets/icon/add_book.png" alt="">
                </div>
                <p class="empty-notice deep-grap">快去添加你喜欢的小说吧</p>
            </router-link>
        </section>
        <section class="detail-books" v-show="!isPageLoadingShow">
            <div class="detail-book-item" v-for="book in bookShelf" :key="book._id">
                <img :src="book.cover" alt="">
                    <router-link :to="{ path: 'chapter', query: { id: book._id, title: book.title } }">
                        <div class="detail-book-intro">
                            <h4><b>{{book.title}}</b>
                                <span class="update-time red">
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
        <Footer :index="0"></Footer>
        <Pageload v-show="isPageLoadingShow"></Pageload>
        <Popup v-show="options.isPopupShow" @deleteBookShelf="deleteBookShelf" @hidePopup="hidePopup" :options="options"></Popup>
    </section>
</template>

<script>
import Headerbar from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Pageload from '../../components/Pageload/Pageload';
import Popup from '../../components/Popup/Popup';

import api from '../../api/api';
import util from '../../util/util';

import {mapMutations} from 'vuex';

export default {
    name: 'bookshelf',
    data() {
        return {
            id: '',
            bookID: [],
            bookShelf: [],
            options: {
                title: '确定要从书架中删除?',
                determine: 'deleteBookShelf',
                cancel: 'hidePopup',
                isPopupShow: false
            },
            isPageLoadingShow: true,
            isEmptyShow: true
        };
    },
    created() {
        this.SET_HEADTITLE('我的书架');
        let localStorageData = util.getStore('BOOKSHELF');
        let params = [];
        this.isPageLoadingShow = false;
        if (localStorageData) {
            params = localStorageData;
            this.isEmptyShow = false;
        } else {
            return;
        }
        this.getBookShelf(params);
    },
    methods: {
        ...mapMutations([
            'SET_HEADTITLE'
        ]),
        getBookShelf(params) {
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
        deleteBook(id) {
            this.id = id;
            this.options.isPopupShow = true;
        },
        deleteBookShelf() {
            let index = this.bookID.indexOf(this.id);
            this.bookShelf.splice(index, 1);
            this.bookID.splice(index, 1);
            util.setStore('BOOKSHELF', this.bookID);
            if (this.bookShelf.length === 0 || !this.bookShelf) {
                util.removeStore('BOOKSHELF');
                this.isEmptyShow = true;
            }
            this.hidePopup();
        },
        hidePopup() {
            this.options.isPopupShow = false;
        }
    },
    components: {
        'Headerbar': Headerbar,
        'Footer': Footer,
        'Pageload': Pageload,
        'Popup': Popup
    }
};
</script>

<style lang="scss">
    @import './Bookshelf.scss';
</style>
