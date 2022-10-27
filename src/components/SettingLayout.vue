<template>
  <div>
    <div class="settingRow">
      <div class="content">
        <span class="name">布局</span>
        <div class="control">
          <el-select v-model="layout">
            <el-option
              v-for="item in layoutList"
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
    <div class="previewImg" v-if="previewImg">
      <img :src="previewImg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { layoutList, previewImgMap } from '@/config/constants'
import { ElSelect, ElButton, ElOption } from 'element-plus'

// 初始化
const useInit = () => {
  const store = useStore()
  return {
    store
  }
}

// 布局处理
const useLayout = ({ store }) => {
  // 预览图片
  const previewImg = computed(() => {
    return previewImgMap[layout.value]
  })

  // 布局
  const layout = ref('')
  layout.value = store.state.editData.config.layout

  // 切换布局
  const confirm = () => {
    store.commit('setLayout', layout.value)
  }

  return {
    previewImg,
    layout,
    confirm
  }
}

// created部分
const { store } = useInit()
const { previewImg, layout, confirm } = useLayout({ store })
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
