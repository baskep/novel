<template>
	<section class="toobar">
		<router-link to="/bookshelf">
			<div>
				<div class="item-icon">
					<img :src="index === 0 ? bookselfActive: bookself">
				</div>
				<p class="item-label">
				书架
				</p>
     		 </div>
    </router-link>

    <router-link to="/featured">
		<div>
			<div class="item-icon">
				<img :src="index  === 1 ? choiceActive: choice">
			</div>
			<p class="item-label">
				精选
			</p>
		</div>
    </router-link>

    <router-link to="/classfication">
		<div>
			<div class="item-icon">
				<img :src="index  === 2 ? classficationActive: classfication">
			</div>
			<p class="item-label">
				分类
			</p>
		</div>
    </router-link>

    <router-link to="rank">
		<div>
			<div class="item-icon">
				<img :src="index  === 3 ? rankingActive: ranking">
			</div>
			<p class="item-label">
				排行
			</p>
		</div>
    </router-link>
  </section>

</template>

<script>
import bookself from './../assets/icon/bookself.png';
import bookselfActive from './../assets/icon/bookself_active.png';

import choice from './../assets/icon/choice.png';
import choiceActive from './../assets/icon/choice_active.png';

import classfication from './../assets/icon/classfication.png';
import classficationActive from './../assets/icon/classfication_active.png';

import ranking from './../assets/icon/ranking.png';
import rankingActive from './../assets/icon/ranking_active.png';

export default {
    name: 'toobar',
    data() {
        return {
            bookself: bookself,
            bookselfActive: bookselfActive,
            choice: choice,
            choiceActive: choiceActive,
            classfication: classfication,
            classficationActive: classficationActive,
            ranking: ranking,
            rankingActive: rankingActive
        };
    },
    props: {
        index: {
            type: Number,
            default: 0
        }
    }
};
</script>

<style lang="scss">
.toobar {
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    height: 50px;
    z-index: 9999;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    border-top: 1px solid #dadada;
    background-color: #fff;
    a {
        width: 25%;
        height: 100%;
        text-align: center;
    }
}

.router-link-exact-active p {
    color: #ed424b;
}
</style>
