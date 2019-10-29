import request from 'app/libs/request';
// 获取用户列表
const getUserListApi = data => {

  return request({
    url: 'user/userlist',
    method: 'post',
    data
  });

};
// 添加用户
const addUserApi = data => {

  return request({
    url: 'user/addUser',
    method: 'post',
    data
  });

};
// 删除用户
const deleteUserApi = data => {

  return request({
    url: 'user/deleteUser',
    method: 'post',
    data
  });

};
export {
  getUserListApi,
  addUserApi,
  deleteUserApi
};