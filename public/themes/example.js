// -----------  内容模板  -----------
window.monaco.editor.defineTheme('【主题名，也就是新创建的文件名】', {
    base: "vs-dark",
    inherit: true,
    rules: [
        // 没有匹配到的其他所有字符
        {
            "token": "",
            "foreground": ""
        },
        // 注释
        {
            "token": "comment",
            "foreground": ""
        },
        // 文档类型注释，比如：/**sfdhg**/
        {
            "token": "comment.doc",
            "foreground": ""
        },
        // 数字
        {
            "token": "number",
            "foreground": ""
        },
        // 正则表达式
        {
            "token": "regexp",
            "foreground": ""
        },
        // 大写字母开头的变量
        {
            "token": "type",
            "foreground": ""
        },
        // 分隔符，比如()%=-;[]:.{},!等
        {
            "token": "delimiter",
            "foreground": ""
        },
        // html文件，分隔符
        {
            "token": "delimiter.html",
            "foreground": ""
        },
        // 大括号
        {
            "token": "delimiter.bracket",
            "foreground": ""
        },
        // html文件，标签名
        {
            "token": "tag",
            "foreground": ""
        },
        // html元标签内容，比如<!DOCTYPE html>里的html
        {
            "token": "metatag.content.html",
            "foreground": ""
        },
        // html元标签，比如<!DOCTYPE html>里的!DOCTYPE
        {
            "token": "metatag.html",
            "foreground": ""
        },
        // html文件、css文件，属性名
        {
            "token": "attribute.name",
            "foreground": ""
        },
        // html文件，属性名
        {
            "token": "attribute.name.html",
            "foreground": ""
        },
        // css文件，属性值
        {
            "token": "attribute.value",
            "foreground": ""
        },
        // 字符串
        {
            "token": "string",
            "foreground": ""
        },
        // 非法字符串
        {
            "token": "string.invalid",
            "foreground": ""
        },
        // 关键词
        {
            "token": "keyword",
            "foreground": ""
        },
        // 标识符
        {
            "token": "identifier",
            "foreground": ""
        },
        // 16进制数字
        {
            "token": "number.hex",
            "foreground": ""
        },
        // 8进制数字
        {
            "token": "number.octal",
            "foreground": ""
        },
        // 2进制数字
        {
            "token": "number.binary",
            "foreground": ""
        },
        // 浮点数
        {
            "token": "number.float",
            "foreground": ""
        },
        // css文件，属性值为数字
        {
            "token": "attribute.value.number.css",
            "foreground": ""
        },
        // 属性值为数字，比如less文件
        {
            "token": "attribute.value.number",
            "foreground": ""
        },
        // css文件，属性值的单位
        {
            "token": "attribute.value.unit.css",
            "foreground": ""
        },
        // 属性值的单位，比如less文件
        {
            "token": "attribute.value.unit",
            "foreground": ""
        },
        // css文件，16进制，常见于颜色值
        {
            "token": "attribute.value.hex.css",
            "foreground": ""
        },
        // html文件，属性值
        {
            "token": "attribute.value.html",
            "foreground": ""
        }
    ],
    colors: {}
})
// -----------  内容模板  -----------

// 未知token，实测没有效果，或者暂未发现其作用
let unknown = [
    {
        "token": "invalid",
        "foreground": ""
    }, {
        "token": "emphasis",
        "foreground": ""
    }, {
        "token": "strong",
        "foreground": ""
    }, {
        "token": "variable",
        "foreground": ""
    }, {
        "token": "variable.parameter",
        "foreground": ""
    }, {
        "token": "constant",
        "foreground": ""
    },
    {
        "token": "annotation",
        "foreground": ""
    },
    {
        "token": "tag.id.pug",
        "foreground": ""
    }, {
        "token": "tag.class.pug",
        "foreground": ""
    }, {
        "token": "meta",
        "foreground": ""
    }, {
        "token": "meta.tag",
        "foreground": ""
    }, {
        "token": "metatag",
        "foreground": ""
    },
    {
        "token": "metatag.xml",
        "foreground": ""
    }, {
        "token": "metatag.php",
        "foreground": ""
    }, {
        "token": "key",
        "foreground": ""
    }, {
        "token": "string.key",
        "foreground": ""
    }, {
        "token": "string.value",
        "foreground": ""
    },
    {
        "token": "string.sql",
        "foreground": ""
    },
    {
        "token": "keyword.flow",
        "foreground": ""
    }, {
        "token": "operator.sql",
        "foreground": ""
    }, {
        "token": "operator.swift",
        "foreground": ""
    }, {
        "token": "predefined.sql",
        "foreground": ""
    }, {
        "token": "variable.predefined",
        "foreground": ""
    },
    {
        "token": "delimiter.xml",
        "foreground": ""
    }, {
        "token": "meta.scss",
        "foreground": ""
    }, {
        "token": "string.key.json",
        "foreground": ""
    }, {
        "token": "string.value.json",
        "foreground": ""
    },
    {
        "token": "keyword.json",
        "foreground": ""
    }, {
        "token": "keyword.flow.scss",
        "foreground": ""
    }, {
        "token": "operator.scss",
        "foreground": ""
    },
    {
        "token": "attribute.value.xml",
        "foreground": ""
    }, {
        "token": "string.html",
        "foreground": ""
    }, {
        "token": "string.yaml",
        "foreground": ""
    }
]