<template>
  <div class="embedLayoutContainer">
    <!-- 头部 -->
    <div class="embedHeader">
      <div class="left">
        <SwitchBtn v-model="codeTypes" :list="codeTypeList"></SwitchBtn>
      </div>
      <div class="center">
        <SwitchBtn
          v-model="previewTypes"
          :list="[{ name: '结果', value: 'preview' }]"
        ></SwitchBtn>
      </div>
      <div class="right" @click="toCodeRun">
        <div>CodeRun</div>
        <div>内打开</div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="embedContent">
      <div class="embedCodeEditor" v-show="codeTypes.length > 0">
        <Editor
          v-if="showEditor"
          dir="v"
          :showHeader="false"
          :showList="showCodeTypeList"
          :notRunCode="notRunCode"
          :readOnly="true"
        ></Editor>
      </div>
      <div class="embedPreview" v-show="previewTypes.length > 0">
        <Drag
          :number="2"
          dir="v"
          :config="[{ min: 0 }, { min: 48, default: 48 }]"
        >
          <DragItem
            :index="0"
            :disabled="true"
            :showTouchBar="false"
            title="预览"
          >
            <Preview :scale="scale"></Preview>
          </DragItem>
          <DragItem :index="1" :disabled="false" title="控制台">
            <Console></Console>
          </DragItem>
        </Drag>
      </div>
      <div
        class="info"
        v-if="codeTypes.length <= 0 && previewTypes.length <= 0"
      >
        点击上方tab查看内容吧~
      </div>
    </div>
    <!-- 底部 -->
    <div class="embedFooter">
      <div class="left">
        <SwitchBtn
          v-model="resourceType"
          size="small"
          :list="[{ name: '资源', value: 'resources' }]"
        ></SwitchBtn>
      </div>
      <div class="center">
        <SwitchBtn
          v-model="scaleType"
          size="small"
          :list="scaleTypeList"
          @change="scaleTypeChange"
        ></SwitchBtn>
      </div>
      <div class="right">
        <div class="reRunBtn" @click="reRunCode">重新运行</div>
      </div>
    </div>
    <!-- 资源列表 -->
    <transition name="fade">
      <div class="resourcesContainer" v-if="resourceType.length > 0">
        <div
          class="resourcesBlock"
          v-for="block in resourcesBlockList"
          :key="block.type"
        >
          <div class="resourcesType">{{ block.type }}</div>
          <div
            class="resourcesItem"
            v-for="(item, index) in block.list"
            :key="index"
          >
            <a :href="item.url" target="_blank">{{ item.url }}</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {
  defineProps,
  ref,
  computed,
  watch,
  nextTick,
  getCurrentInstance
} from 'vue'
import SwitchBtn from '@/components/SwitchBtn'
import Editor from '@/components/Editor.vue'
import Preview from '@/components/Preview.vue'
import Console from '@/components/Console.vue'
import Drag from '@/components/Drag.vue'
import DragItem from '@/components/DragItem.vue'
import { getEmbedCodeTypeListMap, scaleTypeList } from '@/config/constants'
import { useRoute } from 'vue-router'
import { createShareUrl, newWindowOpenUrl } from '@/utils'
import { useStore } from 'vuex'
// import { getTemplate } from "@/config/templates";

const props = defineProps({
  layout: {
    type: String
  }
})

const proxy = getCurrentInstance().proxy
const route = useRoute()
const store = useStore()
const editData = computed(() => store.state.editData)
const resourcesBlockList = computed(() => {
  let res = []
  Object.keys(editData.value.code).forEach(item => {
    let itemData = editData.value.code[item]
    if (itemData.resources && itemData.resources.length > 0) {
      res.push({
        type: itemData.language,
        list: itemData.resources
      })
    }
  })
  // if (props.layout === 'vue') {
  //   res.push({
  //     type: 'vue',
  //     list: getTemplate(editData.value.code.VUE.language).code.JS.resources,
  //   });
  // }
  return res
})
const codeTypes = ref([])
const previewTypes = ref(['preview'])
const showEditor = ref(false)
const notRunCode = ref(false)
const resourceType = ref([])
const scaleType = ref([1])
const scale = ref(1)

const codeTypeList = ref(
  getEmbedCodeTypeListMap(props.layout).map(item => {
    return {
      name: item,
      value: item,
      title: item,
      disableDrag: true,
      showTouchBar: false
    }
  })
)

const showCodeTypeList = computed(() => {
  return codeTypes.value.length > 0
    ? codeTypeList.value.filter(item => {
        return codeTypes.value.includes(item.value)
      })
    : codeTypeList.value
})

watch(codeTypes, () => {
  notRunCode.value = true
})

watch(
  showCodeTypeList,
  () => {
    showEditor.value = false
    nextTick(() => {
      showEditor.value = true
    })
  },
  {
    immediate: true
  }
)

const scaleTypeChange = data => {
  scale.value = data[0]
}

const reRunCode = () => {
  proxy.$eventEmitter.emit('run')
}

const toCodeRun = () => {
  newWindowOpenUrl(createShareUrl(route.params.id, route.query.data ? encodeURIComponent(route.query.data) : null))
}
</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
<style scoped lang="less">
.embedLayoutContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  .embedHeader {
    height: 50px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    background: var(--header-background);
    padding: 0 10px;

    .left,
    .center {
      padding-top: 8px;
      padding-bottom: 2px;
    }

    .right {
      color: var(--header-logo-color);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }
  }

  .embedContent {
    flex-grow: 1;
    display: flex;
    background-color: #fff;

    .embedCodeEditor {
      flex: 1;
      overflow: hidden;
    }

    .embedPreview {
      flex: 1;
      overflow: hidden;
    }

    .info {
      flex: 1;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .embedFooter {
    height: 30px;
    flex-shrink: 0;
    background: var(--header-background);
    padding: 0 10px;
    display: flex;
    justify-content: space-between;

    .right {
      display: flex;
      align-items: center;

      .reRunBtn {
        border: 1px solid var(--header-btn-border-color);
        color: var(--header-btn-color);
        font-size: 12px;
        padding: 0 5px;
        height: 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;

        &:active {
          transform: translateY(1px);
        }
      }
    }
  }

  .resourcesContainer {
    position: absolute;
    left: 0;
    top: 50px;
    bottom: 30px;
    width: 100%;
    background: rgba(0, 0, 0, 0.95);
    padding: 20px;
    overflow: auto;

    .resourcesBlock {
      .resourcesType {
        color: #9d9ea0;
        margin-bottom: 20px;
      }

      .resourcesItem {
        margin-bottom: 10px;

        a {
          color: #76daff;
        }
      }
    }
  }
}
</style>
