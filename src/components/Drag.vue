<template>
  <div class="dragBox" :class="[dir]" ref="dragBox">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, provide, onBeforeUnmount } from 'vue'
import Resize from '@/utils/Resize.js'
import ResizeObserver from 'resize-observer-polyfill'

// props
const props = defineProps({
  // 容器内部的`DragItem`组件排列方式，可选项：h（水平排列）、v（垂直排列）
  dir: {
    type: String,
    default: 'h'
  },
  // 内部的`DragItem`组件数量
  number: {
    type: Number,
    default: 0
  },
  // 配置
  config: {
    type: Array,
    default() {
      return []
    }
  }
})

// hooks定义部分

// 初始化resize实例
const useInitResize = ({ props }) => {
  const resize = new Resize()
  const { onDragStart, onDrag } = resize
  provide('onDragStart', onDragStart)
  provide('onDrag', onDrag)
  provide('dir', ref(props.dir))

  return {
    resize
  }
}

// 初始化尺寸列表
const useInitSizeList = ({ props }) => {
  let sizeListData = []
  for (let i = 0; i < props.number; i++) {
    sizeListData.push({
      width: 0,
      height: 0,
      ...(props.config[i]
        ? props.config[i]
        : {
            min: 20
          })
    })
  }
  const sizeList = ref(sizeListData)
  provide('sizeList', sizeList)

  return {
    sizeList
  }
}

// 初始化尺寸
const useInitSize = ({ sizeList, props }) => {
  // 计算每部分初始宽度
  const first = ref(true)
  const setInitSize = (width, height) => {
    if (!first.value) {
      return
    }
    first.value = false
    // 设置了默认尺寸的总和
    let defaultSizeTotal = 0
    // 设置了默认尺寸的数量
    let hasDefaultNum = 0
    sizeList.value.forEach(item => {
      if (item.default !== undefined) {
        defaultSizeTotal += item.default
        hasDefaultNum++
      }
    })
    // 剩余平均分配的百分比
    let rest =
      100 - (defaultSizeTotal / (props.dir === 'h' ? width : height)) * 100
    // 平均分配的百分比
    let noDefaultSize = rest / (props.number - hasDefaultNum)
    sizeList.value.forEach(item => {
      // 水平
      if (props.dir === 'h') {
        if (item.default === undefined) {
          item.width = noDefaultSize
        } else {
          item.width = (item.default / width) * 100
        }
        item.height = 100
      } else {
        // 垂直
        item.width = 100
        if (item.default === undefined) {
          item.height = noDefaultSize
        } else {
          item.height = (item.default / height) * 100
        }
      }
    })
  }

  return {
    setInitSize
  }
}

// 初始化
const useResizeInit = ({ setInitSize, resize, props, sizeList }) => {
  const containerWidth = ref(0)
  const containerHeight = ref(0)
  const resizeInit = () => {
    // 容器宽度
    let { width, height } = dragBox.value.getBoundingClientRect()
    containerWidth.value = width
    containerHeight.value = height
    setInitSize(width, height)
    resize.init({
      dir: props.dir,
      dragItemList: sizeList,
      containerSize:
        props.dir === 'h' ? containerWidth.value : containerHeight.value
    })
  }

  return {
    resizeInit
  }
}

// 尺寸变化处理
const useSizeChange = ({ resizeInit }) => {
  // 监听dom大小变化
  const ro = new ResizeObserver(entries => {
    for (const entry of entries) {
      if (entry.target.classList.contains('dragBox')) {
        resizeInit()
      }
    }
  })

  onMounted(() => {
    ro.observe(dragBox.value)
  })

  onBeforeUnmount(() => {
    ro.unobserve(dragBox.value)
  })
}

//  created部分
const dragBox = ref(null)
const { resize } = useInitResize({ props })
const { sizeList } = useInitSizeList({ props })
const { setInitSize } = useInitSize({ sizeList, props })
const { resizeInit } = useResizeInit({
  setInitSize,
  resize,
  props,
  sizeList
})
useSizeChange({ resizeInit })
</script>

<style scoped lang="less">
.dragBox {
  width: 100%;
  height: 100%;
  display: flex;

  &.v {
    flex-direction: column;
  }
}
</style>
