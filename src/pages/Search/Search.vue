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
import util from '../../util/util';

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
        let localStorageData = util.getStore('searchHistory');
        if (localStorageData) {
            this.historyKeyWords = localStorageData;
        } else {
            this.historyKeyWords = [];
        }
    },
    methods: {
        getSearchHotKeywords() {
            api.getSearchHotKeywords()
                .then(data => {
                    data.splice(0, 20).map(data => {
                        this.hotKeyWords.push(data.word);
                    });
                });
        },
        sear() {
            let searchContent = this.$refs.searchArea.value.replace(/\s+/g, '');
            if (searchContent !== undefined && searchContent !== '') {
                this.pitchItem(searchContent);
            }
        },
        search(item) {
            this.$router.push({ path: 'searchresult', query: { keyword: item } });
        },
        pitchItem(item) {
            this.keyword = item;
            if (this.historyKeyWords.indexOf(item) === -1) {
                this.historyKeyWords.push(item);
                util.setStore('searchHistory', this.historyKeyWords);
            }
            this.search(this.keyword);
        },
        clearHistory() {
            this.historyKeyWords = [];
            util.removeStore('searchHistory');
        }
    }
};
</script>

<style lang="scss">
    @import './Search.scss';
</style>
