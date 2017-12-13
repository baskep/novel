<template>
    <section class="search-result">
        <Backbar :backbarTitle="backbarTitle"></Backbar>
        <Homelist :bookdata="books" style="margin-top: 50px"></Homelist>
        <section class="recommend-end">
            <p>没有更多了</p>
        </section>
    </section>
</template>

<script>
import Backbar from './Backbar';
import Homelist from './Homelist';

import api from './../api/api';

export default {
    name: 'searchreuslt',
    data() {
        return {
            backbarTitle: '搜索结果',
            books: []
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
                        item.cover = this.initImgSrc(item.cover);
                        item.majorCate = item.cat;
                        item.latelyFollower = (item.latelyFollower / 10000).toFixed(2) + '万';
                    });
            });
        },
        initImgSrc(url) {
            return 'http://statics.zhuishushenqi.com' + url;
        }
    },
    components: {
        'Backbar': Backbar,
        'Homelist': Homelist
    }
};
</script>

<style lang="scss">

</style>

