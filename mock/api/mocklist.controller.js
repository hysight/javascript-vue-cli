/*
 * @Author: jiannan.lv
 * @Date: 2019-05-09 10:19:58
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-11-05 14:43:23
 */

import Mock from 'mockjs';

export default class MocklistController {
    static async getMockList (ctx, next) {
        ctx.state = 200;
        ctx.body = {
            code: 1,
            msg: '',
            result: Mock.mock({
                // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
                'list|1-10': [{
                    // 属性 id 是一个自增数，起始值为 1，每次增 1
                    'createBy': '',
                    'createTime': 1530511701000,
                    'updateBy': 'demo',
                    'updateTime': 1533558645000,
                    'id': '@id',
                    'name': '重点人库',
                    'alias': '重点人库',
                    'pid': 0,
                    'dataSourceId': 'c10ab5a0-7dbc-11e8-be9a-0242ac130006',
                    'uploadId': null,
                    'type': 'dir',
                    'filePath': null,
                    'absoluteFilePath': null,
                    'dataSetUploadFile': null,
                    'sequence': 23,
                    'children': [
                        {
                            'createBy': '',
                            'createTime': 1530512557000,
                            'updateBy': '1',
                            'updateTime': null,
                            'id': 89,
                            'name': 'ML_SD_TRAIN_SET',
                            'alias': null,
                            'pid': 79,
                            'dataSourceId': '3efcc00f-7dc0-11e8-be9a-0242ac130006',
                            'uploadId': null,
                            'type': 'table',
                            'filePath': null,
                            'absoluteFilePath': null,
                            'dataSetUploadFile': null,
                            'sequence': 1,
                            'children': null,
                            'uploadFile': false
                        },
                        {
                            'createBy': 'demo',
                            'createTime': 1532924060000,
                            'updateBy': 'demo',
                            'updateTime': 1532924060000,
                            'id': 196,
                            'name': 'T_GGQCDPXX',
                            'alias': null,
                            'pid': 79,
                            'dataSourceId': 'c10ab5a0-7dbc-11e8-be9a-0242ac130006',
                            'uploadId': null,
                            'type': 'table',
                            'filePath': null,
                            'absoluteFilePath': null,
                            'dataSetUploadFile': null,
                            'sequence': 7,
                            'children': null,
                            'uploadFile': false
                        }
                    ],
                    'uploadFile': false
                }]
            })
        };

    }
}