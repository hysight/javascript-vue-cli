/*
 * @Author: jiannan.lv
 * @Date: 2019-05-09 10:19:58
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-11-05 15:28:45
 */

import Router from 'koa-router';
import MocklistController from '../api/mocklist.controller';

//
class MocklistRouter {
    static routers (app) {

        const router = new Router();
        router.get('/mock/mocklist', MocklistController.getMockList);

        app.use(router.routes());

    }
}

export default MocklistRouter;
