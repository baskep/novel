<template>
    <section class="book-tool">
        <div class="add-book" @click="addCurrentBookToShelf">
            <img src="../../assets/icon/add_book.png" alt="">
            <p>{{`${isCurrentBookAddShelf ? '已加入书架' : '加入书架'}`}}</p>
        </div>
         <div class="read" @click="read">
            <p class="white">立即阅读</p>
        </div>
    </section>
</template>

<script>
import util from '../../util/util';

export default {
    name: 'bookbar',
    data() {
        return {
            id: '',
            bookID: [],
            isCurrentBookAddShelf: false
        };
    },
    props: {
        book: Object
    },
    watch: {
        book() {
            this.id = this.book._id;
            let localStorageData = util.getStore('BOOKSHELF');
            if (localStorageData) {
                this.bookID = localStorageData;
            } else {
                this.bookID = [];
            }
            if (this.bookID.indexOf(this.book._id) > -1) {
                this.isCurrentBookAddShelf = true;
            }
        }
    },
    methods: {
        addCurrentBookToShelf() {
            if (!this.isCurrentBookAddShelf) {
                this.bookID.push(this.book._id);
                this.isCurrentBookAddShelf = true;
                util.setStore('BOOKSHELF', this.bookID);
            }
        },
        read() {
            this.$emit('read');
        }
    }
};
</script>

<style lang="scss">
@import './Bookbar.scss';
</style>
