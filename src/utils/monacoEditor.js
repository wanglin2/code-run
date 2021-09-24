import {
    Registry
} from 'monaco-textmate'
import {
    base
} from '@/config'
import {
    wireTmGrammars
} from 'monaco-editor-textmate'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { loadWASM } from "onigasm";

// 初始化编辑器
export const initMonacoEditor = async () => {
    // 加载onigasm的WebAssembly文件
    await loadWASM(`${base}/onigasm/onigasm.wasm`)
    // 配置编辑器运行环境
    window.MonacoEnvironment = {
        getWorkerUrl: function (moduleId, label) {
            if (label === 'json') {
                return './monaco/json.worker.bundle.js'
            }
            if (label === 'css' || label === 'scss' || label === 'less') {
                return './monaco/css.worker.bundle.js'
            }
            if (label === 'html' || label === 'handlebars' || label === 'razor') {
                return './monaco/html.worker.bundle.js'
            }
            if (label === 'typescript' || label === 'javascript') {
                return './monaco/ts.worker.bundle.js'
            }
            return './monaco/editor.worker.bundle.js'
        },
    }
}

// 语言id到作用域名称的映射
const scopeNameMap = {
    html: 'text.html.basic',
    pug: 'text.pug',
    css: 'source.css',
    less: 'source.css.less',
    scss: 'source.css.scss',
    typescript: 'source.ts',
    javascript: 'source.js',
    javascriptreact: 'source.js.jsx',
    coffeescript: 'source.coffee'
}


// 作用域名称到语法文件的映射
const tmGrammarJsonMap = {
    'text.html.basic': 'html.tmLanguage.json',
    'text.pug': 'pug.tmLanguage.json',
    'source.css': 'css.tmLanguage.json',
    'source.css.less': 'less.tmLanguage.json',
    'source.css.scss': 'scss.tmLanguage.json',
    'source.sassdoc': 'sassdoc.tmLanguage.json',
    'source.ts': 'TypeScript.tmLanguage.json',
    'source.js': 'JavaScript.tmLanguage.json',
    'source.js.jsx': 'JavaScriptReact.tmLanguage.json',
    'source.coffee': 'coffeescript.tmLanguage.json',
    'source.js.regexp': {
        format: 'plist',
        path: 'Regular Expressions (JavaScript).tmLanguage'
    }
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-09-23 11:20:31 
 * @Desc: 创建语法关联 
 */
export const wire = async (languageId, editor) => {
    // 语言id到作用域名称的映射
    const grammars = new Map()
    grammars.set(languageId, scopeNameMap[languageId])
    // 创建一个注册表，可以从作用域名称创建语法
    const registry = new Registry({
        getGrammarDefinition: async (scopeName) => {
            let jsonMap = tmGrammarJsonMap[scopeName]
            let format = 'json'
            let path = jsonMap
            if (typeof jsonMap !== 'string') {
                format = jsonMap.format
                path = jsonMap.path
            }
            return {
                format,
                content: await (await fetch(`${base}grammars/${path}`)).text()
            }
        }
    })
    // 注册语言
    monaco.languages.register({id: languageId});
    await wireTmGrammars(monaco, registry, grammars, editor)
}