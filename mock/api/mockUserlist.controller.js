/*
 * @Author: jiannan.lv
 * @Date: 2019-05-09 10:19:58
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-11-06 16:09:26
 */

import Mock from 'mockjs';
const count = 25;
// const generateList = () => {
//   const List = Mock.mock({
//     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//     'list|25': [{
//       // 属性 id 是一个自增数，起始值为 1，每次增 1
//       'id': '@id',
//       'name': '@cname',
//       "date": "@date()",//随机生成日期
//       'Address': '@county(true)', // 生成省 市 县组成的地址
//       'Email': '@email',//生成邮箱
//       "avatar": "@image('200x200','red','#fff','avatar')",//生成图片
//       // "mark": Random.cparagraph(0, 5),
//       "description": "@cparagraph()",//描述中文
//       //描述英文
//       // "description": "@paragraph()",

//     }]
//   });
//   return List;
// }
const splitParams = url => {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}
const generateList = () => {
  const tempList = [];
  for (let i = 0; i < count; i++) {
    const listItem = Mock.mock({
      'id': '@id',
      'name': '@cname',
      "date": "@date()",//随机生成日期
      'Address': '@county(true)', // 生成省 市 县组成的地址
      'Email': '@email',//生成邮箱
      "avatar": "@image('200x200','red','#fff','avatar')",//生成图片
      // "mark": Random.cparagraph(0, 5),
      "description": "@cparagraph()",//描述中文
    });
    tempList.push(listItem);
  }
  return tempList;
}
let mockList = generateList();
export default class MockUserlistController {
  // 获取数据列表
  static async getMockUserlist (ctx, next) {
    const fetchUrl = ctx.request.url;
    const { page = 1, pageSize = 10, key = '' } = splitParams(fetchUrl);
    const tempPageList = key ? mockList.filter(u => u.name.indexOf(key) >= 0 || u.Address.indexOf(key) >= 0) : mockList;
    const pageList = tempPageList.filter((item, index) => index < Number(pageSize) * Number(page) && index >= Number(pageSize) * (Number(page) - 1));
    ctx.state = 200;
    ctx.body = {
      code: '000000',
      message: 'success',
      data: Object.assign({}, { list: pageList, page: Number(page), pageSize: Number(pageSize), total: mockList.length })
    };
  }
  // 添加用户
  static async addMockUser (ctx, next) {
    const fetchUrl = ctx.request.url;
    const { name, date, Address, Email, description, id = '' } = splitParams(fetchUrl);
    if (id) {
      mockList.some(u => {
        if (u.id === id) {
          u.name = name;
          u.date = date;
          u.Address = Address;
          u.Email = Email;
          u.description = description;
          return true
        }
      });
    } else {
      const listItem = {
        id: Mock.Random.id(),
        name: name,
        date: date,
        Address: Address,
        Email: Email,
        avatar: Mock.Random.image('200x200', 'red', '#fff', 'avatar'),
        description: description
      };
      mockList.push(listItem);
    }
    ctx.state = 200;
    ctx.body = {
      code: '000000',
      message: 'success',
      data: id ? '编辑成功' : '添加成功'
    };
  }
  // 编辑用户
  static async updateMockUser (ctx, next) {
    const fetchUrl = ctx.request.url;
    const { name, date, Address, Email, description } = splitParams(fetchUrl);
    mockList.some(u => {
      if (u.id === id) {
        u.name = name;
        u.date = date;
        u.Address = Address;
        u.Email = Email;
        u.description = description;
        return true
      }
    });
    ctx.state = 200;
    ctx.body = {
      code: '000000',
      message: 'success',
      data: '删除成功'
    };
  }
  // 删除用户
  static async deleteMockUser (ctx, next) {
    const fetchUrl = ctx.request.url;
    const { id } = splitParams(fetchUrl);
    mockList = mockList.filter(u => u.id !== id);
    ctx.state = 200;
    ctx.body = {
      code: '000000',
      message: 'success',
      data: '删除成功'
    };
  }
}