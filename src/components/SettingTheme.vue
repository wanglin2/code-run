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
import { computed } from 'vue'
import { useStore } from 'vuex'
import { codeThemeList } from '@/config/codeThemeList'
import { ElSelect, ElOption } from 'element-plus'
import { codeFontSizeList } from '@/config/constants'

// hooks定义部分

// 初始化
const useInit = () => {
  // vuex
  const store = useStore()
  return {
    store,
  }
}

// 处理主题
const useTheme = ({ store }) => {
  const codeTheme = computed(() => {
    return store.state.editData.config.codeTheme
  })

  // 切换代码主题
  const codeThemeChange = async (e) => {
    store.commit('setCodeTheme', e)
  }

  return {
    codeTheme,
    codeThemeChange,
  }
}

// 处理字号
const useFontSize = ({ store }) => {
  const codeFontSize = computed(() => {
    return store.state.editData.config.codeFontSize
  })

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
const { store } = useInit()
const { codeTheme, codeThemeChange } = useTheme({ store })
const { codeFontSize, codeFontSizeChange } = useFontSize({ store })
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
