<template>
  <div class="editorBox" :class="{ hide: hide }">
    <Drag
      :number="editorItemList.length"
      :dir="layout === 'edit' ? 'v' : 'h'"
      :config="dragConfig"
    >
      <DragItem
        v-for="(item, index) in editorItemList"
        :key="item.title"
        :index="index"
        :disabled="item.disableDrag"
        :showTouchBar="item.showTouchBar"
        @size-change="sizeChange"
      >
        <EditorItem
          :title="item.title"
          :language="item.language"
          :content="item.content"
          :preprocessorList="preprocessorListMap[item.title]"
          :showAddBtn="item.showAddBtn"
          :codeTheme="codeTheme"
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
          @add-resource="addResource(item)"
        ></EditorItem>
      </DragItem>
    </Drag>
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
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="50">
          <template #default="scope">
            <el-button
              @click="deleteResource(scope)"
              type="text"
              icon="el-icon-delete"
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
} from 'vue'
import { useStore } from 'vuex'
import EditorItem from '@/components/EditorItem.vue'
import Drag from './Drag.vue'
import DragItem from './DragItem.vue'

const { proxy } = getCurrentInstance()

// props
const props = defineProps({
  hide: {
    type: Boolean,
    default: false,
  },
})

// vuex
const store = useStore()
// 数据
const editData = computed(() => store.state.editData)
// 代码主题
const codeTheme = computed(() => store.state.editData.config.codeTheme)
// 布局
const layout = computed(() => {
  return store.state.editData.config.layout
})
const dragConfig = ref([])
const defaultEditorItemList = [
  {
    title: 'HTML',
    language: 'html',
    content: '',
    showAddBtn: false,
    disableDrag: true,
    showTouchBar: true,
  },
  {
    title: 'CSS',
    language: 'css',
    content: '',
    showAddBtn: true,
    disableDrag: false,
    showTouchBar: true,
  },
  {
    title: 'JS',
    language: 'javascript',
    content: '',
    showAddBtn: true,
    disableDrag: false,
    showTouchBar: true,
  },
]
// 编辑器列表
const editorItemList = ref()
// 预处理器列表
const preprocessorListMap = {
  HTML: [
    {
      label: 'HTML',
      value: 'html',
    },
    {
      label: 'Pug',
      value: 'pug',
    },
  ],
  JS: [
    {
      label: 'JavaScript',
      value: 'javascript',
    },
    {
      label: 'Babel',
      value: 'babel',
    },
    {
      label: 'TypeScript',
      value: 'typescript',
    },
    {
      label: 'CoffeeScript',
      value: 'coffeescript',
    },
  ],
  CSS: [
    {
      label: 'CSS',
      value: 'css',
    },
    {
      label: 'LESS',
      value: 'less',
    },
    {
      label: 'SASS',
      value: 'sass',
    },
    {
      label: 'Stylus',
      value: 'stylus',
    },
    {
      label: 'PostCss',
      value: 'postcss',
    },
  ],
}

/**
 * @Author: 王林25
 * @Date: 2021-05-18 11:05:23
 * @Desc: 修改布局
 */
const changeLayout = () => {
  if (layout.value === 'js') {
    editorItemList.value = defaultEditorItemList.slice(2)
  } else {
    editorItemList.value = defaultEditorItemList
  }
  if (layout.value === 'edit') {
    editorItemList.value[0].showTouchBar = false
    dragConfig.value.push({
      min: 0,
    })
  } else {
    editorItemList.value[0].showTouchBar = true
    dragConfig.value = []
  }
}
changeLayout()
watch(
  () => {
    return layout.value
  },
  () => {
    changeLayout()
  }
)

/**
 * @Author: 王林25
 * @Date: 2021-05-17 20:24:11
 * @Desc: 尺寸变化
 */
const sizeChange = () => {}

/**
 * @Author: 王林25
 * @Date: 2021-05-13 09:05:02
 * @Desc: 获取指定语言的数据
 */
const getIndexByType = (type) => {
  return editorItemList.value.findIndex((item) => {
    return item.title === type
  })
}

/**
 * @Author: 王林25
 * @Date: 2021-05-06 16:52:16
 * @Desc: 设置初始数据
 */
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

/**
 * @Author: 王林25
 * @Date: 2021-05-14 11:37:21
 * @Desc: 重新设置代码数据
 */
const resetCode = () => {
  setInitData()
  runCode()
}

proxy.$eventEmitter.on('reset_code', resetCode)

/**
 * @Author: 王林
 * @Date: 2021-05-15 08:29:29
 * @Desc: 自动运行
 */
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

/**
 * @Author: 王林25
 * @Date: 2021-05-06 17:15:54
 * @Desc: 代码修改事件
 */
const codeChange = (item, code) => {
  store.commit('setCodeContent', {
    type: item.title,
    code,
  })
  autoRun()
}

/**
 * @Author: 王林25
 * @Date: 2021-05-12 19:17:26
 * @Desc: 修改预处理器
 */
const preprocessorChange = (item, p) => {
  let index = getIndexByType(item.title)
  editorItemList.value[index].language = p
  editorItemList.value[index].content = editData.value.code[item.title].content
  store.commit('setCodePreprocessor', {
    type: item.title,
    preprocessor: p,
  })
  runCode()
}

// -------------------添加资源部分---------------

const addResourceDialogVisible = ref(false)
const resourceData = ref([])
const addResourceType = ref('')
// 常用cdn服务
const cdnSiteList = [
  {
    name: 'BootCDN',
    url: 'https://www.bootcdn.cn/',
  },
  {
    name: '又拍云',
    url: 'http://jscdn.upai.com/',
  },
  {
    name: 'Staticfile CDN',
    url: 'http://staticfile.org/',
  },
  {
    name: '75CDN 前端静态资源库',
    url: 'https://cdn.baomitu.com/',
  },
  {
    name: '字节跳动静态资源公共库',
    url: 'https://cdn.bytedance.com/',
  },
  {
    name: 'cdnjs',
    url: 'https://cdnjs.com/',
  },
  {
    name: 'jsDelivr',
    url: 'https://www.jsdelivr.com/',
  },
]

/**
 * @Author: 王林25
 * @Date: 2021-05-13 20:12:56
 * @Desc: 跳转到cdn服务
 */
const handleCdnCommand = (url) => {
  let a = document.createElement('a')
  a.target = '_blank'
  a.href = url
  a.click()
  a = null
}

/**
 * @Author: 王林25
 * @Date: 2021-05-13 19:31:18
 * @Desc: 添加资源
 */
const addResource = (item) => {
  addResourceType.value = item.title
  resourceData.value = (editData.value.code[item.title].resources || []).map(
    (r) => {
      return {
        ...r,
      }
    }
  )
  addResourceDialogVisible.value = true
}

/**
 * @Author: 王林25
 * @Date: 2021-05-13 19:45:50
 * @Desc: 删除一个资源
 */
const deleteResource = (e) => {
  resourceData.value.splice(e.$index, 1)
}

/**
 * @Author: 王林25
 * @Date: 2021-05-13 19:45:56
 * @Desc: 添加一个资源
 */
const addOneResource = () => {
  resourceData.value.push({
    url: '',
    name: '',
  })
}

/**
 * @Author: 王林25
 * @Date: 2021-05-13 19:50:06
 * @Desc: 取消添加资源
 */
const cancelAddResource = () => {
  addResourceDialogVisible.value = false
  addResourceType.value = ''
  resourceData.value = []
}

/**
 * @Author: 王林25
 * @Date: 2021-05-13 19:50:01
 * @Desc: 确认添加资源
 */
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

/**
 * @Author: 王林25
 * @Date: 2021-05-14 11:38:21
 * @Desc: 发送运行代码的通知
 */
const runCode = () => {
  proxy.$eventEmitter.emit('run')
}

// 挂载完成
onMounted(async () => {
  // 获取代码数据
  await store.dispatch('getData')
  setInitData()
  runCode()
})
</script>

<style scoped lang="less">
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

.btnGroup {
}
</style>
