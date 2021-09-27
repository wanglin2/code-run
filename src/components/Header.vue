<template>
  <div class="header">
    <!-- logo -->
    <div class="left">
      <h1>CodeRun</h1>
    </div>
    <!-- 工具栏 -->
    <div class="right">
      <div class="btn" @click="openSetting">
        <span class="icon el-icon-s-tools"></span> 设置
      </div>
      <div class="btn" @click="openTemplate">
        <span class="icon el-icon-s-opportunity"></span> 模板
      </div>
      <div class="dropdownBtn" @click.stop>
        <div class="btn" @click="showToolsList = !showToolsList">
          <span class="icon el-icon-s-tools"></span> 工具
        </div>
        <ul class="toolList" :class="{ show: showToolsList }">
          <li class="toolItem" @click="exportZipFile">导出zip</li>
        </ul>
      </div>
      <div class="btn" @click="run">
        <span class="icon el-icon-s-promotion"></span> 运行
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
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, computed, onBeforeUnmount, nextTick, shallowRef } from 'vue'
import templateList from '@/config/templates'
import { useStore } from 'vuex'
import Setting from './Setting.vue'
import SettingLayout from './SettingLayout.vue'
import SettingTheme from './SettingTheme.vue'
import exportZip from '@/utils/exportZip'
import { ElMessage, ElButton, ElDialog, ElInput, ElTabs, ElTabPane } from 'element-plus'

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
    layout
  };
}

// 导出
const useExport = ({ hideToolList, store }) => {
  const exportNameInputDialogVisible = ref(false)
  const exportName = ref('')
  const editData = computed(() => store.state.editData)

  // 导出zip
  const exportZipFile = () => {
    exportNameInputDialogVisible.value = true
    hideToolList()
  }

  // 确认导出
  const confirmExport = () => {
    if (exportName.value.trim() === '') {
      ElMessage.warning({
        message: '请输入文件名',
        type: 'warning',
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
  };
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
  const checkLayout = (data) => {
    if (data.isVueSFC) {
      if (layout.value !== 'vue') {
        store.commit("setLayout", 'vue');
      }
    } else {
      if (layout.value === 'vue') {
        store.commit("setLayout", 'default');
      }
    }
  }

  // 选择某个模板
  const selectTemplate = (data) => {
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
  };
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
  };
}

// 设置弹窗
const useSettingDialog = () => {
  const settingDialogVisible = ref(false)
  const settingType = ref('layout')
  const componentsMap = shallowRef({
    theme: SettingTheme,
    layout: SettingLayout,
    setting: Setting,
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

// 工具按钮菜单
const useToolMenu = () => {
  const showToolsList = ref(false)

  // 隐藏工具下拉菜单
  const hideToolList = () => {
    showToolsList.value = false
  }

  document.body.addEventListener('click', hideToolList)

  onBeforeUnmount(() => {
    document.body.removeEventListener('click', hideToolList)
  })

  return {
    showToolsList,
    hideToolList
  };
}

// created部分
const { proxy, store, layout } = useInit()
const { showToolsList, hideToolList } = useToolMenu()
const { exportNameInputDialogVisible, exportName, exportZipFile, confirmExport } = useExport({ hideToolList, store })
const { templateDialogVisible, templateData, openTemplate, selectTemplate } = useTemplate({ layout, store, proxy })
const { run } = useRun({ proxy, layout })
const { settingDialogVisible, settingType, componentsMap, openSetting } = useSettingDialog()

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
    h1 {
      color: var(--header-logo-color);
    }
  }

  .right {
    display: flex;

    .dropdownBtn {
      position: relative;

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
</style>
