<template>
    <section class="book-tool">
        <div class="add-book" @click="addCurrentBookToShelf">
            <img src="../../assets/icon/add_book.png" alt="">
            <p>{{`${isCurrentBookAddShelf ? '已加入书架' : '加入书架'}`}}</p>
        </div>
         <div class="read" @click="read">
            <p>立即阅读</p>
        </div>
    </section>
</template>

<script>
export default {
    name: 'bookbar',
    data() {
        return {
            id: '',
            bookID: [],
            backbarTitle: '',
            isCurrentBookAddShelf: false
        };
    },
    props: {
        book: Object
    },
    watch: {
        book: function() {
            this.id = this.book._id;
            let localStorageData = window.localStorage.getItem('bookshelf');
            if (localStorageData !== null && localStorageData !== 'null') {
                this.bookID = JSON.parse(localStorageData);
            } else {
                this.bookID = [];
            }
            if (this.bookID.indexOf(this.book._id) > -1) {
                this.isCurrentBookAddShelf = true;
            }
        }
    },
    methods: {
        addCurrentBookToShelf: function () {
            if (!this.isCurrentBookAddShelf) {
                this.bookID.push(this.book._id);
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
