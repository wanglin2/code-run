<template>
  <div>
    <!-- importmap编辑弹窗 -->
    <el-dialog title="添加Import Map" :width="700" v-model="dialogVisible">
      <div class="importMapEditBox" ref="importMapEditBox"></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  ref,
  getCurrentInstance,
  defineProps,
  watch,
  nextTick,
  computed
} from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { wire } from '@/utils/monacoEditor'
import { supportLanguage, defaultImportMapStr } from '@/config/constants'
import { useStore } from 'vuex'

// props
const props = defineProps({
  codeTheme: {
    type: String,
    default: ''
  },
  codeFontSize: {
    type: Number,
    default: 16
  }
})

const store = useStore()
const editData = computed(() => store.state.editData)
const proxy = getCurrentInstance().proxy
const dialogVisible = ref(false)
proxy.$eventEmitter.on('show_edit_importmap_dialog', item => {
  dialogVisible.value = true
})

// 创建编辑器
let editor = null // 编辑器实例
// 编辑器容器
const importMapEditBox = ref(null)
// 创建编辑器
const createEditor = async () => {
  // 创建编辑器
  editor = monaco.editor.create(importMapEditBox.value, {
    model: null,
    minimap: {
      enabled: false // 关闭小地图
    },
    wordWrap: 'on', // 代码超出换行
    theme: props.codeTheme || 'vs-dark', // 主题
    fontSize: props.codeFontSize || 16,
    fontFamily: 'MonoLisa, monospace',
    contextmenu: false, // 不显示右键菜单
    fixedOverflowWidgets: true // 让语法提示层能溢出容器
  })
  // 设置文档内容
  updateDoc(
    editData.value.code.JS.importMap || defaultImportMapStr,
    supportLanguage.json
  )
  // 支持textMate语法解析
  wire(supportLanguage.json, editor)
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

// 更新编辑器文档模型
const updateDoc = code => {
  if (!editor) {
    return
  }
  let oldModel = editor.getModel()
  let newModel = monaco.editor.createModel(code, supportLanguage.json)
  editor.setModel(newModel)
  if (oldModel) {
    oldModel.dispose()
  }
}

const cancel = () => {
  dialogVisible.value = false
}

const confirm = () => {
  store.commit('setImportMap', editor.getValue())
  proxy.$eventEmitter.emit('run-code')
  cancel()
}

watch(dialogVisible, val => {
  if (val) {
    nextTick(() => {
      createEditor()
    })
  } else {
    if (editor) {
      editor.dispose()
      editor = null
    }
  }
})
</script>

<style scoped lang="less">
.importMapEditBox {
  width: 660px;
  height: 400px;
}
</style>
