/*
 * @Description:
 * @Author: jiannan.lv
 * @Date: 2019-10-15 13:55:09
 * @LastEditTime: 2019-10-15 16:26:26
 * @LastEditors: jiannan.lv
 */
import request from 'app/libs/request';
// 获取列表
const getMockUserlistApi = data => {

  return request({
    url: '/mock/userlist',
    method: 'get',
    data
  });

};
// 新增用户
const addMockUserApi = data => {

  return request({
    url: '/mock/addUser',
    method: 'get',
    data
  });

};
// 编辑用户
const updateMockUserApi = data => {

  return request({
    url: '/mock/updateUser',
    method: 'get',
    data
  });

};
// 删除用户
const deleteMockUserApi = data => {

  return request({
    url: '/mock/deleteUser',
    method: 'get',
    data
  });

};
export {
  getMockUserlistApi,
  deleteMockUserApi,
  addMockUserApi,
  updateMockUserApi
};
