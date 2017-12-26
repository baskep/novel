<template>
    <section class="search-result">
        <Backbar :backbarTitle="backbarTitle"></Backbar>
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

export default {
    name: 'searchreuslt',
    data() {
        return {
            backbarTitle: '搜索结果',
            books: [],
            isLoadShow: true
        };
    },
    created() {
        this.searchByKeyword();
    },
    methods: {
        searchByKeyword: function() {
            api.searchByKeyword(this.$route.query.keyword)
                .then(data => {
                    this.books = data;
                    this.books.map(item => {
                        item.majorCate = item.cat;
                        item.latelyFollower = (item.latelyFollower / 10000).toFixed(2) + '万';
                    });
                    this.$nextTick(function() {
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

<style lang="scss">

</style>

