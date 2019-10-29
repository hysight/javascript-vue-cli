/*
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-10-15 09:01:30
 * @LastEditTime: 2019-10-15 09:09:03
 * @LastEditors: jiannan.lv
 */

// const configs = require('./build/config/product.config');
const path = require('path');
const express = require('express');
// const proxy = require('http-proxy-middleware');
const compression = require('compression');

const app = express();

// gzip
app.use(compression());

// server static resource
app.use(
    express.static(path.join(__dirname, 'server'), {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        setHeaders: (res, path, stat) => {

            res.set('Access-Control-Allow-Origin', '*');

        }
    })
);

// Unmatched static resource, redirect to index.html ->  router
app.use('*', (req, res) => res.sendFile(path.join(__dirname, 'server', 'data', 'index.html')));

// compiler
app.listen(3013, function(err) {

    if(err) {
        console.log(err);
        return;
    }
    console.log(`--====> 💻 start data Listening at Open http://localhost:3013 <====----`);

});
