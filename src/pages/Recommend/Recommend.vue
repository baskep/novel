<template>
    <section class="recommend-books">
        <Back></Back>
        <Commombooklist :bookdata="books" style="margin-top: 50px"></Commombooklist>
        <section v-show="!isLoadShow" class="recommend-end deep-gray">
            <p>没有更多了</p>
        </section>
        <Bookload v-show="isLoadShow" style="width: 100%; margin: 20px 0px 0px;"></Bookload>
    </section>
</template>

<script>

import Back from '../../components/Back/Back';
import Commombooklist from '../../components/Commombooklist/Commombooklist';
import Bookload from '../../components/Bookload/Bookload';
import api from '../../api/api';

import util from '../../util/util';

import {mapMutations} from 'vuex';

export default {
    name: 'recommend',
    data() {
        return {
            books: [],
            isLoadShow: true
        };
    },
    created() {
        this.SET_HEADTITLE('相关推荐');
        if (!this.$route.query.moduleid) {
            this.getRecommendBooks();
        } else {
            this.getModuleAllBooks();
        }
    },
    methods: {
        ...mapMutations([
            'SET_HEADTITLE'
        ]),
        getRecommendBooks() {
            api.getRecommend(this.$route.query.id)
                .then(data => {
                    this.books = data;
                    this.books.map((item) => {
                        item.cover = util.initImgURL(item.cover);
                    });
                    this.$nextTick(() => {
                        this.isLoadShow = false;
                    });
                });
        },
        getModuleAllBooks() {
            api.getBookList(this.$route.query.moduleid)
                .then(data => {
                    data.map((item) => {
                        this.books.push(item.book);
                    });
                    this.$nextTick(() => {
                        this.isLoadShow = false;
                    });
                });
        }
    },
    components: {
        'Back': Back,
        'Commombooklist': Commombooklist,
        'Bookload': Bookload
    }
};
</script>

<style lang="scss">
    @import './Recommend.scss';
</style>
