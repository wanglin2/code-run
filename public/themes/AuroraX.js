window.monaco.editor.defineTheme("AuroraX", {
    base: "vs-dark",
    inherit: true,
    rules: [
        // 没有匹配到的其他所有字符
        {
            "token": "",
            "foreground": "EEFFFF"
        },
        // 注释
        {
            "token": "comment",
            "foreground": "546E7A"
        },
        // 文档类型注释，比如：/**sfdhg**/
        {
            "token": "comment.doc",
            "foreground": "546E7A"
        },
        // 数字
        {
            "token": "number",
            "foreground": "F78C6C"
        },
        // 正则表达式
        {
            "token": "regexp",
            "foreground": "89DDFF"
        },
        // 大写字母开头的变量
        {
            "token": "type",
            "foreground": "82AAFF"
        },
        // 分隔符，比如()%=-;[]:.{},!等
        {
            "token": "delimiter",
            "foreground": "FFCB6B"
        },
        // html文件，分隔符
        {
            "token": "delimiter.html",
            "foreground": "89DDFF"
        },
        // 大括号
        {
            "token": "delimiter.bracket",
            "foreground": "C792EA"
        },
        // html文件，标签名
        {
            "token": "tag",
            "foreground": "C792EA"
        },
        // html元标签内容，比如<!DOCTYPE html>里的html
        {
            "token": "metatag.content.html",
            "foreground": "C792EA"
        },
        // html元标签，比如<!DOCTYPE html>里的!DOCTYPE
        {
            "token": "metatag.html",
            "foreground": "F07178"
        },
        // html文件、css文件，属性名
        {
            "token": "attribute.name",
            "foreground": "B2CCD6"
        },
        // html文件，属性名
        {
            "token": "attribute.name.html",
            "foreground": "C792EA"
        },
        // css文件，属性值
        {
            "token": "attribute.value",
            "foreground": "F78C6C"
        },
        // 字符串
        {
            "token": "string",
            "foreground": "C3E88D"
        },
        // 非法字符串
        {
            "token": "string.invalid",
            "foreground": "C3E88D"
        },
        // 关键词
        {
            "token": "keyword",
            "foreground": "C792EA"
        },
        // 标识符
        {
            "token": "identifier",
            "foreground": "EEFFFF"
        },
        // css文件，属性值为数字
        {
            "token": "attribute.value.number.css",
            "foreground": "F78C6C"
        },
        // 属性值为数字，比如less文件
        {
            "token": "attribute.value.number",
            "foreground": "F78C6C"
        },
        // css文件，属性值的单位
        {
            "token": "attribute.value.unit.css",
            "foreground": "F78C6C"
        },
        // 属性值的单位，比如less文件
        {
            "token": "attribute.value.unit",
            "foreground": "F78C6C"
        },
        // css文件，16进制，常见于颜色值
        {
            "token": "attribute.value.hex.css",
            "foreground": "89DDFF"
        },
        // html文件，属性值
        {
            "token": "attribute.value.html",
            "foreground": "C3E88D"
        }
    ],
    colors: {


        /* Base Colors */

        "icon.foreground": "#576daf",

        "activityBar.background": "#07090F",
        "activityBar.foreground": "#86A5FF",
        "activityBar.inactiveForeground": "#576dafc5",

        "activityBarBadge.background": "#86A5FF",
        "activityBarBadge.foreground": "#07090F",

        "badge.background": "#86A5FF",
        "badge.foreground": "#07090F",

        "breadcrumb.activeSelectionForeground": "#86A5FF",
        "breadcrumb.focusForeground": "#576daf",
        "breadcrumb.foreground": "#576dafa6",
        "breadcrumbPicker.background": "#07090F",

        "button.background": "#86A5FF",
        "button.foreground": "#07090F",
        "button.hoverBackground": "#A8BEFF",

        "diffEditor.insertedTextBackground": "#64d3892c",
        "diffEditor.removedTextBackground": "#dd50742c",
        "diffEditor.diagonalFill": "#15182B",

        "descriptionForeground": "#576daf79",

        "dropdown.background": "#15182B",
        "dropdown.foreground": "#c7d5ff99",

        "editor.background": "#07090F",

        "editorCodeLens.foreground": "#262E47",

        "editorGroup.background": "#07090F",
        "editorGroup.border": "#15182B",

        "editorGroup.dropBackground": "#0C0E19",
        "editorGroup.emptyBackground": "#07090F",
        "editorGroupHeader.tabsBackground": "#07090F",

        "editor.findMatchBackground": "#576daf",
        "editor.findMatchHighlightBackground": "#262E47",

        "editorLineNumber.activeForeground": "#576dafd8",
        "editorLineNumber.foreground": "#262e47bb",
        "editorCursor.background": "#01030b",
        "editorCursor.foreground": "#86A5FF",

        "editor.selectionBackground": "#262E47",
        "editor.inactiveSelectionBackground": "#262e47be",
        "editor.selectionHighlightBackground": "#262E47",

        "editor.wordHighlightBackground": "#262E47",
        "editor.wordHighlightStrongBackground": "#262E47",

        "editorWidget.background": "#15182B",
        "editorWidget.border": "#576daf",

        "extensionButton.prominentBackground": "#C7D5FF",
        "extensionButton.prominentForeground": "#07090F",
        "focusBorder": "#262E47",
        "foreground": "#576daf",

        "gitDecoration.addedResourceForeground": "#64d389fd",
        "gitDecoration.deletedResourceForeground": "#dd5074",
        "gitDecoration.ignoredResourceForeground": "#576daf90",
        "gitDecoration.modifiedResourceForeground": "#c778db",
        "gitDecoration.untrackedResourceForeground": "#576daf90",

        "list.activeSelectionBackground": "#000000",
        "list.activeSelectionForeground": "#86A5FF",
        "list.hoverBackground": "#000000",
        "list.hoverForeground": "#A8BEFF",
        "list.focusBackground": "#01030b",
        "list.focusForeground": "#86A5FF",
        "list.inactiveFocusBackground": "#01030b",
        "list.inactiveSelectionBackground": "#000000",
        "list.inactiveSelectionForeground": "#86A5FF",

        "list.highlightForeground": "#A8BEFF",
        "list.dropBackground": "#000000",

        "list.errorForeground": "#dd5074",
        "list.warningForeground": "#e6db7f",

        "input.background": "#15182B",
        "input.foreground": "#86A5FF",
        "inputOption.activeForeground": "#86A5FF",
        "inputValidation.errorBackground": "#dd5073",
        "inputValidation.errorBorder": "#dd5073",
        "inputValidation.errorForeground": "#07090F",

        "quickInput.background": "#0C0E19",

        "notificationCenterHeader.background": "#15182B",
        "notifications.background": "#15182B",

        "panel.border": "#15182B",
        "panelTitle.activeBorder": "#86A5FF",
        "panelTitle.activeForeground": "#C7D5FF",
        "panelTitle.inactiveForeground": "#576daf",

        "peekViewTitle.background": "#262E47",

        "scrollbar.shadow": "#01030b",
        "scrollbarSlider.activeBackground": "#576daf",
        "scrollbarSlider.background": "#262E47",
        "scrollbarSlider.hoverBackground": "#576daf",

        "selection.background": "#01030b",

        "sideBar.background": "#07090F",
        "sideBar.border": "#15182B",
        "sideBarSectionHeader.background": "#07090F",
        "sideBarSectionHeader.foreground": "#86A5FF",

        "statusBar.background": "#86A5FF",
        "statusBar.foreground": "#07090F",
        "statusBar.debuggingBackground": "#c778db",

        "tab.activeBackground": "#07090F",
        "tab.activeBorder": "#86A5FF",
        "tab.activeForeground": "#C7D5FF",
        "tab.border": "#07090F",
        "tab.inactiveBackground": "#07090F",
        "tab.inactiveForeground": "#576dafd8",

        "terminal.foreground": "#A8BEFF",
        "terminal.ansiRed": "#dd5073",
        "terminal.ansiBrightRed": "#dd5073",
        "terminal.ansiGreen": "#63eb90",

        "textLink.foreground": "#86A5FF",

        "titleBar.activeBackground": "#07090F",
        "titleBar.inactiveBackground": "#07090F",
        "titleBar.activeForeground": "#86A5FF",

        "tree.indentGuidesStroke": "#576daf",

        "widget.shadow": "#01030b"
    }
})