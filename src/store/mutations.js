import types from './mutation-types';

export default {
    [types.SET_HEADTITLE]: (state, headTitle) => {
        state.headTitle = headTitle;
    },
    [types.SET_FONTSIZE]: (state, fontSize) => {
        state.fontSize = fontSize;
    },
    [types.SET_SKININDEX]: (state, skinIndex) => {
        state.skinIndex = skinIndex;
    },
    [types.SET_NINGHTMODE]: (state, nightMode) => {
        state.nightMode = nightMode;
    }
};
