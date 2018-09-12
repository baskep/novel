<template>
    <header class="white">
        <h2 class="title white">{{headTitle}}</h2>
        <nav class="nav-group" v-if="show">
            <h3 :class="['nav-item', 'white', { active: sex === 'boy' }]" @click="toggele('boy')">男生</h3>
            <h3 :class="['nav-item', 'white', { active: sex === 'girl' }]" @click="toggele('girl')">女生</h3>
        </nav>
        <div class="search">
            <router-link to="/search">
                <img src="../../assets/icon/search.png" alt="">
            </router-link>
        </div>
    </header>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'headbar',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        sex: {
            type: String,
            default: 'boy'
        }
    },
    computed: {
        ...mapState([
            'headTitle'
        ])
    },
    methods: {
        toggele(sex) {
            this.$emit('changeSex', sex);
        }
    }
};
</script>

<style lang="scss">
    @import './Header.scss';
</style>
