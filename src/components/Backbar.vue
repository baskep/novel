<template>
    <section class="back-bar">
        <div>
            <div class="back-bar-img" @click="$router.go(-1)">
                <img src="./../assets/icon/back.png" alt="">
            </div>
            <div class="back-bar-title">
                <h2>{{backbarTitle}}</h2>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'backbar',
    props: {
        backbarTitle: {
            type: ''
        }
    }
};
</script>

<style lang="scss">
    .back-bar {
        position: fixed;
        top: 0;
        width: 100%;
        height: 40px;
        background-color: #ed424b;
        .back-bar-img {
            position: absolute;
            top: 50%;
            left: 2%;
            margin-top: -12px; 
            img {
                width: 24px;
                height: 24px;
            }
        }
        .back-bar-title {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -50px;
            margin-top: -20px;
            width: 100px;
            height: 40px;
            display:table;
            text-align:center;
            h2 {
              display: table-cell;
              vertical-align: middle;
              height: 100%;
              font-size: 18px;
              color: #fff;
            }

        }
    }
</style>
