/*
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-06-27 17:24:38
 * @LastEditTime: 2019-07-05 11:22:07
 * @LastEditors: jiannan.lv
 */
import { _UUID, filterLine, renewalLineList } from 'app/utils/tools';
// 拖拽模块状态
const initState = {
  dataList: {},
  lineList: {},
  selectItemId: '',
  scaleBool: true,
  gridBool: true,
  lineBool: false,
  editBool: false,
  // 线的信息
  lineId: '',
  lineItem: {},
  // 临时保存拖拽信息
  unitItem: {},
  // 右键菜单
  menuInfo: {
    show: false,
    left: 0,
    top: 0
  }
};

const actions = {
  // 初始化元素列表
  initDataList ({ state, commit, rootState }, list) {
    commit('initListData', list);
  },
  // 初始化线列表
  initLineList ({ state, commit, rootState }, list) {
    commit('initListLine', list);
  },
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
  updateLineBool ({ state, commit, rootState }, status) {
    commit('changeLineBool', status);
  },
  // 生成坐标添加到数据列表
  addItemToDataList ({ state, commit, rootState }, data) {
    let tempList = {};
    let itemConfig = JSON.parse(JSON.stringify(data.unitItem));
    // let itemConfig = { ...data.unitItem };
    const itemId = _UUID();
    itemConfig.style.left = `${data.e.offsetX - parseInt(itemConfig.style.width) / 2}px`;
    itemConfig.style.top = `${data.e.offsetY - parseInt(itemConfig.style.height) / 2}px`;
    itemConfig.style.width = itemConfig.style.width;
    itemConfig.style.height = itemConfig.style.height;
    tempList[itemId] = itemConfig;
    commit('addItem', tempList);
  },
  // 删除元素
  deleteDataListItem ({ state, commit, rootState }) {
    const id = state.selectItemId;
    delete state.dataList[id];
    Object.keys(state.lineList).forEach(key => {
      if (state.lineList[key].source.id === id || state.lineList[key].target.id === id) {
        delete state.lineList[key];
      }
    });
    commit('initListData', state.dataList);
    commit('initListLine', state.lineList);
    commit('updateSelectItemId', '');
  },
  // 拖拽后组件位置更新到dataList列表
  updateDataList ({ state, commit, rootState }, params) {
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
  },
  // 保存临时拖拽信息
  saveUnitItem ({ state, commit, rootState }, unitItem) {
    commit('updateUnitItem', unitItem);
  },
  // 更新右键菜单信息
  updateContextMenu ({ state, commit, rootState }, menuInfo) {
    commit('changeContextMenu', menuInfo);
  },
  // 更新编辑框状态
  updateEditBool ({ state, commit, rootState }, status) {
    commit('changeEditBool', status);
  }
};

const mutations = {
  // 初始化元素列表
  initListData (state, list) {
    state.dataList = { ...list };
  },
  // 初始化元素列表
  initListLine (state, list) {
    state.lineList = { ...list };
  },
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
  changeLineBool (state, status) {
    state.lineBool = status === false ? status : !state.lineBool;
  },
  // 添加组件
  addItem (state, tempList) {
    state.dataList = Object.assign({}, state.dataList, tempList);
  },
  // 拖拽组件列表更新
  changeDatalist (state, params) {
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
  },
  // 更新临时拖拽信息
  updateUnitItem (state, unitItem) {
    state.unitItem = unitItem;
  },
  // 更新右键菜单信息
  changeContextMenu (state, menuInfo) {
    state.menuInfo = menuInfo;
  },
  // 更新编辑框状态
  changeEditBool (state, status) {
    state.editBool = status;
  }
};

const getters = {
  dataList: state => state.dataList,
  selectItemId: state => state.selectItemId,
  scaleBool: state => state.scaleBool,
  gridBool: state => state.gridBool,
  lineBool: state => state.lineBool,
  editBool: state => state.editBool,
  lineList: state => state.lineList,
  lineId: state => state.lineId,
  lineItem: state => state.lineItem,
  unitItem: state => state.unitItem,
  menuInfo: state => state.menuInfo
};

export default {
  namespaced: true,
  state: initState,
  actions,
  getters,
  mutations
};