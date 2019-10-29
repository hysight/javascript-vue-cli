/**
 *@Author: hy-zhangb
 *Date: 2018/8/6 11:11
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/8/6 11:11
 *Email: lovewinders@163.com
 *File Path: data - user.router
 *@File Name: user.router
 *@Description: Description
 */
'use strict';
import Router from 'koa-router';
import DataSourceController from './../api/datasource.controller';

//
class DataSourceRouter {
    static routers(app) {

        const router = new Router();
        router.get('/hysightdata/datasource/connections', DataSourceController.getDataSourceConnection);
        router.get('/hysightdata/datasource/tables', DataSourceController.getDataTableList);
        router.get('/hysightdata/datasource/fields', DataSourceController.getDataFieldList);

        app.use(router.routes());

    }
}

export default DataSourceRouter;
