window.monaco.editor.defineTheme("AtlanticNight", {
    base: "vs-dark",
    inherit: true,
    rules: [
        // 没有匹配到的其他所有字符
        {
            "token": "",
            "foreground": "D6DEEB"
        },
        // 注释
        {
            "token": "comment",
            "foreground": "6B8080"
        },
        // 文档类型注释，比如：/**sfdhg**/
        {
            "token": "comment.doc",
            "foreground": "6B8080"
        },
        // 数字
        {
            "token": "number",
            "foreground": "FFA07A"
        },
        // 正则表达式
        {
            "token": "regexp",
            "foreground": "D6DEEB"
        },
        // 大写字母开头的变量
        {
            "token": "type",
            "foreground": "6BB9F0"
        },
        // 分隔符，比如()%=-;[]:.{},!等
        {
            "token": "delimiter",
            "foreground": "F5D76E"
        },
        // html文件，分隔符
        {
            "token": "delimiter.html",
            "foreground": "638BB3"
        },
        // 大括号
        {
            "token": "delimiter.bracket",
            "foreground": "D6DEEB"
        },
        // html文件，标签名
        {
            "token": "tag",
            "foreground": "638BB3"
        },
        // html元标签内容，比如<!DOCTYPE html>里的html
        {
            "token": "metatag.content.html",
            "foreground": "638BB3"
        },
        // html元标签，比如<!DOCTYPE html>里的!DOCTYPE
        {
            "token": "metatag.html",
            "foreground": "6BB9F0"
        },
        // html文件、css文件，属性名
        {
            "token": "attribute.name",
            "foreground": "638BB3"
        },
        // html文件，属性名
        {
            "token": "attribute.name.html",
            "foreground": "6BB9F0"
        },
        // css文件，属性值
        {
            "token": "attribute.value",
            "foreground": "2ECCB0"
        },
        // 字符串
        {
            "token": "string",
            "foreground": "2ECCB0"
        },
        // 非法字符串
        {
            "token": "string.invalid",
            "foreground": "D6DEEB"
        },
        // 关键词
        {
            "token": "keyword",
            "foreground": "FC6399"
        },
        // 标识符
        {
            "token": "identifier",
            "foreground": "F5D76E"
        },
        // css文件，属性值为数字
        {
            "token": "attribute.value.number.css",
            "foreground": "FFA07A"
        },
        // 属性值为数字，比如less文件
        {
            "token": "attribute.value.number",
            "foreground": "FFA07A"
        },
        // css文件，属性值的单位
        {
            "token": "attribute.value.unit.css",
            "foreground": "FFA07A"
        },
        // 属性值的单位，比如less文件
        {
            "token": "attribute.value.unit",
            "foreground": "FFA07A"
        },
        // css文件，16进制，常见于颜色值
        {
            "token": "attribute.value.hex.css",
            "foreground": "FFA07A"
        },
        // html文件，属性值
        {
            "token": "attribute.value.html",
            "foreground": "2ECCB0"
        }
    ],
    colors: {
        "editor.background": "#000720", // Main Editor Color
        "editor.foreground": "#dadfe1",
        "editorLineNumber.foreground": "#5c6b80", // Main Secondary
        "editorLineNumber.activeForeground": "#6ba9ff",
        "editor.selectionBackground": "#396cb335",
        "editor.wordHighlightBackground": "#396cb335",
        "editor.lineHighlightBorder": "#000720",
        // Gutter
        "editorGutter.modifiedBackground": "#daa520",
        "editorGutter.addedBackground": "#5ac95a",
        "editorGutter.deletedBackground": "#f64747",
        // Buttons
        "button.background": "#3D3199",
        "button.foreground": "#dadfe1",
        "button.hoverBackground": "#995b31",
        // Activity Bar
        "activityBar.background": "#000720",
        "activityBar.foreground": "#5D81B3",
        "activityBarBadge.background": "#5D81B3",
        "activityBarBadge.foreground": "#000720",
        // Sidebar
        "sideBar.background": "#000720",
        "sideBar.foreground": "#5c6b80",
        "sideBar.border": "#1b213b",
        "sideBarTitle.foreground": "#5c6b80",
        "sideBarSectionHeader.background": "#000720",
        "sideBarSectionHeader.foreground": "#5c6b80",
        "sideBarSectionHeader.border": "#5c6b80",
        // Lists and trees
        "list.hoverBackground": "#396cb335",
        "list.hoverForeground": "#dadfe1",
        "list.focusBackground": "#396cb335",
        "list.focusForeground": "#5c6b80",
        "list.activeSelectionBackground": "#1c2341",
        "list.activeSelectionForeground": "#dadfe1",
        "list.inactiveSelectionBackground": "#1c2341",
        "list.inactiveSelectionForeground": "#dadfe1",
        // Input control
        "input.background": "#396cb335",
        "input.foreground": "#dadfe1",
        // MiniMap
        "minimap.findMatchHighlight": "#396cb335",
        "minimap.selectionHighlight": "#396cb335",
        // Editor Groups & Tabs
        "editorGroup.border": "#232b4e",
        "editorGroup.dropBackground": "#000720",
        "editorGroupHeader.tabsBackground": "#000720",
        "tab.activeBackground": "#1c2341",
        "tab.activeForeground": "#8c9db4",
        "tab.unfocusedActiveBackground": "#1a203b",
        "tab.inactiveBackground": "#0e1224",
        "tab.inactiveForeground": "#5c6b80",
        // Status Bar
        "statusBar.background": "#101425",
        "statusBar.foreground": "#6287bb",
        "statusBar.debuggingBackground": "#101425",
        "statusBar.debuggingForeground": "#6287bb",
        "statusBar.noFolderBackground": "#101425",
        "statusBar.noFolderForeground": "#6287bb"
    }
})