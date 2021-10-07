import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { wire } from './monacoEditor'
import { supportLanguage } from '@/config/constants'
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
const createEditor = async ({ el, codeTheme, codeFontSize, content, language }, callback = () => { }) => {
    // 创建编辑器
    const editor = monaco.editor.create(el, {
        model: null,
        minimap: {
            enabled: false, // 关闭小地图
        },
        wordWrap: 'on', // 代码超出换行
        theme: codeTheme || 'vs-dark', // 主题
        fontSize: codeFontSize || 16,
        fontFamily: 'MonoLisa, monospace',
        contextmenu: false, // 不显示右键菜单
        fixedOverflowWidgets: true, // 让语法提示层能溢出容器
        padding: {
            bottom: 20,
            top: 20
        },
        renderIndentGuides: false
    })
    editor.onDidChangeModelContent(() => {
        callback()
    })
    // 设置文档内容
    updateDoc(editor, content, language)
    // 支持textMate语法解析
    await wire(language, editor)
    return editor;
}
// 创建容器
const createElement = (height) => {
    const el = document.createElement('div')
    el.style.cssText = `
        position: fixed;
        left: -999999px;
        width: 1000px;
        height: ${height}px;
    `
    document.body.appendChild(el)
    return el;
}
const deleteElement = (el) => {
    document.body.removeChild(el)
}
// 生成代码图片
export const codeToImg = async ({ height, ...data }) => {
    const el = createElement(height)
    await createEditor({ el, ...data })
    setTimeout(() => {
        html2canvas(el, {
            backgroundColor: null,
            onclone(e){
                console.log(e)
            }
        }).then(canvas => {
            document.body.appendChild(canvas)
        });
    }, 5000);
}
