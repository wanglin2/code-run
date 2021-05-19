<template>
  <div class="previewBox" :class="{ hide: hide }">
    <iframe class="iframe" ref="iframeRef" :srcdoc="srcdoc"></iframe>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  onMounted,
  computed,
  onBeforeUnmount,
  useContext,
  getCurrentInstance,
  nextTick,
  watch,
} from 'vue'
import { useStore } from 'vuex'
import { assembleHtml } from '@/utils'
import transform from '@/utils/transform'
import { load } from '@/utils/load'

const { proxy } = getCurrentInstance()

// 触发事件
const { emit } = useContext()

// props
defineProps({
  hide: {
    type: Boolean,
    default: false,
  },
})

// vuex
const store = useStore()
// 数据
const editData = computed(() => store.state.editData)
const srcdoc = ref('')
const iframeRef = ref(null)
const isNewWindowPreview = ref(false)
const newWindowPreviewData = ref(null)
const openAlmightyConsole = computed(() => {
  return isNewWindowPreview.value ? newWindowPreviewData.value.config.openAlmightyConsole : editData.value.config.openAlmightyConsole
})
const htmlLanguage = computed(() => {
  return isNewWindowPreview.value ? newWindowPreviewData.value.code.HTML.language : editData.value.code.HTML.language
})
const jsLanguage = computed(() => {
  return isNewWindowPreview.value ? newWindowPreviewData.value.code.JS.language : editData.value.code.JS.language
})
const cssLanguage = computed(() => {
  return isNewWindowPreview.value ? newWindowPreviewData.value.code.CSS.language : editData.value.code.CSS.language
})
const htmlContent = computed(() => {
  return isNewWindowPreview.value ? newWindowPreviewData.value.code.HTML.content : editData.value.code.HTML.content
})
const jsContent = computed(() => {
  return isNewWindowPreview.value ? newWindowPreviewData.value.code.JS.content : editData.value.code.JS.content
})
const cssContent = computed(() => {
  return isNewWindowPreview.value ? newWindowPreviewData.value.code.CSS.content : editData.value.code.CSS.content
})
const cssResources = computed(() => {
  return isNewWindowPreview.value ? newWindowPreviewData.value.code.CSS.resources : editData.value.code.CSS.resources
})
const jsResources = computed(() => {
  return isNewWindowPreview.value ? newWindowPreviewData.value.code.JS.resources : editData.value.code.JS.resources
})

// 新开窗口预览模式接收预览通知
window.addEventListener('message', ({ data = {} }) => {
  console.log('preview', data)
  if (data.type === 'preview') {
    newWindowPreviewData.value = data.data
    isNewWindowPreview.value = true
    run()
  }
})

/**
 * @Author: 王林25
 * @Date: 2021-05-07 09:13:28
 * @Desc: 运行
 */
const run = async () => {
  srcdoc.value = ''
  await load([htmlLanguage.value, jsLanguage.value, cssLanguage.value])
  let htmlTransform = transform.html(htmlLanguage.value, htmlContent.value)
  let jsTransform = transform.js(jsLanguage.value, jsContent.value)
  let cssTransform = transform.css(cssLanguage.value, cssContent.value)
  Promise.all([htmlTransform, jsTransform, cssTransform])
    .then(([htmlStr, jsStr, cssStr]) => {
      // 添加依赖资源
      let _cssResources = cssResources.value
        .map((item) => {
          return `<link href="${item.url}" rel="stylesheet">`
        })
        .join('\n')
      let _jsResources = jsResources.value
        .map((item) => {
          return `<script src="${item.url}"><\/script>`
        })
        .join('\n')
      nextTick(() => {
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
    ${openAlmightyConsole.value ? `<script src="/eruda/eruda.js"><\/script>` : ''}
    <script>
        ${openAlmightyConsole.value ? 'eruda.init();' : ''}
        try {
          ${jsStr}
        } catch (err) {
          console.error('js代码运行出错')
          console.error(err)
        }
    <\/script>
  `
        let str = assembleHtml(head, body)
        srcdoc.value = str
        isNewWindowPreview.value = false
      })
    })
    .catch((error) => {
      console.log(error)
      log('log_error', error.message)
    })
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

/**
 * @Author: 王林25
 * @Date: 2021-05-18 13:53:25
 * @Desc: iframe的鼠标松开事件
 */
const onMouseup = () => {
  proxy.$eventEmitter.emit('iframe_mouseup')
}

// 挂载完成
onMounted(() => {
  iframeRef.value.contentWindow.addEventListener('mouseup', onMouseup)
})

// 即将解除挂载
onBeforeUnmount(() => {
  proxy.$eventEmitter.off('run', run)
  proxy.$eventEmitter.off('dynamic_js_command', dynamicRunJs)
  iframeRef.value.contentWindow.removeEventListener('mouseup', onMouseup)
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

  .iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
