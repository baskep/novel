import async from './axios_cofig';

const baseURL = 'https://bird.ioliu.cn/v1/?url=http://api.zhuishushenqi.com';
const chapterUrl = 'http://novel.juhe.im';

export default {
    getFeaturedData() {
        return async(baseURL + '/recommendPage/nodes/5910018c8094b1e228e5868f')
            .then(data => data.data);
    },

    getBooks(id) {
        return async(baseURL + '/recommendPage/books/' + id)
            .then(data => data.data);
    },

    getSwiperPictures() {
        return async(baseURL + '/recommendPage/node/spread/575f74f27a4a60dc78a435a3', {
            pl: 'ios'
        })
            .then(data => data.data);
    },

    getCategory() {
        return async(baseURL + '/cats/lv2/statistics');
    },

    getMinorList() {
        return async(baseURL + '/cats/lv2');
    },

    getCatBooks(gender, type = 'hot', major = '', minor = '', start = 0, limit = 20) {
        return async(baseURL + '/book/by-categories', {
            gender: gender,
            type: type,
            major: major,
            minor: minor,
            start: start,
            limit: limit
        })
            .then(data => data.books);
    },

    getRanks() {
        return async(baseURL + '/ranking/gender');
    },

    getRankBooks(id) {
        return async(baseURL + '/ranking/' + id);
    },

    getBookList(id, st = 1, size = 10) {
        return async(baseURL + '/recommendPage/node/books/all/' + id, {
            ajax: 'ajax',
            st: st,
            size: size
        }, 'post');
    },

    getBook(id) {
        return async(baseURL + '/book/' + id);
    },

    getReview(id, limit = 5) {
        return async(baseURL + '/post/review/best-by-book', {
            book: id,
            limit: limit
        }).then(data => data.reviews);
    },

    getRecommend(id) {
        return async(baseURL + '/book/' + id + '/recommend')
            .then(data => data.books);
    },

    getChapters(id) {
        return async(baseURL + '/btoc', {
            view: 'summary',
            book: id
        }).then(data => {
            return async(baseURL + '/btoc/' + data[0]._id, {
                view: 'chapters',
                channel: 'mweb'
            }).then(data => {
                return data.chapters;
            });
        });
    },

    getChapterContent(url) {
        return async(chapterUrl + '/chapters/' + encodeURIComponent(url))
            .then(result => {
                return result.data.chapter.cpContent;
            });
    },

    getShelfBookUpdate(ids) {
        return async(baseURL + '/book', {
            view: 'updated',
            id: ids.toString()
        });
    },

    getSearchHotKeywords() {
        return async(baseURL + '/book/search-hotwords')
            .then(data => data.searchHotWords);
    },

    searchByKeyword(keyword) {
        return async(baseURL + '/book/fuzzy-search', {
            query: keyword
        }).then(data => data.books);
    }
};
