window.monaco.editor.defineTheme("SnazzyLightColorTheme", {
    base: "vs",
    inherit: true,
    rules: [
        // 没有匹配到的其他所有字符
        {
            "token": "",
            "foreground": "565869"
        },
        // 注释
        {
            "token": "comment",
            "foreground": "ADB1C2"
        },
        // 文档类型注释，比如：/**sfdhg**/
        {
            "token": "comment.doc",
            "foreground": "ADB1C2"
        },
        // 数字
        {
            "token": "number",
            "foreground": "FF5C57"
        },
        // 正则表达式
        {
            "token": "regexp",
            "foreground": "13BBB7"
        },
        // 大写字母开头的变量
        {
            "token": "type",
            "foreground": "F767BB"
        },
        // 分隔符，比如()%=-;[]:.{},!等
        {
            "token": "delimiter",
            "foreground": "F5B900"
        },
        // html文件，分隔符
        {
            "token": "delimiter.html",
            "foreground": "ADB1C2"
        },
        // 大括号
        {
            "token": "delimiter.bracket",
            "foreground": "F767BB"
        },
        // html文件，标签名
        {
            "token": "tag",
            "foreground": "13BBB7"
        },
        // html元标签内容，比如<!DOCTYPE html>里的html
        {
            "token": "metatag.content.html",
            "foreground": "9194A2"
        },
        // html元标签，比如<!DOCTYPE html>里的!DOCTYPE
        {
            "token": "metatag.html",
            "foreground": "9194A2"
        },
        // html文件、css文件，属性名
        {
            "token": "attribute.name",
            "foreground": "565869"
        },
        // html文件，属性名
        {
            "token": "attribute.name.html",
            "foreground": "FF8380"
        },
        // css文件，属性值
        {
            "token": "attribute.value",
            "foreground": "13BBB7"
        },
        // 字符串
        {
            "token": "string",
            "foreground": "CF9C00"
        },
        // 非法字符串
        {
            "token": "string.invalid",
            "foreground": "CF9C00"
        },
        // 关键词
        {
            "token": "keyword",
            "foreground": "ADB1C2"
        },
        // 标识符
        {
            "token": "identifier",
            "foreground": "565869"
        },
        // css文件，属性值为数字
        {
            "token": "attribute.value.number.css",
            "foreground": "FF5C57"
        },
        // 属性值为数字，比如less文件
        {
            "token": "attribute.value.number",
            "foreground": "FF5C57"
        },
        // css文件，属性值的单位
        {
            "token": "attribute.value.unit.css",
            "foreground": "FF5C57CC"
        },
        // 属性值的单位，比如less文件
        {
            "token": "attribute.value.unit",
            "foreground": "FF5C57CC"
        },
        // css文件，16进制，常见于颜色值
        {
            "token": "attribute.value.hex.css",
            "foreground": "2DAE58"
        },
        // html文件，属性值
        {
            "token": "attribute.value.html",
            "foreground": "CF9C00"
        }
    ],
    colors: {
        // General
        "focusBorder": "#09A1ED",
        "foreground": "#686968",
        "selection.background": "#2DAE5844",
        "editorGroup.emptyBackground": "#F3F4F5",
        "editor.selectionBackground": "#2DAE5822",
        "menu.selectionBackground": "#E9EAEB",
        "menu.selectionForeground": "#686968",
        "menu.background": "#FAFBFC",
        "menubar.selectionBackground": "#E9EAEB",
        "menubar.selectionForeground": "#686968",
        "editor.background": "#FAFBFC",
        "editor.foreground": "#565869",
        "editorWhitespace.foreground": "#ADB1C255",

        // Title bar
        "titleBar.activeBackground": "#F3F4F5",

        // Tabs
        "tab.activeBorderTop": "#2DAE58",

        // Select highlighting
        "editor.wordHighlightBackground": "#ADB1C23A",
        "editorOverviewRuler.wordHighlightForeground": "#ADB1C288",
        "editorOverviewRuler.wordHighlightStrongForeground": "#35CF68",

        // Search highlighting
        "editor.findMatchBackground": "#00E6E06A",
        "editor.findMatchHighlightBackground": "#00E6E02A",
        "editor.hoverHighlightBackground": "#00E6E018",
        "editorOverviewRuler.findMatchForeground": "#13BBB7AA",

        // DocBlock highlighting
        "editor.snippetTabstopHighlightBackground": "#ADB1C23A",

        // Link highlighting
        "editorLink.activeForeground": "#35CF68",

        // Go to line highlighting
        "editor.rangeHighlightBackground": "#F5B90033",
        "editor.findRangeHighlightBackground": "#F5B90011",

        // Debugger line highlighting
        "editor.stackFrameHighlightBackground": "#F5B90033",
        "editor.focusedStackFrameHighlightBackground": "#2DAE5822",

        // Debugger
        "debugExceptionWidget.background": "#FFAEAC33",
        "debugExceptionWidget.border": "#FF5C57",
        "debugToolBar.border": "#E9EAEB",

        // Sidebar
        "sideBar.background": "#F3F4F5",
        "sideBar.border": "#DEDFE0",
        "sideBarSectionHeader.background": "#E9EAEB",
        "sideBarSectionHeader.border": "#DEDFE0",

        // Lists
        "list.activeSelectionBackground": "#09A1ED",
        "list.activeSelectionForeground": "#ffffff",
        "list.inactiveSelectionBackground": "#89B5CB33",
        "list.focusBackground": "#BCE7FC99",
        "list.focusForeground": "#11658F",
        "list.hoverBackground": "#E9EAEB",
        "list.errorForeground": "#FF5C56",
        "list.warningForeground": "#B38700",

        // Diff view
        "diffEditor.insertedTextBackground": "#2DAE5824",
        "diffEditor.removedTextBackground": "#FFAEAC44",
        "merge.incomingContentBackground": "#14B1FF33",
        "merge.incomingHeaderBackground": "#14B1FF77",
        "merge.currentContentBackground": "#35CF6833",
        "merge.currentHeaderBackground": "#35CF6866",

        // Settings
        "settings.modifiedItemIndicator": "#13BBB7",
        "input.border": "#E9EAEB",
        "dropdown.border": "#E9EAEB",

        // Primary buttons
        "button.background": "#2DAE58",

        // Extensions
        "extensionButton.prominentBackground": "#2DAE58",
        "extensionButton.prominentHoverBackground": "#238744",

        // Line numbers
        "editorLineNumber.activeForeground": "#35CF68",
        "editorLineNumber.foreground": "#9194A2aa",

        // Status bar
        "statusBar.noFolderBackground": "#565869",
        "statusBarItem.remoteBackground": "#238744",
        "statusBar.background": "#2DAE58",
        "statusBar.debuggingBackground": "#13BBB7",
        "statusBar.debuggingBorder": "#00A39F",

        // Activity bar
        "activityBar.background": "#E7E8E6",
        "activityBar.foreground": "#2DAE58",
        "activityBarBadge.background": "#09A1ED",
        "activityBar.inactiveForeground": "#68696888",

        // Git: Sidebar
        "gitDecoration.untrackedResourceForeground": "#2DAE58",
        "gitDecoration.modifiedResourceForeground": "#00A39F",

        // Git: Gutter
        "editorGutter.modifiedBackground": "#00A39FAA",
        "editorGutter.addedBackground": "#2DAE58",
        "editorGutter.deletedBackground": "#FF5C57",

        // Git: Overview ruler
        "editorOverviewRuler.modifiedForeground": "#00A39FAA",
        "editorOverviewRuler.addedForeground": "#2DAE58",
        "editorOverviewRuler.deletedForeground": "#FF5C57",

        // Errors & warnings
        "editorError.foreground": "#FF5C56",
        "editorOverviewRuler.errorForeground": "#FF5C56",
        "editorWarning.foreground": "#CF9C00",
        "editorOverviewRuler.warningForeground": "#CF9C00",

        // Peek view
        "peekView.border": "#09A1ED",
        "peekViewTitle.background": "#09A1ED11",
        "peekViewEditor.background": "#14B1FF08",
        "peekViewEditor.matchHighlightBackground": "#F5B90088",
        "peekViewEditor.matchHighlightBorder": "#F5B900",
        "peekViewResult.selectionBackground": "#09A1ED",
        "peekViewResult.selectionForeground": "#FFFFFF",
        "peekViewResult.matchHighlightBackground": "#F5B90088",

        // Terminal
        "terminal.ansiBlack": "#565869",
        "terminal.ansiBrightBlack": "#75798F",
        "terminal.ansiWhite": "#FAFBF9",
        "terminal.ansiBrightWhite": "#FFFFFF",
        "terminal.ansiYellow": "#CF9C00",
        "terminal.ansiBrightYellow": "#F5B900",
        "terminal.ansiRed": "#FF5C57",
        "terminal.ansiBrightRed": "#FFAEAC",
        "terminal.ansiMagenta": "#F767BB",
        "terminal.ansiBrightMagenta": "#FF94D2",
        "terminal.ansiBlue": "#09A1ED",
        "terminal.ansiBrightBlue": "#14B1FF",
        "terminal.ansiCyan": "#13BBB7",
        "terminal.ansiBrightCyan": "#13BBB7",
        "terminal.ansiGreen": "#2DAE58",
        "terminal.ansiBrightGreen": "#35CF68",

        // Badges
        "badge.background": "#09A1ED",
        "badge.foreground": "#ffffff",

        // Inlay hints
        "editorInlayHint.foreground": "#565869",
        "editorInlayHint.background": "#E9EAEB",
    }
})