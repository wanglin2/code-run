import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import {
    supportLanguage
} from '@/config/constants'
import html2canvas from 'html2canvas'

// 更新编辑器文档模型
const updateDoc = (editor, code, language) => {
    if (!editor) {
        return
    }
    let oldModel = editor.getModel()
    let newModel = monaco.editor.createModel(code, supportLanguage[language])
    editor.setModel(newModel)
    if (oldModel) {
        oldModel.dispose()
    }
}

// 创建编辑器
const createEditor = async ({
    el,
    codeTheme,
    codeFontSize,
    content,
    language,
    bottom = 20,
    top = 20,
    lineNumbers = true
}, callback = () => {}) => {
    // 创建编辑器
    const editor = monaco.editor.create(el, {
        model: null,
        minimap: {
            enabled: false, // 关闭小地图
        },
        theme: codeTheme || 'vs-dark', // 主题
        fontSize: codeFontSize || 16,
        fontFamily: 'MonoLisa, monospace',
        contextmenu: false, // 不显示右键菜单
        fixedOverflowWidgets: true, // 让语法提示层能溢出容器
        padding: {
            bottom,
            top
        },
        lineNumbers, // 是否显示行号
        renderIndentGuides: false,
        renderLineHighlight: false,
        renderLineHighlightOnlyWhenFocus: true,
        scrollbar: {
            verticalScrollbarSize: 0 // 隐藏滚动条
        },
        lightbulb: {
            enabled: false
        }
    })
    editor.onDidChangeModelDecorations(() => {
        callback()
    })
    updateDoc(editor, content, language)
    return editor;
}

// 创建容器
const createElement = (editor, {
    lineNumbers = true,
    top = 20,
    bottom = 20,
    radius = 5,
    width = 1000,
    showDots = true
}, themeData) => {
    // 代码部分高度
    let lines = editor.getModel().getLineCount()
    let lineHeight = 22
    try {
        lineHeight = editor.getDomNode().querySelector('.view-lines .view-line').getBoundingClientRect().height
    } catch (error) {
        console.log(error)
    }
    let height = lineHeight * lines + top + bottom
    // 小圆点部分高度
    let dotHeight = showDots ? 36 : 0
    // 容器
    const el = document.createElement('div')
    el.style.cssText = `
        position: fixed;
        left: -999999px;
        width: ${width}px;
        height: ${height + dotHeight}px;
        border-radius: ${radius}px;
        overflow: hidden;
    `
    // 小圆点
    if (showDots) {
        const dotEl = document.createElement('div')
        dotEl.style.cssText = `
            display: flex;
            height: ${dotHeight}px;
            align-items: center;
            padding-left: ${lineNumbers ? 50 : 25}px;
            background-color: ${themeData && themeData.colors && themeData.colors['editor.background'] ? themeData.colors['editor.background']: '#000'};
            padding-top: 24px;
        `
        dotEl.innerHTML = `
            <div style="width: 12px; height: 12px; border-radius: 6px; background-color: rgb(255, 95, 86); margin-right: 10px;"></div>
            <div style="width: 12px; height: 12px; border-radius: 6px; background-color: rgb(255, 189, 46); margin-right: 10px;"></div>
            <div style="width: 12px; height: 12px; border-radius: 6px; background-color: rgb(39, 201, 63); margin-right: 10px;"></div>
        `
        el.appendChild(dotEl)
    }
    // 编辑器
    const editorEl = document.createElement('div')
    editorEl.style.cssText = `
        width: 100%;
        height: ${height}%
    `
    el.appendChild(editorEl)
    document.body.appendChild(el)
    return {
        el,
        editorEl
    };
}

// 删除元素
const deleteElement = (el) => {
    document.body.removeChild(el)
}

// 生成代码图片
export const codeToImg = ({
    editor,
    themeData,
    delay,
    ...data
}) => {
    return new Promise((resolve) => {
        const {
            el,
            editorEl
        } = createElement(editor, data, themeData)
        createEditor({
            el: editorEl,
            ...data
        }, () => {
            setTimeout(() => {
                html2canvas(el, {
                    backgroundColor: 'rgba(255,255,255,0)'
                }).then(canvas => {
                    deleteElement(el)
                    resolve(canvas.toDataURL())
                }).catch((err) => {
                    console.log(err)
                });
            }, delay * 1000);
        })
    })
}