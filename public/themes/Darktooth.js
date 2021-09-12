window.monaco.editor.defineTheme('Darktooth', {
    base: "vs-dark",
    inherit: true,
    rules: [
        // 没有匹配到的其他所有字符
        {
            "token": "",
            "foreground": "FDF4C1"
        },
        // 注释
        {
            "token": "comment",
            "foreground": "7C6F64"
        },
        // 文档类型注释，比如：/**sfdhg**/
        {
            "token": "comment.doc",
            "foreground": "7C6F64"
        },
        // 数字
        {
            "token": "number",
            "foreground": "D3869B"
        },
        // 正则表达式
        {
            "token": "regexp",
            "foreground": "528B8B"
        },
        // 大写字母开头的变量
        {
            "token": "type",
            "foreground": "FDF4C1"
        },
        // 分隔符，比如()%=-;[]:.{},!等
        {
            "token": "delimiter",
            "foreground": "DD6F48"
        },
        // html文件，分隔符
        {
            "token": "delimiter.html",
            "foreground": "DD6F48"
        },
        // 大括号
        {
            "token": "delimiter.bracket",
            "foreground": "DD6F48"
        },
        // html文件，标签名
        {
            "token": "tag",
            "foreground": "A89984"
        },
        // html元标签内容，比如<!DOCTYPE html>里的html
        {
            "token": "metatag.content.html",
            "foreground": "83A598"
        },
        // html元标签，比如<!DOCTYPE html>里的!DOCTYPE
        {
            "token": "metatag.html",
            "foreground": "A89984"
        },
        // html文件、css文件，属性名
        {
            "token": "attribute.name",
            "foreground": "FE8019"
        },
        // html文件，属性名
        {
            "token": "attribute.name.html",
            "foreground": "83A598"
        },
        // css文件，属性值
        {
            "token": "attribute.value",
            "foreground": "FE8019"
        },
        // 字符串
        {
            "token": "string",
            "foreground": "528B8B"
        },
        // 非法字符串
        {
            "token": "string.invalid",
            "foreground": "528B8B"
        },
        // 关键词
        {
            "token": "keyword",
            "foreground": "DD6F48"
        },
        // 标识符
        {
            "token": "identifier",
            "foreground": "83A598"
        },
        // css文件，属性值为数字
        {
            "token": "attribute.value.number.css",
            "foreground": "D3869B"
        },
        // 属性值为数字，比如less文件
        {
            "token": "attribute.value.number",
            "foreground": "D3869B"
        },
        // css文件，属性值的单位
        {
            "token": "attribute.value.unit.css",
            "foreground": "DD6F48"
        },
        // 属性值的单位，比如less文件
        {
            "token": "attribute.value.unit",
            "foreground": "DD6F48"
        },
        // css文件，16进制，常见于颜色值
        {
            "token": "attribute.value.hex.css",
            "foreground": "BBAA97"
        },
        // html文件，属性值
        {
            "token": "attribute.value.html",
            "foreground": "528B8B"
        }
    ],
    colors: {
        "editor.background": "#282828",
        "editor.foreground": "#FDF4C1",
        "selection.background": "#30434C",
    }
})