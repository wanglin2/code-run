<template>
  <div class="dragBox" :class="[dir]" ref="dragBox">
    <slot></slot>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  onMounted,
  getCurrentInstance,
  provide,
  onBeforeUnmount,
} from 'vue'
import Resize from '@/utils/Resize.js'
import ResizeObserver from 'resize-observer-polyfill'

const { proxy } = getCurrentInstance()

// props
const props = defineProps({
  dir: {
    type: String,
    default: 'h',
  },
  number: {
    type: Number,
    default: 0,
  },
  config: {
    type: Array,
    default() {
      return []
    },
  },
})

const resize = new Resize()
const dragBox = ref(null)
const containerWidth = ref(0)
const containerHeight = ref(0)
let sizeListData = []
for (let i = 0; i < props.number; i++) {
  sizeListData.push({
    width: 0,
    height: 0,
    ...(props.config[i]
      ? props.config[i]
      : {
          min: 20,
        }),
  })
}
const sizeList = ref(sizeListData)

const { onDragStart, onDrag } = resize

provide('onDragStart', onDragStart)
provide('onDrag', onDrag)
provide('sizeList', sizeList)
provide('dir', ref(props.dir))

/**
 * @Author: 王林25
 * @Date: 2021-04-29 15:19:58
 * @Desc: 计算每部分初始宽度
 */
const setInitSize = () => {
  sizeList.value.forEach((item) => {
    if (props.dir === 'h') {
      item.width = 100 / props.number
      item.height = 100
    } else {
      item.width = 100
      item.height = 100 / props.number
    }
  })
}

/**
 * @Author: 王林25
 * @Date: 2021-04-28 14:47:12
 * @Desc: 初始化
 */
const resizeInit = () => {
  // 容器宽度
  let { width, height } = dragBox.value.getBoundingClientRect()
  containerWidth.value = width
  containerHeight.value = height
  resize.init({
    dir: props.dir,
    dragItemList: sizeList,
    containerSize:
      props.dir === 'h' ? containerWidth.value : containerHeight.value,
  })
}

/**
 * @Author: 王林25
 * @Date: 2021-05-18 10:16:50
 * @Desc: 监听dom大小变化
 */
const ro = new ResizeObserver((entries, observer) => {
  for (const entry of entries) {
    if (entry.target.classList.contains('dragBox')) {
      resizeInit()
    }
  }
})

// 挂载完成
onMounted(() => {
  setInitSize()
  ro.observe(dragBox.value)
})

// 即将解除挂载
onBeforeUnmount(() => {
  ro.unobserve(dragBox.value)
})
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
