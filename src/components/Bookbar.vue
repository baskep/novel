<template>
    <section class="book-tool">
        <div class="add-book">
            <img src="./../assets/icon/add_book.png" alt="">
            <p @click="addCurrentBookToShelf">{{`${isCurrentBookAddShelf ? '已加入书架' : '加入书架'}`}}</p>
        </div>
         <div class="read">
            <p>立即阅读</p>
        </div>
    </section>
</template>

<script>
export default {
    name: 'bookbar',
    data() {
        return {
            isCurrentBookAddShelf: false,
            bookID: []
        };
    },
    props: {
        bookdata: Object
    },
    watch: {
        bookdata: function() {
            let localStorageData = window.localStorage.getItem('bookshelf');
            if (localStorageData !== null && localStorageData !== 'null') {
                this.bookID = JSON.parse(localStorageData);
            } else {
                this.bookID = [];
            }
            if (this.bookID.indexOf(this.bookdata._id) > -1) {
                this.isCurrentBookAddShelf = true;
            }
        }
    },
    methods: {
        addCurrentBookToShelf: function () {
            if (!this.isCurrentBookAddShelf) {
                this.bookID.push(this.bookdata._id);
                this.isCurrentBookAddShelf = true;
                window.localStorage.setItem('bookshelf', JSON.stringify(this.bookID));
            }
        }
    }
};
</script>

<style lang="scss">
.book-tool {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 1003;
    display: flex;
    justify-content: space-between;
    .add-book {
        width: 50%;
        height: 40px;
        padding: 10px 0;
        text-align: center;
        background-color: #fff;
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
