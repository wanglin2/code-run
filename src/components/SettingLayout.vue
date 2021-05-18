<template>
  <div>
    <div class="settingRow">
      <div class="content">
        <span class="name">布局</span>
        <div class="control">
          <el-select v-model="layout" @change="layoutChange">
            <el-option
              v-for="item in list"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" class="btn" @click="confirm">确定</el-button>
      </div>
    </div>
    <div class="previewImg">
      <img :src="previewImg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import defaultImg from '../assets/layoutImgs/default.jpg'
import default2Img from '../assets/layoutImgs/default2.jpg'
import editImg from '../assets/layoutImgs/edit.jpg'
import edit2Img from '../assets/layoutImgs/edit2.jpg'
import editOnlyImg from '../assets/layoutImgs/editOnly.jpg'
import editOnly2Img from '../assets/layoutImgs/editOnly2.jpg'
import previewOnlyImg from '../assets/layoutImgs/previewOnly.jpg'
import previewOnly2Img from '../assets/layoutImgs/previewOnly2.jpg'
import jsImg from '../assets/layoutImgs/js.jpg'

// vuex
const store = useStore()

const list = [
  {
    name: '默认',
    value: 'default',
  },
  {
    name: '默认(对调)',
    value: 'default2',
  },
  {
    name: '编辑视图',
    value: 'edit',
  },
  {
    name: '编辑视图2',
    value: 'edit2',
  },
  {
    name: '纯编辑',
    value: 'editOnly',
  },
  {
    name: '纯编辑(带控制台)',
    value: 'editOnly2',
  },
  {
    name: '纯预览',
    value: 'previewOnly',
  },
  {
    name: '纯预览(带控制台)',
    value: 'previewOnly2',
  },
  {
    name: 'js模式',
    value: 'js',
  },
]

const previewImgMap = {
  default: defaultImg,
  default2: default2Img,
  edit: editImg,
  edit2: edit2Img,
  editOnly: editOnlyImg,
  editOnly2: editOnly2Img,
  previewOnly: previewOnlyImg,
  previewOnly2: previewOnly2Img,
  js: jsImg,
}

const previewImg = computed(() => {
  return previewImgMap[layout.value]
})

// 布局
const layout = ref('')
layout.value = store.state.editData.config.layout

/**
 * @Author: 王林
 * @Date: 2021-05-15 08:07:04
 * @Desc: 切换布局
 */
const confirm = () => {
  store.commit('setLayout', layout.value)
}
</script>

<style scoped lang="less">
.settingRow {
  margin-bottom: 20px;

  .content {
    display: flex;
    align-items: center;

    .name {
      margin-right: 10px;
    }

    .btn {
      margin-left: 10px;
    }
  }

  .desc {
    font-size: 12px;
    color: #999;
  }
}

.previewImg {
  width: 400px;
  border: 1px solid #dcdfe6;
  padding: 5px;

  img {
    width: 100%;
  }
}
</style>
