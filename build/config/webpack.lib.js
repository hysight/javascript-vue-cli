/**
 *@Author: hy-zhangb
 *Date: 2018/5/7 10:41
 * @Last Modified by: jiannan.lv
 * @Last Modified time: 2019-05-09 11:40:52
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - webpack.config
 *@File Name: webpack.config
 *@Description: Description
 */
const configs = require('./product.config');

const path = require('path');
const webpack = require('webpack');
// const debug = require('debug')('app:bin:lib');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// ----------------------------------
// get dev || pro Configuration
// ----------------------------------
const {
  env,
  DIR_BASE_PATH, 
  DIR_DIST_JS,
  paths: { assignPath, dist },
  globals: { __PROD__ }
} = configs;

// ----------------------------------
// vendors Configuration
// ----------------------------------
const vendors = ['vue'];

// ----------------------------------
// dll Config Configuration
// ----------------------------------
const dllConfig = {
    cache: true,
    mode: env,
    node: {
        fs: 'empty'
    },
    entry: {
        vendors
    },
    output: {
        // 打包产出后文件存放位置
        path: dist,
        // entry chunk产出时的文件名称
        filename: `${DIR_DIST_JS}/[name].lib.[hash:5].js`,
        // async chunk产出时的文件名称
        chunkFilename: `${DIR_DIST_JS}/[name].chunk.[libhash:5].js`,
        library: '[name]_lib_[hash:5]'
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.style', '.sass', '.scss', 'less'],
        alias: {
            react: path.join(process.cwd(), 'node_modules/react'),
            'react-dom': path.join(process.cwd(), 'node_modules/react-dom')
        }
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: [
                    {
                        loader: 'json-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, './[name]-manifest.json'),
            name: '[name]_lib_[hash:5]',
            context: __dirname
        }),
        new CleanWebpackPlugin([assignPath(dist, DIR_DIST_JS, 'vendors.lib*')], {
            root: DIR_BASE_PATH,
            // exclude: ['index.html', 'lib*', 'resource*', 'stats.json'],
            verbose: true,
            dry: false
        })
    ]
};

// 生产模式下压缩vendors.dll.js文件
if (__PROD__) {

    // ----------------------------------
    // optimization Configuration
    // ----------------------------------
    dllConfig.optimization = {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    };

}

module.exports = dllConfig;
