// 打包Monaco Editor的worker文件
// 输出到/public/monaco文件夹下
// 参考：https://github.com/microsoft/monaco-editor-samples/tree/main/browser-esm-webpack
const webpack = require('webpack');
const path = require('path');

webpack({
    entry: {
        'editor.worker': './node_modules/monaco-editor/esm/vs/editor/editor.worker.js',
        'json.worker': './node_modules/monaco-editor/esm/vs/language/json/json.worker',
        'css.worker': './node_modules/monaco-editor/esm/vs/language/css/css.worker',
        'html.worker': './node_modules/monaco-editor/esm/vs/language/html/html.worker',
        'ts.worker': './node_modules/monaco-editor/esm/vs/language/typescript/ts.worker'
    },
    output: {
        globalObject: 'self',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../public', 'monaco')
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ttf$/,
                use: ['file-loader']
            }
        ]
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