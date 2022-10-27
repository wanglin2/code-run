<template>
  <Editor :showList="showList"></Editor>
</template>

<script setup>
import Editor from '@/components/Editor.vue'
import Preview from '@/components/Preview.vue'
import Console from '@/components/Console.vue'
import Drag from '@/components/Drag.vue'
import DragItem from '@/components/DragItem.vue'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

const store = useStore()
const editData = computed(() => {
  return store.state.editData
})
const showList = ref(['HTML', 'CSS', 'JS'])
if (editData.value.code.VUE.content) {
  showList.value = [
    {
      title: 'VUE',
      disableDrag: true,
      showTouchBar: false
    }
  ]
}
</script>
