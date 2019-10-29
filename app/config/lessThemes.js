/**
 *@Author: hy-zhangb
 *Date: 2018/3/30 17:43
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/3/30 17:43
 *Email: lovewinders@163.com
 *File Path: robot-study - lessThemes
 *@File Name: lessThemes
 *@Description: Description
 */
const lessThemes = {
    "icon-url": "/public/fonts/antd/iconfont"
};

export default Object.entries(lessThemes).reduce((pre, [k, v]) => Object.assign({}, pre, {[k]: JSON.stringify(v)}), {});