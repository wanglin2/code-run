<template>
  <div class="editorItem" ref="editorItem">
    <div class="editorContent">
      <div class="editorContentHeader" v-if="showHeader">
        <div class="title" :class="[{ rotate: noSpace }, dir]">{{ title }}</div>
        <div class="right">
          <!-- 支持es6模块提示 -->
          <el-popover
            placement="bottom"
            effect="dark"
            trigger="hover"
            v-if="supportESModuleMap[language]"
          >
            <template #reference>
              <div class="addBtn">
                <span class="iconfont icon-tishi"></span>
              </div>
            </template>
            支持使用ES6模块语法，了解更多<a
              href="https://github.com/wanglin2/code-run#关于使用ESM"
              target="_blank"
              >关于使用ESM</a
            >
          </el-popover>
          <!-- 格式化按钮 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="格式化"
            placement="bottom"
            v-if="formatterParserMap[language]"
          >
            <div class="addBtn" @click="codeFormatter">
              <span class="iconfont icon-meihuadaima"></span>
            </div>
          </el-tooltip>
          <!-- 添加资源按钮 -->
          <template v-if="showAllAddResourcesBtn">
            <el-tooltip
              class="item"
              effect="dark"
              content="添加css资源"
              placement="bottom"
              v-if="showAddBtn"
            >
              <div class="addBtn" @click="addResource('CSS')">
                <span class="iconfont icon-css3"></span>
              </div>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="添加js资源"
              placement="bottom"
              v-if="showAddBtn"
            >
              <div class="addBtn" @click="addResource('JS')">
                <span class="iconfont icon-logo-javascript"></span>
              </div>
            </el-tooltip>
          </template>
          <template v-else>
            <el-tooltip
              class="item"
              effect="dark"
              content="添加资源"
              placement="bottom"
              v-if="showAddBtn"
            >
              <div class="addBtn" @click="addResource()">
                <span
                  class="iconfont icon-chuangjiantianjiapiliangtianjia"
                ></span>
              </div>
            </el-tooltip>
          </template>
          <!-- 添加importMap -->
          <el-tooltip
            class="item"
            effect="dark"
            content="添加Import Map"
            placement="bottom"
            v-if="supportESModuleMap[language]"
          >
            <div class="addBtn" @click="addImportMap">
              <span class="iconfont icon-brackets-curly"></span>
            </div>
          </el-tooltip>
          <!-- 选择语言 -->
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
          <!-- 更多 -->
          <Dropdown
            style="margin-left: 10px;"
            :list="dropdownList"
            @click="onDropdownClick"
          ></Dropdown>
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
  onBeforeUnmount,
  onMounted,
  watch,
  nextTick,
  defineEmits
} from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import {
  supportLanguage,
  formatterParserMap,
  langTypeMap,
  supportESModuleMap
} from '@/config/constants'
import { ElTooltip, ElSelect, ElOption, ElPopover } from 'element-plus'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { wire } from '@/utils/monacoEditor'
import Dropdown from './Dropdown'

// 触发事件
const emit = defineEmits([
  'preprocessor-change',
  'code-change',
  'blur',
  'add-resource',
  'space-change',
  'create-code-img',
  'add-importmap'
])

// props
const props = defineProps({
  preprocessorList: {
    type: Array,
    default() {
      return []
    }
  },
  title: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: ''
  },
  codeTheme: {
    type: String,
    default: ''
  },
  codeFontSize: {
    type: Number,
    default: 16
  },
  content: {
    type: String,
    default: ''
  },
  showAddBtn: {
    type: Boolean,
    default: false
  },
  dir: {
    type: String,
    default: ''
  },
  showAllAddResourcesBtn: {
    type: Boolean,
    default: false
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})

// hooks定义部分

// 创建编辑器
let editor = null // 编辑器实例
// 编辑器容器
const editorEl = ref(null)
const useCreateEditor = ({ props, emit, updateDoc }) => {
  // 创建编辑器
  const createEditor = async () => {
    if (!editor) {
      // 创建编辑器
      editor = monaco.editor.create(editorEl.value, {
        model: null,
        minimap: {
          enabled: false // 关闭小地图
        },
        wordWrap: 'on', // 代码超出换行
        theme: props.codeTheme || 'vs-dark', // 主题
        fontSize: props.codeFontSize || 16,
        fontFamily: 'MonoLisa, monospace',
        contextmenu: false, // 不显示右键菜单
        fixedOverflowWidgets: true, // 让语法提示层能溢出容器
        readOnly: props.readOnly
      })
      // 设置文档内容
      updateDoc(props.content, props.language)
      // 支持textMate语法解析
      wire(props.language, editor)
      // 监听编辑事件
      editor.onDidChangeModelContent(() => {
        emit('code-change', editor.getValue())
      })
      // 监听失焦事件
      editor.onDidBlurEditorText(() => {
        emit('blur', editor.getValue())
      })
    }
    // 更新字号
    watch(
      () => {
        return props.codeFontSize
      },
      val => {
        editor.updateOptions({
          fontSize: val
        })
      }
    )
  }

  return {
    createEditor
  }
}

// 选择预处理器
const usePreprocessor = ({ props, emit, updateDoc }) => {
  // 预处理器
  const preprocessor = ref(props.language)
  // 修改预处理器
  const preprocessorChange = e => {
    emit('preprocessor-change', e)
  }
  // 更新语言
  watch(
    () => {
      return props.language
    },
    () => {
      preprocessor.value = props.language
      updateDoc(props.content, props.language)
      wire(props.language, editor)
    }
  )

  return {
    preprocessor,
    preprocessorChange
  }
}

// 处理尺寸调整
const editorItem = ref(null)
const useSizeChange = ({ props }) => {
  const noSpace = ref(false)
  // 更新尺寸
  let timer = null
  const resize = () => {
    // 100ms内只执行一次，优化卡顿问题
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      nextTick(() => {
        if (!editorItem.value) {
          return
        }
        let { width, height } = editorItem.value.getBoundingClientRect()
        // 宽度小于100像素则旋转标题
        noSpace.value = (props.dir === 'h' ? width : height) <= 100
        emit('space-change', noSpace.value)
        editor && editor.layout()
        timer = null
      })
    }, 100)
  }

  // 监听dom大小变化
  const ro = new ResizeObserver(entries => {
    for (const entry of entries) {
      if (entry.target.classList.contains('dragItem')) {
        resize()
      }
    }
  })

  // 挂载完成
  onMounted(() => {
    ro.observe(editorItem.value.parentNode)
  })

  // 即将解除挂载
  onBeforeUnmount(() => {
    ro.unobserve(editorItem.value.parentNode)
  })

  return {
    noSpace
  }
}

// 处理文档内容
const useDoc = ({ props }) => {
  // 更新编辑器文档模型
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

  // 获取文档内容
  const getValue = () => {
    return editor.getValue()
  }

  // 更新文档内容
  watch(
    () => {
      return props.content
    },
    () => {
      updateDoc(props.content, props.language)
    }
  )

  return {
    updateDoc,
    getValue
  }
}

// 处理资源
const useResource = ({ emit }) => {
  // 点击添加资源
  const addResource = languageType => {
    emit('add-resource', languageType)
  }
  // 点击添加importMap
  const addImportMap = () => {
    emit('add-importmap')
  }
  return {
    addResource,
    addImportMap
  }
}

// 代码格式化
const useCodeFormat = ({ getValue, updateDoc, emit }) => {
  // 代码格式化
  const codeFormatter = () => {
    let str = window.prettier.format(getValue(), {
      parser: formatterParserMap[props.language],
      plugins: window.prettierPlugins
    })
    // 设置文档内容
    updateDoc(str, props.language)
    // 监听编辑事件
    emit('code-change', str)
    // editor.onDidChangeModel(() => {
    //   console.log('编辑')
    //   emit('code-change', editor.getValue())
    // })
  }

  return {
    codeFormatter
  }
}

// 初始化
const useInit = ({ createEditor }) => {
  onMounted(() => {
    createEditor()
  })
}

// 生成代码图片
const useCreateCodeImg = () => {
  const createCodeImg = () => {
    emit('create-code-img', editor)
  }

  return {
    createCodeImg
  }
}

// 打开本地文件
const useOpenLocalFile = ({ updateDoc, emit }) => {
  // 打开文件
  const openLocalFile = () => {
    let el = document.createElement('input')
    el.type = 'file'
    el.accept = langTypeMap[props.language]
      ? langTypeMap[props.language].join(',')
      : ''
    el.addEventListener('input', e => {
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.readAsText(file)
      reader.addEventListener('loadend', () => {
        let str = reader.result
        // 设置文档内容
        updateDoc(str, props.language)
        // 监听编辑事件
        emit('code-change', str)
        el.value = null
        el = null
      })
      reader.addEventListener('error', () => {
        el.value = null
        el = null
      })
    })
    el.click()
  }

  return {
    openLocalFile
  }
}

// 下拉菜单
const useDropdown = ({ createCodeImg, openLocalFile }) => {
  const dropdownList = [
    {
      name: '生成代码图片',
      value: 'createCodeImg'
    },
    {
      name: '打开本地文件',
      value: 'openLocalFile'
    }
  ]
  const onDropdownClick = item => {
    switch (item.value) {
      case 'createCodeImg':
        createCodeImg()
        break
      case 'openLocalFile':
        openLocalFile()
        break
      default:
        break
    }
  }

  return {
    dropdownList,
    onDropdownClick
  }
}

// created部分
const { updateDoc, getValue } = useDoc({ props })
const { createEditor } = useCreateEditor({
  props,
  emit,
  updateDoc
})
const { preprocessor, preprocessorChange } = usePreprocessor({
  props,
  emit,
  updateDoc
})
const { noSpace } = useSizeChange({ props })
const { addResource, addImportMap } = useResource({ emit })
const { codeFormatter } = useCodeFormat({ getValue, updateDoc, emit })
useInit({ createEditor })
const { createCodeImg } = useCreateCodeImg({ props })
const { openLocalFile } = useOpenLocalFile({ props, updateDoc, emit })
const { dropdownList, onDropdownClick } = useDropdown({
  createCodeImg,
  openLocalFile
})
</script>

<style scoped lang="less">
.editorItem {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  background-color: var(--editor-background);

  .editorContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .editorContentHeader {
      width: 100%;
      height: 35px;
      background: var(--editor-header-background);
      border-bottom: 1px solid var(--editor-header-border-bottom-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px;
      flex-grow: 0;
      flex-shrink: 0;
      padding-right: 20px;

      .title {
        font-weight: bold;
        color: var(--editor-header-title-color);
        font-size: 18px;
        transition: all 0.2s;

        &.rotate {
          transform: rotate(90deg) translate(-2px, 6px);
          transform-origin: left top;
          font-size: 14px;

          &.v {
            transform: rotate(0deg) translateY(-28px);
          }
        }
      }

      /deep/ .el-input__inner {
        width: 120px;
        background-color: transparent;
        border-color: var(--editor-header-color);
        color: var(--editor-header-color);
      }

      /deep/ .el-select .el-input .el-select__caret {
        color: var(--editor-header-color);
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
          color: var(--editor-header-color);
          font-weight: bold;
          cursor: pointer;
          border-radius: 3px;
          overflow: hidden;
          transition: all 0.3s;
          opacity: 0.7;

          &:hover {
            background-color: transparent;
            opacity: 1;
          }
        }
      }
    }

    .editorContentBody {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
