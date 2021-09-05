const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require("glob");
const { truncate } = require('fs');


console.log('dist::', resolve(__dirname, './dist'))


function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const getEntries = (globPath, flag) => {
    const files = glob.sync(globPath);

    let entries = {},
        entry, dirname, basename, pathname, extname;

    files.forEach(item => {
        entry = item;
        dirname = path.dirname('./public');//当前目录
        extname = path.extname(entry);//后缀
        basename = path.basename(entry, extname);//文件名
        pathname = path.join(dirname, basename);//文件路径
        if (extname === '.html') {
            entries[pathname] = './' + entry;
        } else if (extname === '.js') {
            entries[basename] = entry;
        }
    });

    return entries;
}

// const entries = getEntries('./src/main.js');

process.env.NODE_ENV = 'production';

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    entry: './src/main.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, './dist/'),
        publicPath: '/',
        filename: '[name].js',
    },
    // externals: {
    //     vue: {
    //         root: 'Vue',
    //         commonjs: 'vue',
    //         commonjs2: 'vue',
    //         amd: 'vue'
    //     },
    // },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: true
        }),
        // @todo
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"production"'
        // }),
        new TerserPlugin({
            parallel: true,
        })
    ],
    devServer: {
        static:{
            directory: path.join(__dirname, './dist')
        }, 
        compress: false,
        port: 3000,
        open: true,
        hot: true,
    }
});