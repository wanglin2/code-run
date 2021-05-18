<template>
  <div class="editContainer">
    <Header></Header>
    <div class="content" ref="contentBox">
      <component :is="activeLayout"></component>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import Default from './layouts/Default.vue'
import Default2 from './layouts/Default2.vue'
import Edit from './layouts/Edit.vue'
import Edit2 from './layouts/Edit2.vue'
import EditOnly from './layouts/EditOnly.vue'
import EditOnly2 from './layouts/EditOnly2.vue'
import PreviewOnly from './layouts/PreviewOnly.vue'
import PreviewOnly2 from './layouts/PreviewOnly2.vue'
import Js from './layouts/Js.vue'

const layoutMap = {
  default: Default,
  default2: Default2,
  edit: Edit,
  edit2: Edit2,
  editOnly: EditOnly,
  editOnly2: EditOnly2,
  previewOnly: PreviewOnly,
  previewOnly2: PreviewOnly2,
  js: Js
}

// vuex
const store = useStore()

// 布局
const layout = computed(() => {
  return store.state.editData.config.layout
})
const activeLayout = computed(() => {
  return layoutMap[layout.value]
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
    overflow: hidden;
  }
}
</style>
