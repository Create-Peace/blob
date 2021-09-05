/**
 * 公共配置
 */
 const path = require('path');
 const webpack = require('webpack');
 const pkg = require('./package.json');
 const VueLoaderPlugin = require('vue-loader/lib/plugin');
 
 function resolve(dir) {
     return path.join(__dirname, '..', dir);
 }
 
 module.exports = {
     // 加载器
     module: {
         // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
         rules: [{   // 添加解析 .vue文件loader
             test: /\.vue$/,
             loader: 'vue-loader'
         }, {        // 添加解析 .css文件loader
             test: /\.css(\?.*)?$/,
             use: [  // loader 顺序不能乱
                 'vue-style-loader',
                 'style-loader',
                 'css-loader'
             ]
         }, {
             test: /\.less$/,
             use: [
                 'vue-style-loader',
                 'css-loader',
                 'less-loader'
             ]
         },
         { // 配置sass语法支持，并且使用的是缩进格式
             test: /\.s[ac]ss$/,
             use: [
                 'css-loader',
                 {
                     loader: 'sass-loader',
                     options: {
                         sassOptions: {
                             indentedSyntax: true // 如需使用花括号嵌套模式则设置为false
                         }
                     }
                 }
             ]
         }, { // 配置Babel将ES6+ 转换为ES5
             test: /\.js(\?.*)?$/,
             exclude: file => ( // 排除node_modules文件夹
                 /node_modules/.test(file) &&
                 !/\.vue\.js/.test(file)
             ),
             use: {
                 loader: 'babel-loader',
                 options: {
                     presets: ['@babel/preset-env'],
                     plugins: ['@babel/plugin-transform-runtime']
                 }
             }
         }, { // 配置图片文件加载
             test: /\.(png|jpe?g|gif|tif?f|bmp|webp|svg)(\?.*)?$/,
             use: {
                 loader: 'url-loader',
                 options: {
                     limit: 10000,
                     esModule: false
                 }
             }
         }, { // 配置字体文件加载
             test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
             use: {
                 loader: 'file-loader',
                 options: {
                     esModule: false,
                     limit: 10000
                 }
             }
         }, { // 处理node文件
             test: /\.node$/,
             loader: 'node-loader'
         }]
 
     },
     resolve: {
         extensions: ['.js', '.vue'],
         alias: {
             'vue': 'vue/dist/vue.esm.js',
             '@': resolve('src')
         }
     },
     plugins: [
         new VueLoaderPlugin(),
         new webpack.optimize.ModuleConcatenationPlugin(),
        //  new webpack.DefinePlugin({
        //      'process.env.VERSION': `'${pkg.version}'`
        //  }),
     ]
 };