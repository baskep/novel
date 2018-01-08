<template>
    <section class="search-result">
        <Backbar></Backbar>
        <Homelist :bookdata="books" style="margin-top: 50px"></Homelist>
        <section v-show="!isLoadShow" class="recommend-end" style="color: #999">
            <p>没有更多了</p>
        </section>
        <Load v-show="isLoadShow" style="width: 100%; margin: 20px 0px 0px;"></Load>
    </section>
</template>

<script>
import Backbar from '../Backbar/Backbar';
import Homelist from '../Homelist/Homelist';
import Load from '../Load/Load';

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
        'Backbar': Backbar,
        'Homelist': Homelist,
        'Load': Load
    }
};
</script>

