<template>
  <div class="previewBox" :style="{ height: height + '%' }">
    <div
      class="touchBar"
      :style="{ height: touchBarSize + 'px' }"
      @mousedown="onMousedown"
    >
      预览
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  onMounted,
  computed,
  toRaw,
  unref,
  onBeforeUnmount,
  useContext,
} from 'vue'
import useDrag from '@/hooks/useDrag.js'

// 触发事件
const { emit } = useContext()

// props
defineProps({
  height: {
    type: Number,
    default: 100,
  },
  touchBarSize: {
    type: Number,
    default: 18,
  },
})

// 拖动方法
const { onMousedown, off } = useDrag(
  (...args) => {
    emit('dragStart', ...args)
  },
  (...args) => {
    emit('drag', ...args)
  },
  (...args) => {
    emit('dragOver', ...args)
  }
)

// 挂载完成
onMounted(() => {})

// 即将解除挂载
onBeforeUnmount(() => {
  off()
})
</script>

<style scoped lang="less">
.previewBox {
  width: 100%;

  .touchBar {
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    background-color: #333642;
    cursor: row-resize;
    color: #aaaebc;
    font-size: 12px;
    line-height: 17px;
    padding-left: 5px;
  }
}
</style>
