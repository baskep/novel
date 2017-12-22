<template>
    <section class="search">
        <div class="search-bar">
            <img src="../../assets/icon/back.png" alt="" class="backImg" @click="$router.go(-1)">
            <div class="search-input">
                <input type="text" ref="searchArea" name="searchArea" placeholder="请输入您要搜索的关键字" @keyup.enter="sear">
                <img src="../../assets/icon/search.png" alt="" @click="sear">
            </div>
        </div> 
        <div class="hot-search">
            <h2><b>热门搜索</b></h2>
            <div class="hot-search-content">
                <span v-for="keyword in hotKeyWords" :key="keyword" @click="pitchItem(keyword)">
                    {{keyword}}
                </span>
            </div>
        </div> 
        <div class="search-history">
            <div class="search-history-head">
                <h2><b>历史搜索</b></h2>
                <h2 @click="clearHistory"><b>清空</b></h2>
            </div>
            <div class="search-histtory-content">
                <span v-for="keyword in historyKeyWords" :key="keyword" @click="search(keyword)">
                    {{keyword}}
                </span>
            </div>
        </div> 
    </section>
</template>

<script>
import api from '../../api/api';

export default {
    name: 'search',
    data() {
        return {
            keyword: '',
            historyKeyWords: [],
            hotKeyWords: [],
            localStorageKeyWords: []
        };
    },
    created() {
        this.getSearchHotKeywords();
        let localStorageData = JSON.parse(window.localStorage.getItem('测试'));
        if (localStorageData !== null) {
            this.historyKeyWords = localStorageData;
        } else {
            this.historyKeyWords = [];
        }
    },
    methods: {
        getSearchHotKeywords: function() {
            api.getSearchHotKeywords()
                .then(data => {
                    data.splice(0, 20).map(data => {
                        this.hotKeyWords.push(data.word);
                    });
                });
        },
        sear: function() {
            let searchContent = this.$refs.searchArea.value.replace(/\s+/g, '');
            if (searchContent !== undefined && searchContent !== '') {
                this.pitchItem(searchContent);
            }
        },
        search: function(item) {
            this.$router.push({path: '/searchresult', query: {keyword: item}});
        },
        pitchItem: function(item) {
            this.keyword = item;
            if (this.historyKeyWords.indexOf(item) === -1) {
                this.historyKeyWords.push(item);
                window.localStorage.setItem('测试', JSON.stringify(this.historyKeyWords));
            }
            this.search(this.keyword);
        },
        clearHistory: function() {
            this.historyKeyWords = [];
            window.localStorage.removeItem('测试');
        }
    }
};
</script>

<style lang="scss">
@import './Search.scss';
</style>
