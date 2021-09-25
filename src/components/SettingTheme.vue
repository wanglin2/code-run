<template>
  <div>
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
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { codeThemeList } from '@/config/codeThemeList'
import { ElSelect, ElOption } from 'element-plus'

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

  /**
   * @Author: 王林
   * @Date: 2021-05-15 08:07:04
   * @Desc: 切换代码主题
   */
  const codeThemeChange = async (e) => {
    store.commit('setCodeTheme', e)
  }

  return {
    codeTheme,
    codeThemeChange,
  }
}

// created部分
const { store } = useInit()
const { codeTheme, codeThemeChange } = useTheme({ store })
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
