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