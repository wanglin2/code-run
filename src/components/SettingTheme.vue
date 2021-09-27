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
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { codeThemeList } from '@/config/codeThemeList'
import { ElSelect, ElOption, ElSwitch } from 'element-plus'
import { codeFontSizeList } from '@/config/constants'

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
    (value) => {
      codeTheme.value = value
    }
  )

  // 切换代码主题
  const codeThemeChange = async (e) => {
    store.commit('setCodeTheme', e)
  }

  return {
    codeTheme,
    codeThemeChange,
  }
}

// 处理主题同步
const useThemeSync = ({ store, config }) => {
  const pageThemeSyncCodeTheme = ref(false)
  pageThemeSyncCodeTheme.value =
    config.pageThemeSyncCodeTheme

  watch(pageThemeSyncCodeTheme, (value) => {
    store.commit('setPageThemeSyncCodeTheme', value)
  })

  return {
    pageThemeSyncCodeTheme,
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
    (value) => {
      codeFontSize.value = value
    }
  )

  // 切换字号
  const codeFontSizeChange = async (e) => {
    store.commit('setCodeFontSize', e)
  }

  return {
    codeFontSize,
    codeFontSizeChange,
  }
}

// created部分
const { store, config } = useInit()
const { codeTheme, codeThemeChange } = useTheme({ store, config })
const { pageThemeSyncCodeTheme } = useThemeSync({ store, config })
const { codeFontSize, codeFontSizeChange } = useFontSize({ store, config })
</script>

<style scoped lang="less">
.settingRow {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .name {
    margin-right: 10px;
  }
}
</style>
