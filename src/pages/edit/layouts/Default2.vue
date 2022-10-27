<template>
  <Drag
    :number="3"
    dir="v"
    :config="[{ min: 0 }, { min: 48, default: 48 }, null]"
  >
    <DragItem :index="0" :disabled="true" :showTouchBar="false" title="预览">
      <Preview></Preview>
    </DragItem>
    <DragItem :index="1" :disabled="false" title="控制台">
      <Console></Console>
    </DragItem>
    <DragItem :index="2" :disabled="false" title="编辑器">
      <Editor></Editor>
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
