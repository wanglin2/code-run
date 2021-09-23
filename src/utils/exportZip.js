import JSzip from 'jszip'
import saveAs from './FileSaver'
import {
    assembleHtml,
    compile
} from './index'

const suffixMap = {
    html: 'html',
    pug: 'pug',
    javascript: 'js',
    babel: 'js',
    typescript: 'ts',
    coffeescript: 'coffee',
    css: 'css',
    less: 'less',
    scss: 'scss',
    stylus: 'styl',
    postcss: 'css'
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-05-20 15:02:34 
 * @Desc: 生成html 
 */
const createHtml = (title, htmlStr, cssResources, jsResources) => {
    // 添加依赖资源
    let _cssResources = cssResources
        .map((item) => {
            return `<link href="${item.url}" rel="stylesheet">`
        })
        .join('\n')
    let _jsResources = jsResources
        .map((item) => {
            return `<script src="${item.url}"><\/script>`
        })
        .join('\n')
    let head = `
        <title>${title}<\/title>
        ${_cssResources}
        <link rel="stylesheet" href="./style.css">
    `
    let body = `
        ${htmlStr}
        ${_jsResources}
        <script src="./script.js"></script>
    `
    return assembleHtml(head, body)
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-05-20 10:00:40 
 * @Desc: 导出zip 
 */
const exportZip = async (data, fileName) => {
    let html = data.value.code.HTML.content
    let htmlLan = data.value.code.HTML.language
    let js = data.value.code.JS.content
    let jsLan = data.value.code.JS.language
    let css = data.value.code.CSS.content
    let cssLan = data.value.code.CSS.language
    let cssResources = data.value.code.CSS.resources.map((item) => {
        return {
            ...item,
        }
    })
    let jsResources = data.value.code.JS.resources.map((item) => {
        return {
            ...item,
        }
    })
    let zip = new JSzip()
    // 源代码
    zip.folder('src')
    zip.file('src/index.' + suffixMap[htmlLan], html)
    zip.file('src/script.' + suffixMap[jsLan], js)
    zip.file('src/style.' + suffixMap[cssLan], css)
    // 编译后的代码
    zip.folder('dist')
    let compiledData = await compile(htmlLan, jsLan, cssLan, html, js, css)
    let _html = createHtml(fileName, compiledData.html, cssResources, jsResources)
    zip.file('dist/index.html', _html)
    zip.file('dist/script.js', compiledData.js)
    zip.file('dist/style.css', compiledData.css)
    // 下载
    zip.generateAsync({
            type: "blob"
        })
        .then((content) => {
            saveAs(content, fileName + ".zip", {
                autoBom: true
            });
        });
}

export default exportZip