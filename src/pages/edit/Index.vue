<template>
  <div class="editContainer">
    <Header></Header>
    <div class="content" ref="contentBox">
      <Editor :height="itemList[0].height"></Editor>
      <Preview
        :touchBarSize="touchBarSize"
        :height="itemList[1].height"
        @dragStart="onDragStart"
        @drag="
          (...args) => {
            onDrag(1, ...args)
          }
        "
      ></Preview>
      <Console
        :touchBarSize="touchBarSize"
        :height="itemList[2].height"
        @dragStart="onDragStart"
        @drag="
          (...args) => {
            onDrag(2, ...args)
          }
        "
      ></Console>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Editor from '@/components/Editor.vue'
import Preview from '@/components/Preview.vue'
import Console from '@/components/Console.vue'
import { defineProps, onMounted, reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import Resize from '@/hooks/Resize.js'

// vuex
const store = useStore()
// 数据
const editData = computed(() => store.state.editData)

// ------------ 尺寸调整部分开始 -----------
const resize = new Resize()
// 高度控制列表
const itemList = ref([
  {
    title: '编辑器',
    height: 0,
    min: 35,
  },
  {
    title: '预览区',
    height: 0,
    min: 18,
  },
  {
    title: '控制台',
    height: 0,
    min: 18,
  },
])
// 拖动条宽度
const touchBarSize = ref(18)
// 容器的高度
const contentBox = ref(null)
const containerHeight = ref(0)

const { onDragStart, onDrag } = resize

/**
 * @Author: 王林25
 * @Date: 2021-04-29 15:19:58
 * @Desc: 计算每部分初始高度
 */
const setInitSize = (height) => {
  const blockSize = editData.value.config.blockSize
  if (blockSize) {
    blockSize.forEach((size, index) => {
      itemList.value[index].height = size
    })
  } else {
    // 控制台默认不显示
    itemList.value[2].height = (itemList.value[2].min / height) * 100
    // 编辑器和预览区平分剩下的一半
    let rest = (100 - itemList.value[2].height) / 2
    itemList.value[0].height = rest
    itemList.value[1].height = rest
  }
}

/**
 * @Author: 王林25
 * @Date: 2021-04-28 14:47:12
 * @Desc: 初始化
 */
const resizeInit = () => {
  // 容器宽度
  let { height } = contentBox.value.getBoundingClientRect()
  containerHeight.value = height
  // 每部分初始尺寸
  setInitSize(height)
  resize.init({
    dir: 'v',
    dragItemList: itemList,
    containerSize: containerHeight.value,
  })
}

// ------------ 尺寸调整部分结束 -----------

onMounted(() => {
  resizeInit()
})
</script>

<style scoped lang="less">
.editContainer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    width: 100%;
    height: 100%;
  }
}
</style>
