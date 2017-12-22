<template>
    <section class="book-tool">
        <div class="add-book">
            <img src="../../assets/icon/add_book.png" alt="">
            <p @click="addCurrentBookToShelf">{{`${isCurrentBookAddShelf ? '已加入书架' : '加入书架'}`}}</p>
        </div>
         <div class="read">
            <p @click="read">立即阅读</p>
        </div>
    </section>
</template>

<script>
export default {
    name: 'bookbar',
    data() {
        return {
            id: '',
            isCurrentBookAddShelf: false,
            bookID: [],
            backbarTitle: ''
        };
    },
    props: {
        bookdata: Object
    },
    watch: {
        bookdata: function() {
            this.id = this.bookdata._id;
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
        },
        read: function() {
            this.$emit('read');
        }
    }
};
</script>

<style lang="scss">
@import './Bookbar.scss';
</style>
