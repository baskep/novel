<template>
    <section class="Cat">
        <Headerbar :headTitle="headTitle"></Headerbar>
        <Catbar></Catbar>
        <Toobar :index="2"></Toobar>
    </section>
</template>

<script>
import Headerbar from '../Header/Header';
import Catbar from '../Catbar/Catbar';
import Toobar from '../Toobar/Toobar';

export default {
    name: 'cat',
    data() {
        return {
            headTitle: '分类'
        };
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
