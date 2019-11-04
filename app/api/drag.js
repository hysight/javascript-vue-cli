import request from 'app/libs/request';
// 获取流程列表
const getChartListApi = data => {

  return request({
    url: 'drag/chartlist',
    method: 'post',
    data
  });

};
// 添加图表信息
const saveChartApi = data => {

  return request({
    url: 'drag/addchart',
    method: 'post',
    data
  });

};
// 获取流程详情
const getFlowDetailApi = data => {
  return request({
    url: 'drag/flowDetail',
    method: 'post',
    data
  });
};
// 删除流程
const deleteChartApi = data => {

  return request({
    url: 'drag/deleteChart',
    method: 'post',
    data
  });

};
export {
  getChartListApi,
  saveChartApi,
  deleteChartApi,
  getFlowDetailApi
};