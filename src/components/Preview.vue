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

/**
 * @Author: 王林25
 * @Date: 2021-05-07 09:13:28
 * @Desc: 运行
 */
const run = async () => {
  srcdoc.value = ''
  let h = editData.value.code.HTML.language
  let j = editData.value.code.JS.language
  let c = editData.value.code.CSS.language
  await load([h, j, c])
  let htmlTransform = transform.html(h, editData.value.code.HTML.content)
  let jsTransform = transform.js(j, editData.value.code.JS.content)
  let cssTransform = transform.css(c, editData.value.code.CSS.content)
  Promise.all([htmlTransform, jsTransform, cssTransform])
    .then(([htmlStr, jsStr, cssStr]) => {
      // 添加依赖资源
      let cssResources = editData.value.code.CSS.resources
        .map((item) => {
          return `<link href="${item.url}" rel="stylesheet">`
        })
        .join('\n')
      let jsResources = editData.value.code.JS.resources
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
    ${cssResources}
    <script src="/console/compile.js"><\/script>
  `
        let body = `
    ${htmlStr}
    ${jsResources}
    ${
      editData.value.config.openAlmightyConsole
        ? `<script src="/eruda/eruda.js"><\/script>`
        : ''
    }
    <script>
        ${editData.value.config.openAlmightyConsole ? 'eruda.init();' : ''}
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
      })
    })
    .catch((error) => {
      console.log(error)
      log('log_error', error.message)
    })
}

proxy.$eventEmitter.on('run', run)

watch(() => {
  return store.state.editData.config.openAlmightyConsole
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
