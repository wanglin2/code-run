<template>
  <div class="editorItem" :style="{ width: width + '%' }">
    <div
      class="touchBar"
      :style="{ width: touchBarSize + 'px' }"
      :class="{ canDrag: !disabledDrag }"
      @mousedown="onMousedown"
    ></div>
    <div class="editorContent">
      <div class="editorContentHeader">
        <div class="title" :class="{ rotate: noSpace }">{{ title }}</div>
      </div>
      <div class="editorContentBody"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, useContext, onBeforeUnmount } from 'vue'
import useDrag from '@/hooks/useDrag.js'

// 触发事件
const { emit } = useContext()

// props
const props = defineProps({
  disabledDrag: {
    type: Boolean,
    default: true,
  },
  width: {
    type: Number,
    default: 100,
  },
  touchBarSize: {
    type: Number,
    default: 18,
  },
  title: {
    type: String,
    default: '',
  },
  noSpace: {
    type: Boolean,
    default: false,
  },
})

// 拖动方法
const { onMousedown, off } = useDrag(
  (...args) => {
    emit('dragStart', ...args)
  },
  (...args) => {
    if (props.disabledDrag) {
      return
    }
    emit('drag', ...args)
  },
  (...args) => {
    emit('dragOver', ...args)
  }
)

// 即将解除挂载
onBeforeUnmount(() => {
  off()
})
</script>

<style scoped lang="less">
.editorItem {
  height: 100%;
  background-color: #1d1e22;
  display: flex;

  .touchBar {
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    border-right: 1px solid rgba(0, 0, 0, 0.4);
    background-color: #333642;

    &.canDrag {
      cursor: col-resize;
    }
  }

  .editorContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .editorContentHeader {
      width: 100%;
      height: 35px;
      background-color: rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      padding: 0 5px;

      .title {
        font-weight: bold;
        color: #aaaebc;
        font-size: 18px;
        transition: all 0.2s;

        &.rotate {
          transform: rotate(90deg) translate(-2px, 6px);
          transform-origin: left top;
          font-size: 14px;
        }
      }
    }
  }
}
</style>