import { load } from '@/utils/load'
import { handleEsModuleCdnUrl } from '@/config/constants'

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2022-04-29 09:36:44
 * @Desc: 修改import语句
 */
const transformJsImport = (jsStr, importMap) => {
  if (!checkIsHasImport(jsStr)) {
    return {
      useImport: false,
      js: jsStr
    }
  }
  return {
    useImport: true,
    js: window.Babel.transform(jsStr, {
      plugins: [parseJsImportPlugin(importMap)]
    }).code
  }
}

// 检查是否是裸导入
const isBareImport = source => {
  return !(/^https?:\/\//.test(source) || /^(\/|\.\/|\.\.\/)/.test(source))
}

// 修改import from语句
const parseJsImportPlugin = (importMap = {}) => {
  let visited = {}
  return function(babel) {
    let t = babel.types
    return {
      visitor: {
        ImportDeclaration(path) {
          let source = path.node.source.value
          if (isBareImport(source) && !visited[source]) {
            if (!importMap[source]) {
              source = handleEsModuleCdnUrl(source)
            }
            visited[source] = true
            path.replaceWith(
              t.importDeclaration(path.node.specifiers, t.stringLiteral(source))
            )
          }
        }
      }
    }
  }
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2022-04-29 11:10:11
 * @Desc: 检测是否存在import语句
 */
const checkIsHasImport = jsStr => {
  let res = false
  window.Babel.transform(jsStr, {
    plugins: [
      function() {
        return {
          visitor: {
            ImportDeclaration(path) {
              res = true
              path.stop()
            }
          }
        }
      }
    ]
  })
  return res
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-05-13 11:35:24
 * @Desc: 编译html
 */
const html = (preprocessor, code) => {
  return new Promise((resolve, reject) => {
    try {
      switch (preprocessor) {
        case 'html':
          resolve(code)
          break
        case 'pug':
          resolve(window.pug.render(code))
          break
        default:
          resolve('')
          break
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-05-13 11:35:30
 * @Desc: 编译js
 */
const js = (preprocessor, code, importMap) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 加载babel解析器
      await load(['babel'])
      let _code = ''
      switch (preprocessor) {
        case 'javascript':
          resolve(transformJsImport(code, importMap))
          break
        case 'babel':
          _code = window.Babel.transform(code, {
            presets: [
              'env',
              // 'es2015',
              // 'es2016',
              // 'es2017',
              'react'
            ]
          }).code
          resolve({
            useImport: false,
            js: _code
          })
          break
        case 'typescript':
          _code = window.ts.transpileModule(code, {
            reportDiagnostics: true,
            compilerOptions: {
              module: 'es2015'
            }
          }).outputText
          resolve(transformJsImport(_code, importMap))
          break
        case 'coffeescript':
          _code = window.CoffeeScript.compile(code)
          resolve(transformJsImport(_code, importMap))
          break
        case 'livescript':
          let liveScript = window.require('livescript')
          _code = liveScript.compile(code)
          resolve({
            useImport: false,
            js: _code
          })
          break
        default:
          resolve({
            useImport: false,
            js: ''
          })
          break
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * @Author: 王林
 * @Date: 2022-05-04 11:05:20
 * @Desc: 转换css导入
 */
const transformCssImport = (cssStr = '') => {
  return cssStr.replace(
    /(@import\s+)('|")([^'"]+)('|")/g,
    (str, ...matches) => {
      let source = isBareImport(matches[2])
        ? handleEsModuleCdnUrl(matches[2], false)
        : matches[2]
      return `${matches[0]}${matches[1]}${source}${matches[1]}`
    }
  )
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-05-13 11:35:34
 * @Desc: 编译css
 */
let sass = null
const css = (preprocessor, code) => {
  return new Promise((resolve, reject) => {
    try {
      switch (preprocessor) {
        case 'css':
          resolve(transformCssImport(code))
          break
        case 'less':
          window.less.render(code).then(
            output => {
              resolve(transformCssImport(output.css))
            },
            error => {
              reject(error)
            }
          )
          break
        case 'sass':
        case 'scss':
          if (!sass) {
            sass = new window.Sass()
          }
          sass.compile(
            code,
            {
              indentedSyntax: preprocessor === 'sass'
            },
            result => {
              resolve(transformCssImport(result.text))
            }
          )
          break
        case 'stylus':
          window.stylus.render(code, (err, css) => {
            if (err) {
              reject(err)
            } else {
              resolve(transformCssImport(css))
            }
          })
          break
        case 'postcss':
          window
            .postcss([window.cssnext])
            .process(code)
            .then(result => {
              resolve(transformCssImport(result.css))
            })
          break
        default:
          resolve('')
          break
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-09-13 16:06:15
 * @Desc: vue2，遍历匹配节点，添加el、template属性
 */
const traverseVue2AddProperty = (path, t, data) => {
  path.traverse({
    ObjectExpression(path2) {
      if (path2.parent && path2.parent.type === 'NewExpression') {
        path2.node.properties.push(
          // el
          t.objectProperty(t.identifier('el'), t.stringLiteral('#app'))
        )
        if (data.template && data.template.content) {
          // template
          path2.node.properties.push(
            t.objectProperty(
              t.identifier('template'),
              t.stringLiteral(data.template.content)
            )
          )
        }
        path2.stop()
      }
    }
  })
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-09-10 16:03:32
 * @Desc: 解析vue2 script语法
 */
const parseVue2ScriptPlugin = data => {
  return function(babel) {
    let t = babel.types
    return {
      visitor: {
        // 解析export default模块语法
        ExportDefaultDeclaration(path) {
          // export default -> new Vue
          path.replaceWith(
            t.expressionStatement(
              t.newExpression(t.identifier('Vue'), [
                path.get('declaration').node
              ])
            )
          )
          // 添加el和template属性
          traverseVue2AddProperty(path, t, data)
        },
        // 解析module.exports模块语法
        AssignmentExpression(path) {
          try {
            let objectNode = path.get('left.object.name')
            let propertyNode = path.get('left.property.name')
            if (
              objectNode &&
              objectNode.node === 'module' &&
              propertyNode &&
              propertyNode.node === 'exports'
            ) {
              path.replaceWith(
                t.newExpression(t.identifier('Vue'), [path.get('right').node])
              )
              // 添加el和template属性
              traverseVue2AddProperty(path, t, data)
            }
          } catch (error) {
            // console.log(error)
          }
        }
      }
    }
  }
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-09-13 16:06:15
 * @Desc: vue3，遍历匹配节点，添加el、template属性
 */
const traverseVue3AddProperty = (path, t, data) => {
  let first = true
  path.traverse({
    ObjectExpression(path2) {
      if (first) {
        first = false
        if (data.template && data.template.content) {
          path2.node.properties.push(
            // template
            t.objectProperty(
              t.identifier('template'),
              t.stringLiteral(data.template.content)
            )
          )
        }
        path2.stop()
      }
    }
  })
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-09-10 16:05:31
 * @Desc: 解析vue3 script语法
 */
const parseVue3ScriptPlugin = data => {
  return function(babel) {
    let t = babel.types
    return {
      visitor: {
        // export default -> Vue.create
        ExportDefaultDeclaration(path) {
          path.replaceWith(
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.callExpression(t.identifier('createApp'), [
                    path.get('declaration').node
                  ]),
                  t.identifier('mount')
                ),
                [t.stringLiteral('#app')]
              )
            )
          )
          traverseVue3AddProperty(path, t, data)
        }
      }
    }
  }
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-09-09 13:54:12
 * @Desc: 解析出html、js、css
 */
const parseVueComponentData = async (
  data,
  parseVueScriptPlugin,
  version,
  importMap
) => {
  // html就直接渲染一个挂载vue实例的节点
  let htmlStr = `<div id="app"></div>`
  // 加载babel解析器
  await load(['babel'])
  // babel编译，通过编写插件来完成对ast的修改
  let jsData = {
    useImport: false,
    js: ''
  }
  if (data.script) {
    // Vue2支持全局变量的方式及ESM方式，Vue3只支持ESM方式
    if (
      (version === 'vue2' && checkIsHasImport(data.script.content)) ||
      version === 'vue3'
    ) {
      jsData = {
        useImport: true,
        js: window.Babel.transform(data.script.content, {
          plugins: [parseJsImportPlugin(importMap), parseVueScriptPlugin(data)]
        }).code
      }
    } else {
      jsData = {
        useImport: false,
        js: window.Babel.transform(data.script.content, {
          presets: ['env'],
          plugins: [parseVueScriptPlugin(data)]
        }).code
      }
    }
  }
  // 编译css
  let cssStr = []
  for (let i = 0; i < data.styles.length; i++) {
    let style = data.styles[i]
    let preprocessor = style.lang || 'css'
    if (preprocessor !== 'css') {
      await load([preprocessor])
    }
    let cssData = await css(preprocessor, style.content)
    cssStr.push(cssData)
  }
  return {
    html: htmlStr,
    js: jsData,
    css: cssStr.join('\r\n')
  }
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2021-09-08 20:07:46
 * @Desc: 编译vue单文件
 */
const vue = (preprocessor, code, importMap) => {
  return new Promise(async (resolve, reject) => {
    try {
      let componentData
      let parseData
      switch (preprocessor) {
        case 'vue2':
          componentData = window.VueTemplateCompiler.parseComponent(code)
          parseData = await parseVueComponentData(
            componentData,
            parseVue2ScriptPlugin,
            'vue2',
            importMap
          )
          resolve(parseData)
          break
        case 'vue3':
          componentData = window.Vue3TemplateCompiler.parse(code)
          // 使用了setup语法
          if (componentData.descriptor.scriptSetup) {
            componentData.descriptor.script = null
            let compiledScript = window.Vue3TemplateCompiler.compileScript(
              componentData.descriptor,
              {
                refSugar: true,
                id: Math.random() + ''
              }
            )
            componentData.descriptor.script = {
              content: compiledScript.content
            }
          }
          parseData = await parseVueComponentData(
            componentData.descriptor,
            parseVue3ScriptPlugin,
            'vue3',
            importMap
          )
          resolve(parseData)
          break
        default:
          resolve({
            useImport: false,
            js: ''
          })
          break
      }
    } catch (error) {
      reject(error)
    }
  })
}

export default {
  html,
  js,
  css,
  vue
}
