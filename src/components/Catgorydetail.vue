<template>
    <section class="category-detail" ref="catList">
        <Backbar :backbarTitle="backbarTitle"></Backbar>
        <section class="cat-list">
            <ul>
                <li :class="['cat-item', {'cat-active': cat.type === currentCat}]" v-for="cat in catList" :key="cat.type" 
                    @click="changeCat(cat.type)"
                >
                    {{cat.name}}
                </li>
            </ul>
        </section>
        <Homelist :bookdata="bookdata" style="margin-top: 10px"></Homelist>
        <Load v-show="isLoadShow" style="width:100%; margin: 5px 0"></Load>
    </section>
</template>

<script>
import Backbar from './Backbar';
import Load from './Load';
import Homelist from './Homelist';

import api from './../api/api';

export default {
    name: 'categorydetail',
    data() {
        return {
            backbarTitle: '',
            currentCat: 'hot',
            catList: [{
                type: 'hot',
                name: '热门'
                }, {
                type: 'new',
                name: '新书'
                }, {
                type: 'reputation',
                name: '好评'
                }, {
                type: 'over',
                name: '完结'
                }, {
                type: 'monthly',
                name: '包月'
            }],
            transformName: {
                '男': 'male',
                '女': 'female',
                '类型': 'picture',
                '出版': 'press'
            },
            sex: 'male',
            start: 0,
            limit: 20,
            major: '全部',
            minor: '',
            bookdata: [],
            isLoadShow: true,
            docEle: null,
            bodyEle: null,
            bookEle: null,
            $clientHeight: 0
        };
    },
    created() {
        this.backbarTitle = this.$route.query.name;
        this.getCatBooks();
    },
    mounted() {
        this.docEle = document.documentElement;
        this.bodyEle = document.body;
        this.$clientHeight = this.bodyEle.clientHeight;
        this.bookEle = this.$refs.catList;
        window.addEventListener('scroll', this.debounce(this.loadMore, 500, 1000));
    },
    methods: {
        getCatBooks: function() {
            this.sex = this.transformName[this.$route.query.gender];
            api.getCatBooks(this.sex, this.currentCat, this.backbarTitle, this.minor, this.start * this.limit)
                .then(data => {
                    data.map(item => {
                        item.cover = this.initImgSrc(item.cover);
                        this.bookdata.push(item);
                    });
                    this.isLoadShow = false;
                });
        },
        changeCat: function(cat) {
            this.bookdata = [];
            this.currentCat = cat;
            this.isLoadShow = true;
            this.getCatBooks();
        },
        loadMore: function() {
            let scrollTop = this.docEle.scrollTop + this.bodyEle.scrollTop;
            let offsetHeight = this.bookEle.offsetHeight;
            if (offsetHeight - this.$clientHeight - scrollTop < 160) {
                this.isLoadShow = true;
                this.start++;
                this.getCatBooks();
            }
        },
        debounce: function(func, wait, mustRun) {
            let timeout = null;
            let startTime = new Date();
            return function() {
                let context = this;
                let args = arguments;
                let curTime = new Date();
                clearTimeout(timeout);
                // 如果达到了规定的触发时间间隔，触发 handler
                if (curTime - startTime >= mustRun) {
                    func.apply(context, args);
                    startTime = curTime;
                // 没达到触发间隔，重新设定定时器
                } else {
                    timeout = setTimeout(func, wait);
                }
            };
        },
        initImgSrc(url) {
            return 'http://statics.zhuishushenqi.com' + url;
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
.cat-list {
    margin-top: 40px;
    width: 70%;
    overflow: hidden;
    li {
        float: left;
        padding: 10px 0;
        width: 20%;
        text-align: center;
        font-size: 14px;
    }
    .cat-active {
        color: #ed424b;
    }
}
 .cat-prompt {
    text-align: center;
    span {
        font-size: 14px;
        color: #8a8a8a;
    }
    img {
        width: 14px;
        height: 14px;
    }
}
</style>
