<template>
  <div class="editorBox" :class="{ hide: hide }">
    <Drag v-if="show" :number="editorItemList.length" :dir="dir">
      <DragItem
        v-for="(item, index) in editorItemList"
        :key="item.title"
        :index="index"
        :disabled="item.disableDrag"
        :showTouchBar="item.showTouchBar"
        :title="item.showTitle ? item.title : ''"
      >
        <EditorItem
          :title="item.title"
          :language="item.language"
          :codeTheme="codeTheme"
          :codeFontSize="codeFontSize"
          :content="item.content"
          :preprocessorList="preprocessorListMap[item.title]"
          :showAddBtn="item.showAddBtn"
          :dir="dir"
          :showAllAddResourcesBtn="['vue2', 'vue3'].includes(item.language)"
          :showHeader="showHeader"
          :readOnly="readOnly"
          @code-change="
            (code) => {
              codeChange(item, code)
            }
          "
          @preprocessor-change="
            (p) => {
              preprocessorChange(item, p)
            }
          "
          @add-resource="
            (languageType) => {
              addResource(languageType || item.title)
            }
          "
          @space-change="
            (noSpace) => {
              item.showTitle = noSpace
            }
          "
          @create-code-img="
            (editor) => {
              showCreateCodeImg(editor, item)
            }
          "
        ></EditorItem>
      </DragItem>
    </Drag>
    <!-- 资源管理弹窗 -->
    <el-dialog
      :title="`添加${addResourceType}资源`"
      :width="1000"
      v-model="addResourceDialogVisible"
    >
      <div class="btnGroup">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addOneResource"
          >添加资源</el-button
        >
        <!-- 常用CDN服务 -->
        <el-dropdown style="margin-left: 15px" @command="handleCdnCommand">
          <span class="el-dropdown-link">
            常用CDN服务<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, index) in cdnSiteList"
                :key="index"
                :command="item.url"
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-table :data="resourceData" empty-text="暂无数据" :height="300">
        <el-table-column label="名称" width="200">
          <template #default="scope">
            <el-input
              v-model="resourceData[scope.$index].name"
              size="small"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template #default="scope">
            <el-input
              v-model="resourceData[scope.$index].url"
              size="small"
              @change="resourceInputChange(scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button
              @click="deleteResource(scope)"
              type="text"
              icon="el-icon-delete"
            ></el-button>
            <el-button
              @click="upResource(scope)"
              type="text"
              icon="el-icon-top"
              :disabled="scope.$index <= 0"
            ></el-button>
            <el-button
              @click="downResource(scope)"
              type="text"
              icon="el-icon-bottom"
              :disabled="scope.$index >= resourceData.length - 1"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddResource">取 消</el-button>
          <el-button type="primary" @click="confirmAddResource"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 生成代码图片 -->
    <CodeToImg 
      ref="CodeToImgComp" 
      :getThemeData="getThemeData" 
      :codeTheme="codeTheme" 
      :codeFontSize="codeFontSize"
    ></CodeToImg>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  onMounted,
  computed,
  getCurrentInstance,
  watch,
  onUnmounted,
} from 'vue'
import { useStore } from 'vuex'
import EditorItem from '@/components/EditorItem.vue'
import Drag from './Drag.vue'
import DragItem from './DragItem.vue'
import {
  defaultEditorMap,
  preprocessorListMap,
  cdnSiteList,
} from '@/config/constants'
import {
  ElButton,
  ElDialog,
  ElTable,
  ElDropdownMenu,
  ElDropdownItem,
  ElDropdown,
  ElInput,
  ElTableColumn,
  ElMessage,
} from 'element-plus'
import { codeThemeList } from '@/config/codeThemeList'
import { base } from '@/config'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import CodeToImg from '@/components/CodeToImg.vue'

// props
const props = defineProps({
  // 是否隐藏编辑器
  hide: {
    type: Boolean,
    default: false,
  },
  // 排布方向
  dir: {
    type: String,
    default: 'h', // v（垂直）、h（水平）
  },
  // 要显示的编辑器列表
  showList: {
    type: Array,
    default() {
      return ['HTML', 'CSS', 'JS']
    }, // 目前共有四种编辑器：'HTML'、 'CSS'、 'JS'、 'VUE'
  },
  // 是否要显示编辑器的头部
  showHeader: {
    type: Boolean,
    default: true,
  },
  // 不要触发代码运行
  notRunCode: {
    type: Boolean,
    default: false,
  },
  // 编辑器只读
  readOnly: {
    type: Boolean,
    default: false,
  },
})

// hooks定义部分
// 初始化数据
const useInit = () => {
  const store = useStore()
  return {
    store,
    proxy: getCurrentInstance().proxy,
    editData: computed(() => store.state.editData), // 数据
    codeTheme: computed(() => store.state.editData.config.codeTheme), // 代码主题
    codeFontSize: computed(() => store.state.editData.config.codeFontSize), // 代码字号
  }
}

// 初始化编辑器列表
const useInitEditorList = ({ props, editData }) => {
  let show = ref(false)
  // 编辑器列表
  let editorItemList = ref([])

  // 初始化编辑器列表数据
  const initEditorItemList = () => {
    editorItemList = ref(
      props.showList.map((item) => {
        if (typeof item === 'string') {
          return {
            ...defaultEditorMap[item],
            showTitle: false,
          }
        } else {
          return {
            ...defaultEditorMap[item.title],
            ...item,
            showTitle: false,
          }
        }
      })
    )
  }
  initEditorItemList()

  // 数据变化后重新初始化
  watch(() => {
    return props.showList
  }, initEditorItemList, {
    deep: true
  })

  // 设置编辑器列表初始数据
  const setInitData = () => {
    const code = editData.value.code
    Object.keys(code).forEach((type) => {
      let index = getIndexByType(type)
      if (index === -1) {
        return
      }
      editorItemList.value[index].content = code[type].content
      editorItemList.value[index].language = code[type].language
    })
  }

  return {
    show,
    editorItemList,
    setInitData,
  }
}

// 处理主题
const useTheme = ({ codeTheme, proxy }) => {
  let themeData = null
  // 加载主题
  const loadTheme = async () => {
    try {
      if (!codeTheme.value) {
        return
      }
      let item = codeThemeList.find((item) => {
        return item.value === codeTheme.value
      })
      if (!item) {
        return
      }
      if (item.custom) {
        // 该主题已加载，直接使用缓存
        if (item.loaded) {
          themeData = item.cache
        } else {
          // 未加载，则先加载
          themeData = await (
            await fetch(`${base}themes/${codeTheme.value}.json`)
          ).json()
          item.loaded = true
          item.cache = themeData
        }
        monaco.editor.defineTheme(codeTheme.value, themeData)
      }
      monaco.editor.setTheme(codeTheme.value)
      proxy.$eventEmitter.emit('set-theme', themeData)
    } catch (error) {
      console.log(error)
      ElMessage.error('主题加载失败，请重试')
    }
  }

  // 获取主题数据
  const getThemeData = () => {
    return themeData
  }

  // 监听设置代码主题
  watch(codeTheme, () => {
    loadTheme()
  })

  return {
    loadTheme,
    getThemeData,
  }
}

// 代码运行
const useRunCode = ({ store, proxy }) => {
  // 布局
  const layout = computed(() => {
    return store.state.editData.config.layout
  })

  // 发送运行代码的通知
  const runCode = () => {
    if (props.notRunCode) return
    proxy.$eventEmitter.emit('run')
    if (layout.value === 'newWindowPreview') {
      proxy.$eventEmitter.emit('preview_window_run')
    }
  }

  // 开启关闭全能console后重新运行代码
  const openAlmightyConsole = computed(() => {
    return store.state.editData.config.openAlmightyConsole
  })
  watch(
    () => {
      return openAlmightyConsole.value
    },
    () => {
      runCode()
    }
  )

  return {
    runCode,
  }
}

// 代码编辑器状态改变
const useEditorChange = ({
  setInitData,
  store,
  editorItemList,
  autoRun,
  runCode,
  editData,
  proxy,
}) => {
  // 重新设置代码数据
  const resetCode = () => {
    setInitData()
    runCode()
  }
  proxy.$eventEmitter.on('reset_code', resetCode)
  onUnmounted(() => {
    proxy.$eventEmitter.off('reset_code', resetCode)
  })

  // 代码修改事件
  const codeChange = (item, code) => {
    store.commit('setCodeContent', {
      type: item.title,
      code,
    })
    autoRun()
  }

  // 获取指定语言的数据
  const getIndexByType = (type) => {
    return editorItemList.value.findIndex((item) => {
      return item.title === type
    })
  }

  // 修改预处理器
  const preprocessorChange = (item, p) => {
    let index = getIndexByType(item.title)
    editorItemList.value[index].language = p
    editorItemList.value[index].content =
      editData.value.code[item.title].content
    store.commit('setCodePreprocessor', {
      type: item.title,
      preprocessor: p,
    })
    runCode()
  }

  return {
    codeChange,
    getIndexByType,
    preprocessorChange,
  }
}

// 自动运行
const useAutoRun = ({ store, runCode }) => {
  let autoRunTimer = null
  const isAutoRun = computed(() => {
    return store.state.editData.config.autoRun
  })
  const autoRun = () => {
    if (!isAutoRun.value) {
      return
    }
    clearTimeout(autoRunTimer)
    autoRunTimer = setTimeout(() => {
      runCode()
    }, 1000)
  }
  return {
    autoRun,
  }
}

// 静态资源管理
const useHandleAssets = ({ store, runCode, editData }) => {
  const addResourceDialogVisible = ref(false)
  const resourceData = ref([])
  const addResourceType = ref('')

  // 跳转到cdn服务
  const handleCdnCommand = (url) => {
    let a = document.createElement('a')
    a.target = '_blank'
    a.href = url
    a.click()
    a = null
  }

  // 添加资源
  const addResource = (item) => {
    addResourceType.value = item
    resourceData.value = (editData.value.code[item].resources || []).map(
      (r) => {
        return {
          ...r,
        }
      }
    )
    addResourceDialogVisible.value = true
  }

  // 删除一个资源
  const deleteResource = (e) => {
    resourceData.value.splice(e.$index, 1)
  }

  // 添加一个资源
  const addOneResource = () => {
    resourceData.value.push({
      url: '',
      name: '',
    })
  }

  // 上移
  const upResource = (e) => {
    let index = e.$index
    if (index <= 0) {
      return
    }
    let tmp = resourceData.value[index]
    resourceData.value[index] = resourceData.value[index - 1]
    resourceData.value[index - 1] = tmp
  }

  // 下移
  const downResource = (e) => {
    let index = e.$index
    if (index >= resourceData.value.length - 1) {
      return
    }
    let tmp = resourceData.value[index]
    resourceData.value[index] = resourceData.value[index + 1]
    resourceData.value[index + 1] = tmp
  }

  // 自动填充名称
  const resourceInputChange = (index) => {
    if (resourceData.value[index].url) {
      let arr = resourceData.value[index].url.split('/')
      resourceData.value[index].name = arr[arr.length - 1] || ''
    }
  }

  // 取消添加资源
  const cancelAddResource = () => {
    addResourceDialogVisible.value = false
    addResourceType.value = ''
    resourceData.value = []
  }

  // 确认添加资源
  const confirmAddResource = () => {
    let resources = resourceData.value.map((item) => {
      return {
        ...item,
      }
    })
    store.commit('setCodeResource', {
      type: addResourceType.value,
      resources,
    })
    cancelAddResource()
    runCode()
  }

  return {
    resourceData,
    addResourceType,
    addResourceDialogVisible,
    handleCdnCommand,
    addResource,
    deleteResource,
    addOneResource,
    cancelAddResource,
    confirmAddResource,
    upResource,
    downResource,
    resourceInputChange
  }
}

// 生成代码图片
const CodeToImgComp = ref(null)
const useCodeToImg = () => {
  // 显示设置弹窗
  const showCreateCodeImg = (_editor, item) => {
    CodeToImgComp.value.showCreateCodeImg(_editor, item)
  }

  return {
    showCreateCodeImg,
  }
}

// created部分
const { store, editData, codeTheme, proxy, codeFontSize } = useInit()
const { show, editorItemList, setInitData } = useInitEditorList({
  props,
  editData,
})
const { loadTheme, getThemeData } = useTheme({ codeTheme, proxy })
const { runCode } = useRunCode({ store, proxy })
const { autoRun } = useAutoRun({ store, runCode })
const { getIndexByType, preprocessorChange, codeChange } = useEditorChange({
  setInitData,
  store,
  editorItemList,
  autoRun,
  runCode,
  editData,
  proxy,
})
const {
  resourceData,
  addResourceType,
  addResourceDialogVisible,
  handleCdnCommand,
  addResource,
  deleteResource,
  addOneResource,
  cancelAddResource,
  confirmAddResource,
  upResource,
  downResource,
  resourceInputChange
} = useHandleAssets({ store, runCode, editData })
const {
  showCreateCodeImg,
} =  useCodeToImg()
onMounted(async () => {
  await loadTheme()
  setInitData()
  show.value = true
  runCode()
})
</script>

<style lang="less" scoped>
.editorBox {
  width: 100%;
  height: 100%;
  display: flex;

  &.hide {
    display: none;
  }
}

/deep/ .el-dialog__body {
  padding: 20px;
}
</style>
