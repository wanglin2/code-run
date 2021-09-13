<template>
  <div
    class="dragItem"
    :class="[dir, { hide: hide }]"
    :style="{
      width: sizeList[index].width + '%',
      height: sizeList[index].height + '%',
    }"
  >
    <div
      v-if="showTouchBar"
      class="touchBar"
      :style="{
        width: dir === 'h' ? touchBarSize + 'px' : '100%',
        height: dir === 'h' ? '100%' : touchBarSize + 'px',
      }"
      :class="[{ canDrag: !disabled }, dir]"
      @mousedown="onMousedown"
    >
      <span class="title">{{ title }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import {
  defineProps,
  useContext,
  onBeforeUnmount,
  watch,
  inject,
  getCurrentInstance,
} from 'vue'
import Drag from '@/utils/Drag.js'

const { proxy } = getCurrentInstance()

const onDragStart = inject('onDragStart')
const onDrag = inject('onDrag')
const sizeList = inject('sizeList')
const dir = inject('dir')

// 触发事件
const { emit } = useContext()

// props
const props = defineProps({
  // 是否禁止拖动
  disabled: {
    type: Boolean,
    default: false,
  },
  // 拖动条的尺寸
  touchBarSize: {
    type: Number,
    default: 20,
  },
  // 该组件在容器内的同级`DragItem`组件列表中的索引，从0开始
  index: {
    type: Number,
    default: 0,
  },
  // 是否显示拖动条
  showTouchBar: {
    type: Boolean,
    default: true,
  },
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 是否隐藏该组件
  hide: {
    type: Boolean,
    default: false,
  },
})

watch(
  [
    () => {
      return sizeList.value[props.index].width
    },
    () => {
      return sizeList.value[props.index].height
    },
  ],
  () => {
    emit('size-change')
  }
)

// 拖动方法
let drag = null
if (!props.disabled) {
  drag = new Drag(
    (...args) => {
      onDragStart(...args)
    },
    (...args) => {
      onDrag(props.index, ...args)
    },
    (...args) => {
      proxy.$eventEmitter.emit('dragOver', ...args)
    }
  )
}

const onMousedown = (e) => {
  proxy.$eventEmitter.emit('dragStart')
  drag && drag.onMousedown(e)
}

// 即将解除挂载
onBeforeUnmount(() => {
  drag && drag.off()
})
</script>

<style scoped lang="less">
.dragItem {
  display: flex;
  overflow: hidden;

  &.hide {
    display: none;
  }

  &.v {
    flex-direction: column;
  }

  .touchBar {
    flex-grow: 0;
    flex-shrink: 0;
    background-color: #333642;

    &.canDrag {
      &.v {
        cursor: row-resize;
      }

      &.h {
        cursor: col-resize;
      }
    }

    &.h {
      border-left: 1px solid rgba(255, 255, 255, 0.05);
      border-right: 1px solid rgba(0, 0, 0, 0.4);
      height: 100%;

      .title {
        margin-left: 0px;
        margin-top: 5px;
        text-align: center;
      }
    }

    &.v {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(0, 0, 0, 0.4);
      width: 100%;
    }

    .title {
      display: flex;
      align-items: center;
      color: #aaaebc;
      font-size: 12px;
      margin-left: 5px;
    }
  }
}
</style>