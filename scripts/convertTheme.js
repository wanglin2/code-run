// 转换VSCode主题到Monaco Editor主题
const converter = require('vscode-theme-to-monaco-theme-node')
const path = require('path')

/*
 * 在VSCode里使用命令: `Developer: Generate Color Theme From Current Settings`，即可获取到当前使用的主题文件
 * 在./themeIn目录里新增一个文件，将刚才获取到的json数据复制进去
 * 运行npm run convertTheme，即可完成转换，生成的主题会输出到/public/themes目录下
 * 可以同时转换多个主题文件
 */
const run = async () => {
    try {
        await converter.convertThemeFromDir(path.resolve(__dirname, './vscodeThemes'), path.resolve(__dirname, '../public/themes'));
    } catch (error) {
        console.log(error)
    }
}
run()