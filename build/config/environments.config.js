/**
 *@Author: hy-zhangb
 *Date: 2018/5/7 9:37
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/5/7 9:37
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - environments
 *@File Name: environments
 *@Description: Description
 */
// const webpackDevConfig = require('./webpack.config.dev');
// const webpackProConfig = require('./webpack.config.pro');

module.exports = {
    // ======================================================
    // Overrides when NODE_ENV === 'development'
    // ======================================================
    development: ({ CLIENT_HOST, CLIENT_PORT, CLIENT_NAME, SERVER_HOST, SERVER_PORT, SERVER_NAME }) => ({
        // config
        COMPILER_HOST: CLIENT_HOST,
        COMPILER_PORT: CLIENT_PORT,
        COMPILER_NAME: CLIENT_NAME,
        COMPILER_HASH_TYPE: 'dev',
        COMPILER_DEVTOOL: 'cheap-module-eval-source-map',
        COMPILER_PUBLIC_PATH: `/${CLIENT_NAME ? `${CLIENT_NAME}/` : ''}`
    }),
    // ======================================================
    // Overrides when NODE_ENV === 'production'
    // ======================================================
    production: ({ CLIENT_HOST, CLIENT_PORT, CLIENT_NAME, SERVER_HOST, SERVER_PORT, SERVER_NAME }) => ({
        COMPILER_HOST: SERVER_HOST,
        COMPILER_PORT: SERVER_PORT,
        COMPILER_NAME: SERVER_NAME,
        COMPILER_HASH_TYPE: '[chunkhash:5]',
        COMPILER_DEVTOOL: 'cheap-module-source-map',
        COMPILER_PUBLIC_PATH: `/${SERVER_NAME ? `${SERVER_NAME}/` : ''}`
    })
};
