/*
 * @Author: jiannan.lv
 * @Date: 2019-05-09 13:48:53
 * @Last Modified by: jiannan.lv
 * @Last Modified time: 2019-05-09 13:50:53
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    routes
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {

    const token = sessionStorage.getItem('token');
    if(!token && to.name !== 'login') {

        next({ name: 'login' });

    } else if(!token && to.name === 'login') {

        next();

    } else if(token && to.name !== 'login') {

        next();

    } else if(token && (from.name === 'login' || from.name === null) && to.name !== 'login') {

        next({ path: 'home' });

    } else {

        next();

    }

});

router.afterEach((to) => {

    window.scrollTo(0, 0);

});
export default router;
