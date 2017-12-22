<template>
    <header>
        <h2 class="title">{{headtitle}}</h2>
        <nav class="nav-group" v-if="show">
            <h3 :class="['nav-item', { active: sex === 'boy' }]" @click="toggele('boy')">男生</h3>
            <h3 :class="['nav-item', { active: sex === 'girl' }]" @click="toggele('girl')">女生</h3>
        </nav>
        <div class="search">
            <router-link to="/search">
                <img src="../../assets/icon/search.png" alt="">
            </router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: 'headbar',
    props: {
        headtitle: {
            type: String,
            default: '我的书架'
        },
        show: {
            type: Boolean,
            default: false
        },
        sex: {
            type: String,
            default: 'boy'
        }
    },
    methods: {
        toggele: function(sex) {
            this.$emit('changeSex', sex);
        }
    }
};
</script>

<style lang="scss">
@import './Header.scss';
</style>
