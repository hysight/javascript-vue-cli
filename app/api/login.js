/*
 * @Description:
 * @Author: jiannan.lv
 * @Date: 2019-10-15 13:55:09
 * @LastEditTime: 2019-10-15 16:26:26
 * @LastEditors: jiannan.lv
 */
import request from 'app/libs/request';

const loginApi = data => {

    return request({
        url: '/login',
        method: 'post',
        data
    });

};
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
export {
    loginApi,
    getUserListApi,
    addUserApi
};
