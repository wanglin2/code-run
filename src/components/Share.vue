<template>
  <el-dialog :title="copyDialogTitle" v-model="shareDialogVisible" :width="600">
    <el-input
      v-model="shareUrl"
      type="textarea"
      autosize
      readonly
      ref="shareUrlInput"
    ></el-input>
    <p class="tip">{{ copyDialogTip }}</p>
  </el-dialog>
</template>

<script setup>
import { ref, nextTick, defineProps, defineExpose } from 'vue'
import { ElDialog, ElInput } from 'element-plus'
import {
  createShareUrl as createShareUrlUtil,
  createEmbedUrl as createEmbedUrlUtil
} from '@/utils'
import { useRoute } from 'vue-router'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()

const shareUrlInput = ref(null)
const useShare = () => {
  const copyDialogTitle = ref('')
  const copyDialogTip = ref('')
  const shareDialogVisible = ref(false)
  const shareUrl = ref('')
  const showUrl = url => {
    if (!props.isEdit) {
      return
    }
    shareUrl.value = url
    shareDialogVisible.value = true
    nextTick(() => {
      shareUrlInput.value.select()
    })
  }
  const createShareUrl = () => {
    copyDialogTitle.value = '分享'
    copyDialogTip.value = '复制url进行分享吧~'
    showUrl(createShareUrlUtil(route.params.id))
  }
  const createEmbedUrl = () => {
    copyDialogTitle.value = '嵌入'
    copyDialogTip.value = '复制url嵌入到你页面的iframe里吧~'
    showUrl(createEmbedUrlUtil(route.params.id))
  }
  const createEmbedCode = () => {
    copyDialogTitle.value = '嵌入'
    copyDialogTip.value = '复制代码插入到你页面里吧~'
    let code = `<iframe height="500" style="width: 100%;" scrolling="no" src="${createEmbedUrlUtil(
      route.params.id
    )}" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>`
    showUrl(code)
  }
  return {
    copyDialogTitle,
    copyDialogTip,
    shareDialogVisible,
    shareUrl,
    createShareUrl,
    createEmbedUrl,
    createEmbedCode
  }
}

const {
  copyDialogTitle,
  copyDialogTip,
  shareDialogVisible,
  shareUrl,
  createShareUrl,
  createEmbedUrl,
  createEmbedCode
} = useShare()

defineExpose({
  createShareUrl,
  createEmbedUrl,
  createEmbedCode
})
</script>

<style lang="less"></style>
