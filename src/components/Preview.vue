<template>
  <div
    class="previewBox"
    :class="{ hide: hide, disabledEvents: disabledEvents }"
  >
    <iframe class="iframe" ref="iframeRef" :srcdoc="srcdoc"></iframe>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  computed,
  onBeforeUnmount,
  getCurrentInstance,
  watch,
} from 'vue'
import { useStore } from 'vuex'
import { assembleHtml, compile, compileVue } from '@/utils'
import { getTemplate } from '@/utils/templates'

const { proxy } = getCurrentInstance()

// props
defineProps({
  hide: {
    type: Boolean,
    default: false,
  },
})
// vuex
const store = useStore()
// 当前布局类型
const layout = computed(() => {
  return store.state.editData.config.layout;
});
// 数据
const editData = computed(() => store.state.editData)
const keepPreviousLogs = computed(() => {
  return editData.value.config.keepPreviousLogs
})
const srcdoc = ref('')
const iframeRef = ref(null)
const isNewWindowPreview = ref(false)
const newWindowPreviewData = ref(null)
const openAlmightyConsole = computed(() => {
  return isNewWindowPreview.value
    ? newWindowPreviewData.value.config.openAlmightyConsole
    : editData.value.config.openAlmightyConsole
})
const htmlLanguage = computed(() => {
  return isNewWindowPreview.value
    ? newWindowPreviewData.value.code.HTML.language
    : editData.value.code.HTML.language
})
const jsLanguage = computed(() => {
  return isNewWindowPreview.value
    ? newWindowPreviewData.value.code.JS.language
    : editData.value.code.JS.language
})
const cssLanguage = computed(() => {
  return isNewWindowPreview.value
    ? newWindowPreviewData.value.code.CSS.language
    : editData.value.code.CSS.language
})
const htmlContent = computed(() => {
  return isNewWindowPreview.value
    ? newWindowPreviewData.value.code.HTML.content
    : editData.value.code.HTML.content
})
const jsContent = computed(() => {
  return isNewWindowPreview.value
    ? newWindowPreviewData.value.code.JS.content
    : editData.value.code.JS.content
})
const cssContent = computed(() => {
  return isNewWindowPreview.value
    ? newWindowPreviewData.value.code.CSS.content
    : editData.value.code.CSS.content
})
const cssResources = computed(() => {
  return isNewWindowPreview.value
    ? newWindowPreviewData.value.code.CSS.resources
    : editData.value.code.CSS.resources
})
const jsResources = computed(() => {
  return isNewWindowPreview.value
    ? newWindowPreviewData.value.code.JS.resources
    : editData.value.code.JS.resources
})
const vueLanguage = computed(() => {
  return editData.value.code.VUE.language
})
const vueContent = computed(() => {
  return editData.value.code.VUE.content
})

// 新开窗口预览模式接收预览通知
window.addEventListener('message', ({ data = {} }) => {
  if (data.type === 'preview') {
    newWindowPreviewData.value = data.data
    isNewWindowPreview.value = true
    run()
  }
})

/**
 * @Author: 王林25
 * @Date: 2021-05-20 15:14:47
 * @Desc: 生成html结构
 */
const createHtml = (
  htmlStr,
  jsStr,
  cssStr,
  cssResources,
  jsResources,
  openAlmightyConsole
) => {
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
    <title>预览<\/title>
    <style type="text/css">
        ${cssStr}
    <\/style>
    ${_cssResources}
    <script src="/console/compile.js"><\/script>
  `
  let body = `
    ${htmlStr}
    ${_jsResources}
    ${openAlmightyConsole ? `<script src="/eruda/eruda.js"><\/script>` : ''}
    <script>
        ${openAlmightyConsole ? 'eruda.init();' : ''}
        try {
          ${jsStr}
        } catch (err) {
          console.error('js代码运行出错')
          console.error(err)
        }
    <\/script>
  `
  return assembleHtml(head, body)
}

/**
 * @Author: 王林25
 * @Date: 2021-05-07 09:13:28
 * @Desc: 运行
 */
const run = async () => {
  try {
    if (!keepPreviousLogs.value) {
      proxy.$eventEmitter.emit('clear_logs')
    }
    srcdoc.value = ''
    let _jsResourcesPlus = []
    let _cssResourcesPlus = []
    let compiledData = null
    // vue单文件
    if (layout.value === 'vue') {
      compiledData = await compileVue(vueLanguage.value, vueContent.value)
      if (compiledData) {
        // 自动引入vue资源
        _jsResourcesPlus = getTemplate(vueLanguage.value).code.JS.resources
      } else {
        compiledData = {
          html: '',
          css: '',
          js: ''
        }
      }
    } else {
      compiledData = await compile(
        htmlLanguage.value,
        jsLanguage.value,
        cssLanguage.value,
        htmlContent.value,
        jsContent.value,
        cssContent.value
      )
    }
    let _cssResources = cssResources.value.map((item) => {
      return {
        ...item,
      }
    }).concat(_cssResourcesPlus)
    let _jsResources = jsResources.value.map((item) => {
      return {
        ...item,
      }
    }).concat(_jsResourcesPlus)
    srcdoc.value = createHtml(
      compiledData.html,
      compiledData.js,
      compiledData.css,
      _cssResources,
      _jsResources,
      openAlmightyConsole.value
    )
    isNewWindowPreview.value = false
  } catch (error) {
    console.log(error)
    log('log_error', error.message)
  }
}

proxy.$eventEmitter.on('run', run)

watch(() => {
  return editData.value.config.openAlmightyConsole
}, run)

/**
 * @Author: 王林25
 * @Date: 2021-05-12 18:10:22
 * @Desc: 动态执行js
 */
const dynamicRunJs = (code) => {
  iframeRef.value.contentWindow.postMessage({
    type: 'command',
    data: code,
  })
}

proxy.$eventEmitter.on('dynamic_js_command', dynamicRunJs)

/**
 * @Author: 王林25
 * @Date: 2021-05-13 10:48:19
 * @Desc: 打印日志
 */
const log = (type, data) => {
  iframeRef.value.contentWindow.postMessage({
    type,
    data,
  })
}

proxy.$eventEmitter.on('log', log)
const disabledEvents = ref(false)

/**
 * @Author: 王林25
 * @Date: 2021-05-26 10:03:40
 * @Desc: 拖动开始禁止响应iframe的鼠标事件，否则父页面不会触发鼠标事件导致拖动存在bug
 */
const onDragStart = () => {
  disabledEvents.value = true
}

/**
 * @Author: 王林25
 * @Date: 2021-05-26 10:04:14
 * @Desc: 拖动结束解除禁止
 */
const onDragOver = () => {
  disabledEvents.value = false
}

proxy.$eventEmitter.on('dragStart', onDragStart)
proxy.$eventEmitter.on('dragOver', onDragOver)

// 即将解除挂载
onBeforeUnmount(() => {
  proxy.$eventEmitter.off('run', run)
  proxy.$eventEmitter.off('dynamic_js_command', dynamicRunJs)
  proxy.$eventEmitter.off('dragStart', onDragStart)
  proxy.$eventEmitter.off('dragOver', onDragOver)
})
</script>

<style scoped lang="less">
.previewBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &.hide {
    display: none;
  }

  &.disabledEvents {
    pointer-events: none;
  }

  .iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
