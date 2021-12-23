// 编译@vue/compiler-sfc为浏览器版本
// 输出到/public/parses/文件夹下
const webpack = require('webpack');
const path = require('path');

webpack({
    entry: './node_modules/@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js',
    output: {
        filename: 'vue3.js',
        path: path.resolve(__dirname, '../public', 'parses'),
        library: 'Vue3TemplateCompiler',
        libraryTarget: 'umd'
    },
    externals: {
        fs: 'fs'
    }
}, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log(err)
        console.log(stats.toString({
            chunks: false,
            colors: true
        }));
    } else {
        console.log('完成')
    }
})