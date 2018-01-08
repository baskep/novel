<template>
    <section class="Cat">
        <Headerbar></Headerbar>
        <Catbar></Catbar>
        <Toobar :index="2"></Toobar>
    </section>
</template>

<script>
import Headerbar from '../Header/Header';
import Catbar from '../Catbar/Catbar';
import Toobar from '../Toobar/Toobar';

import {mapMutations} from 'vuex';

export default {
    name: 'cat',
    created() {
        this.SET_HEADTITLE('分类');
    },
    methods: {
        ...mapMutations([
            'SET_HEADTITLE'
        ])
    },
    components: {
        'Headerbar': Headerbar,
        'Catbar': Catbar,
        'Toobar': Toobar
    }
};
</script>

<style lang="scss">

</style>
