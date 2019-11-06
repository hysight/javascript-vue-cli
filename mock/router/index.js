/*
 * @Author: jiannan.lv
 * @Date: 2019-05-09 10:19:58
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-11-05 15:31:59
 */
'use strict';
// ROOT ROUTER
import MocklistRouter from './mocklist.router';
import MockUserlistRouter from './mockUserlist.router';

class RootRouter {
    static routes (app) {

        MocklistRouter.routers(app);
        MockUserlistRouter.routers(app);

    }
}

export default RootRouter;
