<template>
    <section class="read-content">
        <div class="read-back-bar" ref="readBackBar">
            <div class="back-bar-img" @click="$router.go(-1)">
                <img src="../../assets/icon/deep_blue_back.png" alt="">
            </div>
        </div>
        <div class="read-content-area" @click="toggle" :class="[ skins[currentSkin].className ]">
            <h2><b>{{chapter.title}}</b></h2>
            <p v-for="(content, index) in contentlist" :key="index" :style="{'font-size': fontSize + 'px'}">
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
                        <span :class="[ skin.className, {'skin-focus': currentSkin === skin.id} ]"></span>
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

export default {
    name: 'read',
    data() {
        return {
            currentSkin: 0,
            skins: [{id: 0, className: 'skin-brown'},
                    {id: 1, className: 'skin-light-blue'},
                    {id: 2, className: 'skin-light-green'},
                    {id: 3, className: 'skin-light-red'},
                    {id: 4, className: 'skin-light-black'}],
            chapter: {},
            chapters: [],
            contentlist: [],
            fontSize: 16,
            isBoxShow: true,
            isSettingShow: false,
            isNightMode: false,
            isPageLoadingShow: true
        };
    },
    watch: {
        isBoxShow: function() {
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
        this.chapter = this.$route.query.chapter;
        this.chapters = this.$route.query.chapters;
        this.getChapterContent();
    },
    methods: {
        toggle: function() {
            this.isBoxShow = !this.isBoxShow;
        },
        getChapterContent: function() {
            let url = this.chapter.link;
            if (typeof url === 'string' && url !== '') {
                api.getChapterContent(url)
                    .then(data => {
                        this.contentlist = data.replace(/[↵]/g, '\n').split('\n');
                        this.$nextTick(function() {
                            this.isPageLoadingShow = true;
                        });
                    });
                }
        },
        changeMode: function() {
            this.isNightMode = !this.isNightMode;
            if (this.isNightMode) {
                this.currentSkin = 4;
            } else {
                this.currentSkin = 0;
            }
        },
        setSettingState: function() {
            this.isSettingShow = !this.isSettingShow;
        },
        changeSkin: function(id) {
            if (id === 4) {
                this.changeMode();
            } else {
                if (this.isNightMode) {
                    this.isNightMode = !this.isNightMode;
                }
            }
            this.currentSkin = id;
        },
        minusFontsize: function() {
            if (this.fontSize > 10) {
                this.fontSize = this.fontSize - 1;
            }
        },
        plusFontsize: function() {
            if (this.fontSize < 20) {
                this.fontSize = this.fontSize + 1;
            }
        }
    },
    components: {
        'PageLoading': PageLoading
    }
};
</script>

<style lang="scss">
@import './Read.scss';
</style>
