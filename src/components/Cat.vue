<template>
    <section class="Cat">
        <Headerbar :headtitle="headtitle"></Headerbar>
        <Catbar></Catbar>
        <Toobar :index="2"></Toobar>
    </section>
</template>

<script>
import Headerbar from './Header';
import Catbar from './Catbar';
import Toobar from './Toobar';

export default {
    name: 'cat',
    data() {
        return {
            headtitle: '分类'
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
