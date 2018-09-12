import Bookshelf from '../pages/Bookshelf/Bookshelf.vue';
import Featured from '../pages/Featured/Featured.vue';
import Category from '../pages/Category/Category.vue';
import Categorydetail from '../pages/Catgorydetail/Catgorydetail.vue';
import Bookdetail from '../pages/Bookdetail/Bookdetail.vue';
import Recommend from '../pages/Recommend/Recommend.vue';
import Rank from '../pages/Rank/Rank.vue';
import Search from '../pages/Search/Search.vue';
import Searchresult from '../pages/Searchresult/Searchresult.vue';
import Chapter from '../pages/Chapter/Chapter.vue';
import Read from '../pages/Read/Read.vue';

let routes = [{
        name: 'bookshelf',
        path: '/bookshelf',
        component: Bookshelf
    },
    {
        name: 'featured',
        path: '/featured',
        component: Featured
    },
    {
        name: 'classfication',
        path: '/classfication',
        component: Category
    },
    {
        name: 'bookdetail',
        path: '/bookdetail',
        component: Bookdetail
    },
    {
        name: 'recommend',
        path: '/recommend',
        component: Recommend
    },
    {
        name: 'categorydetail',
        path: '/categorydetail',
        component: Categorydetail
    },
    {
        name: 'rank',
        path: '/rank',
        component: Rank
    },
    {
        name: 'search',
        path: '/search',
        component: Search
    },
    {
        name: 'searchresult',
        path: '/searchresult',
        component: Searchresult
    },
    {
        name: 'chapter',
        path: '/chapter',
        component: Chapter
    },
    {
        name: 'read',
        path: '/read',
        component: Read
    }
];

export default routes;
