<template>
    <section class="chapter-content">
        <Backbar></Backbar>
        <section class="chapter">
            <div class="chapter-head" v-show="isTitleShow">
                <span>目录</span>
                <span @click="reverse">倒序查看</span>
            </div>
            <div class="chapter-detail" v-for="chapter in chapters" :key="chapter._id" @click="readCurrentChapter(chapter)">
                <span>{{ chapter.title }}</span>
                <img src="../../assets/icon/lock.png" alt="" v-if="chapter.isVip">
            </div>
        </section>
        <Popup v-show="options.isPopupShow" @determine="determine" @hidePopup="hidePopup" :options="options"></Popup>
        <Loading v-show="isLoadingShow" style="width:100%; margin: 50px 0 0 0"></Loading>
    </section>
</template>

<script>
import Backbar from '../Backbar/Backbar';
import Popup from '../Popup/Popup';
import Loading from '../Load/Load';

import api from '../../api/api';

import {mapMutations} from 'vuex';

export default {
    name: 'chapter',
    data() {
        return {
            chapters: [],
            options: {
                title: '当前章节只限会员才能观看哟~╰(￣▽￣)╮',
                isPopupShow: false,
                determine: 'determine',
                cancel: 'hidePopup'
            },
            isTitleShow: false,
            isLoadingShow: true
        };
    },
    created() {
        this.SET_HEADTITLE(this.$route.query.title);
        this.getChapters();
    },
    methods: {
        ...mapMutations([
            'SET_HEADTITLE'
        ]),
        getChapters: function() {
            api.getChapters(this.$route.query.id)
                .then(data => {
                    this.chapters = data;
                    this.$nextTick(() => {
                        this.isLoadingShow = !this.isLoadingShow;
                        this.isTitleShow = !this.isTitleShow;
                    });
                });
        },
        reverse() {
            this.chapters = this.chapters.reverse();
        },
        readCurrentChapter(chapter) {
            if (chapter.isVip) {
                this.options.isPopupShow = true;
            } else {
                this.$router.push({ path: '/read', query: { chapter: chapter, chapters: this.chapters } });
            }
        },
        determine() {
            this.hidePopup();
        },
        hidePopup() {
            this.options.isPopupShow = false;
        }
    },
    components: {
        'Backbar': Backbar,
        'Popup': Popup,
        'Loading': Loading
    }
};
</script>

<style lang="scss">
@import './Chapter.scss';
</style>
