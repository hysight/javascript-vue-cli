/*
 * @Description:
 * @Author: jiannan.lv
 * @Date: 2019-05-09 11:11:47
 * @LastEditTime: 2019-10-17 13:58:12
 * @LastEditors: jiannan.lv
 */
const configs = require('./product.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VendorsJson = require('./vendors-manifest.json');

// ----------------------------------
// get dev || pro Configuration
// ----------------------------------
const {
    COMPILER_PUBLIC_PATH,
    LESS_MODIFY_VARS,
    DIR_DIST_JSON,
    DIR_DIST_JS,
    DIR_DIST_CSS,
    DIR_DIST_FONTS,
    DIR_DIST_IMAGES,
    paths: { assignPath, client, dist }
} = configs;

// ----------------------------------
// entry Dev Configuration
// ----------------------------------
const entry = {
    app: [assignPath(client, 'index.js')]
};

// ----------------------------------
// module Pro Configuration
// ----------------------------------
const modules = {
    rules: [
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true // css压缩
                    }
                },
                {
                    loader: 'postcss-loader'
                }
            ]
        },
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true // css压缩
                    }
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'sass-loader',
                    options: {
                        // data: '$env: ' + process.env.NODE_ENV + ';'
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true // css压缩
                    }
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true,
                        modifyVars: LESS_MODIFY_VARS
                    }
                }
            ]
        },
        {
            test: /\.(svg|woff2?|ttf|eot)(\?.*)?$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: `${DIR_DIST_FONTS}`
                    }
                }
            ]
        },
        {
            test: /\.(jpe?g|png|gif)(\?.*)?$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: `${DIR_DIST_IMAGES}`
                    }
                }
            ]
        },
        {
            type: 'javascript/auto',
            test: /\.(json)(\?.*)?$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: `${DIR_DIST_JSON}`
                    }
                }
            ]
        }
    ]
};

// ----------------------------------
// optimization Configuration
// ----------------------------------
const optimization = {
    // minimize: true,
    minimizer: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // set to true if you want JS source maps
            uglifyOptions: {
                compress: {
                    // 删除所有的 `console` 语句
                    drop_console: true
                }
            }
        }),
        new OptimizeCSSAssetsPlugin({})
    ]
};

// ----------------------------------
// plugins Configuration
// ----------------------------------
const plugins = [
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: VendorsJson
    }),
    new HtmlWebpackPlugin({
        title: 'Hysight-data',
        hash: false,
        chunks: ['app'],
        // favicon: assignPath(client, 'logo.png'),
        favicon: assignPath(client, 'favicon.ico'),
        chunksSortMode: 'manual',
        inject: true,
        cache: false,
        minify: {
            collapseWhitespace: true
        },
        filename: 'index.html',
        template: assignPath(client, 'index.html')
    }),
    new AddAssetHtmlPlugin({
        includeSourcemap: false,
        filepath: assignPath(dist, DIR_DIST_JS, 'vendors.lib*.js'),
        outputPath: DIR_DIST_JS,
        publicPath: `${COMPILER_PUBLIC_PATH}${DIR_DIST_JS}`
    }),
    new MiniCssExtractPlugin({
        filename: `${DIR_DIST_CSS}/[name].min.[chunkhash:5].css`,
        chunkFilename: `${DIR_DIST_CSS}/[id].min.[chunkhash:5].css`
    }),
    // 作用域提升
    new webpack.optimize.ModuleConcatenationPlugin() /* ,
    new webpack.optimize.UglifyJsPlugin({
        // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,
        compress: {
            warnings: false,
            // 删除所有的 `console` 语句
            // 还可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
        }
    })*/
];

// ----------------------------------
// webpack Dev Config Configuration
// ----------------------------------
const webpackProConfig = {
    entry,
    optimization,
    plugins,
    module: modules
};

module.exports = webpackProConfig;
