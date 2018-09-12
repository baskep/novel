<template>
    <section class="search-result">
        <Back></Back>
        <Commombooklist :bookdata="books" style="margin-top: 50px"></Commombooklist>
        <section v-show="!isLoadShow" class="recommend-end" style="color: #999">
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
    name: 'searchreuslt',
    data() {
        return {
            books: [],
            isLoadShow: true
        };
    },
    created() {
        this.SET_HEADTITLE('搜索结果');
        this.searchByKeyword();
    },
    methods: {
        ...mapMutations([
            'SET_HEADTITLE'
        ]),
        searchByKeyword() {
            api.searchByKeyword(this.$route.query.keyword)
                .then(data => {
                    this.books = data;
                    this.books.map(item => {
                        item.cover = util.initImgURL(item.cover);
                        item.majorCate = item.cat;
                        item.latelyFollower = (item.latelyFollower / 10000).toFixed(2) + '万';
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

