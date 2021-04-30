<template>
  <div class="editorBox" ref="editorBox" :style="{ height: height + '%' }">
    <EditorItem
      v-for="(item, index) in editorItemList"
      :key="item.title"
      :title="item.title"
      :width="item.width"
      :height="height"
      :touchBarSize="touchBarSize"
      :disabledDrag="index <= 0"
      :noSpace="item.width <= rotateWidth"
      :language="item.language"
      :content="item.content"
      @dragStart="onDragStart"
      @drag="
        (...args) => {
          onDrag(index, ...args)
        }
      "
    >
    </EditorItem>
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
  watch,
  watchEffect,
} from 'vue'
import { useStore } from 'vuex'
import EditorItem from '@/components/EditorItem.vue'
import Resize from '@/hooks/Resize.js'

// props
const props = defineProps({
  height: {
    type: Number,
    default: 100,
  },
})

// vuex
const store = useStore()
// 数据
const editData = computed(() => store.state.editData)

// ----------------  尺寸调整部分开始  ---------------
const resize = new Resize()
// 拖动条宽度
const touchBarSize = ref(18)
// 容器的宽度
const editorBox = ref(null)
const containerWidth = ref(0)
// 编辑器标题进行旋转的临界值
const rotateWidth = ref(0)
// 编辑器列表
const editorItemList = ref([
  {
    title: 'HTML',
    language: 'html',
    content: '',
    width: 0,
    min: 18,
  },
  {
    title: 'CSS',
    language: 'css',
    content: '',
    width: 0,
    min: 18,
  },
  {
    title: 'JS',
    language: 'javascript',
    content: '',
    width: 0,
    min: 18,
  },
])

const { onDragStart, onDrag } = resize

/**
 * @Author: 王林25
 * @Date: 2021-04-29 15:19:58
 * @Desc: 计算每部分初始宽度
 */
const setInitSize = () => {
  const editorSize = editData.value.config.editorSize
  if (editorSize) {
    editorSize.forEach((size, index) => {
      editorItemList.value[index].width = size
    })
  } else {
    editorItemList.value.forEach((item) => {
      item.width = 100 / editorItemList.value.length
    })
  }
}

const setInitData = () => {
  const code = editData.value.code
  editorItemList.value[0].content = code.html.content
  editorItemList.value[1].content = code.css.content
  editorItemList.value[2].content = code.js.content
}

/**
 * @Author: 王林25
 * @Date: 2021-04-28 14:47:12
 * @Desc: 初始化
 */
const resizeInit = () => {
  // 容器宽度
  let { width } = editorBox.value.getBoundingClientRect()
  containerWidth.value = width
  setInitSize(width)
  setInitData()
  // 最大及最小宽度
  let minWidth = (touchBarSize.value / containerWidth.value) * 100
  // 编辑器标题进行旋转的临界值
  rotateWidth.value = minWidth + (100 / containerWidth.value) * 100
  resize.init({
    dir: 'h',
    dragItemList: editorItemList,
    containerSize: containerWidth.value,
  })
}

// ----------------  尺寸调整部分结束  ---------------

// 挂载完成
onMounted(() => {
  resizeInit()
})
</script>

<style scoped lang="less">
.editorBox {
  width: 100%;
  display: flex;
}
</style>
