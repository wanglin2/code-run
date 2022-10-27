import JSzip from 'jszip'
import saveAs from './FileSaver'
import store from '@/store'

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
  postcss: 'css',
  vue: 'vue',
  vue2: 'vue',
  vue3: 'vue'
}

const handlePreviewDoc = doc => {
  return doc
    .replace('<script src="/code-run-online/base/index.js"></script>', '')
    .replace('<script src="/code-run-online/console/index.js"></script>', '')
    .replace(/".\/lib/gim, '"https://wanglin2.github.io/code-run-online/lib')
    .replace(
      /"\/code-run-online\/lib/gim,
      '"https://wanglin2.github.io/code-run-online/lib'
    )
}

const handleNormal = async data => {
  let html = data.value.code.HTML.content
  let htmlLan = data.value.code.HTML.language
  let js = data.value.code.JS.content
  let jsLan = data.value.code.JS.language
  let css = data.value.code.CSS.content
  let cssLan = data.value.code.CSS.language
  let zip = new JSzip()
  // 源代码
  zip.folder('src')
  zip.file('src/index.' + suffixMap[htmlLan], html)
  zip.file('src/script.' + suffixMap[jsLan], js)
  zip.file('src/style.' + suffixMap[cssLan], css)
  // 编译后的代码
  zip.folder('dist')
  zip.file('dist/index.html', handlePreviewDoc(store.state.previewDoc))
  return zip
}

const handleVue = async data => {
  let content = data.value.code.VUE.content
  let lang = data.value.code.VUE.language
  let zip = new JSzip()
  // 源代码
  zip.folder('src')
  zip.file('src/index.' + suffixMap[lang], content)
  // 编译后的代码
  zip.folder('dist')
  zip.file('dist/index.html', handlePreviewDoc(store.state.previewDoc))
  return zip
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-05-20 10:00:40
 * @Desc: 导出zip
 */
const exportZip = async (data, fileName) => {
  let zip = null
  switch (data.value.config.layout) {
    case 'vue':
      zip = await handleVue(data)
      break
    default:
      zip = await handleNormal(data)
  }
  // 下载
  zip
    .generateAsync({
      type: 'blob'
    })
    .then(content => {
      saveAs(content, fileName + '.zip', {
        autoBom: true
      })
    })
}

export default exportZip
