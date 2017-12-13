<template>
    <section class="book-tool">
        <div class="add-book">
            <img src="./../assets/icon/add_book.png" alt="">
            <p>加入书架</p>
        </div>
         <div class="read">
            <p>立即阅读</p>
        </div>
    </section>
</template>

<script>
export default {
    name: 'bookbar'
};
</script>

<style lang="scss">
.book-tool {
    display: flex;
    justify-content: space-between;
    .add-book {
        width: 50%;
        height: 40px;
        margin-top: 10px;
        text-align: center;
        img {
            width: 24px;
            height: 24px;
        }
        p {
            color: #999;
        }
    }
    .read {
        width: 50%;
        background-color: #ed424b;
        text-align: center;
        p {
            color: #fff;
            font-size: 18px;
            line-height: 60px;
        }
    }
}
</style>
