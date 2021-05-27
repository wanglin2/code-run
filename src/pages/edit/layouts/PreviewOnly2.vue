<template>
  <Editor :hide="true"></Editor>
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
</template>

<script setup>
import Editor from '@/components/Editor.vue'
import Preview from '@/components/Preview.vue'
import Console from '@/components/Console.vue'
import Drag from '@/components/Drag.vue'
import DragItem from '@/components/DragItem.vue'
</script>
