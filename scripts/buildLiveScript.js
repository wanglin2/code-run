// 编译LiveScript为浏览器版本
// 输出到/public/parses/文件夹下
const webpack = require('webpack');
const path = require('path');

webpack({
    entry: './node_modules/livescript/lib/browser.js',
    output: {
        filename: 'livescript.js',
        path: path.resolve(__dirname, '../public', 'parses'),
        library: "LiveScript",
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