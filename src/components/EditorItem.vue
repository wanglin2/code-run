<template>
  <div class="editorItem" :style="{ width: width + '%' }">
    <div
      class="touchBar"
      :style="{ width: touchBarSize + 'px' }"
      :class="{ canDrag: !disabledDrag }"
      @mousedown="onMousedown"
    ></div>
    <div class="editorContent">
      <div class="editorContentHeader">
        <div class="title" :class="{ rotate: noSpace }">{{ title }}</div>
      </div>
      <div class="editorContentBody" ref="editorEl"></div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  useContext,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  watch,
  nextTick,
} from 'vue'
import useDrag from '@/hooks/useDrag.js'

// 触发事件
const { emit } = useContext()

// props
const props = defineProps({
  disabledDrag: {
    type: Boolean,
    default: true,
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
  touchBarSize: {
    type: Number,
    default: 18,
  },
  title: {
    type: String,
    default: '',
  },
  noSpace: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
})

// 拖动方法
const { onMousedown, off } = useDrag(
  (...args) => {
    emit('dragStart', ...args)
  },
  (...args) => {
    if (props.disabledDrag) {
      return
    }
    emit('drag', ...args)
  },
  (...args) => {
    emit('dragOver', ...args)
  }
)

// 编辑器容器
const editorEl = ref(null)
// 编辑器
let editor = null

/**
 * @Author: 王林25
 * @Date: 2021-04-29 20:05:50
 * @Desc: 渲染编辑器
 */
const renderEditor = () => {
  nextTick(() => {
    if (!editor) {
      // 创建编辑器
      editor = monaco.editor.create(editorEl.value, {
        // value: props.content,
        language: props.language,
        minimap: {
          enabled: false, // 关闭小地图
        },
        wordWrap: 'on', // 代码超出换行
        theme: 'vs-dark', // 主题
      })
      // 设置文档内容
      editor.setValue(props.content)
      // 监听编辑事件
      editor.onDidChangeModelContent((e) => {
        emit('change', editor.getValue())
      })
      // 监听失焦事件
      editor.onDidBlurEditorText((e) => {
        emit('blur', editor.getValue())
      })
    } else {
      editor.layout()
    }
  })
}

/**
 * @Author: 王林25
 * @Date: 2021-04-30 17:19:25
 * @Desc: 获取文档内容
 */
const getValue = () => {
  return editor.getValue()
}

watch(
  [
    () => {
      return props.height
    },
    () => {
      return props.width
    },
  ],
  () => {
    renderEditor()
  }
)

onMounted(() => {})

// 即将解除挂载
onBeforeUnmount(() => {
  off()
})
</script>

<style scoped lang="less">
.editorItem {
  height: 100%;
  background-color: #1d1e22;
  display: flex;
  overflow: hidden;

  .touchBar {
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    border-right: 1px solid rgba(0, 0, 0, 0.4);
    background-color: #333642;

    &.canDrag {
      cursor: col-resize;
    }
  }

  .editorContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .editorContentHeader {
      width: 100%;
      height: 35px;
      background-color: rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      padding: 0 5px;
      flex-grow: 0;
      flex-shrink: 0;

      .title {
        font-weight: bold;
        color: #aaaebc;
        font-size: 18px;
        transition: all 0.2s;

        &.rotate {
          transform: rotate(90deg) translate(-2px, 6px);
          transform-origin: left top;
          font-size: 14px;
        }
      }
    }

    .editorContentBody {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>