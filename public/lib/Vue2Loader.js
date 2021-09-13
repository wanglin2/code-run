/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-09-13 18:59:33 
 * @Desc: 手动解析vue单文件，仅做了解，项目实际并未使用此方式来解析 
 */
;(function () {
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-09-13 18:10:56 
     * @Desc: 解析出vue单文件的各个部分，返回对应的节点 
     */
    const parseBlock = (str) => {
        // 创建一个新的HTML文档
        let doc = document.implementation.createHTMLDocument('');
        // vue单文件的内容添加到body节点下
        doc.body.innerHTML = str
        let templateEl = null
        let scriptEl = null
        let styleEls = []
        // 遍历body节点的子节点
        for (let node = doc.body.firstChild; node; node = node.nextSibling) {
            switch (node.nodeName) {
                case 'TEMPLATE':
                    templateEl = node
                    break;
                case 'SCRIPT':
                    scriptEl = node
                    break;
                case 'STYLE':
                    styleEls.push(node)
                    break;
            }
        }
        return {
            templateEl,
            scriptEl,
            styleEls
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-09-13 18:31:04 
     * @Desc: 解析script 
     */
    const parseScript = (el) => {
        let str = el.textContent
        let module = {
            exports: {}
        }
        let fn = new Function('exports', 'module', str)
        fn(module.exports, module)
        return module.exports
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-09-13 18:32:49 
     * @Desc: 解析模板 
     */
    const parseTemplate = (el) => {
        return el.innerHTML
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-09-13 19:08:11 
     * @Desc: 暴露全局方法 
     */
    window.VueLoader = (str) => {
        let {
            templateEl,
            scriptEl,
            styleEls
        } = parseBlock(str)
        let options = parseScript(scriptEl)
        options.template = parseTemplate(templateEl)
        options.name = 'vue-component'
        return options
    }
}());