
const path = require('path')
module.exports = {
    publicPath: '/code-run-online/',
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src/')
            }
        }
    }
}