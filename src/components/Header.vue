<template>
  <div class="header">
    <!-- logo -->
    <div class="left">
      <h1>CodeRun</h1>
    </div>
    <!-- 标题输入栏 -->
    <div class="center">
      <input type="text" :value="codeTitle" @input="onCodeTitleInput" />
    </div>
    <!-- 工具栏 -->
    <div class="right">
      <div class="btn" @click="openSetting">
        <span class="icon iconfont icon-shezhitianchong"></span> 设置
      </div>
      <div class="btn" @click="openTemplate">
        <span class="icon iconfont icon-moban"></span> 模板
      </div>
      <div class="dropdownBtn" @click.stop>
        <div class="btn" @click="toggleToolsList()">
          <span class="icon iconfont icon-gongju"></span> 工具
        </div>
        <ul class="toolList" :class="{ show: showToolsList }">
          <li class="toolItem" @click="exportZipFile">导出zip</li>
          <li class="toolItem" @click="createShareUrl" v-if="isEdit">
            生成分享链接
          </li>
          <li class="toolItem" @click="createEmbedUrl" v-if="isEdit">
            生成嵌入链接
          </li>
          <li class="toolItem" @click="createEmbedCode" v-if="isEdit">
            生成嵌入代码
          </li>
        </ul>
      </div>
      <div class="btn" @click="run">
        <span class="icon iconfont icon-shuaxin"></span> 运行
      </div>
      <div class="btn" @click="save" v-loading="loading">
        <span class="icon iconfont icon-w_yunduan"></span> 保存
      </div>
      <div class="dropdownBtn" @click.stop>
        <div class="btn" @click="toggleMoreList()">
          <span class="icon iconfont icon-gengduo"></span>
        </div>
        <ul class="toolList" :class="{ show: showMoreList }">
          <li class="toolItem" @click="createNew">创建新项目</li>
          <li class="toolItem" @click="showMyGists">我的gist</li>
          <li class="toolItem" @click="githubToken ? logout() : login()">
            {{ githubToken ? '退出' : '登录' }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 模板弹窗 -->
    <el-dialog title="常用模板" :width="1000" v-model="templateDialogVisible">
      <div class="templateList">
        <div
          class="templateItem"
          v-for="item in templateData"
          :key="item.name"
          @click="selectTemplate(item)"
        >
          <div
            class="icon"
            :style="{ backgroundImage: `url(${item.icon})` }"
          ></div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </el-dialog>
    <!-- 设置弹窗  -->
    <el-dialog
      custom-class="settingDialog"
      title="设置"
      :width="600"
      v-model="settingDialogVisible"
    >
      <div class="settingBox">
        <el-tabs tab-position="left" v-model="settingType">
          <el-tab-pane label="布局设置" name="layout"></el-tab-pane>
          <el-tab-pane label="主题设置" name="theme"></el-tab-pane>
          <el-tab-pane label="其他设置" name="setting"></el-tab-pane>
        </el-tabs>
        <div class="settingContent">
          <component :is="componentsMap[settingType]"></component>
        </div>
      </div>
    </el-dialog>
    <!-- 导出弹窗 -->
    <el-dialog
      title="输入导出文件名称"
      v-model="exportNameInputDialogVisible"
      :width="600"
    >
      <el-input v-model="exportName"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="exportNameInputDialogVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="confirmExport">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- token弹窗 -->
    <el-dialog
      title="请输入你的github token"
      v-model="githubTokenInputDialogVisible"
      :width="600"
    >
      <el-input v-model="githubTokenValue"></el-input>
      <p class="tip">
        如果你没有创建过github token，或者忘记了之前创建的，可以去创建一个新的<a
          href="https://github.com/settings/tokens/new?scopes=repo"
          target="_blank"
          >token</a
        >，注意一定要勾选上【scopes】里的【gist】选项。
      </p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelGithubTokenValueInput">取 消</el-button>
          <el-button type="primary" @click="confirmGithubTokenValueInput"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 我的gists -->
    <el-drawer
      v-model="drawer"
      title="我的gists"
      direction="rtl"
      size="50%"
      @open="onDrawerOpen"
      @closed="onDrawerClosed"
    >
      <div class="gistBox">
        <el-table
          :data="gistList"
          style="width: 100%"
          empty-text="好像没有更多了~"
          v-loading="gistloading"
          height="100%"
        >
          <el-table-column label="名称" prop="description" />
          <el-table-column label="是否公开" prop="public">
            <template #default="scope">
              {{ scope.row.public ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="created_at">
            <template #default="scope">
              {{ dayjs(scope.row.created_at).format('YYYY/MM/DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间" prop="updated_at">
            <template #default="scope">
              {{ dayjs(scope.row.updated_at).format('YYYY/MM/DD HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="small"
                @click="updateGist(scope.row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="small"
                @click="deleteGist(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginationBox">
          <el-pagination
            layout="prev, next"
            :current-page="gistPageNo"
            :page-count="gistPageCount"
            prev-text="上一页"
            next-text="下一页"
            @current-change="gistCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </el-drawer>
    <!-- 分享弹窗 -->
    <Share ref="ShareComp" :isEdit="isEdit"></Share>
  </div>
</template>

<script setup>
import {
  getCurrentInstance,
  ref,
  computed,
  onBeforeUnmount,
  nextTick,
  shallowRef
} from 'vue'
import templateList from '@/config/templates'
import { useStore } from 'vuex'
import Setting from './Setting.vue'
import SettingLayout from './SettingLayout.vue'
import SettingTheme from './SettingTheme.vue'
import exportZip from '@/utils/exportZip'
import {
  ElMessage,
  ElButton,
  ElDialog,
  ElInput,
  ElTabs,
  ElTabPane,
  ElDrawer,
  ElTable,
  ElTableColumn,
  ElPagination
} from 'element-plus'
import { request } from '@/utils/octokit'
import dayjs from 'dayjs'
import { useRouter, useRoute } from 'vue-router'
import Share from './Share.vue'

// hooks定义部分

// 初始化
const useInit = () => {
  const { proxy } = getCurrentInstance()
  const store = useStore()
  const layout = computed(() => {
    return store.state.editData.config.layout
  })

  return {
    proxy,
    store,
    layout,
    router: useRouter(),
    route: useRoute()
  }
}

// 导出
const useExport = ({ toggleToolsList, store }) => {
  const exportNameInputDialogVisible = ref(false)
  const exportName = ref('')
  const editData = computed(() => store.state.editData)

  // 导出zip
  const exportZipFile = () => {
    exportName.value = store.state.editData.title || ''
    exportNameInputDialogVisible.value = true
    toggleToolsList(false)
  }

  // 确认导出
  const confirmExport = () => {
    if (exportName.value.trim() === '') {
      ElMessage.warning({
        message: '请输入文件名',
        type: 'warning'
      })
      return
    }
    exportNameInputDialogVisible.value = false
    exportZip(editData, exportName.value.trim())
  }

  return {
    exportNameInputDialogVisible,
    exportName,
    exportZipFile,
    confirmExport
  }
}

// 模板选择
const useTemplate = ({ layout, store, proxy }) => {
  const templateDialogVisible = ref(false)
  const templateData = ref(templateList)

  // 打开选择模板弹窗
  const openTemplate = () => {
    templateDialogVisible.value = true
  }

  // 检查布局是否和模板对应
  const checkLayout = data => {
    if (data.isVueSFC) {
      if (layout.value !== 'vue') {
        store.commit('setLayout', 'vue')
      }
    } else {
      if (layout.value === 'vue') {
        store.commit('setLayout', 'default')
      }
    }
  }

  // 选择某个模板
  const selectTemplate = data => {
    checkLayout(data)
    nextTick(() => {
      store.commit('setCode', JSON.parse(JSON.stringify(data.code)))
      proxy.$eventEmitter.emit('reset_code')
      templateDialogVisible.value = false
    })
  }

  return {
    templateDialogVisible,
    templateData,
    openTemplate,
    selectTemplate
  }
}

// 运行
const useRun = ({ proxy, layout }) => {
  const run = () => {
    proxy.$eventEmitter.emit('run')
    if (layout.value === 'newWindowPreview') {
      proxy.$eventEmitter.emit('preview_window_run')
    }
  }

  return {
    run
  }
}

// 设置弹窗
const useSettingDialog = () => {
  const settingDialogVisible = ref(false)
  const settingType = ref('layout')
  const componentsMap = shallowRef({
    theme: SettingTheme,
    layout: SettingLayout,
    setting: Setting
  })

  // 打开设置弹窗
  const openSetting = () => {
    settingDialogVisible.value = true
  }

  return {
    settingDialogVisible,
    settingType,
    componentsMap,
    openSetting
  }
}

// 下拉菜单
const useDropDownMenu = () => {
  // 工具下拉菜单
  const showToolsList = ref(false)
  const toggleToolsList = value => {
    showToolsList.value = value !== undefined ? value : !showToolsList.value
    hideAllList(showToolsList)
  }
  // 更多下拉菜单
  const showMoreList = ref(false)
  const toggleMoreList = value => {
    showMoreList.value = value !== undefined ? value : !showMoreList.value
    hideAllList(showMoreList)
  }
  // 隐藏所有下拉菜单
  const hideAllList = extra => {
    [showToolsList, showMoreList]
      .filter(item => {
        return item !== extra
      })
      .forEach(item => {
        item.value = false
      })
  }
  document.body.addEventListener('click', hideAllList)
  onBeforeUnmount(() => {
    document.body.removeEventListener('click', hideAllList)
  })

  return {
    showToolsList,
    toggleToolsList,
    showMoreList,
    toggleMoreList
  }
}

// 登录退出
const useLogin = ({ store, router, route }) => {
  const githubTokenInputDialogVisible = ref(false)
  const githubTokenValue = ref('')
  // github token
  const githubToken = computed(() => {
    return store.state.githubToken
  })
  // 登录
  const login = () => {
    githubTokenInputDialogVisible.value = true
  }
  // 退出登录
  const logout = () => {
    store.dispatch('saveGithubToken', null)
    router.replace({
      name: 'Editor'
    })
  }
  // 确认输入
  const confirmGithubTokenValueInput = () => {
    let trimValue = githubTokenValue.value
    if (!trimValue) {
      ElMessage.warning('请输入token')
      return
    }
    store.dispatch('saveGithubToken', trimValue)
    githubTokenInputDialogVisible.value = false
    githubTokenValue.value = ''
    if (route.name === 'Editor' && !!route.query.data) {
      router.replace({
        name: 'Editor'
      })
    }
  }
  // 取消输入
  const cancelGithubTokenValueInput = () => {
    githubTokenInputDialogVisible.value = false
    githubTokenValue.value = ''
  }
  return {
    githubTokenInputDialogVisible,
    githubTokenValue,
    githubToken,
    confirmGithubTokenValueInput,
    cancelGithubTokenValueInput,
    login,
    logout
  }
}

// 标题
const useTitle = ({ store }) => {
  const codeTitle = computed(() => {
    return store.state.editData.title
  })
  const onCodeTitleInput = e => {
    store.commit('setCodeTitle', e.target.value)
  }
  return {
    codeTitle,
    onCodeTitleInput
  }
}

// 保存
const useSave = ({ githubToken, login, store, router, route }) => {
  const loading = ref(false)
  const hasQueryData = computed(() => {
    return route.name === 'Editor' && !!route.query.data
  })
  const isEdit = computed(() => {
    return (route.name === 'Edit' && !!route.params.id) || hasQueryData.value
  })
  const createData = () => {
    let data = {
      description: store.state.editData.title,
      files: {},
      public: true
    }
    data.files['coderun.json'] = {
      content: JSON.stringify(store.state.editData)
    }
    return data
  }
  const save = async () => {
    if (githubToken.value === '') {
      login()
      return
    }
    try {
      loading.value = true
      let fileData = createData()
      let id = route.params.id
      let method = 'POST'
      let path = ''
      if (isEdit.value) {
        method = 'PATCH'
        path = '/' + id
        fileData.gist_id = id
      }
      let { data } = await request(`${method} /gists${path}`, fileData)
      loading.value = false
      ElMessage.success('保存成功，请注意：保存不是一个同步的过程！')
      router.replace({
        name: 'Edit',
        params: {
          id: data.id
        }
      })
    } catch (error) {
      console.log(error)
      loading.value = false
      ElMessage.error('保存失败，请检查此token的权限是否包含创建gist')
    }
  }
  const createNew = () => {
    router.replace({
      name: 'Editor'
    })
  }

  return {
    save,
    loading,
    createNew,
    isEdit,
    hasQueryData
  }
}

// 我的gists
const useDrawer = ({ router, route, githubToken, login }) => {
  const drawer = ref(false)
  const gistList = ref([])
  const gistloading = ref(false)
  const gistPageNo = ref(1)
  const gistPageCount = ref(1)
  const onDrawerOpen = async () => {
    try {
      gistloading.value = true
      let { data } = await request('GET /gists', {
        page: gistPageNo.value,
        per_page: 20
      })
      if (data.length > 0) {
        gistPageCount.value = gistPageNo.value + 1
      }
      gistList.value = data
      gistloading.value = false
    } catch (e) {
      gistloading.value = false
      ElMessage.error('获取失败')
    }
  }
  const gistCurrentChange = pageNo => {
    gistPageNo.value = pageNo
    onDrawerOpen()
  }
  const onDrawerClosed = () => {
    gistList.value = []
    gistPageNo.value = 1
  }
  const deleteGist = async id => {
    try {
      gistloading.value = true
      await request(`DELETE /gists/${id}`, {
        gist_id: id
      })
      gistloading.value = false
      ElMessage.success(
        '删除成功，请注意：删除不是一个同步的过程，五分钟内请不要重复删除！'
      )
      if (id === route.params.id) {
        router.replace({
          name: 'Editor'
        })
      }
    } catch (error) {
      console.log(error)
      gistloading.value = false
      ElMessage.error('删除失败')
    }
  }
  const updateGist = id => {
    drawer.value = false
    router.replace({
      name: 'Edit',
      params: {
        id
      }
    })
  }
  const showMyGists = () => {
    if (githubToken.value === '') {
      login()
      return
    }
    drawer.value = true
  }
  return {
    drawer,
    onDrawerOpen,
    onDrawerClosed,
    gistList,
    deleteGist,
    updateGist,
    showMyGists,
    gistloading,
    gistPageCount,
    gistCurrentChange,
    gistPageNo
  }
}

// 分享
const ShareComp = ref(null)
const useShare = (hasQueryData, route) => {
  const methods = {}
  ;['createShareUrl', 'createEmbedUrl', 'createEmbedCode'].forEach(method => {
    methods[method] = () => {
      ShareComp.value[method](hasQueryData.value ? encodeURIComponent(route.query.data) : null)
    }
  })

  return methods
}

// created部分
const { proxy, store, layout, router, route } = useInit()
const {
  githubTokenInputDialogVisible,
  githubTokenValue,
  githubToken,
  confirmGithubTokenValueInput,
  cancelGithubTokenValueInput,
  login,
  logout
} = useLogin({ store, router, route })
const {
  showToolsList,
  toggleToolsList,
  showMoreList,
  toggleMoreList
} = useDropDownMenu()
const {
  exportNameInputDialogVisible,
  exportName,
  exportZipFile,
  confirmExport
} = useExport({ toggleToolsList, store })
const {
  templateDialogVisible,
  templateData,
  openTemplate,
  selectTemplate
} = useTemplate({ layout, store, proxy })
const { run } = useRun({ proxy, layout })
const {
  settingDialogVisible,
  settingType,
  componentsMap,
  openSetting
} = useSettingDialog()
const { codeTitle, onCodeTitleInput } = useTitle({ store })
const { save, loading, createNew, isEdit, hasQueryData } = useSave({
  githubToken,
  login,
  store,
  router,
  route
})
const {
  drawer,
  onDrawerOpen,
  onDrawerClosed,
  gistList,
  deleteGist,
  updateGist,
  showMyGists,
  gistloading,
  gistPageCount,
  gistCurrentChange,
  gistPageNo
} = useDrawer({ router, route, githubToken, login })
const { createShareUrl, createEmbedUrl, createEmbedCode } = useShare(hasQueryData, route)
</script>

<style scoped lang="less">
.header {
  background: var(--header-background);
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 20px;

  .left {
    flex-shrink: 0;

    h1 {
      color: var(--header-logo-color);
    }
  }

  .center {
    flex-grow: 1;
    height: 100%;

    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background-color: transparent;
      text-align: center;
      color: var(--header-btn-color);
      font-size: 18px;
    }
  }

  .right {
    display: flex;
    flex-shrink: 0;

    .dropdownBtn {
      position: relative;

      .btn {
        .icon {
          margin-right: 0;
        }
      }

      .toolList {
        position: absolute;
        right: 0;
        top: 50px;
        width: 220px;
        padding: 10px 0;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        background: var(--dropdown-background);
        border-radius: 6px 0 6px 6px;
        border: 1px solid var(--dropdown-box-border-color);
        transform: scale(0.5);
        transform-origin: top right;
        transition: all 0.2s ease-in-out;
        list-style: none;
        z-index: 2;

        &.show {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
        }

        .toolItem {
          width: 100%;
          height: 30px;
          cursor: pointer;
          padding: 0 10px;
          line-height: 30px;
          color: var(--dropdown-color);
          font-size: 14px;

          &:hover {
            background: var(--dropdown-hover-background);
            color: var(--dropdown-hover-color);
          }
        }
      }
    }

    .btn {
      background: var(--header-btn-background);
      border: 1px solid var(--header-btn-border-color);
      color: var(--header-btn-color);
      min-width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px 16px;
      margin: 0 10px 0 0;
      position: relative;
      border-radius: 4px;
      text-overflow: ellipsis;
      text-decoration: none !important;
      font-weight: 400 !important;
      cursor: pointer;
      transition: all 0.3s;
      opacity: 0.7;
      user-select: none;

      &:hover {
        opacity: 1;
      }

      &:active {
        transform: translateY(1px);
      }

      .icon {
        margin-right: 5px;
      }
    }
  }
}

.templateList {
  width: 100%;
  height: 400px;
  overflow: auto;

  .templateItem {
    width: 230px;
    height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(36 36 36);
    float: left;
    margin-right: 10px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(36, 36, 36, 0.1);
    }

    .icon {
      width: 60px;
      height: 60px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      margin-left: 10px;
    }

    .name {
      font-weight: bold;
      margin-left: 20px;
      font-size: 18px;
    }
  }
}

/deep/ .settingDialog {
  .el-dialog__body {
    padding: 0px;
  }

  .settingBox {
    display: flex;

    .el-tabs {
      flex-grow: 0;
      flex-shrink: 0;
    }

    .settingContent {
      width: 100%;
      height: 300px;
      overflow: auto;
      padding: 10px;
    }
  }
}

.tip {
  margin-top: 10px;
}

/deep/ .el-drawer__body {
  overflow: hidden;

  .gistBox {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .paginationBox {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
