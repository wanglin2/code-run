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
        <div class="right">
          <el-tooltip
            class="item"
            effect="dark"
            content="添加资源"
            placement="bottom"
            v-if="showAddBtn"
          >
            <div class="addBtn" @click="addResource">
              <span class="el-icon-plus"></span>
            </div>
          </el-tooltip>
          <el-select
            size="mini"
            v-model="preprocessor"
            @change="preprocessorChange"
          >
            <el-option
              v-for="item in preprocessorList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
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
  watch,
  nextTick,
} from 'vue'
import Drag from '@/utils/Drag.js'

// 支持的语言
const supportLanguage = {
  css: 'css',
  less: 'less',
  scss: 'scss',
  sass: 'scss',
  stylus: 'scss',
  postcss: 'css',
  html: 'html',
  pug: 'pug',
  javascript: 'javascript',
  babel: 'javascript',
  typescript: 'typescript',
  coffeescript: 'coffeescript',
}

// 触发事件
const { emit } = useContext()

// props
const props = defineProps({
  preprocessorList: {
    type: Array,
    default() {
      return []
    },
  },
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
  showAddBtn: {
    type: Boolean,
    default: false,
  },
})

// 拖动方法
const drag = new Drag(
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
const onMousedown = (e) => {
  drag.onMousedown(e)
}

// 编辑器容器
const editorEl = ref(null)
// 编辑器
let editor = null
// 预处理器
const preprocessor = ref(props.language)

/**
 * @Author: 王林25
 * @Date: 2021-05-12 19:16:00
 * @Desc: 修改预处理器
 */
const preprocessorChange = (e) => {
  emit('preprocessor-change', e)
}

/**
 * @Author: 王林25
 * @Date: 2021-04-29 20:05:50
 * @Desc: 创建编辑器
 */
const createEditor = () => {
  if (!editor) {
    // 创建编辑器
    editor = monaco.editor.create(editorEl.value, {
      model: null,
      minimap: {
        enabled: false, // 关闭小地图
      },
      wordWrap: 'on', // 代码超出换行
      theme: 'vs-dark', // 主题
      fontSize: 18,
      fontFamily: 'MonoLisa, monospace',
    })
    // 设置文档内容
    updateDoc(props.content, props.language)
    // 监听编辑事件
    editor.onDidChangeModelContent((e) => {
      emit('code-change', editor.getValue())
    })
    // 监听失焦事件
    editor.onDidBlurEditorText((e) => {
      emit('blur', editor.getValue())
    })
  }
}

/**
 * @Author: 王林25
 * @Date: 2021-05-13 09:38:24
 * @Desc: 更新编辑器文档模型
 */
const updateDoc = (code, language) => {
  if (!editor) {
    return
  }
  let oldModel = editor.getModel()
  let newModel = monaco.editor.createModel(code, supportLanguage[language])
  editor.setModel(newModel)
  if (oldModel) {
    oldModel.dispose()
  }
}

/**
 * @Author: 王林25
 * @Date: 2021-04-30 17:19:25
 * @Desc: 获取文档内容
 */
const getValue = () => {
  return editor.getValue()
}

/**
 * @Author: 王林25
 * @Date: 2021-05-13 19:30:08
 * @Desc: 点击添加资源
 */
const addResource = () => {
  emit('add-resource')
}

// 更新尺寸
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
    nextTick(() => {
      editor && editor.layout()
    })
  }
)

// 更新文档内容
watch(
  () => {
    return props.content
  },
  () => {
    updateDoc(props.content, props.language)
  }
)

// 更新语言
watch(
  () => {
    return props.language
  },
  () => {
    preprocessor.value = props.language
    updateDoc(props.content, props.language)
  }
)

// 挂载完成
onMounted(() => {
  createEditor()
})

// 即将解除挂载
onBeforeUnmount(() => {
  drag.off()
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
      justify-content: space-between;
      align-items: center;
      padding: 0 5px;
      flex-grow: 0;
      flex-shrink: 0;
      padding-right: 20px;

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

      /deep/ .el-input__inner {
        width: 120px;
        background-color: transparent;
        border-color: #606266;
      }

      /deep/ .el-select .el-input .el-select__caret {
        color: #606266;
      }

      .right {
        display: flex;
        align-items: center;

        .addBtn {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          color: #606266;
          font-weight: bold;
          cursor: pointer;
          border-radius: 3px;
          overflow: hidden;
          transition: all 0.3s;

          &:hover {
            background-color: #333642;
          }
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