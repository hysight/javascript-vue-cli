/*
 * @Author: jiannan.lv
 * @Date: 2019-05-09 13:46:37
 * @Last Modified by: jiannan.lv
 * @Last Modified time: 2019-05-09 13:59:42
 */
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
const appRouter = [
    {
        path: '/login',
        name: 'login',
        component: () => import('app/views/Login/login.vue')
    },
    {
        path: '/',
        component: () => import('app/views/Layout/layout.vue'),
        redirect: 'home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('app/containers/Home/home.vue'),
                meta: {
                    name: '主页'
                }
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('app/views/UserList/userlist.vue'),
                meta: {
                    name: '用户列表'
                }
            },
            {
                path: '/echarts',
                name: 'echarts',
                component: () => import('app/views/Echarts/echarts.vue'),
                meta: {
                    name: '图表'
                }
            },
            {
                path: '/comCon',
                name: 'comCon',
                component: () => import('app/containers/ComCon/comCon.vue'),
                meta: {
                    name: '公用组件'
                }
            },
            {
                path: '/dragCon',
                name: 'dragCon',
                component: () => import('app/views/Drag/dragCon.vue'),
                meta: {
                    name: '拖拽组件'
                }
            }
        ]
    }
];
// 所有上面定义的路由都要写在下面的routers里
export default [
    ...appRouter
];
