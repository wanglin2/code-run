const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
    publicPath: '/code-run-online/',
    lintOnSave: false,
    productionSourceMap: false,
    transpileDependencies: [/monaco-editor-textmate/],
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src/')
            }
        },
        plugins: [
            new MonacoWebpackPlugin({
                languages: ['css', 'html', 'javascript', 'less', 'pug', 'scss', 'typescript', 'coffee']
            })
        ]
    }
}