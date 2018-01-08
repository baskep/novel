<template>
    <section class="back-bar">
        <div>
            <div class="back-bar-img" @click="$router.go(-1)">
                <img src="../../assets/icon/back.png" alt="">
            </div>
            <div class="back-bar-title">
                <h2 class="white">{{headTitle}}</h2>
            </div>
        </div>
    </section>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'backbar',
    computed: {
        ...mapState([
            'headTitle'
        ])
    }
};
</script>

<style lang="scss">
@import './Backbar.scss';
</style>
