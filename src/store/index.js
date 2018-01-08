import Vue from 'Vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const state = {
    headTitle: '',
    fontSize: 16,
    skinIndex: 0,
    nightMode: false
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
