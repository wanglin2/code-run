<template>
  <div class="previewContainer">
    <Drag :number="2" dir="v" :config="[{ min: 0 }, { min: 48, default: 48 }]">
      <!-- 编辑器 -->
      <DragItem :index="0" :disabled="true" :showTouchBar="false">
        <Preview></Preview>
      </DragItem>
      <!-- 预览控制台 -->
      <DragItem :index="1" :disabled="false" title="控制台">
        <Console></Console>
      </DragItem>
    </Drag>
  </div>
</template>

<script setup>
import Preview from '@/components/Preview.vue'
import Console from '@/components/Console.vue'
import Drag from '@/components/Drag.vue'
import DragItem from '@/components/DragItem.vue'
import { defaultViewThemeConfig } from '@/config/constants'
import { getThemeValue } from '@/utils'

// 界面主题，设置css变量
const useTheme = () => {
  // 主题同步设置
  let pageThemeSyncCodeTheme = true
  let themeData = null
  // 更新主题变量
  const updateTheme = () => {
    Object.keys(defaultViewThemeConfig).forEach(item => {
      document.documentElement.style.setProperty(
        item,
        getThemeValue(item, themeData, pageThemeSyncCodeTheme)
      )
    })
  }
  updateTheme()
  window.addEventListener('message', ({ data = {} }) => {
    if (data.type === 'preview') {
      pageThemeSyncCodeTheme = data.data.config.pageThemeSyncCodeTheme
      themeData = data.data.config.themeData
      updateTheme()
    }
  })
}
useTheme()
</script>

<style scoped lang="less">
.previewContainer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
