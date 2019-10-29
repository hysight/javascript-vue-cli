/*
 * @Description: 划线公用方法
 * @Author: jiannan.lv
 * @Date: 2019-07-03 14:11:55
 * @LastEditTime: 2019-07-04 15:48:38
 * @LastEditors: jiannan.lv
 */
// 生成线的起始点
export const makeLineStartPoint = (data, type) => {
  const { style } = data;
  const startPointX = type === 'left' ? parseInt(style.left) : type === 'right' ? parseInt(style.left) + parseInt(style.width) : parseInt(style.left) + parseInt(style.width) / 2;
  const startPointY = type === 'top' ? parseInt(style.top) : type === 'bottom' ? parseInt(style.top) + parseInt(style.height) : parseInt(style.top) + parseInt(style.height) / 2;
  const startPoint = {
    x1: startPointX,
    y1: startPointY,
    x2: startPointX,
    y2: startPointY
  };
  return startPoint;
}
// 生成线的终点
export const makeLineEndPoint = (data, type) => {
  const { style } = data;
  const endPointX = type === 'left' ? parseInt(style.left) : type === 'right' ? parseInt(style.left) + parseInt(style.width) : parseInt(style.left) + parseInt(style.width) / 2;
  const endPointY = type === 'top' ? parseInt(style.top) : type === 'bottom' ? parseInt(style.top) + parseInt(style.height) : parseInt(style.top) + parseInt(style.height) / 2;
  const endPoint = {
    x2: endPointX,
    y2: endPointY
  };
  return endPoint;
}