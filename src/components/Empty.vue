<template>
    <div>
        <Headerbar :headtitle="headtitle"></Headerbar>
        <section class="empty">
        <router-link to="/featured">
            <div class="empty-icon">
            <img src="./../assets/icon/add_book.png" alt="">
            </div>
            <p class="empty-notice">快去添加你喜欢的小说吧</p>
        </router-link>
        </section>
        <Toobar :index="0"></Toobar>
    </div>
</template>

<script>
import Headerbar from './Header';
import Toobar from './Toobar';

export default {
    data() {
        return {
            headtitle: '我的书架'
        };
    },
    components: {
        'Headerbar': Headerbar,
        'Toobar': Toobar
    }
};
</script>

<style lang="scss">
.empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    a {
        display: block;
        text-align: center;
        margin-top: -50px;
        // margin: auto;
    
        .empty-icon {
            font-size: 80px;
            color: #ccc;
        }

        .empty-notice {
            margin-top: 10px;
            color: #999;
        }
    }
}
</style>
