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
          :showAllAddResourcesBtn="['vue2'].includes(item.language)"
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
    <!-- 生成代码图片配置弹窗 -->
    <el-dialog
      title="生成代码图片"
      :width="500"
      v-model="createCodeImgSettingDialogVisible"
    >
      <div class="settingRow">
        <span class="name">是否显示代码行号</span>
        <div class="control">
          <el-switch v-model="codeImgSetting.lineNumbers" />
        </div>
      </div>
      <div class="settingRow">
        <span class="name">是否显示小圆点</span>
        <div class="control">
          <el-switch v-model="codeImgSetting.showDots" />
        </div>
      </div>
      <div class="settingRow">
        <span class="name">宽度</span>
        <div class="control">
          <el-input-number
            v-model="codeImgSetting.width"
            :min="0"
            :max="5000"
          />
        </div>
      </div>
      <div class="settingRow">
        <span class="name">上边距</span>
        <div class="control">
          <el-input-number v-model="codeImgSetting.top" :min="0" :max="100" />
        </div>
      </div>
      <div class="settingRow">
        <span class="name">下边距</span>
        <div class="control">
          <el-input-number
            v-model="codeImgSetting.bottom"
            :min="0"
            :max="100"
          />
        </div>
      </div>
      <div class="settingRow">
        <span class="name">圆角</span>
        <div class="control">
          <el-input-number
            v-model="codeImgSetting.radius"
            :min="0"
            :max="100"
          />
        </div>
      </div>
      <div class="settingRow">
        <span class="name">等待时间（秒）</span>
        <div class="control">
          <el-input-number
            v-model="codeImgSetting.delay"
            :min="3"
            :max="100"
          />
          <p class="desc">如果生成的图片内代码未高亮完全，可适当延长等待时间。</p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelCreateCodeImg">取 消</el-button>
          <el-button type="primary" @click="confirmCreateCodeImg" :loading="creatingCodeImg"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 生成代码图片预览弹窗 -->
    <el-dialog
      title="图片预览"
      :width="500"
      v-model="codeImgPreviewDialogVisible"
    >
      <div class="codeImgPreviewBox">
        <img :src="codeImgPreviewUrl" alt="" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDownloadCodeImg">关 闭</el-button>
          <el-button type="primary" @click="confirmDownloadCodeImg"
            >下 载</el-button
          >
        </span>
      </template>
    </el-dialog>
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
  reactive,
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
  ElSwitch,
  ElInputNumber,
} from 'element-plus'
import { codeThemeList } from '@/config/codeThemeList'
import { base } from '@/config'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { codeToImg } from '@/utils/codeToImg'

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
  }, initEditorItemList)

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

// 代码图片预览下载
const useCodeImgPreview = () => {
  const codeImgPreviewDialogVisible = ref(false)
  const codeImgPreviewUrl = ref('')

  // 关闭弹窗
  const cancelDownloadCodeImg = () => {
    codeImgPreviewDialogVisible.value = false
    codeImgPreviewUrl.value = ''
  }

  // 下载图片
  const confirmDownloadCodeImg = () => {
    let link = document.createElement('a')
    link.download = 'export.png'
    link.href = codeImgPreviewUrl.value
    link.click()
  }

  // 设置预览url
  const setCodeImgPreviewUrl = (url) => {
    codeImgPreviewUrl.value = url
    codeImgPreviewDialogVisible.value = true
  }

  return {
    codeImgPreviewDialogVisible,
    codeImgPreviewUrl,
    cancelDownloadCodeImg,
    confirmDownloadCodeImg,
    setCodeImgPreviewUrl,
  }
}

// 生成代码图片
const useCreateCodeImg = ({
  codeTheme,
  codeFontSize,
  getThemeData,
  setCodeImgPreviewUrl,
}) => {
  const createCodeImgSettingDialogVisible = ref(false)
  const codeImgSetting = reactive({
    lineNumbers: false,
    top: 20,
    bottom: 20,
    radius: 5,
    width: 1000,
    showDots: true,
    delay: 3
  })
  const creatingCodeImg = ref(false)
  let editor = null
  let createItem = null

  // 显示设置弹窗
  const showCreateCodeImg = (_editor, item) => {
    createCodeImgSettingDialogVisible.value = true
    editor = _editor
    createItem = item
  }

  // 关闭弹窗
  const cancelCreateCodeImg = () => {
    createCodeImgSettingDialogVisible.value = false
    creatingCodeImg.value = false
    editor = null
    createItem = null
  }

  // 确认生成代码图片
  const confirmCreateCodeImg = async () => {
    creatingCodeImg.value = true
    let img = await codeToImg({
      editor, // 当前编辑器实例
      themeData: getThemeData(), // 当前主题数据
      ...codeImgSetting,
      codeTheme: codeTheme.value,
      codeFontSize: codeFontSize.value,
      content: editor.getValue(),
      language: createItem.language,
    })
    creatingCodeImg.value = false
    cancelCreateCodeImg()
    setCodeImgPreviewUrl(img)
  }

  return {
    createCodeImgSettingDialogVisible,
    codeImgSetting,
    showCreateCodeImg,
    cancelCreateCodeImg,
    confirmCreateCodeImg,
    creatingCodeImg,
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
  codeImgPreviewDialogVisible,
  codeImgPreviewUrl,
  cancelDownloadCodeImg,
  confirmDownloadCodeImg,
  setCodeImgPreviewUrl,
} = useCodeImgPreview()
const {
  createCodeImgSettingDialogVisible,
  codeImgSetting,
  showCreateCodeImg,
  cancelCreateCodeImg,
  confirmCreateCodeImg,
  creatingCodeImg
} = useCreateCodeImg({
  codeTheme,
  codeFontSize,
  getThemeData,
  setCodeImgPreviewUrl,
})
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

.settingRow {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .name {
    width: 120px;
    text-align: right;
    margin-right: 10px;
    flex-shrink: 0;
  }

  .control {
    .desc {
      color: rgba(0,0,0,0.40);
    }
  }
}

.codeImgPreviewBox {
  width: 100%;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
