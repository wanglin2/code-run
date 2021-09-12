window.monaco.editor.defineTheme("TokyoNightStorm", {
    base: "vs-dark",
    inherit: true,
    rules: [
        // 没有匹配到的其他所有字符
        {
            "token": "",
            "foreground": "C0CAF5"
        },
        // 注释
        {
            "token": "comment",
            "foreground": "565F89"
        },
        // 文档类型注释，比如：/**sfdhg**/
        {
            "token": "comment.doc",
            "foreground": "565F89"
        },
        // 数字
        {
            "token": "number",
            "foreground": "FF9E64"
        },
        // 正则表达式
        {
            "token": "regexp",
            "foreground": "B4F9F8"
        },
        // 大写字母开头的变量
        {
            "token": "type",
            "foreground": "7AA2F7"
        },
        // 分隔符，比如()%=-;[]:.{},!等
        {
            "token": "delimiter",
            "foreground": "89DDFF"
        },
        // html文件，分隔符
        {
            "token": "delimiter.html",
            "foreground": "BA3C97"
        },
        // 大括号
        {
            "token": "delimiter.bracket",
            "foreground": "9ABDF5"
        },
        // html文件，标签名
        {
            "token": "tag",
            "foreground": "F7768E"
        },
        // html元标签内容，比如<!DOCTYPE html>里的html
        {
            "token": "metatag.content.html",
            "foreground": "BB9AF7"
        },
        // html元标签，比如<!DOCTYPE html>里的!DOCTYPE
        {
            "token": "metatag.html",
            "foreground": "F7768E"
        },
        // html文件、css文件，属性名
        {
            "token": "attribute.name",
            "foreground": "7AA2F7"
        },
        // html属性名
        {
            "token": "attribute.name.html",
            "foreground": "BB9AF7"
        },
        // css文件，属性值
        {
            "token": "attribute.value",
            "foreground": "FF9E64"
        },
        // 字符串
        {
            "token": "string",
            "foreground": "9ECE6A"
        },
        // 非法字符串
        {
            "token": "string.invalid",
            "foreground": "9ECE6A"
        },
        // 关键词
        {
            "token": "keyword",
            "foreground": "89DDFF"
        },
        // 标识符
        {
            "token": "identifier",
            "foreground": "C0CAF5"
        },
        // css文件，属性值为数字
        {
            "token": "attribute.value.number.css",
            "foreground": "FF9E64"
        },
        // 属性值为数字，比如less文件
        {
            "token": "attribute.value.number",
            "foreground": "FF9E64"
        },
        // css文件，属性值的单位
        {
            "token": "attribute.value.unit.css",
            "foreground": "F7768E"
        },
        // 属性值的单位，比如less文件
        {
            "token": "attribute.value.unit",
            "foreground": "F7768E"
        },
        // css文件，16进制，常见于颜色值
        {
            "token": "attribute.value.hex.css",
            "foreground": "9AA5CE"
        },
        // html文件，属性值
        {
            "token": "attribute.value.html",
            "foreground": "9ECE6A"
        }
    ],
    colors: {
        "foreground": "#7982a9",
        "descriptionForeground": "#545c7e",
        "focusBorder": "#545c7e33",
        "errorForeground": "#5a607d",
        "widget.shadow": "#ffffff00",
        "scrollbar.shadow": "#00000033",
        "badge.background": "#7e83b233",
        "badge.foreground": "#a9b1d6",
        "icon.foreground": "#7982a9",
        "imagePreview.border": "#9cacff33",
        "settings.headerForeground": "#6183bb",
        "window.activeBorder": "#0d0f17",
        "window.inactiveBorder":"#0d0f17",

        "welcomePage.buttonBackground": "#1b1e2e",
        "welcomePage.buttonHoverBackground": "#1b1e2eaa",

        "extensionButton.prominentBackground": "#3d59a1DD",
        "extensionButton.prominentHoverBackground": "#3d59a1AA",
        "extensionButton.prominentForeground": "#ffffff",
        "extensionBadge.remoteBackground": "#3d59a1",
        "extensionBadge.remoteForeground": "#ffffff",

        "button.background": "#3d59a1dd",
        "button.hoverBackground": "#3d59a1AA",
        "button.foreground": "#ffffff",
        "progressBar.background": "#3d59a1",

        "input.background": "#1b1e2e",
        "input.foreground": "#a9b1d6",
        "input.border": "#282e44",
        "input.placeholderForeground": "#4a5272",
        "inputOption.activeForeground": "#c0caf5",
        "inputOption.activeBackground": "#3d59a144",

        "inputValidation.infoForeground": "#000000",
        "inputValidation.infoBackground": "#0da0ba",
        "inputValidation.infoBorder": "#0db9d7",
        "inputValidation.warningForeground": "#000000",
        "inputValidation.warningBackground": "#c2985b",
        "inputValidation.warningBorder": "#e0af68",
        "inputValidation.errorForeground": "#bbc2e0",
        "inputValidation.errorBackground": "#85353e",
        "inputValidation.errorBorder": "#963c47",

        "dropdown.foreground": "#7982a9",
        "dropdown.background": "#1b1e2e",
        "dropdown.listBackground": "#1b1e2e",

        "activityBar.background": "#1f2335",
        "activityBar.foreground": "#7982a9",
        //"activityBar.activeBorder": "#41496b",
        //"activityBar.activeBackground": "#1c2030",
        "activityBar.inactiveForeground": "#41496b", //#3b4261
        "activityBar.border": "#1f2335",
        "activityBarBadge.background": "#3d59a1",
        "activityBarBadge.foreground": "#fff",

        "tree.indentGuidesStroke": "#2e344f",
        "sideBar.foreground": "#7982a9",
        "sideBar.background": "#1f2335",
        "sideBar.border": "#1b1e2e",
        "sideBarTitle.foreground": "#7982a9",
        "sideBarSectionHeader.background": "#1f2335",
        "sideBarSectionHeader.foreground": "#a9b1d6",
        "sideBarSectionHeader.border": "#1b1e2e",
        "sideBar.dropBackground": "#292e42",

        "list.dropBackground": "#292e42",
        "list.deemphasizedForeground": "#7982a9",
        "list.activeSelectionBackground": "#2c324a",

        "list.activeSelectionForeground": "#a9b1d6",
        "list.inactiveSelectionBackground": "#292e42",
        "list.inactiveSelectionForeground": "#a9b1d6",
        "list.focusBackground": "#292e42",
        "list.focusForeground": "#a9b1d6",
        "list.hoverBackground": "#1b1e2e",
        "list.hoverForeground": "#a9b1d6",

        "list.highlightForeground": "#668ac4",
        "list.invalidItemForeground": "#c97018",
        "list.errorForeground": "#bb616b",
        "list.warningForeground": "#c49a5a",

        "listFilterWidget.background": "#1b1e2e",
        "listFilterWidget.outline": "#3d59a1",
        "listFilterWidget.noMatchesOutline": "#a6333f",

        "pickerGroup.foreground": "#a9b1d6",
        "pickerGroup.border": "#1b1e2e",

        "scrollbarSlider.background": "#9cacff15",
        "scrollbarSlider.hoverBackground": "#9cacff10",
        "scrollbarSlider.activeBackground": "#9cacff22",

        "selection.background": "#6f7bb635",
        "editor.background": "#24283b",
        "editor.foreground": "#a9b1d6",
        "editorLink.activeForeground": "#a9b1d6",

        "editor.selectionBackground": "#6f7bb630",
        "editor.inactiveSelectionBackground": "#6f7bb615",

        "editor.findMatchBackground": "#3d59a166",
        "editor.findMatchBorder": "#ffdb69aa",
        "editor.findMatchHighlightBackground": "#3d59a166",

        "editor.findRangeHighlightBackground": "#6f7bb625",
        "editor.rangeHighlightBackground": "#6f7bb620",
        "editor.wordHighlightBackground": "#6f7bb633",
        "editor.wordHighlightStrongBackground": "#6f7bb644",
        "editor.selectionHighlightBackground": "#6f7bb633",

        "editorCursor.foreground": "#c0caf5",
        "editorIndentGuide.background": "#292e42",
        "editorIndentGuide.activeBackground": "#3b4261",
        "editorLineNumber.foreground": "#3b4261",
        "editorLineNumber.activeForeground": "#737aa2",
        "editor.lineHighlightBackground": "#292e42",
        "editorWhitespace.foreground": "#3b4261",

        "editorMarkerNavigation.background": "#1f2335",
        "editorHoverWidget.background": "#1f2335",
        "editorHoverWidget.border": "#1b1e2e",

        "editorBracketMatch.background": "#1f2335",
        "editorBracketMatch.border": "#545c7e", //"#3b4261",

        "editorOverviewRuler.border": "#1b1e2e",
        "editorOverviewRuler.errorForeground": "#db4b4b",
        "editorOverviewRuler.warningForeground": "#e0af68",
        "editorOverviewRuler.infoForeground": "#1abc9c",
        "editorOverviewRuler.bracketMatchForeground": "#1b1e2e",
        "editorOverviewRuler.findMatchForeground": "#a9b1d644",
        "editorOverviewRuler.rangeHighlightForeground": "#a9b1d644",
        "editorOverviewRuler.selectionHighlightForeground": "#a9b1d622",
        "editorOverviewRuler.wordHighlightForeground": "#bb9af755",
        "editorOverviewRuler.wordHighlightStrongForeground": "#bb9af766",
        "editorOverviewRuler.modifiedForeground": "#394b70",
        "editorOverviewRuler.addedForeground": "#164846",
        "editorOverviewRuler.deletedForeground": "#703438",

        "editorRuler.foreground": "#1b1e2e",
        "editorError.foreground": "#db4b4b",
        "editorWarning.foreground": "#e0af68",
        "editorInfo.foreground": "#0da0ba",
        "editorHint.foreground": "#0da0ba",

        "editorGutter.modifiedBackground": "#394b70",
        "editorGutter.addedBackground": "#164846",
        "editorGutter.deletedBackground": "#823c41",

        "minimapGutter.modifiedBackground": "#425882",
        "minimapGutter.addedBackground": "#1C5957",
        "minimapGutter.deletedBackground": "#944449",

        "editorGroup.border": "#1b1e2e",
        "editorGroup.dropBackground": "#292e42",
        "editorGroupHeader.tabsBorder": "#1b1e2e",
        "editorGroupHeader.tabsBackground": "#1f2335",
        "editorGroupHeader.noTabsBackground": "#1f2335",
        "editorGroupHeader.border": "#1b1e2e",

        "editorPane.background": "#1f2335",

        "editorWidget.background": "#1f2335",
        "editorWidget.resizeBorder": "#545c7e33",

        "editorSuggestWidget.background": "#1f2335",
        "editorSuggestWidget.border": "#1b1e2e",
        "editorSuggestWidget.selectedBackground": "#282e44",
        "editorSuggestWidget.highlightForeground": "#668ac4",

        "editorCodeLens.foreground": "#565f89",
        "editorLightBulb.foreground": "#e0af68",
        "editorLightBulbAutoFix.foreground": "#e0af68",

        "peekView.border": "#1b1e2e",
        "peekViewEditor.background": "#1f2335",
        "peekViewEditor.matchHighlightBackground": "#3d59a166",
        "peekViewTitle.background": "#1b1e2e",
        "peekViewTitleLabel.foreground": "#a9b1d6",
        "peekViewTitleDescription.foreground": "#7982a9",
        "peekViewResult.background": "#1b1e2e",
        "peekViewResult.selectionForeground": "#a9b1d6",
        "peekViewResult.selectionBackground": "#3d59a133",
        "peekViewResult.lineForeground": "#a9b1d6",
        "peekViewResult.fileForeground": "#7982a9",
        "peekViewResult.matchHighlightBackground": "#3d59a166",

        "diffEditor.insertedTextBackground": "#41a6b515",
        "diffEditor.removedTextBackground": "#db4b4b22",

        "breadcrumb.background": "#1f2335",
        "breadcrumbPicker.background": "#1f2335",
        "breadcrumb.foreground": "#545c7e",
        "breadcrumb.focusForeground": "#a9b1d6",
        "breadcrumb.activeSelectionForeground": "#a9b1d6",

        "tab.activeBackground": "#1f2335",
        "tab.inactiveBackground": "#1f2335",
        "tab.activeForeground": "#a9b1d6",
        "tab.hoverForeground": "#a9b1d6",
        "tab.activeBorder": "#3d59a1",
        "tab.inactiveForeground": "#7982a9",
        "tab.border": "#1b1e2e",
        "tab.unfocusedActiveForeground": "#a9b1d6",
        "tab.unfocusedInactiveForeground": "#7982a9",
        "tab.unfocusedHoverForeground": "#a9b1d6",
        "tab.activeModifiedBorder": "#282d42",
        "tab.inactiveModifiedBorder": "#282d42",
        "tab.unfocusedActiveBorder": "#3b4261",
        "tab.lastPinnedBorder": "#2c3147",

        "panel.background": "#1f2335",
        "panel.border": "#1b1e2e",
        "panelTitle.activeForeground": "#7982a9",
        "panelTitle.inactiveForeground": "#545c7e",
        "panelTitle.activeBorder": "#1f2335",
        "panelInput.border": "#1f2335",

        "statusBar.foreground": "#7982a9",
        "statusBar.background": "#1f2335",
        "statusBar.border": "#1b1e2e",
        "statusBar.noFolderBackground": "#1f2335",
        "statusBar.debuggingBackground": "#1f2335",
        "statusBar.debuggingForeground": "#7982a9",
        "statusBarItem.activeBackground": "#1b1e2e",
        "statusBarItem.hoverBackground": "#282e44",
        "statusBarItem.prominentBackground": "#1b1e2e",
        "statusBarItem.prominentHoverBackground": "#282e44",

        "titleBar.activeForeground": "#7982a9",
        "titleBar.inactiveForeground": "#7982a9",
        "titleBar.activeBackground": "#1f2335",
        "titleBar.inactiveBackground": "#1f2335",
        "titleBar.border": "#1b1e2e",

        "walkThrough.embeddedEditorBackground": "#1f2335",
        "textLink.foreground": "#668ac4",
        "textLink.activeForeground": "#7dcfff",
        "textPreformat.foreground": "#73daca",
        "textBlockQuote.background": "#1f2335",
        "textCodeBlock.background": "#1f2335",
        "textSeparator.foreground": "#545c7e",

        "debugExceptionWidget.border": "#963c47",
        "debugExceptionWidget.background": "#1b1e2e",
        "debugToolBar.background": "#1b1e2e",

        "debugConsole.infoForeground": "#7982a9",
        "debugConsole.errorForeground": "#bb616b",
        "debugConsole.sourceForeground": "#7982a9",
        "debugConsole.warningForeground": "#c49a5a",
        "debugConsoleInputIcon.foreground":"#73daca",

        "editor.stackFrameHighlightBackground":"#e2bd3a20",
        "editor.focusedStackFrameHighlightBackground":"#73daca20",
        "debugView.stateLabelForeground":"#7982a9",
        "debugView.stateLabelBackground": "#1b1e2e",
        "debugView.valueChangedHighlight": "#3d59a1cc",
        "debugTokenExpression.name": "#7dcfff",
        "debugTokenExpression.value":"#9aa5ce",
        "debugTokenExpression.string":"#9ece6a",
        "debugTokenExpression.boolean":"#ff9e64",
        "debugTokenExpression.number":"#ff9e64",
        "debugTokenExpression.error":"#bb616b",

        "terminal.background": "#1f2335",
        "terminal.foreground": "#7982a9",
        "terminal.selectionBackground": "#6f7bb620",
        // "terminalCursor.background": "",
        // "terminalCursor.foreground": "",

        "terminal.ansiBlack": "#414868",
        "terminal.ansiRed": "#f7768e",
        "terminal.ansiGreen": "#73daca",
        "terminal.ansiYellow": "#e0af68",
        "terminal.ansiBlue": "#7aa2f7",
        "terminal.ansiMagenta": "#bb9af7",
        "terminal.ansiCyan": "#7dcfff",
        "terminal.ansiWhite": "#7982a9",
        "terminal.ansiBrightBlack": "#414868",
        "terminal.ansiBrightRed": "#f7768e",
        "terminal.ansiBrightGreen": "#73daca",
        "terminal.ansiBrightYellow": "#e0af68",
        "terminal.ansiBrightBlue": "#7aa2f7",
        "terminal.ansiBrightMagenta": "#bb9af7",
        "terminal.ansiBrightCyan": "#7dcfff",
        "terminal.ansiBrightWhite": "#a9b1d6",

        "gitDecoration.modifiedResourceForeground": "#6183bb",
        "gitDecoration.ignoredResourceForeground": "#545c7e",
        "gitDecoration.deletedResourceForeground": "#914c54",
        "gitDecoration.renamedResourceForeground": "#449dab",
        "gitDecoration.addedResourceForeground": "#449dab",
        "gitDecoration.untrackedResourceForeground": "#449dab",
        "gitDecoration.conflictingResourceForeground": "#bb7a61",
        "gitDecoration.stageDeletedResourceForeground": "#914c54",
        "gitDecoration.stageModifiedResourceForeground": "#6183bb",

        "charts.red": "#f7768e",
        "charts.blue": "#7aa2f7",
        "charts.yellow": "#e0af68",
        "charts.orange": "#ff9e64",
        "charts.green": "#73daca",
        "charts.purple": "#9d7cd8",
        "charts.foreground": "#9AA5CE",
        "charts.lines": "#1f2335",

        "merge.currentHeaderBackground": "#007a75aa",
        "merge.currentContentBackground": "#007a7544",
        "merge.incomingHeaderBackground": "#3d59a1aa",
        "merge.incomingContentBackground": "#3d59a144",

        "gitlens.trailingLineForegroundColor": "#565f89",
        "gitlens.gutterUncommittedForegroundColor": "#565f89",
        "gitlens.gutterForegroundColor": "#565f89",

        "notificationCenterHeader.background": "#1b1e2e",
        "notifications.background": "#1b1e2e",
        "notificationLink.foreground": "#6183bb",
        "notificationsErrorIcon.foreground": "#bb616b",
        "notificationsWarningIcon.foreground": "#bba461",
        "notificationsInfoIcon.foreground": "#0da0ba",

        "menubar.selectionForeground":"#c0caf5",
        "menubar.selectionBackground":"#2f3549",
        "menubar.selectionBorder":"#1b1e2e",
        "menu.foreground":"#7982a9",
        "menu.background":"#1f2335",
        "menu.selectionForeground":"#c0caf5",
        "menu.selectionBackground":"#2f3549",
        "menu.separatorBackground":"#1b1e2e",
        "menu.border":"#1b1e2e"
    }
});