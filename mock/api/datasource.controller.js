/*
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-05-09 11:11:47
 * @LastEditTime: 2019-05-16 16:52:38
 * @LastEditors: jiannan.lv
 */
'use strict';
import Mock from 'mockjs';

class DataSourceController {
    static async getDataSourceConnection(ctx, next) {

        ctx.state = 200;
        ctx.body = {
            code: 1,
            msg: '',
            result: Mock.mock({
                // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
                'list|1-10': [{
                    // 属性 id 是一个自增数，起始值为 1，每次增 1
                    'dsId': '@id',
                    'dsName': '@ctitle',
                    'ip': '@ip',
                    'version': /v\d{2}\.\d{2}\.\d/,
                    'createBy': '@cname',
                    'updateBy': '@cname',
                    'updateTime': '@datetime'
                }]
            })
        };

    }
    static async getDataTableList(ctx, next) {

        // console.log('<<<<------------>>>>', this, ctx);

        ctx.state = 200;
        ctx.body = {
            code: 1,
            msg: '',
            result: Mock.mock({
                // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
                'list|10-20': [{
                    // 属性 id 是一个自增数，起始值为 1，每次增 1
                    'dsId': '@id',
                    'dsName': '2018年@ctitle'
                }]
            })
        };

    }
    static async getDataFieldList(ctx, next) {

        ctx.state = 200;
        ctx.body =
            Mock.mock({
                'code': 1,
                'msg': '',
                // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
                'result|10-20': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                    'fieldId': '@id',
                    'fieldName': '@ctitle',
                    'fieldType|+1': ['文本', '信息', '数值'],
                    'fieldAlias': '@ctitle',
                    'type': '0',
                    'identityName': '@id',
                    'datasetId': '@id',
                    'position': 1,
                    'description': '@ctitle'
                }]
            });

    }
}

export default DataSourceController;
