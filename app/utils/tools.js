/*
 * @Description:
 * @Author: jiannan.lv
 * @Date: 2019-05-09 11:11:47
 * @LastEditTime: 2019-10-15 14:25:13
 * @LastEditors: jiannan.lv
 */
// 生成唯一的id
export const _UUID = () => {

    return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {

        let r, v;
        r = Math.random() * 16 | 0;
        v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);

    }));

};
// 生成最终的线
export const filterLine = data => {

    const tempData = { ...data };
    Object.keys(data).map(key => {

        if (data[key].target.id === undefined) delete tempData[key];

    });
    return tempData;

};
// 组件拖动，重新计算线的位置
export const renewalLineList = (lineList, dataList, params) => {
    let tempLineList = { ...lineList };
    const { style = {} } = params.itemData;
    Object.keys(lineList).map(key => {

        let lineParams = {};
        if (lineList[key].source.id === params.itemId) {

            lineParams = {
                x1: lineList[key].source.dirc === 'left' ? parseInt(style.left, 10) : lineList[key].source.dirc === 'right' ? parseInt(style.left, 10) + parseInt(style.width, 10) : parseInt(style.left, 10) + parseInt(style.width, 10) / 2,
                y1: lineList[key].source.dirc === 'top' ? parseInt(style.top, 10) : lineList[key].source.dirc === 'bottom' ? parseInt(style.top, 10) + parseInt(style.height, 10) : parseInt(style.top, 10) + parseInt(style.height, 10) / 2
            };

        } else if (lineList[key].target.id === params.itemId) {

            lineParams = {
                x2: lineList[key].target.dirc === 'left' ? parseInt(style.left, 10) : lineList[key].target.dirc === 'right' ? parseInt(style.left, 10) + parseInt(style.width, 10) : parseInt(style.left, 10) + parseInt(style.width, 10) / 2,
                y2: lineList[key].target.dirc === 'top' ? parseInt(style.top, 10) : lineList[key].target.dirc === 'bottom' ? parseInt(style.top, 10) + parseInt(style.height, 10) : parseInt(style.top, 10) + parseInt(style.height, 10) / 2
            };

        }
        tempLineList[key] = Object.assign({}, tempLineList[key], lineParams);

    });
    return tempLineList;

};
// 去除对象值为空的字段
export const rmObjEmptyFields = obj => {

    if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') return obj;

    return Object.keys(obj).filter(key => typeof obj[key] === 'number' || !!obj[key]).reduce((_obj, key2) => {

        _obj[key2] = obj[key2];

        return _obj;

    }, {});

};

