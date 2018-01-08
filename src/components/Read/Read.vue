<template>
    <section class="read-content">
        <div class="read-back-bar" ref="readBackBar">
            <div class="back-bar-img" @click="$router.go(-1)">
                <img src="../../assets/icon/deep_blue_back.png" alt="">
            </div>
        </div>
        <div class="read-content-area" @click="toggle" :class="[ skins[currentSkin].className ]">
            <h2><b>{{chapter.title}}</b></h2>
            <p v-for="(content, index) in contentlist" :key="index" :style="{'font-size': currentFontSize + 'px'}">
                {{content}}
            </p>
        </div>
        <div class="read-toobar" ref="readToobar">
            <div @click="$router.go(-1)">
                <div class="item-icon">
                    <img src="../../assets/icon/category.png">
                </div>
                <p class="item-label">
                目录
                </p>
            </div>
            <div @click="changeMode">
                <div class="item-icon">
                    <img src="../../assets/icon/moon.png">
                </div>
                <p class="item-label">
                {{`${isNightMode ? '夜间模式' : '普通模式'}`}}
                </p>
            </div>
            <div @click="setSettingState">
                <div class="item-icon">
                    <img src="../../assets/icon/setting.png">
                </div>
                <p class="item-label">
                设置
                </p>
            </div>
        </div>
        
        <div class="setting-bar" v-show="isSettingShow">
            <div class="setting-color">
                <ul>
                    <li v-for="skin in skins" :key="skin.id" @click="changeSkin(skin.id)">
                        <span :class="[ skin.className, { 'skin-focus': currentSkin === skin.id } ]"></span>
                    </li>
                </ul>
            </div>
            <div class="setting-size">
                <div class="minus-size" @click="minusFontsize">
                    <span>A-</span>
                </div>
                <div class="puls-size" @click="plusFontsize"> 
                    <span>A+</span>
                </div>
            </div>
        </div>
        <PageLoading v-show="isPageLoadingShow"></PageLoading>
    </section>
</template>

<script>
import PageLoading from '../../components/PageLoading/PageLoading';

import api from '../../api/api';

import {mapState, mapMutations} from 'vuex';

export default {
    name: 'read',
    data() {
        return {
            currentSkin: 0,
            skins: [{id: 0, className: 'skin-brown'},
                    {id: 1, className: 'skin-light-blue'},
                    {id: 2, className: 'skin-light-green'},
                    {id: 3, className: 'skin-light-red'},
                    {id: 4, className: 'skin-light-black'}
                    ],
            chapter: {},
            chapters: [],
            contentlist: [],
            currentFontSize: 0,
            minFontSize: 12,
            maxFontSize: 20,
            isBoxShow: true,
            isSettingShow: false,
            isNightMode: false,
            isPageLoadingShow: true
        };
    },
    computed: {
        ...mapState([
            'fontSize',
            'skinIndex',
            'nightMode'
        ])
    },
    watch: {
        isBoxShow() {
            let translateY = 'translateY(0)';
            if (this.isBoxShow) {
                this.$refs.readBackBar.style.transform = translateY;
                this.$refs.readToobar.style.transform = translateY;
            } else {
                this.isSettingShow = false;
                this.$refs.readBackBar.style.transform = 'translateY(-100%)';
                this.$refs.readToobar.style.transform = 'translateY(100%)';
            }
        }
    },
    created() {
        this.currentFontSize = this.fontSize;
        this.currentSkin = this.skinIndex;
        this.isNightMode = this.nightMode;
        this.chapter = this.$route.query.chapter;
        this.chapters = this.$route.query.chapters;
        this.getChapterContent();
    },
    methods: {
        ...mapMutations([
            'SET_FONTSIZE',
            'SET_SKININDEX',
            'SET_NINGHTMODE'
        ]),
        toggle() {
            this.isBoxShow = !this.isBoxShow;
        },
        getChapterContent() {
            let url = this.chapter.link;
            if (typeof url === 'string' && url !== '') {
                api.getChapterContent(url)
                    .then(data => {
                        this.contentlist = data.replace(/[↵]/g, '\n').split('\n');
                        this.$nextTick(() => {
                            this.isPageLoadingShow = true;
                        });
                    });
                }
        },
        changeMode() {
            this.isNightMode = !this.isNightMode;
            if (this.isNightMode) {
                this.currentSkin = 4;
            } else {
                this.currentSkin = 0;
            }
        },
        setSettingState() {
            this.isSettingShow = !this.isSettingShow;
        },
        changeSkin(id) {
            if (id === 4) {
                this.changeMode();
            } else {
                if (this.isNightMode) {
                    this.isNightMode = !this.isNightMode;
                }
            }
            this.currentSkin = id;
        },
        minusFontsize() {
            if (this.currentFontSize > this.minFontSize) {
                this.currentFontSize = this.currentFontSize - 1;
            }
        },
        plusFontsize() {
            if (this.currentFontSize < this.maxFontSize) {
                this.currentFontSize = this.currentFontSize + 1;
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        this.SET_FONTSIZE(this.currentFontSize);
        this.SET_SKININDEX(this.currentSkin);
        this.SET_NINGHTMODE(this.isNightMode);
        next();
    },
    components: {
        'PageLoading': PageLoading
    }
};
</script>

<style lang="scss">
@import './Read.scss';
</style>
