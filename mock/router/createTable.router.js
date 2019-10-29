/*
 * @Author: mll
 * @Date: 2018-08-08 17:03:20
 * @LastEditors: mll
 * @LastEditTime: 2018-08-08 17:06:19
 * @Description: 
 */

import Router from 'koa-router';
import CreateTableController from './../api/createTable.controller';

//
class CreateTableRouter {
    static routers(app) {

        const router = new Router();
        router.get('/hysightdata/dataset/project/:appId/tree', CreateTableController.getProjectTree);

        app.use(router.routes());

    }
}

export default CreateTableRouter;
