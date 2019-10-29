/*
 * @Description:
 * @Author: jiannan.lv
 * @Date: 2019-10-15 14:04:22
 * @LastEditTime: 2019-10-15 16:42:57
 * @LastEditors: jiannan.lv
 */
import axios from 'axios';
import qs from 'qs';
import { rmObjEmptyFields } from 'app/utils/tools';
// import store from '../store';
import appConfig from 'app/config/config';

// 创建axios实例
const service = axios.create({
    baseURL: appConfig.API_REQUEST_BASE_URL,
    timeout: appConfig.API_REQUEST_TIMEOUT, // 请求超时时间
    responseType: 'json',
    headers: {
        'Content-Type': appConfig.API_REQUEST_CONTENT_TYPE
    }
});

// request拦截器
service.interceptors.request.use(config => {

    // Do something before request is sent
    // if(store.getters.token) {

    //     config.headers.sessionId = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改

    // }
    // 清除空的参数
    const data = rmObjEmptyFields(config.data);
    if(config.method === 'post') {

        if(config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {

            config.data = qs.stringify(data);

        } else {

            config.data = data;

        }

    } else if(config.method === 'get') {

        config.params = data;

    }
    return config;

}, error => {

    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);

});

// respone拦截器
service.interceptors.response.use(
    response => {

        const config = response.config;
        const data = response.data;
        // 用户没有配置catchAll
        // 如果请求时没有配置responseType,或者配置了json.我们判断返回json的code分别处理
        if(!config.catchAll || !config.responseType || config.responseType === 'json') {

            if(data.code === appConfig.API_SUCCESS_CODE) {

                // 返回code为成功，返回json中的data
                return data.data;

            } else if(data.code === appConfig.API_EXPIRED_CODE) {

                // 如果session过期，注销刷新。路由会自动跳入到登录
                // store.dispatch('logout').then(() => {

                //     window.location.reload();

                // });

            } else {

                // Message.error({
                //   content: data.message,
                //   duration: 1
                // });
                // 否则，我们把message推到异常
                return Promise.reject(data.message);

            }

        }
        // 用户配置catchAll 或者 配置了responeType 不是 JSON。返回response.data;
        else {

            return data;

        }

    },
    error => {

        let message = error.message;
        let tips = false;
        // 获取error message里的关键字，做出相应提示
        if(message.indexOf('timeout') >= 0) {

            message = '请求地址超时';
            tips = true;

        }
        if(message.indexOf('404') >= 0 || message === 'Network Error') {

            message = '请求地址不存在，返回404';
            tips = true;

        }
        // if (tips) {
        //   Message.error({
        //     content: message,
        //     duration: 1
        //   });
        // }
        return Promise.reject(message);

    }
);

export default service;
