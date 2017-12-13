<template>
    <header>
        <h2 class="title">{{headtitle}}</h2>
        <nav class="nav-group" v-if="show">
            <h3 :class="['nav-item', { active: sex === 'boy' }]" @click="toggele('boy')">男生</h3>
            <h3 :class="['nav-item', { active: sex === 'girl' }]" @click="toggele('girl')">女生</h3>
        </nav>
        <div class="search">
            <router-link to="/search">
                <img src="../assets/icon/search.png" alt="">
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
header {
    position: fixed;
    top: 0;
    left: 0;
  	right: 0;
    width: 100%;
    height: 40px;
    overflow: hidden;
    // border-bottom: 1px solid #ed424b;
    color: #fff;
    background-color: #ed424b;
    box-sizing: border-box;
    z-index: 9999;

    h2 {
        position: absolute;
        top: 12px;
        left: 15px;
        color: #fff;
        line-height: 20px;
    }

    .nav-group {
        margin: 10px auto;
        display: table;
        border: 1px solid #fff;
        border-radius: 4px;

        .nav-item {
            display: table-cell;
            font-weight: 400;
            line-height: 20px;
            padding: 0 10px;
            color: #fff;

            &.active {
                color: #666;
                background-color: #fff;
            }
        }
      }

      .search {
        position: absolute;
        display: inline-block;
        top: 12px;
        right: 15px;
        
        img {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
