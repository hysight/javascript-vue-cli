/*
 * @Author: jiannan.lv
 * @Date: 2019-05-09 10:19:58
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-11-06 15:35:26
 */

import Router from 'koa-router';
import MockUserlistController from '../api/mockUserlist.controller';

//
export default class MockUserlistRouter {
  static routers (app) {

    const router = new Router();
    // 获取用户列表
    router.get('/api/mock/userlist', MockUserlistController.getMockUserlist);
    // 添加用户
    router.get('/api/mock/addUser', MockUserlistController.addMockUser);
    // 编辑用户
    router.get('/api/mock/editUser', MockUserlistController.updateMockUser);
    // 删除用户
    router.get('/api/mock/deleteUser', MockUserlistController.deleteMockUser);

    app.use(router.routes());

  }
};
