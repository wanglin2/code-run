<template>
  <div class="previewContainer">
    <Drag :number="2" dir="v" :config="[{ min: 0 }, { min: 48 }]">
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
