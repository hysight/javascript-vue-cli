/*
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-06-27 17:24:38
 * @LastEditTime: 2019-07-05 11:22:07
 * @LastEditors: jiannan.lv
 */
import { _UUID, filterLine, renewalLineList } from 'app/utils/tools';
// 初始化模块数据
const defaultConfig = {
  value: "文本测试",
  style: {
    height: 30,
    width: 200
  }
};
// 拖拽模块状态
const initState = {
  dataList: {},
  lineList: {},
  selectItemId: '',
  scaleBool: true,
  gridBool: true,
  lineBool: false,
  // 线的信息
  lineId: '',
  lineItem: {}
};

const actions = {
  // 选择拖拽元素
  selectDragItem ({ state, commit, rootState }, itemId) {
    commit('updateSelectItemId', itemId);
  },
  // 控制标尺显隐
  updateScaleBool ({ state, commit, rootState }) {
    commit('changeScaleBool');
  },
  // 控制网格显隐
  updateGridBool ({ state, commit, rootState }) {
    commit('changeGridBool');
  },
  // 更新线的状态，控制是否划线
  updateLineBool ({ state, commit, rootState }) {
    commit('changeLineBool');
  },
  // 生成坐标添加到数据列表
  addItemToDataList ({ state, commit, rootState }, e) {
    let tempList = {};
    let itemConfig = JSON.parse(JSON.stringify(defaultConfig));
    const itemId = _UUID();
    itemConfig.style.left = `${e.offsetX - itemConfig.style.width / 2}px`;
    itemConfig.style.top = `${e.offsetY - itemConfig.style.height / 2}px`;
    itemConfig.style.width = `${itemConfig.style.width}px`;
    itemConfig.style.height = `${itemConfig.style.height}px`;
    tempList[itemId] = itemConfig;
    commit('addItem', tempList);
  },
  // 拖拽后组件位置更新到dataList列表
  updateDataList({ state, commit, rootState }, params) {
    commit('changeDatalist', params);
  },
  // 组件拖拽，更新线列表
  updateLineList ({ state, commit, rootState }, params) {
    commit('changeLineList', params);
  },
  // 添加线到线列表
  addLineToLineList ({ state, commit, rootState }, lineItem) {
    commit('addLine', lineItem);
  },
  // ******************************线信息修改***************************
  // lineId修改
  addLineId ({ state, commit, rootState }, lineId) {
    commit('changeLineId', lineId);
  },
  // 更新线的状态信息
  updateLineInfo ({ state, commit, rootState }, lineItem) {
    commit('changeLineInfo', lineItem);
  }
};

const mutations = {
  // 更新选中拖拽组件id
  updateSelectItemId (state, itemId) {
    state.selectItemId = itemId;
  },
  // 控制标尺显隐
  changeScaleBool (state) {
    state.scaleBool = !state.scaleBool;
  },
  // 控制网格显隐
  changeGridBool (state) {
    state.gridBool = !state.gridBool;
  },
  // 控制是否划线
  changeLineBool (state) {
    state.lineBool = !state.lineBool;
  },
  // 添加组件
  addItem (state, tempList) {
    state.dataList = Object.assign({}, state.dataList, tempList);
  },
  // 拖拽组件列表更新
  changeDatalist(state, params) {
    const tempDataList = { ...state.dataList };
    tempDataList[params.id] = params.data;
    state.dataList = tempDataList;
  },
  // 添加线
  addLine (state, lineItem) {
    let bool = false;
    const tempLineList = Object.assign({}, state.lineList, lineItem);
    Object.keys(lineItem).map(key => {
      if (lineItem[key].target) bool = true;
    });
    state.lineList = bool ? filterLine(tempLineList) : tempLineList;
  },
  // 组件拖动，更新线的状态
  changeLineList (state, params) {
    const changeLineList = renewalLineList(state.lineList, state.dataList, params);
    state.lineList = changeLineList;
  },
  //改变线id信息
  changeLineId (state, lineId) {
    state.lineId = lineId;
  },
  //更新线信息
  changeLineInfo (state, lineItem) {
    state.lineItem = lineItem;
  }
};

const getters = {
  dataList: state => state.dataList,
  selectItemId: state => state.selectItemId,
  scaleBool: state => state.scaleBool,
  gridBool: state => state.gridBool,
  lineBool: state => state.lineBool,
  lineList: state => state.lineList,
  lineId: state => state.lineId,
  lineItem: state => state.lineItem
};

export default {
  namespaced: true,
  state: initState,
  actions,
  getters,
  mutations
};