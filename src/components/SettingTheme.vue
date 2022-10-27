<template>
  <div>
    <!-- 主题 -->
    <div class="settingRow">
      <span class="name">代码主题</span>
      <div class="control">
        <el-select v-model="codeTheme" size="small" @change="codeThemeChange">
          <el-option
            v-for="item in codeThemeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="settingRow uploadThemeBox">
      <div
        class="left"
        @click="selectFile"
        @drop="onDrop"
        @dragover="onDragOver"
      >
        <span class="tip">点击上传主题文件或将文件拖动到此上传</span>
        <input
          type="file"
          class="fileInput"
          ref="fileInput"
          @change="fileChange"
        />
      </div>
      <div class="right">
        <el-input
          class="textarea"
          v-model="themeText"
          type="textarea"
          placeholder="粘贴主题数据"
        />
      </div>
    </div>
    <!-- 页面主题是否与代码主题同步 -->
    <div class="settingRow">
      <span class="name">页面主题是否同步代码主题</span>
      <div class="control">
        <el-switch v-model="pageThemeSyncCodeTheme" />
      </div>
    </div>
    <!-- 字号 -->
    <div class="settingRow">
      <span class="name">代码字号</span>
      <div class="control">
        <el-select
          v-model="codeFontSize"
          size="small"
          @change="codeFontSizeChange"
        >
          <el-option
            v-for="item in codeFontSizeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useStore } from 'vuex'
import { codeThemeList } from '@/config/codeThemeList'
import { ElSelect, ElOption, ElSwitch, ElMessage, ElInput } from 'element-plus'
import { codeFontSizeList } from '@/config/constants'
import * as vscodeThemeToMonacoThemeWeb from 'vscode-theme-to-monaco-theme-web'
import { splitHumpStr } from '@/utils'

// hooks定义部分

// 初始化
const useInit = () => {
  // vuex
  const store = useStore()
  return {
    store,
    config: store.state.editData.config
  }
}

// 处理主题
const useTheme = ({ store, config }) => {
  const codeTheme = ref('')
  codeTheme.value = config.codeTheme

  watch(
    () => {
      return config.codeTheme
    },
    value => {
      codeTheme.value = value
    }
  )

  // 切换代码主题
  const codeThemeChange = async e => {
    store.commit('setCodeTheme', e)
  }

  return {
    codeTheme,
    codeThemeChange
  }
}

// 处理主题同步
const useThemeSync = ({ store, config }) => {
  const pageThemeSyncCodeTheme = ref(false)
  pageThemeSyncCodeTheme.value = config.pageThemeSyncCodeTheme

  watch(pageThemeSyncCodeTheme, value => {
    store.commit('setPageThemeSyncCodeTheme', value)
  })

  return {
    pageThemeSyncCodeTheme
  }
}

// 处理字号
const useFontSize = ({ store, config }) => {
  const codeFontSize = ref(0)
  codeFontSize.value = config.codeFontSize

  watch(
    () => {
      return config.codeFontSize
    },
    value => {
      codeFontSize.value = value
    }
  )

  // 切换字号
  const codeFontSizeChange = async e => {
    store.commit('setCodeFontSize', e)
  }

  return {
    codeFontSize,
    codeFontSizeChange
  }
}

// 从本地选择主题文件
const fileInput = ref(null)
const useSelectFile = ({ codeTheme, codeThemeChange }) => {
  const themeText = ref('')
  const themeName = ref('')
  let defaultThemeIndex = 1
  // 处理文件
  const handleFile = file => {
    themeName.value = file.name.replace(/\..*$/, '')
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      themeText.value = reader.result
    }
    reader.onerror = () => {
      ElMessage.error('文件上传失败，请检查文件是否存在')
    }
  }
  // 选择上传
  const selectFile = () => {
    fileInput.value.click()
  }
  // 文件变化
  const fileChange = e => {
    let file = e.target.files[0]
    handleFile(file)
  }
  // 拖拽上传
  const onDrop = e => {
    e.preventDefault()
    let file = e.dataTransfer.files[0]
    handleFile(file)
  }
  const onDragOver = e => {
    e.preventDefault()
  }
  // 主题数据变化
  let timer = null
  watch(themeText, value => {
    if (!value) {
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      try {
        let themeData = vscodeThemeToMonacoThemeWeb.convertTheme(value)
        themeName.value = themeName.value || 'CustomTheme' + defaultThemeIndex++
        codeThemeList.push({
          name: splitHumpStr(themeName.value),
          value: themeName.value,
          custom: true,
          loaded: true,
          cache: themeData
        })
        codeTheme.value = themeName.value
        codeThemeChange(themeName.value)
        themeName.value = ''
      } catch (error) {
        console.log(error)
        ElMessage.error('解析失败，请检查主题内容是否正确')
      }
    }, 500)
  })

  return {
    themeText,
    selectFile,
    fileChange,
    onDrop,
    onDragOver
  }
}

// created部分
const { store, config } = useInit()
const { codeTheme, codeThemeChange } = useTheme({ store, config })
const { pageThemeSyncCodeTheme } = useThemeSync({ store, config })
const { codeFontSize, codeFontSizeChange } = useFontSize({ store, config })
const {
  themeText,
  selectFile,
  fileChange,
  onDrop,
  onDragOver
} = useSelectFile({ codeTheme, codeThemeChange })
</script>

<style scoped lang="less">
.settingRow {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .name {
    margin-right: 10px;
  }

  &.uploadThemeBox {
    width: 100%;
    height: 150px;
    display: flex;

    .left,
    .right {
      width: 50%;
      height: 100%;
    }

    .left {
      position: relative;
      background-color: #f5f5f5;
      cursor: pointer;
      margin-right: 5px;

      .tip {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        text-align: center;
      }

      .fileInput {
        visibility: hidden;
      }
    }

    .right {
      .textarea {
        height: 100%;

        /deep/ .el-textarea__inner {
          height: 100%;
          resize: none;
        }
      }
    }
  }
}
</style>
