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
                    break;
                case 'pug':
                    resolve(window.pug.render(code))
                default:
                    resolve('')
                    break;
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
const js = (preprocessor, code) => {
    return new Promise((resolve, reject) => {
        try {
            let _code = ''
            switch (preprocessor) {
                case 'javascript':
                    resolve(code)
                    break;
                case 'babel':
                    _code = window.Babel.transform(code, {
                        presets: [
                            'es2015',
                            'es2016',
                            'es2017',
                            'react'
                        ]
                    }).code
                    resolve(_code)
                case 'typescript':
                    _code = window.typescript.transpileModule(code, {
                        reportDiagnostics: true,
                        compilerOptions: {
                            module: 'es2015'
                        }
                    }).outputText
                    resolve(_code)
                    break;
                case 'coffeescript':
                    _code = window.CoffeeScript.compile(code)
                    resolve(_code)
                    break;
                default:
                    resolve('')
                    break;
            }
        } catch (error) {
            reject(error)
        }
    })
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
                    resolve(code)
                    break;
                case 'less':
                    window.less.render(code)
                        .then((output) => {
                                resolve(output.css)
                            },
                            (error) => {
                                reject(error)
                            });
                    break;
                case 'sass':
                    if (!sass) {
                        sass = new window.Sass();
                    }
                    sass.compile(code, (result) => {
                        resolve(result.text)
                    });
                    break;
                case 'stylus':
                    window.stylus.render(code, (err, css) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(css)
                        }
                    });
                    break;
                case 'postcss':
                    window.postcss([window.cssnext]).process(code).then(result => {
                        resolve(result.css)
                    })
                    break;
                default:
                    resolve('')
                    break;
            }
        } catch (error) {
            reject(error)
        }
    })
}

export default {
    html,
    js,
    css
}