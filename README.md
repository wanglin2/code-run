# code-run

一个代码在线编辑预览工具，类似`codepen`。

在线使用：[http://lxqnsys.com/code-run/](http://lxqnsys.com/code-run/)，在线版支持用户登录相关功能，支持云端保存与分享，本仓库的代码不包含该部分功能，如有需要，可邮件联系：`1013335014@qq.com`。

项目设计思路及开发过程可参考文章：[https://juejin.cn/post/6965467528600485919](https://juejin.cn/post/6965467528600485919)。

# 特性

- [x] 支持多种预处理语言

- [x] 支持多种布局随意切换

- [x] 支持添加额外的`css`、`js`资源

- [x] 内置多种常用模板

- [x] 支持导出`zip`

- [x] 支持代码格式化

- [x] 美观强大的控制台

# 安装

```bash
npm i @wanglin1994/code-run
```

# 启动&打包

```bash
git clone https://github.com/wanglin2/code-run.git

cd code-run

npm i

npm run dev

npm run build
```

# 依赖

视图库：`VUE 3.X`

UI库：`element-plus`

编辑器：`Monaco Editor`

# 界面截图

![界面截图1](./assets/Jietu20210830-220337.jpg)

![界面截图2](./assets/Jietu20210830-220311.jpg)

# 主题新增教程

本教程针对迁移vscode主题。
1.确定要新增的主题，先在本地vscode上安装并切换到该主题，然后去[vscode主题商店](https://marketplace.visualstudio.com/search?target=VSCode&category=Themes&sortBy=Installs)搜索该主题，进入主题详情页面后点击右侧的【Download Extension】按钮下载该主题
2.找到刚才下载的vscode主题，文件应该是以.vsix结尾的，直接把该后缀改成.zip，然后解压缩，打开其中的/extension/themes/文件夹，里面的.json文件即主题文件，打开该文件
3.在本项目的/public/themes/目录下新增主题文件，文件名即主题名，内容模板可复制example.js里面的【内容模板】,如果新增的是亮色主题，那么`base`选项使用`vs`，暗色主题，`base`选项修改为`vs-dark`, 然后去/src/config/constants.js文件里找到【codeThemeList】配置，新增一项，`value`值即刚才创建的文件名，现在即可以在设置里切换到该主题
4.接下来填充刚才创建的主题文件，【colors】选项直接去复制最开始打开的主题文件里的【colors】选项的内容。【rules】选项里的每一个`foreground`字段代表该`token`的颜色，可以打开/public/themes/目录下的三个测试文件：`test.js`、`test.css`、`test.html`，然后根据【rules】选项里的每一项的`token`注释，找到在测试文件里的对应内容，比如要确定【注释】`comment`的颜色，可以打开`test.js`文件，然后使用快捷键`command + shift + p`，然后找到并点击`Developer:Inspect Editor Tokens and Scopes`，然后再将鼠标点击到【注释】代码上，就会显示出该注释对应的颜色，复制并粘贴到【rules】选项里即可，注意【rules】里的颜色值不需要带`#`，颜色值全部填充完即可刷新页面查看效果