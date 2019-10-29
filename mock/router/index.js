/**
 *@Author: hy-zhangb
 *Date: 2018/8/6 11:11
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/8/6 11:11
 *Email: lovewinders@163.com
 *File Path: data - index
 *@File Name: index
 *@Description: Description
 */
'use strict';
// ROOT ROUTER
import DataSourceRouter from './datasource.router';
import CreateTableRouter from './createTable.router';

class RootRouter {
    static routes(app) {

        DataSourceRouter.routers(app);
        CreateTableRouter.routers(app);

    }
}

export default RootRouter;
