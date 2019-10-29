/*
 * @Description:
 * @Author: jiannan.lv
 * @Date: 2019-05-07 13:30:21
 * @LastEditTime: 2019-05-20 17:20:09
 * @LastEditors: jiannan.lv
 */
// 用户信息
const initState = {
    'sideBarTroggle': false
};

const actions = {
    // 修改sideBarTroggle状态
    updateTroggleStatus({ state, commit, rootState }) {

        commit('changeTroggleStatus');

    }
};

const mutations = {
    changeTroggleStatus(state) {

        state.sideBarTroggle = !state.sideBarTroggle;

    }
};

const getters = {
    sideBarTroggle: state => state.sideBarTroggle
};

export default {
    namespaced: true,
    state: initState,
    actions,
    getters,
    mutations
};
