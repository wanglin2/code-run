const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
    publicPath: '/code-run-online/',
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src/')
            }
        },
        plugins: [
            new MonacoWebpackPlugin({
                languages: []
            })
        ]
    }
}