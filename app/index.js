/*
 * @Author: jiannan.lv
 * @Date: 2019-05-09 10:19:58
 * @Last Modified by: jiannan.lv
 * @Last Modified time: 2019-05-09 13:51:41
 */
import Vue from 'vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import 'app/styles/reset.scss';
import 'app/styles/index.scss';
import App from 'app/views/App/index.vue';
import router from 'app/routes';
import store from './store';

Vue.use(ViewUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#App',
    router,
    store,
    render: h => h(App)
});
